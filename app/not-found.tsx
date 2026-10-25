import Link from 'next/link';
import { secondaryLinkClass } from '@/app/components/buttonStyles';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#faf9f5] text-[#1a1a1a]">
      <div className="mx-auto max-w-[560px] px-5 py-16">
        <p className="text-sm text-[#78716C]">Restaurant not found.</p>
        <Link href="/" className={`mt-4 inline-block ${secondaryLinkClass}`}>
          Back to restaurants
        </Link>
      </div>
    </div>
  );
}
