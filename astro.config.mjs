// @ts-check
import { defineConfig } from "astro/config";

// `outDir` reste `out` pour que `firebase.json` ("public": "out") et les deux
// workflows GitHub Actions (`yarn build`) fonctionnent sans modification.
//
// Pas d'intégration sitemap : elle apparie les langues par structure d'URL et
// ne sait donc pas relier des slugs traduits. Le sitemap est généré dans
// `src/pages/sitemap.xml.ts`, depuis la même carte de routes que les hreflang.
export default defineConfig({
  site: "https://yohannfontaine-resume.web.app",
  outDir: "./out",
  i18n: {
    defaultLocale: "fr",
    locales: ["fr", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
