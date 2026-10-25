// One primary-button treatment, reused by every real call to action in
// the app (post a review, write a review, be the first to review) so
// "this is the thing to click" always looks the same. High-contrast
// charcoal rather than the accent color — amber is reserved strictly
// for star states in this palette.
export const primaryButtonClass =
  'inline-flex items-center justify-center rounded-md bg-[#1A1A1A] px-5 py-2.5 text-sm font-medium text-white outline-none transition-colors hover:bg-[#333333] focus-visible:[box-shadow:0_0_0_2px_#faf9f5,0_0_0_4px_#1A1A1A]';

export const primaryButtonDisabledClass =
  'inline-flex items-center justify-center rounded-md border border-[#E7E5E4] bg-transparent px-5 py-2.5 text-sm font-medium text-[#A8A29E] outline-none cursor-not-allowed';

export const secondaryLinkClass =
  'text-sm text-[#78716C] underline decoration-[#E7E5E4] underline-offset-2 outline-none transition-colors hover:text-[#1A1A1A] rounded-sm focus-visible:[box-shadow:0_0_0_2px_#faf9f5,0_0_0_4px_#1A1A1A]';
