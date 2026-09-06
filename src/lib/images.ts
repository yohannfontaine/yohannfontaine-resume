import type { ImageMetadata } from "astro";

/**
 * Les images vivent dans `src/assets` pour passer par le pipeline Astro
 * (redimensionnement, formats modernes, dimensions intrinsèques) plutôt que
 * d'être servies brutes depuis `public`. Le badge CoderQuest pesait 771 kB.
 *
 * Les données ne référencent qu'une clé relative : une clé inconnue lève à la
 * compilation, elle ne produit pas une image cassée en production.
 */
const assets = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/**/*.{png,jpg,jpeg,webp,avif,svg}",
  { eager: true },
);

export function asset(key: string): ImageMetadata {
  const found = assets[`/src/assets/${key}`];
  if (!found) throw new Error(`Image introuvable dans src/assets : ${key}`);
  return found.default;
}
