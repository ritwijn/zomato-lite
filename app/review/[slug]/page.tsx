import { getRestaurantBySlug } from '@/app/lib/restaurants';
import ReviewClient from './ReviewClient';

export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getRestaurantBySlug(slug);
  const restaurant = data ? { name: data.name, cuisine: data.cuisine, area: data.area } : null;
  return <ReviewClient slug={slug} restaurant={restaurant} />;
}
