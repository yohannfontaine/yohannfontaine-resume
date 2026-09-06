import type { APIRoute, GetStaticPaths } from "astro";
import { figureFor, figureSpecs, type FigureId } from "../../lib/figures";

/**
 * Les figures sont servies en fichiers `.svg` plutôt qu'insérées dans le HTML.
 *
 * Elles sont alors mises en cache par le navigateur, partagées entre les pages,
 * et compressées par l'hébergeur. L'animation vit à l'intérieur du SVG : elle
 * fonctionne donc dans une balise `img`, sans que la page n'ait à la piloter.
 *
 * Pas de `Cache-Control: immutable` : ces URLs ne portent pas d'empreinte de
 * contenu, donc une figure modifiée resterait périmée dans les navigateurs.
 * Les en-têtes des fichiers statiques sont de toute façon la responsabilité de
 * l'hébergeur, pas de cette route.
 */
export const getStaticPaths: GetStaticPaths = () =>
  Object.keys(figureSpecs).map((id) => ({ params: { id } }));

export const GET: APIRoute = ({ params }) => {
  const id = params.id as FigureId;
  if (!(id in figureSpecs)) return new Response("Not found", { status: 404 });

  return new Response(figureFor(id).svg, {
    headers: { "Content-Type": "image/svg+xml; charset=utf-8" },
  });
};
