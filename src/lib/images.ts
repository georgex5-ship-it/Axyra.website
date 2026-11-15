// Finds images placed in src/assets/ so Astro can convert them to modern formats
// (AVIF/WebP) and the right sizes automatically.
// Accepts "/src/assets/uploads/x.png" (admin panel uploads) or the short form
// "dr-assistant/x.png" (relative to src/assets/products/).
import type { ImageMetadata } from 'astro';
const all = import.meta.glob<{ default: ImageMetadata }>('/src/assets/**/*.{png,jpg,jpeg,webp,avif}', { eager: true });

export function productImage(rel?: string): ImageMetadata | undefined {
  if (!rel || typeof rel !== 'string' || rel.includes('[[EDIT')) return undefined;
  let key = rel.trim();
  if (key.startsWith('src/')) key = `/${key}`;
  else if (!key.startsWith('/')) key = `/src/assets/products/${key}`;
  const hit = all[key];
  if (!hit) console.warn(`⚠ Image not found: ${key}`);
  return hit?.default;
}

/** True if the value looks like an image path rather than a short image key. */
export const isImagePath = (v?: string) => !!v && /[/.]/.test(v);
