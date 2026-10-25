'use client';

import { useState } from 'react';
import Link from 'next/link';
import { RestaurantRow } from '@/app/components/RestaurantRow';
import type { RestaurantSummary } from '@/app/lib/restaurants';

const PAGE_SIZE = 6;

// Renders restaurants in pages instead of all at once. At today's
// scale (a handful of seed restaurants) this never actually triggers
// "Show more" — there's nothing to hide yet. It exists so the page
// doesn't unconditionally render hundreds of full cards into the DOM
// the day this list actually grows; the "{N} more restaurants below"
// cue above stays accurate either way, since it describes the real
// total, not what's currently rendered.
export function RestaurantList({ restaurants }: { restaurants: RestaurantSummary[] }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visible = restaurants.slice(0, visibleCount);
  const remaining = restaurants.length - visible.length;

  return (
    <div>
      <div className="space-y-3">
        {visible.map((restaurant) => (
          <Link
            key={restaurant.slug}
            href={`/restaurant/${restaurant.slug}`}
            className="group block rounded-xl outline-none focus-visible:[box-shadow:0_0_0_2px_#0A0A0C,0_0_0_4px_#FFFFFF]"
          >
            <RestaurantRow restaurant={restaurant} />
          </Link>
        ))}
      </div>

      {remaining > 0 && (
        <button
          type="button"
          onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
          className="mt-4 w-full rounded-xl border border-stone-800/80 py-3 text-sm font-medium text-stone-300 outline-none transition-colors hover:border-stone-700 hover:text-white focus-visible:[box-shadow:0_0_0_2px_#0A0A0C,0_0_0_4px_#FFFFFF]"
        >
          Show {Math.min(remaining, PAGE_SIZE)} more
        </button>
      )}
    </div>
  );
}
