import type { APIRoute } from "astro";
import { person, positions, LOCALES } from "../data/cv";
import { routes } from "../i18n/routes";
import { yearsOfExperience, buildDate } from "../lib/dates";

/**
 * Coûte dix minutes, sans grande attente en retour : l'adoption de `llms.txt`
 * par les crawlers majeurs n'est pas démontrée. Ce qui porte réellement, ce
 * sont les vraies URLs, le HTML sémantique et le JSON-LD.
 */
export const GET: APIRoute = ({ site }) => {
  const abs = (path: string) => new URL(path, site).href;
  const current = positions.find((p) => p.end === null);

  const body = [
    `# ${person.name}`,
    "",
    `> ${person.headlines[0].en}, ${yearsOfExperience} years of experience${
      current ? `, currently ${current.title.en} at ${current.company}` : ""
    }. Site available in French (default) and English.`,
    "",
    "## Pages",
    ...LOCALES.flatMap((locale) =>
      routes.map(
        (route) =>
          `- [${route.label[locale]} (${locale})](${abs(route.path[locale])})`,
      ),
    ),
    "",
    "## Structured data",
    `- [Résumé, JSON Resume schema, French](${abs("/cv.json")})`,
    `- [Résumé, JSON Resume schema, English](${abs("/en/cv.json")})`,
    `- [Sitemap](${abs("/sitemap.xml")})`,
    "",
    `Last built: ${buildDate}`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
