import Image from 'next/image';
import { imageForCuisine } from '@/app/lib/cuisineImages';

// The grid-card cover: a real photo of the cuisine (not a photo of the
// specific restaurant — these are fictional seed restaurants, so there
// is no real photo of "Ludhiana Burrito" to show, and a cuisine-accurate
// photo is more honest than inventing one).
export function RestaurantTile({ name, cuisine }: { name: string; cuisine: string }) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-lg bg-[#DCCFBE]">
      <Image
        src={imageForCuisine(cuisine)}
        alt={`${cuisine} food at ${name}`}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover"
      />
    </div>
  );
}
