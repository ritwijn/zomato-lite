'use client';

import { useEffect, useRef, useState } from 'react';
import { PopularStack } from '@/app/components/PopularStack';
import type { SpotlightRestaurant } from '@/app/lib/restaurants';

const AUTO_ADVANCE_MS = 5000;

// A single card that rotates through the top picks — auto-advancing
// on a timer. Controls (dots + previous/next) are overlaid directly on
// the card's image, not appended as their own row below the card —
// that row was what originally made the card's visible footprint vary
// (and, combined with a since-removed "more restaurants" cue in that
// same row, caused real bugs). Overlaying them keeps the card's total
// height fixed regardless of which pick is showing.
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

  const controlButtonClass =
    'pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#0A0A0C]/60 text-white outline-none backdrop-blur-sm transition-colors hover:bg-[#0A0A0C]/80 focus-visible:[box-shadow:0_0_0_2px_#0A0A0C,0_0_0_4px_#FFFFFF]';

  const overlay = (
    <>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-between p-2.5">
        <button
          type="button"
          onClick={() => setIndex((i) => (i - 1 + count) % count)}
          aria-label="Show previous popular pick"
          className={controlButtonClass}
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 4l-6 6 6 6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => setIndex((i) => (i + 1) % count)}
          aria-label="Show next popular pick"
          className={controlButtonClass}
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 4l6 6-6 6" />
          </svg>
        </button>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-2.5 flex justify-center">
        <div
          role="tablist"
          aria-label="Popular picks"
          className="pointer-events-auto flex items-center gap-1.5 rounded-full bg-[#0A0A0C]/60 px-2.5 py-1.5 backdrop-blur-sm"
        >
          {picks.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show ${p.name}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full outline-none transition-all duration-300 focus-visible:[box-shadow:0_0_0_2px_#0A0A0C,0_0_0_4px_#FFFFFF] ${
                i === index ? 'w-6 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );

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
        <PopularStack restaurant={current} rank={index + 1} overlay={overlay} />
      </div>
    </div>
  );
}
