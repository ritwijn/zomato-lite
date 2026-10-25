import { NextRequest, NextResponse } from 'next/server';
import { getRestaurantBySlug } from '@/app/lib/restaurants';

export async function GET(req: NextRequest, context: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await context.params;
    const data = await getRestaurantBySlug(slug);
    if (!data) {
      return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 });
    }
    return NextResponse.json(data);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
