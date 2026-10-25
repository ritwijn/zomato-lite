// Pastel panel background per cuisine, for the "Popular picks" stack's
// color-morph. These need to be clearly distinguishable at a glance —
// the first version was so close to the site's own off-white that the
// "morph" was real in code but invisible in practice. Still soft and
// desaturated (no neon, no saturated hues), but each one reads as its
// own color, not a barely-there tint.
const CUISINE_BG: Record<string, string> = {
  Indian: '#F7DFBD',
  'North Indian': '#F6D3C2',
  Chinese: '#D9E8D7',
  Italian: '#F6D3D3',
  'South Indian': '#F2DE9F',
  Cafe: '#E3D6C4',
  Continental: '#DCE4E8',
};

const FALLBACK = '#faf7f2';

export function bgForCuisine(cuisine: string): string {
  return CUISINE_BG[cuisine] ?? FALLBACK;
}
