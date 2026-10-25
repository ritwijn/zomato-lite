import Image from 'next/image';
import Link from 'next/link';
import { imageForCuisine } from '@/app/lib/cuisineImages';
import type { RestaurantSummary } from '@/app/lib/restaurants';

// The #2 / #3 runner-up cards next to the spotlight — a real rank
// ("No. 2", "No. 3"), not a decorative label, since these genuinely
// are ordered by average rating. Simpler than the spotlight on
// purpose: one big feature plus two honorable mentions reads as a
// real "top picks" moment, not three identical cards.
export function PopularPickCard({
  restaurant,
  rank,
  delayMs,
}: {
  restaurant: RestaurantSummary;
  rank: number;
  delayMs: number;
}) {
  return (
    <Link
      href={`/restaurant/${restaurant.slug}`}
      className="group block rounded-xl border border-stone-800/80 bg-[#121215] p-3 outline-none transition-colors hover:border-stone-700 focus-visible:[box-shadow:0_0_0_2px_#0A0A0C,0_0_0_4px_#FFFFFF]"
      style={{ animation: `pick-in 0.5s ease-out ${delayMs}ms backwards` }}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-lg">
        <Image
          src={imageForCuisine(restaurant.cuisine)}
          alt={`${restaurant.cuisine} food at ${restaurant.name}`}
          fill
          sizes="260px"
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.06]"
        />
        <span className="absolute left-2 top-2 rounded-full bg-[#0A0A0C]/85 px-2 py-0.5 font-[family-name:var(--font-mono)] text-[10px] font-medium text-stone-300 backdrop-blur-sm">
          No. {rank}
        </span>
      </div>
      <h3 className="mt-2.5 truncate font-[family-name:var(--font-display)] text-sm font-bold text-white">
        {restaurant.name}
      </h3>
      <p className="mt-0.5 truncate text-[11px] text-stone-400">
        {restaurant.cuisine} · {restaurant.area}
      </p>
      <p className="mt-1 text-[12px]">
        <span className="text-amber-500">★</span>{' '}
        <span className="font-medium text-white">{restaurant.averageRating?.toFixed(1)}</span>
        <span className="text-stone-400"> · {restaurant.totalReviews}</span>
      </p>
    </Link>
  );
}
