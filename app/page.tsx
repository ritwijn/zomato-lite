import Link from 'next/link';
import { getAllRestaurants, getPopularRestaurants } from '@/app/lib/restaurants';
import { RestaurantTile } from '@/app/components/RestaurantTile';
import { FeaturedHero } from '@/app/components/FeaturedHero';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [restaurants, popular] = await Promise.all([
    getAllRestaurants(),
    getPopularRestaurants(1),
  ]);
  const featured = popular[0];

  return (
    <div className="min-h-screen bg-[#faf9f5] text-[#1a1a1a]">
      <div className="mx-auto max-w-[1320px] px-6 py-14 sm:py-16 lg:px-10">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-[-0.01em]">
          Zomato Lite
        </h1>
        <p className="mt-2 text-[15px] text-[#78716C]">
          Honest ratings from people who actually ate there.
        </p>

        {featured && (
          <div className="mt-12 sm:mt-14">
            <FeaturedHero restaurant={featured} />
          </div>
        )}

        <div className="mt-16 mb-6 sm:mt-20">
          <h2 className="text-sm font-medium text-[#78716C]">All restaurants</h2>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {restaurants.map((restaurant) => (
            <Link
              key={restaurant.slug}
              href={`/restaurant/${restaurant.slug}`}
              className="group block rounded-md outline-none focus-visible:[box-shadow:0_0_0_2px_#faf9f5,0_0_0_4px_#1A1A1A]"
            >
              <div className="overflow-hidden rounded-md border border-[#E7E5E4] transition-colors group-hover:border-[#1A1A1A]/30">
                <RestaurantTile name={restaurant.name} cuisine={restaurant.cuisine} />
                <div className="p-4">
                  <h3 className="font-[family-name:var(--font-display)] text-[19px] font-semibold leading-snug tracking-[-0.005em]">
                    {restaurant.name}
                  </h3>
                  <p className="mt-1 text-[13px] text-[#78716C]">
                    {restaurant.cuisine} · {restaurant.area}
                  </p>
                  <p className="mt-2 text-[13px]">
                    {restaurant.totalReviews === 0 ? (
                      <span className="text-[#78716C]">No reviews yet</span>
                    ) : (
                      <>
                        <span className="font-medium text-[#1a1a1a]">
                          {restaurant.averageRating?.toFixed(1)}
                        </span>
                        <span className="text-[#78716C]">
                          {' '}· {restaurant.totalReviews} {restaurant.totalReviews === 1 ? 'review' : 'reviews'}
                        </span>
                      </>
                    )}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
