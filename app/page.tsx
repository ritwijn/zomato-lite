import { getAllRestaurants, getTopRestaurants } from '@/app/lib/restaurants';
import { RestaurantList } from '@/app/components/RestaurantList';
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
        <div className="mx-auto max-w-[560px] border-b border-stone-800/80 px-5 pb-4 pt-6">
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-white">
            Zomato Lite
          </h1>
          <p className="mt-0.5 text-xs text-stone-400">Honest ratings from people who actually ate there.</p>
        </div>
      </div>

      <div className="mx-auto max-w-[560px] px-5 pb-16 pt-8">
        {topPicks.length > 0 && (
          <div className="mb-10">
            <p className="mb-3 font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-stone-400">
              Popular picks
            </p>
            <PopularCarousel picks={topPicks} />
          </div>
        )}

        <div className="mb-4 border-b border-stone-800 pb-2">
          <h2 className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-stone-400">
            All restaurants
          </h2>
        </div>

        <RestaurantList restaurants={listed} />
      </div>
    </div>
  );
}
