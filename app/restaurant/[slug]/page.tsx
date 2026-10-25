import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Stars } from '@/app/components/Stars';
import { getRestaurantBySlug } from '@/app/lib/restaurants';
import { imageForCuisine } from '@/app/lib/cuisineImages';
import { primaryButtonClass, secondaryLinkClass } from '@/app/components/buttonStyles';
import { formatRelativeTime } from '@/app/lib/relativeTime';

export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // This page renders exactly what getRestaurantBySlug returns — the
  // same function app/api/restaurants/[slug]/route.ts calls. The average
  // is computed once, inside that function, and never recalculated here.
  // The line that prints it:
  //   {averageRating === null ? '—' : averageRating.toFixed(1)}
  const data = await getRestaurantBySlug(slug);

  if (!data) {
    notFound();
  }

  const { name, cuisine, area, averageRating, totalReviews, latestReview, reviews } = data;

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white">
      <div className="mx-auto max-w-[560px] px-5 py-16">
        <Link href="/" className={secondaryLinkClass}>
          ← All restaurants
        </Link>

        <div className="relative mt-6 mb-8 aspect-[16/9] w-full overflow-hidden rounded-md border border-stone-800 bg-stone-800">
          <Image
            src={imageForCuisine(cuisine)}
            alt={`${cuisine} food at ${name}`}
            fill
            sizes="560px"
            priority
            className="object-cover"
          />
        </div>

        <div className="mb-10">
          <h1 className="font-[family-name:var(--font-display)] text-[32px] font-semibold leading-tight tracking-[-0.01em] text-white">{name}</h1>
          <p className="mt-1.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-stone-400">
            {cuisine} · {area}
          </p>
        </div>

        <div className="mb-12 flex items-baseline gap-3">
          <div className="font-[family-name:var(--font-display)] lining-nums text-8xl font-semibold leading-none tracking-tight text-white">
            {averageRating === null ? '—' : averageRating.toFixed(1)}
          </div>
          <div className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-stone-400">
            Average rating · {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
          </div>
        </div>

        {!latestReview ? (
          <div className="mb-10 rounded-md border border-dashed border-stone-800 px-5 py-9 text-center">
            <p className="mb-4 text-sm text-stone-400">No one&rsquo;s reviewed this place yet.</p>
            <Link href={`/review/${slug}`} className={primaryButtonClass}>
              Be the first to review
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-10 border-t border-white pt-5">
              <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-stone-400">
                Latest feedback
              </p>
              <p className="mt-3 font-[family-name:var(--font-display)] text-2xl italic leading-snug tracking-[-0.005em] text-white">
                &ldquo;{latestReview.comment}&rdquo;
              </p>
              <div className="mt-3 flex items-center gap-2">
                <Stars rating={latestReview.rating} />
                <span className="text-[13px] text-stone-400">{formatRelativeTime(latestReview.createdAt)}</span>
              </div>
            </div>

            {reviews.length > 0 && (
              <div className="mb-10 divide-y divide-stone-800 border-t border-stone-800">
                {reviews.map((review) => (
                  <div key={review.id} className="py-4">
                    <div className="flex items-center gap-2">
                      <Stars rating={review.rating} size="sm" />
                      <span className="text-[13px] text-stone-400">{formatRelativeTime(review.createdAt)}</span>
                    </div>
                    <p className="mt-2 text-[15px] leading-relaxed text-stone-300">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}

            <div>
              <Link href={`/review/${slug}`} className={primaryButtonClass}>
                Write a review
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
