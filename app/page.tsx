import Link from 'next/link';
import { getAllRestaurants, getSpotlightRestaurant } from '@/app/lib/restaurants';
import { RestaurantRow } from '@/app/components/RestaurantRow';
import { PopularStack } from '@/app/components/PopularStack';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [restaurants, spotlight] = await Promise.all([
    getAllRestaurants(),
    getSpotlightRestaurant(),
  ]);
  // The spotlight above already shows this one in full — repeating it
  // in the list below would be the exact duplicate-card problem this
  // app has already hit and fixed once.
  const listed = spotlight ? restaurants.filter((r) => r.slug !== spotlight.slug) : restaurants;

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white">
      <div className="sticky top-0 z-10 bg-[#0A0A0C]">
        <div className="mx-auto flex max-w-[560px] items-center justify-between border-b border-stone-800/80 px-5 pb-4 pt-6">
          <div>
            <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-white">
              Zomato Lite
            </h1>
            <p className="mt-0.5 text-xs text-stone-400">Honest ratings from people who actually ate there.</p>
          </div>
          {spotlight && (
            <Link
              href={`/review/${spotlight.slug}`}
              className="inline-flex shrink-0 items-center gap-1 rounded-md bg-white px-3 py-1.5 text-sm font-medium text-[#0A0A0C] outline-none transition-colors hover:bg-stone-200 focus-visible:[box-shadow:0_0_0_2px_#0A0A0C,0_0_0_4px_#FFFFFF]"
            >
              + Write review
            </Link>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-[560px] px-5 pb-16 pt-8">
        {spotlight && <PopularStack restaurant={spotlight} />}

        <div className="mb-4 border-b border-stone-800 pb-2">
          <h2 className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-stone-400">
            All restaurants
          </h2>
        </div>

        <div className="space-y-3">
          {listed.map((restaurant) => (
            <Link
              key={restaurant.slug}
              href={`/restaurant/${restaurant.slug}`}
              className="group block rounded-xl outline-none focus-visible:[box-shadow:0_0_0_2px_#0A0A0C,0_0_0_4px_#FFFFFF]"
            >
              <RestaurantRow restaurant={restaurant} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
