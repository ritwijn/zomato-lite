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
    <div className="min-h-screen bg-[#faf9f5] text-[#1a1a1a]">
      <div className="mx-auto max-w-[560px] px-5 py-16">
        <Link href="/" className={secondaryLinkClass}>
          ← All restaurants
        </Link>

        <div className="relative mt-6 mb-8 aspect-[16/9] w-full overflow-hidden rounded-md border border-[#E7E5E4] bg-[#E7E5E4]">
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
          <h1 className="font-[family-name:var(--font-display)] text-[32px] font-semibold leading-tight tracking-[-0.01em]">{name}</h1>
          <p className="mt-1.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[#78716C]">
            {cuisine} · {area}
          </p>
        </div>

        <div className="mb-12 flex items-baseline gap-3">
          <div className="font-[family-name:var(--font-display)] lining-nums text-8xl font-semibold leading-none tracking-tight">
            {averageRating === null ? '—' : averageRating.toFixed(1)}
          </div>
          <div className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[#78716C]">
            Average rating · {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
          </div>
        </div>

        {!latestReview ? (
          <div className="mb-10 rounded-md border border-dashed border-[#E7E5E4] px-5 py-9 text-center">
            <p className="mb-4 text-sm text-[#78716C]">No one&rsquo;s reviewed this place yet.</p>
            <Link href={`/review/${slug}`} className={primaryButtonClass}>
              Be the first to review
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-10 border-t border-[#1A1A1A] pt-5">
              <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[#78716C]">
                Latest feedback
              </p>
              <p className="mt-3 font-[family-name:var(--font-display)] text-2xl italic leading-snug tracking-[-0.005em]">
                &ldquo;{latestReview.comment}&rdquo;
              </p>
              <div className="mt-3 flex items-center gap-2">
                <Stars rating={latestReview.rating} />
                <span className="text-[13px] text-[#78716C]">{formatRelativeTime(latestReview.createdAt)}</span>
              </div>
            </div>

            {reviews.length > 0 && (
              <div className="mb-10 divide-y divide-[#E7E5E4] border-t border-[#E7E5E4]">
                {reviews.map((review) => (
                  <div key={review.id} className="py-4">
                    <div className="flex items-center gap-2">
                      <Stars rating={review.rating} size="sm" />
                      <span className="text-[13px] text-[#78716C]">{formatRelativeTime(review.createdAt)}</span>
                    </div>
                    <p className="mt-2 text-[15px] leading-relaxed">{review.comment}</p>
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
