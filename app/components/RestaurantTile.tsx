// A deterministic, no-photo "cover" for a restaurant card: a monogram
// over one of a few curated colors, chosen from the restaurant's slug.
// There are no real photos of these places to show, and stock or
// AI-generated photos of a restaurant that doesn't exist would be more
// misleading than an honest illustrated mark — so this is the actual
// visual identity, not a placeholder standing in for a missing photo.

const PALETTE = [
  '#8F6A14', // turmeric gold — the site's one interactive accent, reused here
  '#7A3B2E', // muted brick
  '#3F5D4E', // deep sage
  '#6B4226', // coffee brown
  '#4A5859', // slate teal
  '#8B5A2B', // amber brown
];

const STOPWORDS = new Set(['the', 'co', 'co.', 'and', '&', 'of']);

function monogramFor(name: string): string {
  const words = name
    .replace(/[.,]/g, '')
    .split(/\s+/)
    .filter((w) => w.length > 0 && !STOPWORDS.has(w.toLowerCase()));
  if (words.length === 0) return '?';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

export function RestaurantTile({ index, name }: { index: number; name: string }) {
  // Cycling by grid position (not a hash of the slug) guarantees no two
  // neighbouring cards ever land on the same color — a hash can collide
  // on an unlucky set of names, and three identical tiles in a row reads
  // as a bug, not a palette.
  const background = PALETTE[index % PALETTE.length];
  const monogram = monogramFor(name);
  return (
    <div
      className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-t-lg"
      style={{ background }}
      aria-hidden="true"
    >
      <span className="font-[family-name:var(--font-display)] text-5xl font-semibold text-[#faf7f2]/90">
        {monogram}
      </span>
    </div>
  );
}
