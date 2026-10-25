'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { imageForCuisine } from '@/app/lib/cuisineImages';
import { moodColorForRating } from '@/app/lib/moodColor';
import type { RestaurantSummary } from '@/app/lib/restaurants';

// A stack you flip through, one card at a time — the tile/carpet-store
// sample-swatch browsing pattern, not a sliding carousel. The small
// shadow here is doing real representational work (these are meant to
// read as physical objects stacked slightly apart, the way real
// swatches do) rather than decorating a flat card, which is the one
// place this app uses one on purpose.
export function PopularStack({ items }: { items: RestaurantSummary[] }) {
  const [active, setActive] = useState(0);
  const count = items.length;

  if (count === 0) return null;

  return (
    <div className="flex flex-col items-center sm:items-start sm:flex-row sm:gap-10">
      <div className="relative h-[400px] w-full max-w-[300px]">
        {items.map((item, i) => {
          const depth = (i - active + count) % count;
          const isFront = depth === 0;
          const lean = i % 2 === 0 ? 1 : -1;
          const capped = Math.min(depth, 2);

          return (
            <Link
              key={item.slug}
              href={`/restaurant/${item.slug}`}
              aria-hidden={!isFront}
              tabIndex={isFront ? 0 : -1}
              className="absolute inset-0 flex flex-col overflow-hidden rounded-lg border border-[#DCCFBE] bg-[#faf7f2] outline-none focus-visible:[box-shadow:0_0_0_2px_#faf7f2,0_0_0_4px_#8F6A14]"
              style={{
                transform: `translate(${capped * 9}px, ${capped * -9}px) rotate(${capped === 0 ? 0 : lean * (3 + capped)}deg)`,
                zIndex: count - depth,
                opacity: depth > 2 ? 0 : 1,
                pointerEvents: isFront ? 'auto' : 'none',
                boxShadow: isFront
                  ? '0 10px 24px -8px rgba(23,18,13,0.22)'
                  : '0 3px 8px -2px rgba(23,18,13,0.14)',
                transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease, opacity 0.3s ease',
              }}
            >
              <div className="relative h-[280px] w-full bg-[#DCCFBE]">
                <Image
                  src={imageForCuisine(item.cuisine)}
                  alt={`${item.cuisine} food at ${item.name}`}
                  fill
                  sizes="300px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-center px-4">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold leading-snug tracking-[-0.005em]">
                  {item.name}
                </h3>
                <p className="mt-0.5 text-[13px] text-[#6b625b]">{item.cuisine} · {item.area}</p>
                <p className="mt-1.5 text-[13px]">
                  <span className="font-medium" style={{ color: moodColorForRating(item.averageRating!) }}>
                    {item.averageRating!.toFixed(1)}
                  </span>
                  <span className="text-[#6b625b]"> · {item.totalReviews} {item.totalReviews === 1 ? 'review' : 'reviews'}</span>
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-6 flex items-center gap-4 sm:mt-0 sm:flex-col sm:items-start sm:justify-center">
        <div>
          <p className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-[-0.01em]">Popular picks</p>
          <p className="mt-1 text-[13px] text-[#6b625b]">{active + 1} of {count}</p>
        </div>
        <button
          type="button"
          onClick={() => setActive((a) => (a + 1) % count)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#DCCFBE] text-[#171412] outline-none transition-colors hover:border-[#8F6A14] focus-visible:[box-shadow:0_0_0_2px_#faf7f2,0_0_0_4px_#8F6A14]"
          aria-label="Show next restaurant"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 4l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
