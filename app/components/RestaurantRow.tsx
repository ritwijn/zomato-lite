import Image from 'next/image';
import { imageForCuisine } from '@/app/lib/cuisineImages';
import type { RestaurantSummary } from '@/app/lib/restaurants';

// A compact index row — thumbnail, name, rating — the way a real
// restaurant guide lists entries on a contents page, not a feed of
// full-width photo cards. Built to work inside the same 560px column
// as the rest of the app without reading as a plain stacked list.
export function RestaurantRow({ restaurant }: { restaurant: RestaurantSummary }) {
  return (
    <div className="flex items-center gap-4 py-5">
      <div className="relative h-[84px] w-[84px] shrink-0 overflow-hidden rounded-md border border-[#2E2C29] bg-[#2E2C29]">
        <Image
          src={imageForCuisine(restaurant.cuisine)}
          alt={`${restaurant.cuisine} food at ${restaurant.name}`}
          fill
          sizes="84px"
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.06]"
        />
      </div>
      <div className="min-w-0">
        <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold leading-snug tracking-[-0.005em] truncate">
          {restaurant.name}
        </h3>
        <p className="mt-1 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.08em] text-[#9B9690]">
          {restaurant.cuisine} · {restaurant.area}
        </p>
        <p className="mt-1.5 text-[13px]">
          {restaurant.totalReviews === 0 ? (
            <span className="text-[#9B9690]">No reviews yet</span>
          ) : (
            <>
              <span className="font-medium text-[#f2efe9]">{restaurant.averageRating?.toFixed(1)}</span>
              <span className="text-[#9B9690]">
                {' '}· {restaurant.totalReviews} {restaurant.totalReviews === 1 ? 'review' : 'reviews'}
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
