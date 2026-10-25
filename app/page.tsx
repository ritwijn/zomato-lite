import Link from 'next/link';
import { getAllRestaurants, getPopularRestaurants } from '@/app/lib/restaurants';
import { RestaurantTile } from '@/app/components/RestaurantTile';
import { PopularStack } from '@/app/components/PopularStack';
import { moodColorForRating } from '@/app/lib/moodColor';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [restaurants, popular] = await Promise.all([
    getAllRestaurants(),
    getPopularRestaurants(4),
  ]);

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#171412]">
      <div className="mx-auto max-w-[1320px] px-6 py-14 sm:py-16 lg:px-10">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-[-0.01em]">
          Zomato Lite
        </h1>
        <p className="mt-2 text-[15px] text-[#6b625b]">
          Honest ratings from people who actually ate there.
        </p>

        {popular.length > 0 && (
          <div className="mt-10 sm:mt-12">
            <PopularStack items={popular} />
          </div>
        )}

        <div className="mt-16 mb-6 sm:mt-20">
          <h2 className="text-sm font-medium text-[#6b625b]">All restaurants</h2>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {restaurants.map((restaurant) => (
            <Link
              key={restaurant.slug}
              href={`/restaurant/${restaurant.slug}`}
              className="group block rounded-lg outline-none focus-visible:[box-shadow:0_0_0_2px_#faf7f2,0_0_0_4px_#8F6A14]"
            >
              <div className="overflow-hidden rounded-lg border border-[#DCCFBE] transition-colors group-hover:border-[#8F6A14]/50">
                <RestaurantTile name={restaurant.name} cuisine={restaurant.cuisine} />
                <div className="p-4">
                  <h3 className="font-[family-name:var(--font-display)] text-[19px] font-semibold leading-snug tracking-[-0.005em]">
                    {restaurant.name}
                  </h3>
                  <p className="mt-1 text-[13px] text-[#6b625b]">
                    {restaurant.cuisine} · {restaurant.area}
                  </p>
                  <p className="mt-2 text-[13px] text-[#171412]">
                    {restaurant.totalReviews === 0 ? (
                      <span className="text-[#6b625b]">No reviews yet</span>
                    ) : (
                      <>
                        <span
                          className="font-medium"
                          style={{ color: moodColorForRating(restaurant.averageRating!) }}
                        >
                          {restaurant.averageRating?.toFixed(1)}
                        </span>
                        <span className="text-[#6b625b]">
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
