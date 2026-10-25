import Link from 'next/link';
import { getAllRestaurants } from '@/app/lib/restaurants';
import { RestaurantTile } from '@/app/components/RestaurantTile';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const restaurants = await getAllRestaurants();

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#171412]">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <div className="mb-12 sm:mb-16">
          <h1 className="font-[family-name:var(--font-display)] text-[40px] font-semibold leading-tight tracking-[-0.01em] sm:text-5xl">
            Zomato Lite
          </h1>
          <p className="mt-2 text-[15px] text-[#6b625b]">
            Honest ratings from people who actually ate there.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {restaurants.map((restaurant) => (
            <Link
              key={restaurant.slug}
              href={`/restaurant/${restaurant.slug}`}
              className="group block rounded-lg outline-none focus-visible:[box-shadow:0_0_0_2px_#faf7f2,0_0_0_4px_#8F6A14]"
            >
              <div className="overflow-hidden rounded-lg border border-[#DCCFBE] transition-colors group-hover:border-[#8F6A14]/50">
                <RestaurantTile name={restaurant.name} cuisine={restaurant.cuisine} />
                <div className="p-4">
                  <h2 className="font-[family-name:var(--font-display)] text-[19px] font-semibold leading-snug tracking-[-0.005em]">
                    {restaurant.name}
                  </h2>
                  <p className="mt-1 text-[13px] text-[#6b625b]">
                    {restaurant.cuisine} · {restaurant.area}
                  </p>
                  <p className="mt-2 text-[13px] text-[#171412]">
                    {restaurant.totalReviews === 0 ? (
                      <span className="text-[#6b625b]">No reviews yet</span>
                    ) : (
                      <>
                        <span className="font-medium">{restaurant.averageRating?.toFixed(1)}</span>
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
