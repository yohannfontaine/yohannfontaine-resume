import type { Localized } from "../data/cv";

/**
 * Libellés d'interface. Même contrainte que le contenu : le type impose les
 * deux langues.
 */
export const ui = {
  skipToContent: { fr: "Aller au contenu", en: "Skip to content" },
  mainNav: { fr: "Navigation principale", en: "Main navigation" },
  langNav: { fr: "Choix de la langue", en: "Language selection" },
  currentLang: { fr: "Langue actuelle", en: "Current language" },

  whatIDo: { fr: "Ce que je fais", en: "What I do" },
  values: { fr: "Mes valeurs", en: "My values" },
  experience: { fr: "Expérience", en: "Experience" },
  education: { fr: "Formation", en: "Education" },
  skills: { fr: "Compétences", en: "Skills" },
  knowledge: { fr: "Technologies", en: "Technologies" },
  certificates: { fr: "Certifications", en: "Certifications" },
  testimonials: { fr: "Témoignages", en: "Testimonials" },
  clients: { fr: "Ils m'ont fait confiance", en: "Companies I have worked with" },
  funFacts: { fr: "Trois chiffres inutiles", en: "Three useless numbers" },
  professional: { fr: "Professionnel", en: "Professional" },
  personal: { fr: "Personnel", en: "Personal" },

  location: { fr: "Où je suis", en: "Where I am" },
  elsewhere: { fr: "Ailleurs", en: "Elsewhere" },
  machineReadable: { fr: "Pour les machines", en: "For machines" },
  cvJsonLabel: {
    fr: "CV au format JSON Resume",
    en: "Résumé in JSON Resume format",
  },

  assistantTitle: {
    fr: "Ouvrir ce profil dans votre assistant",
    en: "Open this profile in your assistant",
  },
  assistantIntro: {
    fr: "Plutôt qu'un agent conversationnel de plus sur un site, le contexte part dans le vôtre.",
    en: "Rather than yet another chatbot on a website, the context goes into yours.",
  },
  assistantFallback: {
    fr: "Ou copier le texte à coller vous-même",
    en: "Or copy the text to paste yourself",
  },

  notFoundTitle: { fr: "Page introuvable", en: "Page not found" },
  backHome: { fr: "Retour à l'accueil", en: "Back to the home page" },

  translationNote: {
    fr: "Propos traduits de l'anglais.",
    en: "Translated from the original French.",
  },
} satisfies Record<string, Localized>;

export type UiKey = keyof typeof ui;
