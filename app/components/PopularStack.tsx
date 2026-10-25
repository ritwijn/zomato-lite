'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { imageForCuisine } from '@/app/lib/cuisineImages';
import { bgForCuisine } from '@/app/lib/cuisineBg';
import { moodColorForRating } from '@/app/lib/moodColor';
import type { RestaurantSummary } from '@/app/lib/restaurants';

// A stack you flip through, one card at a time — the tile/carpet-store
// sample-swatch browsing pattern, not a sliding carousel. The small
// shadow here is doing real representational work (these are meant to
// read as physical objects stacked slightly apart, the way real
// swatches do) rather than decorating a flat card, which is the one
// place this app uses one on purpose.
//
// The panel itself morphs to a pastel tied to the active card's
// cuisine — a solid-color crossfade (transition-colors), never a
// gradient — so flipping to the next pick reads as a single coherent
// shift, not just the card changing in place.
//
// Deliberately capped at max-w-3xl rather than stretching to the page's
// full width: a 380px card and a few lines of text have no business
// filling a 1300px container, and forcing them to just leaves a huge
// empty field of color, which reads as unfinished, not generous.
export function PopularStack({ items }: { items: RestaurantSummary[] }) {
  const [active, setActive] = useState(0);
  const count = items.length;

  if (count === 0) return null;

  const current = items[active];

  return (
    <section
      className="max-w-3xl rounded-xl px-6 py-8 transition-colors duration-700 ease-in-out sm:px-10 sm:py-10"
      style={{ backgroundColor: bgForCuisine(current.cuisine) }}
    >
      <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-center sm:gap-12">
        <div className="relative h-[460px] w-full max-w-[380px] shrink-0">
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
                  transform: `translate(${capped * 10}px, ${capped * -10}px) rotate(${capped === 0 ? 0 : lean * (3 + capped)}deg)`,
                  zIndex: count - depth,
                  opacity: depth > 2 ? 0 : 1,
                  pointerEvents: isFront ? 'auto' : 'none',
                  boxShadow: isFront
                    ? '0 14px 30px -10px rgba(23,18,13,0.24)'
                    : '0 4px 10px -2px rgba(23,18,13,0.14)',
                  transition: 'transform 0.7s ease-in-out, box-shadow 0.7s ease-in-out, opacity 0.5s ease-in-out',
                }}
              >
                <div className="relative h-[330px] w-full bg-[#DCCFBE]">
                  <Image
                    src={imageForCuisine(item.cuisine)}
                    alt={`${item.cuisine} food at ${item.name}`}
                    fill
                    sizes="380px"
                    priority={isFront}
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center px-5">
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold leading-snug tracking-[-0.005em]">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-[13px] text-[#6b625b]">{item.cuisine} · {item.area}</p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="flex w-full flex-col items-center text-center sm:items-start sm:text-left">
          <p className="text-[13px] text-[#6b625b]">Popular picks · {active + 1} of {count}</p>

          <div className="mt-3 flex items-baseline gap-3">
            <span
              className="font-[family-name:var(--font-display)] lining-nums text-7xl font-semibold leading-none tracking-tight"
              style={{ color: moodColorForRating(current.averageRating!) }}
            >
              {current.averageRating!.toFixed(1)}
            </span>
            <span className="text-sm text-[#6b625b]">
              {current.totalReviews} {current.totalReviews === 1 ? 'review' : 'reviews'}
            </span>
          </div>

          <p className="mt-4 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-[-0.01em]">
            {current.name}
          </p>
          <p className="mt-1 text-[15px] text-[#6b625b]">{current.cuisine} · {current.area}</p>

          <button
            type="button"
            onClick={() => setActive((a) => (a + 1) % count)}
            className="mt-8 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#DCCFBE] text-[#171412] outline-none transition-colors hover:border-[#8F6A14] focus-visible:[box-shadow:0_0_0_2px_#faf7f2,0_0_0_4px_#8F6A14]"
            aria-label="Show next restaurant"
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 4l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
