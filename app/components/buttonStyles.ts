// One primary-button treatment, reused by every real call to action in
// the app (post a review, write a review, be the first to review) so
// "this is the thing to click" always looks the same. White fill on
// obsidian — the high-contrast move. Emerald and amber are both
// reserved for their own specific jobs (live/top-rated signals, star
// states) and never used for buttons, to keep those meanings clear.
export const primaryButtonClass =
  'inline-flex items-center justify-center rounded-md bg-white px-5 py-2.5 text-sm font-medium text-[#0A0A0C] outline-none transition-colors hover:bg-stone-200 focus-visible:[box-shadow:0_0_0_2px_#0A0A0C,0_0_0_4px_#FFFFFF]';

export const primaryButtonDisabledClass =
  'inline-flex items-center justify-center rounded-md border border-stone-800 bg-transparent px-5 py-2.5 text-sm font-medium text-stone-600 outline-none cursor-not-allowed';

export const secondaryLinkClass =
  'text-sm text-stone-400 underline decoration-stone-800 underline-offset-2 outline-none transition-colors hover:text-white rounded-sm focus-visible:[box-shadow:0_0_0_2px_#0A0A0C,0_0_0_4px_#FFFFFF]';
