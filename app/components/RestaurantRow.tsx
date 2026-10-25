import Image from 'next/image';
import { imageForCuisine } from '@/app/lib/cuisineImages';
import type { RestaurantSummary } from '@/app/lib/restaurants';

// A compact index row — thumbnail, name, rating — the way a real
// restaurant guide lists entries on a contents page, not a feed of
// full-width photo cards. Built to work inside the same 560px column
// as the rest of the app.
export function RestaurantRow({ restaurant }: { restaurant: RestaurantSummary }) {
  return (
    <div className="flex items-center space-x-4 rounded-xl border border-stone-800/80 bg-[#121215] p-3 transition-colors group-hover:border-stone-700">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg sm:h-24 sm:w-24">
        <Image
          src={imageForCuisine(restaurant.cuisine)}
          alt={`${restaurant.cuisine} food at ${restaurant.name}`}
          fill
          sizes="96px"
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.06]"
        />
      </div>
      <div className="min-w-0">
        <h3 className="truncate font-[family-name:var(--font-display)] text-base font-bold text-white sm:text-lg">
          {restaurant.name}
        </h3>
        <p className="mt-1 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.08em] text-stone-400">
          {restaurant.cuisine} · {restaurant.area}
        </p>
        <p className="mt-1.5 text-[13px]">
          {restaurant.totalReviews === 0 ? (
            <span className="text-stone-400">No reviews yet</span>
          ) : (
            <>
              <span className="text-amber-500">★</span>{' '}
              <span className="font-medium text-white">{restaurant.averageRating?.toFixed(1)}</span>
              <span className="text-stone-400">
                {' '}· {restaurant.totalReviews} {restaurant.totalReviews === 1 ? 'review' : 'reviews'}
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
