/**
 * Une figure par page, toutes issues du même générateur.
 *
 * Ce qui fait la famille, ce n'est pas un style commun appliqué à cinq dessins
 * différents : c'est un seul algorithme dont on déplace le point de rencontre.
 * La page « à propos » penche vers le vivant, « projets » vers la machine,
 * l'accueil est à l'équilibre. La cohérence est structurelle, pas cosmétique.
 */
import { generateFigure, type Figure, type FigureOptions } from "./venation";

export interface FigureSpec extends FigureOptions {
  /** Ce que la figure raconte, affiché en légende sur la page système. */
  caption: string;
}

export const figureSpecs = {
  home: {
    seed: 20260903,
    width: 1600,
    height: 720,
    balance: 0.5,
    density: 0.7,
    fit: "slice",
    caption: "équilibre — le contact est au centre",
  },
  about: {
    seed: 7717,
    width: 1600,
    height: 560,
    balance: 0.32,
    density: 0.75,
    caption: "penche vers le vivant — la machine vient à la rencontre",
  },
  experience: {
    seed: 31415,
    width: 1600,
    height: 560,
    balance: 0.44,
    density: 0.62,
    caption: "presque à l'équilibre, densité plus faible — une trame de fond",
  },
  projects: {
    seed: 4242,
    width: 1600,
    height: 560,
    balance: 0.68,
    density: 0.75,
    caption: "penche vers la machine — le vivant s'y accroche",
  },
  contact: {
    seed: 9091,
    width: 1600,
    height: 420,
    balance: 0.5,
    density: 0.4,
    caption: "épuré — deux structures, quelques points de contact",
  },
} as const satisfies Record<string, FigureSpec>;

export type FigureId = keyof typeof figureSpecs;

/** Générée au build. Déterministe : même graine, même dessin. */
export function figureFor(id: FigureId): Figure {
  const { caption: _caption, ...options } = figureSpecs[id];
  return generateFigure(options);
}
