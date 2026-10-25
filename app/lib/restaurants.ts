import { neon } from '@neondatabase/serverless';

export type RestaurantSummary = {
  slug: string;
  name: string;
  cuisine: string;
  area: string;
  averageRating: number | null;
  totalReviews: number;
};

export type RestaurantDetail = RestaurantSummary & {
  latestReview: { id: number; rating: number; comment: string; createdAt: string } | null;
  reviews: { id: number; rating: number; comment: string; createdAt: string }[];
};

// Single source of truth for every place this app reads restaurant or
// review data from Postgres. app/api/**/route.ts and the page components
// both call these — never AVG()/COUNT() anywhere else, and never a
// stored average_rating or latest_review column.
const sql = neon(process.env.DATABASE_URL!);

type SummaryRow = {
  slug: string;
  name: string;
  cuisine: string;
  area: string;
  average_rating: string | null;
  total_reviews: number;
};

function mapSummaryRow(r: SummaryRow): RestaurantSummary {
  return {
    slug: r.slug,
    name: r.name,
    cuisine: r.cuisine,
    area: r.area,
    averageRating: r.average_rating !== null ? parseFloat(r.average_rating) : null,
    totalReviews: r.total_reviews,
  };
}

export async function getAllRestaurants(): Promise<RestaurantSummary[]> {
  const rows = await sql`
    SELECT
      r.slug,
      r.name,
      r.cuisine,
      r.area,
      AVG(rv.rating)::numeric(10,1) AS average_rating,
      COUNT(rv.id)::int AS total_reviews
    FROM restaurants r
    LEFT JOIN reviews rv ON rv.restaurant_id = r.id
    GROUP BY r.id
    ORDER BY r.id ASC
  `;

  return (rows as SummaryRow[]).map(mapSummaryRow);
}

export async function getRestaurantBySlug(slug: string): Promise<RestaurantDetail | null> {
  const restaurants = await sql`SELECT id, slug, name, cuisine, area FROM restaurants WHERE slug = ${slug}`;
  if (!restaurants || restaurants.length === 0) {
    return null;
  }

  const restaurant = restaurants[0];
  const reviews = await sql`
    SELECT id, rating, comment, created_at
    FROM reviews
    WHERE restaurant_id = ${restaurant.id}
    ORDER BY created_at DESC
  `;

  if (!reviews || reviews.length === 0) {
    return {
      slug: restaurant.slug,
      name: restaurant.name,
      cuisine: restaurant.cuisine,
      area: restaurant.area,
      averageRating: null,
      totalReviews: 0,
      latestReview: null,
      reviews: [],
    };
  }

  const totalReviews = reviews.length;
  const avgResult = await sql`SELECT AVG(rating)::numeric(10,1) AS average FROM reviews WHERE restaurant_id = ${restaurant.id}`;
  const averageRating = avgResult[0].average !== null ? parseFloat(avgResult[0].average) : null;

  const latestReview = {
    id: reviews[0].id,
    rating: reviews[0].rating,
    comment: reviews[0].comment,
    createdAt: reviews[0].created_at,
  };

  type ReviewRow = { id: number; rating: number; comment: string; created_at: string };

  const olderReviews = (reviews.slice(1) as ReviewRow[]).map((r) => ({
    id: r.id,
    rating: r.rating,
    comment: r.comment,
    createdAt: r.created_at,
  }));

  return {
    slug: restaurant.slug,
    name: restaurant.name,
    cuisine: restaurant.cuisine,
    area: restaurant.area,
    averageRating,
    totalReviews,
    latestReview,
    reviews: olderReviews,
  };
}

// Used by POST /api/reviews to resolve a slug to the numeric id the
// reviews table's foreign key actually needs — the only place a raw id
// is used at all, and it never leaves this file.
export async function getRestaurantIdBySlug(slug: string): Promise<number | null> {
  const rows = await sql`SELECT id FROM restaurants WHERE slug = ${slug}`;
  return rows.length > 0 ? rows[0].id : null;
}

export type SpotlightRestaurant = RestaurantDetail & { positivePercentage: number };

// The top N restaurants by average rating (real, already-aggregated,
// just ordered), each with the same full detail and one more honest
// number — the share of its own reviews rated 4 stars or higher.
// Every "popular pick" card gets identical treatment because this
// returns identical data for each of them; there's no separate
// "lighter" query for #2/#3.
export async function getTopRestaurants(limit: number): Promise<SpotlightRestaurant[]> {
  const top = await sql`
    SELECT r.slug
    FROM restaurants r
    JOIN reviews rv ON rv.restaurant_id = r.id
    GROUP BY r.id
    ORDER BY AVG(rv.rating) DESC, COUNT(rv.id) DESC
    LIMIT ${limit}
  `;

  const results: SpotlightRestaurant[] = [];
  for (const row of top) {
    const detail = await getRestaurantBySlug(row.slug);
    if (!detail) continue;

    const positive = await sql`
      SELECT (COUNT(*) FILTER (WHERE rv.rating >= 4) * 100.0 / COUNT(*))::numeric(10,0) AS positive_percentage
      FROM reviews rv
      JOIN restaurants r ON r.id = rv.restaurant_id
      WHERE r.slug = ${row.slug}
    `;

    results.push({ ...detail, positivePercentage: parseFloat(positive[0].positive_percentage) });
  }

  return results;
}
