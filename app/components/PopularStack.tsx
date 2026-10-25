import Image from 'next/image';
import Link from 'next/link';
import { Stars } from '@/app/components/Stars';
import { imageForCuisine } from '@/app/lib/cuisineImages';
import type { SpotlightRestaurant } from '@/app/lib/restaurants';
import type { ReactNode } from 'react';

// One "popular pick" card. Both bars below are real, already-computed
// numbers rendered as a fill, not invented stats: the average rating
// itself, and the actual share of reviews rated 4 stars or higher.
// Rendered by PopularCarousel, which handles rotating between picks —
// this component only knows how to show one, plus an optional
// `overlay` (the carousel's dots/prev/next) laid on top of the image
// rather than appended as a row below the card.
//
// The quote is clamped to one line on purpose: letting it wrap to two
// lines made the card's total height vary pick to pick, which is
// exactly what broke an earlier version of this page (content below
// the card moved depending on which pick was showing).
export function PopularStack({
  restaurant,
  rank,
  overlay,
}: {
  restaurant: SpotlightRestaurant;
  rank: number;
  overlay?: ReactNode;
}) {
  const { slug, name, cuisine, area, averageRating, totalReviews, latestReview, positivePercentage } = restaurant;
  const ratingPercent = (averageRating! / 5) * 100;

  return (
    <div
      className="rounded-xl border border-stone-800/80 bg-[#121215] p-4 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)]"
      style={{ animation: 'pick-in 0.5s cubic-bezier(0.22,1,0.36,1) both' }}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
        <Image
          src={imageForCuisine(cuisine)}
          alt={`${cuisine} food at ${name}`}
          fill
          sizes="560px"
          priority={rank === 1}
          className="object-cover"
        />
        {overlay}
      </div>

      <span className="mt-3 inline-block rounded-full bg-amber-500/15 px-2.5 py-1 font-[family-name:var(--font-mono)] text-[10px] font-medium uppercase tracking-widest text-amber-400">
        No. {rank}
      </span>

      <h2 className="mt-2 font-[family-name:var(--font-display)] text-xl font-bold text-white">{name}</h2>
      <p className="mt-0.5 text-sm text-stone-400">{cuisine} · {area}</p>

      <div className="mt-3 flex items-end justify-between gap-6">
        <div>
          <div className="font-[family-name:var(--font-display)] lining-nums text-3xl font-bold leading-none text-white">
            {averageRating!.toFixed(1)}<span className="text-lg text-stone-500">/5</span>
          </div>
          <p className="mt-1 text-xs text-stone-400">
            Based on {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
          </p>
        </div>

        <div className="flex-1 space-y-2.5">
          <div>
            <div className="mb-1 flex items-center justify-between text-xs text-stone-400">
              <span>Average rating</span>
              <span className="font-medium text-emerald-400">{ratingPercent.toFixed(0)}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-stone-800">
              <div
                className="h-full rounded-full bg-emerald-500"
                style={{ '--bar-width': `${ratingPercent}%`, width: '0%', animation: 'grow-width 1s ease-out forwards' } as React.CSSProperties}
              />
            </div>
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between text-xs text-stone-400">
              <span>Positive reviews</span>
              <span className="font-medium text-amber-400">{positivePercentage.toFixed(0)}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-stone-800">
              <div
                className="h-full rounded-full bg-amber-500"
                style={{ '--bar-width': `${positivePercentage}%`, width: '0%', animation: 'grow-width 1s ease-out forwards' } as React.CSSProperties}
              />
            </div>
          </div>
        </div>
      </div>

      {latestReview && (
        <div className="mt-4 flex items-center justify-between gap-4 border-t border-stone-800 pt-3">
          <div className="min-w-0">
            <p className="truncate font-[family-name:var(--font-display)] text-base italic leading-snug text-stone-300">
              &ldquo;{latestReview.comment}&rdquo;
            </p>
            <div className="mt-1.5">
              <Stars rating={latestReview.rating} size="sm" />
            </div>
          </div>
          <Link
            href={`/restaurant/${slug}`}
            className="inline-flex shrink-0 items-center justify-center rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-[#0A0A0C] outline-none transition-colors hover:bg-emerald-400 focus-visible:[box-shadow:0_0_0_2px_#0A0A0C,0_0_0_4px_#10B981]"
          >
            + See full reviews
          </Link>
        </div>
      )}
    </div>
  );
}
