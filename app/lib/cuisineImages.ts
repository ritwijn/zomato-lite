// One real, freely-licensed photo per cuisine (Wikimedia Commons — stable
// URLs, no API key, no licensing ambiguity for a portfolio project). Every
// URL below was fetched and confirmed to return a real image/jpeg before
// being used here, not guessed.
//
// Keyed by cuisine string from the restaurants table, with a neutral
// fallback for any cuisine not in this list.

const BASE = 'https://thumb.wikimedia.org/wikipedia/commons/thumb';

export const CUISINE_IMAGES: Record<string, string> = {
  Indian: `${BASE}/4/41/Butter_Chicken_%26_Butter_Naan_-_Home_-_Chandigarh_-_India_-_0006.jpg/1280px-Butter_Chicken_%26_Butter_Naan_-_Home_-_Chandigarh_-_India_-_0006.jpg`,
  'North Indian': `${BASE}/5/5e/Butter_Chicken_with_Naan.JPG/1280px-Butter_Chicken_with_Naan.JPG`,
  Chinese: `${BASE}/d/d9/Chow_Mein_with_pork_-_Unithai_2025-07-30.jpg/1280px-Chow_Mein_with_pork_-_Unithai_2025-07-30.jpg`,
  Italian: `${BASE}/d/d3/Supreme_pizza.jpg/1280px-Supreme_pizza.jpg`,
  'South Indian': `${BASE}/2/2e/Masala_Dosa_in_Banana_Leaf_with_Chutney.jpg/1280px-Masala_Dosa_in_Banana_Leaf_with_Chutney.jpg`,
  Cafe: `${BASE}/0/06/Latte_art.jpg/1280px-Latte_art.jpg`,
  Continental: `${BASE}/3/3a/Continental_Breakfast.jpg/1280px-Continental_Breakfast.jpg`,
};

const FALLBACK = CUISINE_IMAGES.Indian;

export function imageForCuisine(cuisine: string): string {
  return CUISINE_IMAGES[cuisine] ?? FALLBACK;
}
