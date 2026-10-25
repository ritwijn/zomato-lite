// One primary-button treatment, reused by every real call to action in
// the app (post a review, write a review, be the first to review) so
// "this is the thing to click" always looks the same. Inverted —
// off-white fill, near-black text — the high-contrast move on a dark
// canvas. Amber is reserved strictly for star states.
export const primaryButtonClass =
  'inline-flex items-center justify-center rounded-md bg-[#F2EFE9] px-5 py-2.5 text-sm font-medium text-[#141414] outline-none transition-colors hover:bg-[#D8D3C9] focus-visible:[box-shadow:0_0_0_2px_#141414,0_0_0_4px_#F2EFE9]';

export const primaryButtonDisabledClass =
  'inline-flex items-center justify-center rounded-md border border-[#2E2C29] bg-transparent px-5 py-2.5 text-sm font-medium text-[#5C5954] outline-none cursor-not-allowed';

export const secondaryLinkClass =
  'text-sm text-[#9B9690] underline decoration-[#2E2C29] underline-offset-2 outline-none transition-colors hover:text-[#F2EFE9] rounded-sm focus-visible:[box-shadow:0_0_0_2px_#141414,0_0_0_4px_#F2EFE9]';
