import Link from 'next/link';
import { getAllRestaurants } from '@/app/lib/restaurants';
import { RestaurantRow } from '@/app/components/RestaurantRow';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const restaurants = await getAllRestaurants();

  return (
    <div className="min-h-screen bg-[#141414] text-[#f2efe9]">
      <div className="mx-auto max-w-[560px] px-5 py-16">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-[-0.01em]">
          Zomato Lite
        </h1>
        <p className="mt-2 text-[15px] text-[#9B9690]">
          Honest ratings from people who actually ate there.
        </p>

        <div className="mt-14 mb-2">
          <h2 className="text-sm font-medium text-[#9B9690]">All restaurants</h2>
        </div>

        <div className="divide-y divide-[#2E2C29] border-t border-[#2E2C29]">
          {restaurants.map((restaurant) => (
            <Link
              key={restaurant.slug}
              href={`/restaurant/${restaurant.slug}`}
              className="group block outline-none focus-visible:[box-shadow:0_0_0_2px_#141414,0_0_0_4px_#F2EFE9]"
            >
              <RestaurantRow restaurant={restaurant} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
