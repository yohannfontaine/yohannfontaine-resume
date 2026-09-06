import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  // `/proto/` héberge les maquettes de direction visuelle : hors du site, hors
  // du sitemap, et explicitement hors index tant qu'elles existent.
  const body = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /proto/",
    "",
    `Sitemap: ${new URL("/sitemap.xml", site).href}`,
    "",
  ].join("\n");
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
