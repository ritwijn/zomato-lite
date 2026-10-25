'use client';

import { useEffect, useRef, useState } from 'react';
import { PopularStack } from '@/app/components/PopularStack';
import type { SpotlightRestaurant } from '@/app/lib/restaurants';

const AUTO_ADVANCE_MS = 5000;

// A single card that rotates through the top picks — auto-advancing
// on a timer, with dots and a next button for manual control. Paused
// on hover AND on focus (not just hover — a keyboard user can't
// hover), and the timer never starts at all under
// prefers-reduced-motion, since an auto-advancing carousel is a
// bigger, recurring motion than a one-off entrance and deserves the
// stronger accessibility response.
export function PopularCarousel({ picks }: { picks: SpotlightRestaurant[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const count = picks.length;

  useEffect(() => {
    if (paused || count <= 1) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [paused, count]);

  if (count === 0) return null;
  const current = picks[index];

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!containerRef.current?.contains(e.relatedTarget as Node)) setPaused(false);
      }}
    >
      {/* key={current.slug} forces a fresh mount per pick, so the
          card's own entrance animation (and its rating bars) replay
          on every rotation instead of only on first page load. */}
      <div key={current.slug}>
        <PopularStack restaurant={current} rank={index + 1} />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div role="tablist" aria-label="Popular picks" className="flex gap-1.5">
          {picks.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show ${p.name}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full outline-none transition-all duration-300 focus-visible:[box-shadow:0_0_0_2px_#0A0A0C,0_0_0_4px_#FFFFFF] ${
                i === index ? 'w-6 bg-white' : 'w-1.5 bg-stone-700 hover:bg-stone-600'
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setIndex((i) => (i + 1) % count)}
          aria-label="Show next popular pick"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone-800 text-white outline-none transition-colors hover:border-stone-700 focus-visible:[box-shadow:0_0_0_2px_#0A0A0C,0_0_0_4px_#FFFFFF]"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 4l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
