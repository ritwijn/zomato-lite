import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Stars } from '@/app/components/Stars';
import { getRestaurantBySlug } from '@/app/lib/restaurants';
import { imageForCuisine } from '@/app/lib/cuisineImages';
import { primaryButtonClass, secondaryLinkClass } from '@/app/components/buttonStyles';

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
    <div className="min-h-screen bg-[#faf7f2] text-[#171412]">
      <div className="mx-auto max-w-[560px] px-5 py-16">
        <Link href="/" className={secondaryLinkClass}>
          ← All restaurants
        </Link>

        <div className="relative mt-6 mb-8 aspect-[16/9] w-full overflow-hidden rounded-lg bg-[#DCCFBE]">
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
          <p className="mt-1.5 text-[13px] text-[#6b625b]">{cuisine} · {area}</p>
        </div>

        <div className="mb-12 flex items-baseline gap-3">
          <div className="font-[family-name:var(--font-display)] lining-nums text-8xl font-semibold leading-none tracking-tight">
            {averageRating === null ? '—' : averageRating.toFixed(1)}
          </div>
          <div className="text-sm text-[#6b625b]">
            {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
          </div>
        </div>

        {!latestReview ? (
          <div className="mb-10 rounded-lg border border-dashed border-[#DCCFBE] px-5 py-9 text-center">
            <p className="mb-4 text-sm text-[#6b625b]">No one&rsquo;s reviewed this place yet.</p>
            <Link href={`/review/${slug}`} className={primaryButtonClass}>
              Be the first to review
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-10 rounded-lg border-l-2 border-[#8F6A14] bg-[#8F6A14]/[0.06] py-5 pl-5 pr-4">
              <div className="mb-2 text-[13px] font-medium text-[#8F6A14]">Latest</div>
              <Stars rating={latestReview.rating} />
              <p className="mt-2.5 text-[15px] leading-relaxed">{latestReview.comment}</p>
            </div>

            {reviews.length > 0 && (
              <div className="mb-10 divide-y divide-[#EAE1D3] border-t border-[#EAE1D3]">
                {reviews.map((review) => (
                  <div key={review.id} className="py-4">
                    <Stars rating={review.rating} size="sm" />
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
