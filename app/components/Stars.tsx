function StarIcon({ filled, className }: { filled: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={className}
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.4}
      strokeLinejoin="round"
    >
      <path d="M10 1.5l2.47 5.26 5.78.56-4.36 3.9 1.28 5.72L10 13.9l-5.17 3.04 1.28-5.72-4.36-3.9 5.78-.56L10 1.5z" />
    </svg>
  );
}

// Read-only row of stars for displaying a saved rating.
export function Stars({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' }) {
  const dimension = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4';
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <StarIcon
          key={n}
          filled={n <= rating}
          className={`${dimension} ${n <= rating ? 'text-[#D97706]' : 'text-[#E7E5E4]'}`}
        />
      ))}
    </div>
  );
}

export { StarIcon };
