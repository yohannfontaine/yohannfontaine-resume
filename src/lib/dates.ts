import { positions, type Locale, type Period } from "../data/cv";

/**
 * Tout ce qui se périme se calcule au build. Un CV est faux dès sa publication
 * quand les durées sont écrites en dur : l'âge affiché par l'ancien site avait
 * dû être corrigé à la main.
 */
export const currentYear = new Date().getFullYear();

/** Depuis le premier poste. Se met à jour tout seul au 1er janvier. */
export const yearsOfExperience =
  currentYear - Math.min(...positions.map((p) => Number(p.start)));

/** Date du build, pour `dateModified`. */
export const buildDate = new Date().toISOString().slice(0, 10);

const ONGOING: Record<Locale, string> = {
  fr: "aujourd'hui",
  en: "present",
};

/**
 * La source n'a qu'une précision à l'année : on affiche la période telle
 * quelle plutôt que de fabriquer une durée en mois qu'on ne connaît pas.
 */
export function formatPeriod(period: Period, locale: Locale): string {
  if (period.end === null) return `${period.start} → ${ONGOING[locale]}`;
  if (period.end === period.start) return period.start;
  return `${period.start} – ${period.end}`;
}

/** Remplace les jetons `{years}` par la valeur calculée. */
export function interpolate(text: string): string {
  return text.replace("{years}", String(yearsOfExperience));
}
