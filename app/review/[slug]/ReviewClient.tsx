'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { StarIcon } from '@/app/components/Stars';
import { imageForCuisine } from '@/app/lib/cuisineImages';
import { primaryButtonClass, primaryButtonDisabledClass, secondaryLinkClass } from '@/app/components/buttonStyles';

type Restaurant = { name: string; cuisine: string; area: string } | null;

export default function ReviewClient({ slug, restaurant }: { slug: string; restaurant: Restaurant }) {
  const router = useRouter();
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = rating !== null && comment.trim().length > 0 && !submitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ restaurantSlug: slug, rating, comment })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        setSubmitting(false);
        return;
      }
      router.push(`/restaurant/${slug}`);
    } catch {
      setError('Something went wrong');
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f5] text-[#1a1a1a]">
      <div className="mx-auto max-w-[560px] px-5 py-16">
        {restaurant && (
          <div className="relative mb-6 h-40 w-full overflow-hidden rounded-md border border-[#E7E5E4] bg-[#E7E5E4]">
            <Image
              src={imageForCuisine(restaurant.cuisine)}
              alt={`${restaurant.cuisine} food at ${restaurant.name}`}
              fill
              sizes="560px"
              className="object-cover"
            />
          </div>
        )}

        <div className="mb-12">
          <h1 className="font-[family-name:var(--font-display)] text-[32px] font-semibold leading-tight tracking-[-0.01em]">
            {restaurant ? restaurant.name : 'Loading...'}
          </h1>
          {restaurant && (
            <p className="mt-1.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[#78716C]">
              {restaurant.cuisine} · {restaurant.area}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-9">
          <div>
            <div className="mb-3 text-sm font-medium">Your rating</div>
            <div className="flex gap-2" onMouseLeave={() => setHover(0)}>
              {[1, 2, 3, 4, 5].map((n) => {
                const filled = (hover || rating || 0) >= n;
                return (
                  <button
                    type="button"
                    key={n}
                    aria-label={`${n} star${n > 1 ? 's' : ''}`}
                    aria-pressed={rating === n}
                    onMouseEnter={() => setHover(n)}
                    onClick={() => setRating(n)}
                    className={`flex h-11 w-11 items-center justify-center rounded-md border outline-none transition-colors active:scale-95 focus-visible:[box-shadow:0_0_0_2px_#faf9f5,0_0_0_4px_#1A1A1A] ${
                      filled ? 'border-[#D97706] bg-[#D97706]/10' : 'border-[#E7E5E4] bg-transparent'
                    }`}
                  >
                    <StarIcon filled={filled} className={`h-[18px] w-[18px] ${filled ? 'text-[#D97706]' : 'text-[#A8A29E]'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="mb-3 block text-sm font-medium" htmlFor="comment">Your review</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What stood out?"
              className="w-full rounded-md border border-[#E7E5E4] bg-transparent px-3.5 py-3 text-[15px] leading-relaxed text-[#1a1a1a] outline-none placeholder:text-[#A8A29E] focus:border-[#1A1A1A] focus-visible:[box-shadow:0_0_0_2px_#1A1A1A]"
              rows={5}
            />
          </div>

          {error && (
            <div role="alert" className="text-sm text-[#9a3324]">{error}</div>
          )}

          <button
            type="submit"
            disabled={!canSubmit}
            className={canSubmit ? primaryButtonClass : primaryButtonDisabledClass}
          >
            {submitting ? 'Posting…' : 'Post review'}
          </button>
        </form>

        <div className="mt-12">
          <Link href={`/restaurant/${slug}`} className={secondaryLinkClass}>
            Back to restaurant
          </Link>
        </div>
      </div>
    </div>
  );
}
