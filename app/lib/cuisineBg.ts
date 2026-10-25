// Pastel panel background per cuisine, for the "Popular picks" stack's
// color-morph. Deliberately a tight, desaturated family close to the
// site's own off-white (#faf7f2) — a perceptible shift as you flip
// through, not a jump to a saturated color unrelated to the rest of
// the page.
const CUISINE_BG: Record<string, string> = {
  Indian: '#FAF1E4',
  'North Indian': '#FBEDE6',
  Chinese: '#F1F5F0',
  Italian: '#FDF1F1',
  'South Indian': '#FAF3E2',
  Cafe: '#F3EEE8',
  Continental: '#F4F1EC',
};

const FALLBACK = '#faf7f2';

export function bgForCuisine(cuisine: string): string {
  return CUISINE_BG[cuisine] ?? FALLBACK;
}
