/**
 * Prototypes de direction visuelle — code jetable, isolé sous `proto/`.
 *
 * Tout ce qui a l'air aléatoire dans les maquettes est en réalité déterministe :
 * une graine dérivée du contenu du CV, et un générateur pseudo-aléatoire à état
 * explicite. Deux builds successifs produisent le même dessin ; changer une
 * mission change la graine, donc le dessin.
 */

/** FNV-1a 32 bits. Suffisant pour une graine, jamais pour autre chose. */
export function hashSeed(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** mulberry32 : petit, rapide, reproductible d'une exécution à l'autre. */
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Arrondi court : le SVG inline pèse la moitié sans différence visible. */
export function r1(n: number): number {
  return Math.round(n * 10) / 10;
}
