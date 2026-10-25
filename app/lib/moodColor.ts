// The color a rating reads as — three real, honest tiers off the same
// averageRating already computed server-side, nothing fabricated.
// Returns Tailwind class names (not hex) to match how the rest of the
// dark theme is built — plain utility classes, not inline styles.
export function moodTextClass(rating: number): string {
  if (rating >= 4) return 'text-emerald-400';
  if (rating >= 3) return 'text-amber-500';
  return 'text-red-400';
}

export function moodBarClass(rating: number): string {
  if (rating >= 4) return 'bg-emerald-500';
  if (rating >= 3) return 'bg-amber-500';
  return 'bg-red-500';
}
