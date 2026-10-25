// One primary-button treatment, reused by every real call to action in
// the app (post a review, write a review, be the first to review) so
// "this is the thing to click" always looks the same.
export const primaryButtonClass =
  'inline-flex items-center justify-center rounded-md bg-[#8F6A14] px-5 py-2.5 text-sm font-medium text-white outline-none transition-colors hover:bg-[#765909] focus-visible:[box-shadow:0_0_0_2px_#faf7f2,0_0_0_4px_#8F6A14]';

export const primaryButtonDisabledClass =
  'inline-flex items-center justify-center rounded-md border border-[#DCCFBE] bg-transparent px-5 py-2.5 text-sm font-medium text-[#b5aca3] outline-none cursor-not-allowed';

export const secondaryLinkClass =
  'text-sm text-[#6b625b] underline decoration-[#DCCFBE] underline-offset-2 outline-none transition-colors hover:text-[#171412] rounded-sm focus-visible:[box-shadow:0_0_0_2px_#faf7f2,0_0_0_4px_#8F6A14]';
