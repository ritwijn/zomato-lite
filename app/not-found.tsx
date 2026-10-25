import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#171412]">
      <div className="mx-auto max-w-[560px] px-5 py-16">
        <p className="text-sm text-[#6b625b]">Restaurant not found.</p>
        <Link
          href="/"
          className="mt-4 inline-block text-sm text-[#6b625b] underline decoration-[#DCCFBE] underline-offset-2 outline-none transition-colors hover:text-[#171412] rounded-sm focus-visible:[box-shadow:0_0_0_2px_#faf7f2,0_0_0_4px_#8F6A14]"
        >
          Back to restaurants
        </Link>
      </div>
    </div>
  );
}
