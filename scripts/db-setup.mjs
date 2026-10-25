import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, '..', '.env.local') });

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set. Add it to .env.local first.');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

const restaurants = [
  { slug: 'ludhiana-burrito', name: 'Ludhiana Burrito', cuisine: 'Indian', area: 'Sector 32' },
  { slug: 'dilli-dastarkhan', name: 'Dilli Dastarkhan', cuisine: 'North Indian', area: 'Sector 17' },
  { slug: 'canton-kitchen', name: 'Canton Kitchen', cuisine: 'Chinese', area: 'Sector 22' },
  { slug: 'basilico', name: 'Basilico', cuisine: 'Italian', area: 'Sector 35' },
  { slug: 'madras-cafe', name: 'Madras Café', cuisine: 'South Indian', area: 'Sector 8' },
  { slug: 'the-bean-theory', name: 'The Bean Theory', cuisine: 'Cafe', area: 'Sector 43' },
  { slug: 'sunday-brunch-co', name: 'Sunday Brunch Co.', cuisine: 'Continental', area: 'Sector 26' },
];

// daysAgo is applied per-review so seeded created_at values are spread out —
// this is what makes "latest review" a meaningful, visible distinction.
const reviewsBySlug = {
  'ludhiana-burrito': [
    { rating: 5, comment: 'Paneer burrito is unreal', daysAgo: 8 },
    { rating: 4, comment: 'Good, but slow service', daysAgo: 6 },
    { rating: 4, comment: 'Solid. Would repeat.', daysAgo: 2 },
  ],
  'dilli-dastarkhan': [
    { rating: 5, comment: 'Butter chicken is the real deal', daysAgo: 12 },
    { rating: 3, comment: 'Decent, portions could be bigger', daysAgo: 9 },
    { rating: 4, comment: 'Great for a family dinner', daysAgo: 5 },
    { rating: 5, comment: 'Best naan in the sector', daysAgo: 1 },
  ],
  'canton-kitchen': [
    { rating: 4, comment: 'Hakka noodles are consistently good', daysAgo: 10 },
    { rating: 2, comment: 'Overpriced for the quantity', daysAgo: 4 },
  ],
  basilico: [
    { rating: 5, comment: 'Wood-fired pizza, finally done right', daysAgo: 15 },
    { rating: 4, comment: 'Cosy spot, good for a date', daysAgo: 7 },
    { rating: 3, comment: 'Pasta was a bit salty', daysAgo: 3 },
  ],
  'madras-cafe': [
    { rating: 5, comment: 'Filter coffee alone is worth the trip', daysAgo: 20 },
    { rating: 5, comment: 'Dosa is crisp, chutneys are fresh', daysAgo: 11 },
    { rating: 4, comment: 'Always busy for a reason', daysAgo: 6 },
    { rating: 4, comment: 'Quick, clean, reliable', daysAgo: 2 },
    { rating: 3, comment: 'Service slows down after 1pm', daysAgo: 1 },
  ],
  'the-bean-theory': [
    { rating: 4, comment: 'Good flat white, decent wifi', daysAgo: 5 },
  ],
  // sunday-brunch-co intentionally has zero reviews — this is the one
  // that exercises the empty state, on both the grid and its own page.
};

async function main() {
  console.log('Dropping existing tables (if any)...');
  await sql`DROP TABLE IF EXISTS reviews`;
  await sql`DROP TABLE IF EXISTS restaurants`;

  console.log('Applying schema...');
  const schema = readFileSync(join(__dirname, '..', 'db', 'schema.sql'), 'utf8');
  // Neon's http driver runs one statement per call, so split on blank-line
  // separated statements rather than sending the whole file at once.
  const statements = schema
    .split(';')
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !s.startsWith('--'));
  for (const statement of statements) {
    await sql.query(statement);
  }

  console.log('Seeding restaurants...');
  const idBySlug = {};
  for (const r of restaurants) {
    const [row] = await sql`
      INSERT INTO restaurants (slug, name, cuisine, area)
      VALUES (${r.slug}, ${r.name}, ${r.cuisine}, ${r.area})
      RETURNING id
    `;
    idBySlug[r.slug] = row.id;
  }

  console.log('Seeding reviews...');
  for (const [slug, reviews] of Object.entries(reviewsBySlug)) {
    const restaurantId = idBySlug[slug];
    for (const r of reviews) {
      await sql`
        INSERT INTO reviews (restaurant_id, rating, comment, created_at)
        VALUES (${restaurantId}, ${r.rating}, ${r.comment}, NOW() - (${r.daysAgo} || ' days')::interval)
      `;
    }
  }

  console.log('\nDone. Restaurants:');
  const rows = await sql`SELECT id, slug, name, cuisine, area FROM restaurants ORDER BY id`;
  console.table(rows);

  const reviewCount = await sql`SELECT COUNT(*)::int AS count FROM reviews`;
  console.log(`Total reviews seeded: ${reviewCount[0].count}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
