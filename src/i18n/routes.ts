import { LOCALES, DEFAULT_LOCALE, type Locale, type Localized } from "../data/cv";

export interface RouteDef {
  id: string;
  /** Chemin absolu par langue, slug traduit compris. */
  path: Record<Locale, string>;
  label: Localized;
}

/**
 * Carte des routes. Source unique pour la navigation, les `hreflang` et le
 * sélecteur de langue : impossible d'ajouter une page dans une seule langue
 * sans que le type ne le signale.
 */
export const routes: RouteDef[] = [
  {
    id: "home",
    path: { fr: "/", en: "/en/" },
    label: { fr: "Accueil", en: "Home" },
  },
  {
    id: "about",
    path: { fr: "/a-propos/", en: "/en/about/" },
    label: { fr: "À propos", en: "About" },
  },
  {
    id: "experience",
    path: { fr: "/parcours/", en: "/en/experience/" },
    label: { fr: "Parcours", en: "Experience" },
  },
  {
    id: "projects",
    path: { fr: "/projets/", en: "/en/projects/" },
    label: { fr: "Projets", en: "Projects" },
  },
  {
    id: "contact",
    path: { fr: "/contact/", en: "/en/contact/" },
    label: { fr: "Contact", en: "Contact" },
  },
];

export function routeById(id: string): RouteDef {
  const route = routes.find((r) => r.id === id);
  if (!route) throw new Error(`Route inconnue : ${id}`);
  return route;
}

/** Nom de la langue dans sa propre langue, pour le sélecteur. */
export const localeNames: Record<Locale, string> = {
  fr: "Français",
  en: "English",
};

export { LOCALES, DEFAULT_LOCALE };
export type { Locale };
