import Link from 'next/link';
import { getAllRestaurants, getSpotlightRestaurant, getPopularRestaurants } from '@/app/lib/restaurants';
import { RestaurantRow } from '@/app/components/RestaurantRow';
import { PopularStack } from '@/app/components/PopularStack';
import { PopularPickCard } from '@/app/components/PopularPickCard';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [restaurants, spotlight, popular] = await Promise.all([
    getAllRestaurants(),
    getSpotlightRestaurant(),
    getPopularRestaurants(3),
  ]);

  // popular[0] is the same restaurant as spotlight (same ranking
  // query) — runners-up are whatever's left of the top 3.
  const runnersUp = spotlight ? popular.filter((r) => r.slug !== spotlight.slug) : [];
  const pickedSlugs = new Set([spotlight?.slug, ...runnersUp.map((r) => r.slug)].filter(Boolean));
  // Everything shown above already gets its own card — repeating any
  // of them in the list below would be the exact duplicate-card
  // problem this app has already hit and fixed once.
  const listed = restaurants.filter((r) => !pickedSlugs.has(r.slug));

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
        {spotlight && (
          <div className="mb-10">
            <p className="mb-3 font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-stone-400">
              Popular picks
            </p>
            <PopularStack restaurant={spotlight} />
            {runnersUp.length > 0 && (
              <div className="mt-3 grid grid-cols-2 gap-3">
                {runnersUp.map((restaurant, i) => (
                  <PopularPickCard key={restaurant.slug} restaurant={restaurant} rank={i + 2} delayMs={(i + 1) * 120} />
                ))}
              </div>
            )}
          </div>
        )}

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
