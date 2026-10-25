import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';
import { getRestaurantIdBySlug } from '@/app/lib/restaurants';

export async function POST(req: NextRequest) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const body = await req.json();
    const { restaurantSlug, rating, comment } = body;

    if (typeof rating !== 'number' || !Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be an integer between 1 and 5' }, { status: 400 });
    }

    if (typeof comment !== 'string' || comment.trim().length === 0) {
      return NextResponse.json({ error: 'Comment cannot be empty' }, { status: 400 });
    }

    const restaurantId = typeof restaurantSlug === 'string' ? await getRestaurantIdBySlug(restaurantSlug) : null;
    if (!restaurantId) {
      return NextResponse.json({ error: 'Restaurant does not exist' }, { status: 400 });
    }

    const result = await sql`INSERT INTO reviews (restaurant_id, rating, comment) VALUES (${restaurantId}, ${rating}, ${comment.trim()}) RETURNING id`;
    const reviewId = result[0].id;

    return NextResponse.json({ success: true, reviewId }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
