import type { APIRoute } from "astro";
import { LOCALES } from "../data/cv";
import { routes } from "../i18n/routes";

/**
 * Sitemap généré depuis la carte des routes plutôt que par `@astrojs/sitemap`.
 *
 * L'intégration apparie les langues par structure d'URL : elle relie
 * `/contact/` à `/en/contact/`, mais pas `/parcours/` à `/en/experience/`.
 * Avec des slugs traduits, six pages sur dix se retrouvaient sans alternative
 * de langue. Ici l'appariement vient de la même source que les `hreflang` des
 * pages, donc les deux ne peuvent pas diverger.
 */
export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error("`site` doit être défini dans astro.config.mjs");
  const abs = (path: string) => new URL(path, site).href;

  const urls = routes
    .flatMap((route) =>
      LOCALES.map((locale) => {
        const alternates = LOCALES.map(
          (other) =>
            `      <xhtml:link rel="alternate" hreflang="${other}" href="${abs(route.path[other])}"/>`,
        ).join("\n");
        return [
          "    <url>",
          `      <loc>${abs(route.path[locale])}</loc>`,
          alternates,
          "    </url>",
        ].join("\n");
      }),
    )
    .join("\n");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    urls,
    "  </urlset>",
  ].join("\n");

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
