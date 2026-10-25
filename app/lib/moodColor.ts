// The color an average rating reads as — applied only to aggregate
// scores (the big number, the grid card's rating), never to an
// individual review's stars, which are one person's opinion, not a
// verdict. Three muted, quiet tones in the same family as the rest of
// the palette — no neon, nothing that would read as a status light.
export function moodColorForRating(rating: number): string {
  if (rating >= 4) return '#4B6B4F'; // muted sage — clearly good
  if (rating >= 3) return '#8F6A14'; // turmeric — the site's accent, a solid score
  return '#8B4030'; // muted brick — a real warning, still quiet
}
