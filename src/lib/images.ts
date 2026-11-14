// Finds product images placed in src/assets/products/<slug>/ so Astro can
// convert them to modern formats (AVIF/WebP) and the right sizes automatically.
import type { ImageMetadata } from 'astro';
const all = import.meta.glob<{ default: ImageMetadata }>('/src/assets/**/*.{png,jpg,jpeg,webp,avif}', { eager: true });

export function productImage(rel?: string): ImageMetadata | undefined {
  if (!rel) return undefined;
  const hit = all[`/src/assets/products/${rel}`];
  if (!hit) console.warn(`⚠ Image not found: src/assets/products/${rel}`);
  return hit?.default;
}
