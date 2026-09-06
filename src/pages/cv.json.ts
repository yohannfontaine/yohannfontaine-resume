import type { APIRoute } from "astro";
import { jsonResume } from "../lib/jsonresume";

export const GET: APIRoute = ({ site }) => {
  const body = JSON.stringify(jsonResume("fr", site!.href), null, 2);
  return new Response(body, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
};
