import { NextResponse } from 'next/server';
import { getAllRestaurants } from '@/app/lib/restaurants';

export async function GET() {
  try {
    const restaurants = await getAllRestaurants();
    return NextResponse.json(restaurants);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
