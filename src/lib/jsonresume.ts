import {
  certificates,
  education,
  knowledge,
  person,
  positions,
  skillGroups,
  socialLinks,
  about,
  type Locale,
} from "../data/cv";
import { buildDate, interpolate } from "./dates";
import { routeById } from "../i18n/routes";

/**
 * CV au schéma JSON Resume (https://jsonresume.org/schema).
 *
 * Les dates sont à l'année parce que la source l'est : mieux vaut une
 * précision honnête qu'un mois inventé pour satisfaire un validateur.
 */
export function jsonResume(locale: Locale, siteUrl: string) {
  return {
    $schema:
      "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
    basics: {
      name: person.name,
      label: person.headlines[0][locale],
      url: new URL(routeById("home").path[locale], siteUrl).href,
      summary: interpolate(about.paragraphs[0][locale]),
      location: {
        city: person.city,
        countryCode: "FR",
      },
      profiles: socialLinks.map((link) => ({
        network: link.label,
        url: link.url,
      })),
    },
    work: positions.map((p) => ({
      name: p.company,
      position: p.title[locale],
      startDate: p.start,
      ...(p.end ? { endDate: p.end } : {}),
      summary: p.summary[locale],
    })),
    education: education.map((e) => ({
      institution: e.school,
      studyType: e.degree[locale],
      startDate: e.start,
      endDate: e.end ?? undefined,
    })),
    skills: [
      ...skillGroups.map((group) => ({
        name: group.label[locale],
        keywords: group.skills.map((s) => s.name),
      })),
      {
        name: locale === "fr" ? "Technologies" : "Technologies",
        keywords: knowledge,
      },
    ],
    certificates: certificates.map((c) => ({
      name: c.name,
      date: c.date,
      issuer: c.issuer,
      url: c.badgeUrl,
    })),
    meta: {
      version: "v1.0.0",
      lastModified: buildDate,
      language: locale,
    },
  };
}
