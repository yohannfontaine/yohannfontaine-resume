# yohannfontaine-resume

Yohann Fontaine's résumé site — [yohannfontaine-resume.web.app](https://yohannfontaine-resume.web.app)

Bilingual (French / English) static site, built with [Astro](https://astro.build) and deployed on Firebase Hosting.

## Getting started

Node 18.20.8, 20.3, or 22 and above.

```bash
yarn install
yarn dev      # dev server
yarn build    # astro check, then static build to out/
yarn preview  # serve the local build
```

`yarn build` runs `astro check` (type checking), then the static compilation to `out/`.

## Where the content lives

All résumé content lives in **`src/data/cv.ts`**, never in markup. Experience, education, skills, certificates, projects, testimonials, and links are all typed there.

Every translatable string is a `Record<Locale, string>`: a missing translation raises a compile error. Neutral fields — dates, company names, technologies, URLs — stay outside the translation system.

Anything that ages is computed at build time: years of experience are derived from the first position, ongoing periods show "present", and `dateModified` follows the compilation date.

```
src/
  data/cv.ts         content, typed and bilingual
  i18n/routes.ts     route map, single source for navigation,
                     the language switcher, hreflang tags, and the sitemap
  i18n/ui.ts         interface labels
  lib/               computed dates, image resolution, generated figures,
                     JSON Resume, condensed profile
  components/        display components
  components/pages/  page bodies, parameterised by language
  pages/             routes and endpoints
  pages/figures/     SVG endpoint for the generated banners
  styles/            design tokens (global.css) and theme (symbiose.css)
```

Each page's body is a component that takes the locale as a prop: the markup exists only once for both versions.

## Routes

French sits at the root, English under `/en/`, with translated slugs.

| French       | English           |
| ------------ | ----------------- |
| `/`          | `/en/`            |
| `/a-propos/` | `/en/about/`      |
| `/parcours/` | `/en/experience/` |
| `/projets/`  | `/en/projects/`   |
| `/contact/`  | `/en/contact/`    |

## Machine-readable resources

| Resource                    | Content                                                   |
| --------------------------- | --------------------------------------------------------- |
| `/cv.json` and `/en/cv.json`| Résumé in [JSON Resume](https://jsonresume.org/schema) schema |
| `/llms.txt`                 | Index of pages and structured data                        |
| `/sitemap.xml`               | Sitemap generated from `src/i18n/routes.ts`, with language pairing |

Every page carries a `Person` JSON-LD block, reciprocal `hreflang` tags, and a canonical URL.

## Deployment

Firebase Hosting, via GitHub Actions. A push to `main` deploys to production; a pull request generates a preview. The build outputs to `out/`, served as-is by `firebase.json`.

## Licence

[MIT](LICENSE). The code is reusable; the résumé content, images, and logos are not.
