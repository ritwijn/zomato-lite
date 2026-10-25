import Image from 'next/image';
import Link from 'next/link';
import { imageForCuisine } from '@/app/lib/cuisineImages';
import type { RestaurantSummary } from '@/app/lib/restaurants';

// The #1 restaurant, presented plainly: a crisp bordered image frame
// and strong typography, on the page's own canvas — no colored panel,
// no stack, no carousel. A static server-rendered row, not a widget.
export function FeaturedHero({ restaurant }: { restaurant: RestaurantSummary }) {
  return (
    <Link
      href={`/restaurant/${restaurant.slug}`}
      className="group block max-w-3xl outline-none focus-visible:[box-shadow:0_0_0_2px_#faf9f5,0_0_0_4px_#1A1A1A]"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
        <div className="relative aspect-[4/5] w-full max-w-[320px] shrink-0 overflow-hidden rounded-md border border-[#E7E5E4]">
          <Image
            src={imageForCuisine(restaurant.cuisine)}
            alt={`${restaurant.cuisine} food at ${restaurant.name}`}
            fill
            sizes="320px"
            priority
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
        </div>
        <div>
          <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[#78716C]">
            {restaurant.cuisine} · {restaurant.area}
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.1] tracking-[-0.01em] sm:text-5xl">
            {restaurant.name}
          </h2>
          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-[family-name:var(--font-display)] lining-nums text-6xl font-semibold leading-none tracking-tight">
              {restaurant.averageRating!.toFixed(1)}
            </span>
            <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[#78716C]">
              Average rating · {restaurant.totalReviews} {restaurant.totalReviews === 1 ? 'review' : 'reviews'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
