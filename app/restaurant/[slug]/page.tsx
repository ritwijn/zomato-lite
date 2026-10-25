import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Stars } from '@/app/components/Stars';
import { getRestaurantBySlug } from '@/app/lib/restaurants';

export const dynamic = 'force-dynamic';

const linkClass =
  'text-sm text-[#6b625b] underline decoration-[#DCCFBE] underline-offset-2 outline-none transition-colors hover:text-[#171412] rounded-sm focus-visible:[box-shadow:0_0_0_2px_#faf7f2,0_0_0_4px_#8F6A14]';

const ctaClass =
  'mt-4 inline-block rounded-md bg-[#8F6A14] px-4 py-2 text-sm font-medium text-white outline-none transition-colors hover:bg-[#765909] focus-visible:[box-shadow:0_0_0_2px_#faf7f2,0_0_0_4px_#8F6A14]';

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
        <Link href="/" className={linkClass}>
          ← All restaurants
        </Link>

        <div className="mb-10 mt-6">
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
            <p className="text-sm text-[#6b625b]">No one&rsquo;s reviewed this place yet.</p>
            <Link href={`/review/${slug}`} className={ctaClass}>
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
              <Link href={`/review/${slug}`} className={linkClass}>
                Write a review
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
