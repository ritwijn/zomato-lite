import Link from 'next/link';
import { getAllRestaurants } from '@/app/lib/restaurants';
import { RestaurantTile } from '@/app/components/RestaurantTile';

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

        <div className="mt-14 mb-6">
          <h2 className="text-sm font-medium text-[#9B9690]">All restaurants</h2>
        </div>

        <div className="grid grid-cols-1 gap-10">
          {restaurants.map((restaurant) => (
            <Link
              key={restaurant.slug}
              href={`/restaurant/${restaurant.slug}`}
              className="group block rounded-md outline-none focus-visible:[box-shadow:0_0_0_2px_#141414,0_0_0_4px_#F2EFE9]"
            >
              <div className="overflow-hidden rounded-md border border-[#2E2C29] transition-colors group-hover:border-[#F2EFE9]/30">
                <RestaurantTile name={restaurant.name} cuisine={restaurant.cuisine} />
                <div className="p-4">
                  <h3 className="font-[family-name:var(--font-display)] text-[19px] font-semibold leading-snug tracking-[-0.005em]">
                    {restaurant.name}
                  </h3>
                  <p className="mt-1 text-[13px] text-[#9B9690]">
                    {restaurant.cuisine} · {restaurant.area}
                  </p>
                  <p className="mt-2 text-[13px]">
                    {restaurant.totalReviews === 0 ? (
                      <span className="text-[#9B9690]">No reviews yet</span>
                    ) : (
                      <>
                        <span className="font-medium text-[#f2efe9]">
                          {restaurant.averageRating?.toFixed(1)}
                        </span>
                        <span className="text-[#9B9690]">
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
