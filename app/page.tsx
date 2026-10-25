import Link from 'next/link';
import { getAllRestaurants, getTopRestaurants } from '@/app/lib/restaurants';
import { RestaurantRow } from '@/app/components/RestaurantRow';
import { PopularCarousel } from '@/app/components/PopularCarousel';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [restaurants, topPicks] = await Promise.all([
    getAllRestaurants(),
    getTopRestaurants(3),
  ]);

  const pickedSlugs = new Set(topPicks.map((r) => r.slug));
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
          {topPicks[0] && (
            <Link
              href={`/review/${topPicks[0].slug}`}
              className="inline-flex shrink-0 items-center gap-1 rounded-md bg-white px-3 py-1.5 text-sm font-medium text-[#0A0A0C] outline-none transition-colors hover:bg-stone-200 focus-visible:[box-shadow:0_0_0_2px_#0A0A0C,0_0_0_4px_#FFFFFF]"
            >
              + Write review
            </Link>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-[560px] px-5 pb-16 pt-8">
        {topPicks.length > 0 && (
          <div className="mb-10">
            <p className="mb-3 font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-stone-400">
              Popular picks
            </p>
            <PopularCarousel picks={topPicks} />

            {listed.length > 0 && (
              <a
                href="#all-restaurants"
                className="mt-5 flex items-center justify-center gap-1.5 rounded-md py-2 text-xs text-stone-500 outline-none transition-colors hover:text-stone-300 focus-visible:[box-shadow:0_0_0_2px_#0A0A0C,0_0_0_4px_#FFFFFF]"
              >
                {listed.length} more {listed.length === 1 ? 'restaurant' : 'restaurants'} below
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 8l5 5 5-5" />
                </svg>
              </a>
            )}
          </div>
        )}

        <div id="all-restaurants" className="mb-4 scroll-mt-20 border-b border-stone-800 pb-2">
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
