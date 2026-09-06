import {
  person,
  positions,
  education,
  skillGroups,
  knowledge,
  socialLinks,
  certificates,
  type Locale,
} from "../data/cv";
import { formatPeriod, yearsOfExperience } from "./dates";
import { routeById } from "../i18n/routes";

/**
 * Profil condensé, embarqué tel quel dans le prompt du bouton « assistant ».
 *
 * Il est volontairement autoportant : si l'assistant du visiteur n'a pas la
 * navigation web active, il répond quand même. Un lien seul aurait produit un
 * « je ne peux pas consulter cette page », c'est-à-dire pire que rien.
 */
export function condensedProfile(locale: Locale, siteUrl: string): string {
  const l = (fr: string, en: string) => (locale === "fr" ? fr : en);

  /**
   * Une entrée par ligne, sans exception : le profil est une liste à puces lue
   * par une machine, et un retour à la ligne au milieu d'un champ y produirait
   * une ligne orpheline sans puce.
   */
  const oneLine = (text: string) => text.replace(/\s+/g, " ").trim();

  const experience = positions
    .map(
      (p) =>
        `- ${formatPeriod(p, locale)} · ${p.company} · ${p.title[locale]} — ${oneLine(p.summary[locale])}`,
    )
    .join("\n");

  // Le détail du diplôme est facultatif : pas de tiret orphelin quand il manque.
  const studies = education
    .map((e) => {
      const detail = e.detail ? ` — ${oneLine(e.detail[locale])}` : "";
      return `- ${formatPeriod(e, locale)} · ${e.school} · ${e.degree[locale]}${detail}`;
    })
    .join("\n");

  const skills = skillGroups
    .map((g) => `${g.label[locale]} : ${g.skills.map((s) => s.name).join(", ")}`)
    .join("\n");

  const certs = certificates
    .map((c) => `- ${c.name} (${c.issuer}, ${c.date})`)
    .join("\n");

  const links = socialLinks.map((s) => `- ${s.label} : ${s.url}`).join("\n");

  return [
    l(
      `Voici le profil professionnel de ${person.name}, ${person.headlines[0].fr}, ${yearsOfExperience} ans d'expérience.`,
      `Here is the professional profile of ${person.name}, ${person.headlines[0].en}, ${yearsOfExperience} years of experience.`,
    ),
    "",
    l("## Parcours", "## Experience"),
    experience,
    "",
    l("## Formation", "## Education"),
    studies,
    "",
    l("## Compétences", "## Skills"),
    skills,
    l(`Technologies : ${knowledge.join(", ")}`, `Technologies: ${knowledge.join(", ")}`),
    "",
    l("## Certifications", "## Certifications"),
    certs,
    "",
    l("## Liens", "## Links"),
    links,
    `- ${l("Site", "Website")} : ${new URL(routeById("home").path[locale], siteUrl).href}`,
    "",
    l(
      "Réponds à mes questions sur ce profil en t'appuyant uniquement sur ces informations, et dis-le si la réponse ne s'y trouve pas.",
      "Answer my questions about this profile using only the information above, and say so when the answer is not in it.",
    ),
  ].join("\n");
}

/**
 * Assistants acceptant une question pré-remplie en paramètre d'URL.
 * À revalider périodiquement : ce sont des paramètres non contractuels.
 */
export const assistants = [
  { id: "claude", label: "Claude", base: "https://claude.ai/new?q=" },
  { id: "chatgpt", label: "ChatGPT", base: "https://chatgpt.com/?q=" },
] as const;

export function assistantUrl(base: string, prompt: string): string {
  return base + encodeURIComponent(prompt);
}
