// Used only in the homepage hero. A plain CSS keyframe staggered per
// star — no client JS needed for a one-time, on-load animation — so
// this stays a Server Component like the rest of the page.
export function HeroStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          viewBox="0 0 20 20"
          className="h-5 w-5"
          fill={n <= rating ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth={n <= rating ? 0 : 1.4}
          strokeLinejoin="round"
          style={{
            color: n <= rating ? '#8F6A14' : '#DCCFBE',
            animation: 'hero-star-in 0.35s ease-out backwards',
            animationDelay: `${n * 110}ms`,
          }}
        >
          <path d="M10 1.5l2.47 5.26 5.78.56-4.36 3.9 1.28 5.72L10 13.9l-5.17 3.04 1.28-5.72-4.36-3.9 5.78-.56L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}
