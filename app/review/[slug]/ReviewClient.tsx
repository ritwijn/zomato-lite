'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { StarIcon } from '@/app/components/Stars';

type Restaurant = { name: string; cuisine: string; area: string } | null;

const linkClass =
  'text-sm text-[#6b625b] underline decoration-[#DCCFBE] underline-offset-2 outline-none transition-colors hover:text-[#171412] rounded-sm focus-visible:[box-shadow:0_0_0_2px_#faf7f2,0_0_0_4px_#8F6A14]';

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
    <div className="min-h-screen bg-[#faf7f2] text-[#171412]">
      <div className="mx-auto max-w-[560px] px-5 py-16">
        <div className="mb-12">
          <h1 className="font-[family-name:var(--font-display)] text-[32px] font-semibold leading-tight tracking-[-0.01em]">
            {restaurant ? restaurant.name : 'Loading...'}
          </h1>
          {restaurant && (
            <p className="mt-1.5 text-[13px] text-[#6b625b]">{restaurant.cuisine} · {restaurant.area}</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-9">
          <div>
            <div className="mb-3 text-sm font-medium">Your rating</div>
            <div className="flex gap-1.5" onMouseLeave={() => setHover(0)}>
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
                    className="h-9 w-9 rounded-sm outline-none transition-transform active:scale-95 focus-visible:[box-shadow:0_0_0_2px_#faf7f2,0_0_0_4px_#8F6A14]"
                  >
                    <StarIcon filled={filled} className={filled ? 'text-[#8F6A14]' : 'text-[#DCCFBE]'} />
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
              className="w-full rounded-lg border border-[#DCCFBE] bg-transparent px-3.5 py-3 text-[15px] leading-relaxed text-[#171412] outline-none placeholder:text-[#b5aca3] focus:border-[#8F6A14] focus-visible:[box-shadow:0_0_0_2px_#8F6A14]"
              rows={5}
            />
          </div>

          {error && (
            <div role="alert" className="text-sm text-[#9a3324]">{error}</div>
          )}

          <button
            type="submit"
            disabled={!canSubmit}
            className={`rounded-md px-5 py-2.5 text-sm font-medium outline-none transition-colors focus-visible:[box-shadow:0_0_0_2px_#faf7f2,0_0_0_4px_#8F6A14] ${
              canSubmit
                ? 'bg-[#8F6A14] text-white hover:bg-[#765909]'
                : 'cursor-not-allowed border border-[#DCCFBE] bg-transparent text-[#b5aca3]'
            }`}
          >
            {submitting ? 'Posting…' : 'Post review'}
          </button>
        </form>

        <div className="mt-12">
          <Link href={`/restaurant/${slug}`} className={linkClass}>
            Back to restaurant
          </Link>
        </div>
      </div>
    </div>
  );
}
