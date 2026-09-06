/**
 * Source unique du contenu du CV.
 *
 * Le type `Localized` impose les deux langues : une traduction manquante est une
 * erreur de compilation, pas un trou qui passe en production. C'est ce qui rend
 * tenable la règle « les deux langues dans le même commit ».
 *
 * Les champs neutres (dates, noms d'entreprise, technologies, URLs) restent hors
 * de `Localized` : ils ne se traduisent pas.
 */

export const LOCALES = ["fr", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "fr";

/** Chaîne obligatoirement fournie dans chaque langue. */
export type Localized = Record<Locale, string>;

/** Année seule : la source d'origine n'a jamais eu de précision au mois. */
export type Year = `${number}`;

export interface Period {
  start: Year;
  /** `null` = poste toujours en cours, la durée se calcule au build. */
  end: Year | null;
}

export interface Person {
  name: string;
  headlines: Localized[];
  /**
   * Date de naissance ISO, pour calculer l'âge au build plutôt que de le figer.
   * `null` tant qu'elle n'est pas renseignée : l'âge est simplement omis.
   */
  birthDate: string | null;
  residence: Localized;
  city: string;
  photo: string;
  mapUrl: string;
}

export interface AboutContent {
  paragraphs: Localized[];
  values: Localized[];
}

export interface Service {
  id: string;
  title: Localized;
  description: Localized;
}

export interface Position extends Period {
  id: string;
  company: string;
  title: Localized;
  summary: Localized;
}

export interface Education extends Period {
  id: string;
  school: string;
  degree: Localized;
  detail: Localized | null;
}

export interface SkillGroup {
  id: string;
  label: Localized;
  skills: { name: string; level: number }[];
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  /** ISO, précision au jour ou au mois selon la source. */
  date: string;
  badgeUrl: string;
  image: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: Localized;
  /** Traduction d'un propos tenu en français : à signaler comme telle côté EN. */
  quote: Localized;
}

export interface Client {
  id: string;
  name: string;
  logo: string;
}

export interface FunFact {
  id: string;
  label: Localized;
  value: number;
}

export type ProjectCategory = "pro" | "perso";

export interface Project {
  id: string;
  name: string;
  category: ProjectCategory;
  url: string;
  image: string;
  alt: Localized;
  /** Le rôle tenu, en une phrase. Pas le pitch du produit. */
  summary: Localized;
  /** Trois maximum : au-delà, ce n'est plus une signature mais un inventaire. */
  tech: TechTag[];
  /** Chiffre vérifiable quand il existe, `null` sinon. */
  metric: Localized | null;
  /** Année de la capture : une vignette de 2023 ne prétend pas montrer 2026. */
  captured: Year;
}

export interface SocialLink {
  id: string;
  label: string;
  url: string;
}

export const person: Person = {
  name: "Yohann Fontaine",
  headlines: [
    { fr: "Lead Software Engineer", en: "Lead Software Engineer" },
    { fr: "Architecte", en: "Architect" },
  ],
  birthDate: null,
  residence: { fr: "France", en: "France" },
  city: "Calaisfornia",
  photo: "main_photo.png",
  mapUrl: "https://maps.app.goo.gl/vWwxb9dVwEP43UENA",
};

export const about: AboutContent = {
  paragraphs: [
    {
      fr: "Lead Software Engineer avec plus de {years} ans d'expérience, je suis passionné et engagé pour accompagner mes clients dans leur transformation digitale et travailler avec eux pour créer des solutions numériques à la fois innovantes, performantes et respectueuses de l'environnement. Adepte du principe de Pareto et de l'approche « as a service », je suis convaincu que les bonnes actions ciblées permettent de générer le plus de valeur métier tout en optimisant le ROI.",
      en: 'A Lead Software Engineer with more than {years} years of experience, I am committed to guiding clients through their digital transformation and to building software that is innovative, performant and environmentally responsible. A believer in the Pareto principle and in the "as a service" approach, I am convinced that a few well-targeted actions generate the most business value while optimising return on investment.',
    },
    {
      fr: "Les valeurs principales que j'essaie de transmettre sur le terrain sont :",
      en: "The core values I try to pass on in the field are:",
    },
  ],
  values: [
    { fr: "simplicité", en: "simplicity" },
    { fr: "agilité", en: "agility" },
    { fr: "innovation", en: "innovation" },
    { fr: "amélioration continue", en: "continuous improvement" },
    { fr: "esprit d'équipe", en: "team spirit" },
  ],
};

export const services: Service[] = [
  {
    id: "audit",
    title: {
      fr: "Architecture - Audit - Optimisation",
      en: "Architecture - Audit - Optimisation",
    },
    description: {
      fr: "Audit de votre architecture, préconisations d'optimisation selon votre contexte et implémentation d'architectures SI modernes et cloud native. Patterns d'architecture : architecture évènementielle (EDA), microservices, APIsation, serverless, data mesh, IA, low code / no code. Conseil en GreenIT, écoconception et numérique responsable.",
      en: "Audit of your architecture, context-specific optimisation recommendations, and implementation of modern, cloud-native information systems. Architecture patterns: event-driven architecture (EDA), microservices, API-first, serverless, data mesh, AI, low-code / no-code. Consulting on green IT, eco-design and responsible digital practices.",
    },
  },
  {
    id: "dev",
    title: {
      fr: "Développement fullstack - DevSecOps",
      en: "Fullstack development - DevSecOps",
    },
    description: {
      fr: "Développement IA assisté à la carte de votre site web, application mobile ou API. Développement frontend et/ou backend, préconisation et mise en place de votre pipeline d'intégration et de déploiement continu (CI/CD) ou de votre infrastructure as code (IaC), selon les bonnes pratiques GitOps et l'approche Accelerate. Mise en place du contrôle qualité et des bonnes pratiques de sécurité.",
      en: "Tailor-made development with AI assistance of your website, mobile application or API. Frontend and/or backend development, recommendations and roll-out of your continuous integration and delivery pipeline (CI/CD) or infrastructure as code (IaC), following GitOps best practices and the Accelerate approach. Quality gates and security best practices.",
    },
  },
  {
    id: "coaching",
    title: {
      fr: "Coaching tech - Lean Agile",
      en: "Tech and Lean - Agile coaching",
    },
    description: {
      fr: "Audit de l'organisation de vos équipes, mise en place d'une méthodologie agile Scrum ou Kanban en fonction du contexte, agilité à l'échelle SAFe. Accompagnement de startups dans le recrutement et le démarrage de leur équipe tech, CTO as a service.",
      en: "Audit of how your teams are organised, roll-out of Scrum or Kanban depending on context, SAFe at scale. Support for startups in hiring and bootstrapping their tech team, CTO as a service.",
    },
  },
];

export const positions: Position[] = [
  {
    id: "bpifrance-2021",
    company: "Bpifrance",
    start: "2021",
    end: null,
    title: { fr: "Lead Architect", en: "Lead Architect" },
    summary: {
      fr: "Pilotage tech des train Assurance Export et Garantie (+130 personnes).",
      en: "Technical leadership of the Export Credit Insurance and Guarantee agile release trains (+130 people).",
    },
  },
  {
    id: "keolis-lille",
    company: "Keolis Lille",
    start: "2020",
    end: "2021",
    title: { fr: "Digital Factory Lead", en: "Digital Factory Lead" },
    summary: {
      fr: "Pilotage de la fabrique digitale et du périmètre Build.",
      en: "Leadership of the digital factory and of the Build scope.",
    },
  },
  {
    id: "promod",
    company: "Promod",
    start: "2018",
    end: "2020",
    title: {
      fr: "Product Owner, architecte & Lead Dev",
      en: "Product Owner, Architect & Lead Developer",
    },
    summary: {
      fr: "Architecte et Product Owner du projet de rattrapage de dette technique et de renouvellement de la technologie front magasin. Lead Dev et Scrum Master de l'équipe agile omnicanal de 6 personnes, responsable des applications web et mobile.",
      en: "Architect and Product Owner for the technical debt reduction programme and the renewal of the in-store frontend technology. Lead developer and Scrum Master of the six-person omnichannel agile team responsible for the web and mobile applications.",
    },
  },
  {
    id: "ibm-service",
    company: "IBM Service",
    start: "2017",
    end: "2018",
    title: { fr: "Team Leader", en: "Team Leader" },
    summary: {
      fr: "Team lead sur le projet stratégique de refonte du site grand public Crédit Agricole (AEM CMS).",
      en: "Team lead on the strategic redesign of the Crédit Agricole public website (AEM CMS).",
    },
  },
  {
    id: "renault-digital",
    company: "Renault Digital",
    start: "2017",
    end: "2017",
    title: { fr: "Lead Dev Backend", en: "Backend Lead Developer" },
    summary: {
      fr: "Mise en place du socle technique backend.",
      en: "Built the backend technical foundation.",
    },
  },
  {
    id: "bpifrance-2016",
    company: "Bpifrance",
    start: "2016",
    end: "2017",
    title: { fr: "Lead Architect", en: "Lead Architect" },
    summary: {
      fr: "Pilotage d'une équipe de 3 architectes techniques responsable de la mise en place du socle technique, dans le cadre du projet stratégique de transfert des garanties publiques de Coface vers Bpifrance.",
      en: "Led a team of three technical architects responsible for building the technical foundation of the strategic transfer of State export guarantees from Coface to Bpifrance.",
    },
  },
  {
    id: "sopra-steria",
    company: "Sopra Steria",
    start: "2015",
    end: "2016",
    title: { fr: "Lead Tech", en: "Tech Lead" },
    summary: {
      fr: "Mise en place du socle technique pour un nouveau projet SNCF. Lead technique d'une équipe de 7 personnes.",
      en: "Built the technical foundation for a new SNCF project. Technical lead of a seven-person team.",
    },
  },
  {
    id: "coface",
    company: "Coface",
    start: "2010",
    end: "2015",
    title: { fr: "Team Leader", en: "Team Leader" },
    summary: {
      fr: "Pilotage, conception et développement sur le périmètre LCT (Liaison Change Trésorerie) des applications web permettant à la direction financière de suivre, analyser et contrôler les positions des traders sur le forex. Mise en place d'une TMA sur le projet.",
      en: "Led the design and development of the LCT (treasury foreign-exchange interface) web applications, enabling the finance department to monitor, analyse and control traders' forex positions. Set up outsourced application maintenance for the project.",
    },
  },
  {
    id: "franfinance",
    company: "Franfinance",
    start: "2007",
    end: "2010",
    title: { fr: "Senior Software Engineer", en: "Senior Software Engineer" },
    summary: {
      fr: "Conception et développement de l'extranet Flashlease, permettant aux apporteurs de Franfinance de saisir des demandes de financement pour les entreprises (location, crédit-bail…).",
      en: "Design and development of the Flashlease extranet, allowing Franfinance partners to submit corporate financing applications (rental, leasing and similar).",
    },
  },
  {
    id: "renault",
    company: "Renault",
    start: "2004",
    end: "2007",
    title: { fr: "Software Engineer", en: "Software Engineer" },
    summary: {
      fr: "Encadrement, conception et développement de l'application web permettant la consultation des référentiels produits, marchés et usines, ainsi que la gestion des budgets provisoires et définitifs.",
      en: "Supervision, design and development of the web application used to browse product, market and plant reference data and to manage provisional and final budgets.",
    },
  },
];

export const education: Education[] = [
  {
    id: "enseeiht",
    school: "ENSEEIHT",
    start: "2001",
    end: "2004",
    degree: {
      fr: "Ingénieur informatique et mathématiques appliquées",
      en: "MEng in Computer Science and Applied Mathematics",
    },
    detail: {
      fr: "Président du club sport automobile Turbo7 (2002).",
      en: "President of the Turbo7 motorsport club (2002).",
    },
  },
  {
    id: "chaptal",
    school: "Lycée Chaptal",
    start: "1998",
    end: "2001",
    degree: {
      fr: "Classes préparatoires aux grandes écoles",
      en: "Preparatory classes for the French grandes écoles",
    },
    detail: {
      fr: "MPSI, PSI · DEUG Université Pierre et Marie Curie",
      en: "MPSI, PSI · Diploma (DEUG) from Pierre and Marie Curie University",
    },
  },
  {
    id: "condorcet",
    school: "Lycée Condorcet (Oise)",
    start: "1998",
    end: "1998",
    degree: {
      fr: "Baccalauréat S, mention bien",
      en: "French Baccalauréat, science stream, with honours",
    },
    detail: null,
  },
];

export const skillGroups: SkillGroup[] = [
  {
    id: "design",
    label: { fr: "Conception & architecture", en: "Design & architecture" },
    skills: [
      { name: "Architecture", level: 90 },
      { name: "Conception", level: 95 },
      { name: "Sécurité", level: 75 },
      { name: "Agilité", level: 85 },
    ],
  },
  {
    id: "coding",
    label: { fr: "Langages", en: "Languages" },
    skills: [
      { name: "Java", level: 85 },
      { name: "JavaScript", level: 80 },
      { name: "HTML/CSS", level: 80 },
      { name: "TypeScript", level: 70 },
      { name: "Python", level: 50 },
      { name: "Dart", level: 40 },
    ],
  },
];

/**
 * `as const` : `TechTag` (utilisé par les fiches projets) est l'union
 * littérale de ces chaînes. Une techno mal orthographiée dans un projet
 * devient une erreur de compilation, pas un tag qui diverge silencieusement.
 */
export const knowledge = [
  "HTML5",
  "CSS3",
  "Spring Boot",
  "Angular",
  "Vue.js",
  "Nuxt",
  "React",
  "Next.js",
  "Astro",
  "TypeScript",
  "Flutter",
  "Git",
  "SVN",
  "SQL",
  "Hibernate",
  "Liquibase",
  "NoSQL",
  "Maven",
  "Gradle",
  "Groovy",
  "Jenkins",
  "Docker",
  "Kubernetes",
  "Helm",
  "FluxCD",
  "Artifactory",
  "Ansible",
  "Terraform",
  "Firebase",
  "AWS",
  "Google Cloud",
  "Microsoft Azure",
  "Domain Driven Design",
  "AEM",
  "LLM",
  "IA",
  "Claude",
  "Java",
  "Python",
  "Dart",
  "Javascript",
  "OSGI",
] as const;

export type TechTag = (typeof knowledge)[number];

export const certificates: Certificate[] = [
  {
    id: "safe-architect",
    name: "Certified SAFe® 5 Architect",
    issuer: "Scaled Agile Inc",
    date: "2021-03-21",
    badgeUrl:
      "https://www.youracclaim.com/badges/8939aa89-1dd0-48ca-8a3e-e23f025c3e22?source=linked_in_profile",
    image: "resume/cert_mark_SA_badge_large_300px.png",
  },
  {
    id: "lfs458",
    name: "LFS458: Kubernetes Administration",
    issuer: "The Linux Foundation",
    date: "2022-03-18",
    badgeUrl:
      "https://www.credly.com/badges/65df6f3f-52dc-48e5-afe0-46b816aa80d9?source=linked_in_profile",
    image: "resume/LF_logobadge.png",
  },
  {
    id: "coderquest-s0",
    name: "CoderQuest Season 0: Welcome to Liskov",
    issuer: "CoderQuest",
    date: "2023-11",
    badgeUrl:
      "https://game.coderquest.io/badge-checker/44881fce-4f71-42f4-aa01-10ce408b01f3",
    image: "resume/badge_s0_yohannfontaine_1699538249492.png",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "eric-sanchez",
    author: "Eric SANCHEZ",
    role: {
      fr: "Responsable pôle Compte État, DSI Coface",
      en: "Head of the State Account division, Coface IT",
    },
    quote: {
      fr: "Yohann, à la tête d'un projet sensible et essentiel pour l'activité du groupe de projets, a su faire apprécier au cours de sa mission chez Coface ses qualités de manager de projet, tout en conservant ses compétences techniques dans le monde Java / J2EE.",
      en: "Leading a sensitive project that was essential to the activity of the project group, Yohann demonstrated his qualities as a project manager throughout his assignment at Coface, while retaining his technical skills in the Java / J2EE world.",
    },
  },
  {
    id: "malick-diop",
    author: "Malick DIOP",
    role: {
      fr: "Développeur fullstack, DevOps, freelance",
      en: "Fullstack developer, DevOps, freelance",
    },
    quote: {
      fr: "Yohann est un Tech Lead talentueux et rigoureux, ainsi qu'un excellent manager avec qui il est agréable de travailler.",
      en: "Yohann is a talented and rigorous tech lead, as well as an excellent manager who is a pleasure to work with.",
    },
  },
];

export const clients: Client[] = [
  { id: "bpifrance", name: "Bpifrance", logo: "clients/logo-bpifrance.png" },
  { id: "keolis", name: "Keolis Lille", logo: "clients/logo-keolis-lille.jpg" },
  { id: "promod", name: "Promod", logo: "clients/logo-promod.png" },
  {
    id: "credit-agricole",
    name: "Crédit Agricole",
    logo: "clients/logo-ca.png",
  },
  { id: "ibm", name: "IBM", logo: "clients/logo-ibm.png" },
  {
    id: "renault-digital",
    name: "Renault Digital",
    logo: "clients/logo-renault-digital.png",
  },
  { id: "sncf", name: "SNCF", logo: "clients/logo-sncf.jpg" },
  { id: "coface", name: "Coface", logo: "clients/logo-coface.png" },
  {
    id: "franfinance",
    name: "Franfinance",
    logo: "clients/logo-franfinance.png",
  },
  { id: "renault", name: "Renault", logo: "clients/logo-renault.png" },
];

export const funFacts: FunFact[] = [
  {
    id: "parachute",
    label: { fr: "Saut en parachute", en: "Skydives" },
    value: 1,
  },
  {
    id: "japon",
    label: { fr: "Voyages au Japon", en: "Trips to Japan" },
    value: 5,
  },
  {
    id: "clash-of-code",
    label: { fr: "Clash of Code", en: "Clash of Code" },
    value: 77,
  },
];

export const projects: Project[] = [
  {
    id: "ygamaa",
    name: "Y-GaMaa",
    category: "pro",
    url: "https://ygamaa-consulting.web.app/",
    image: "portfolio/ygamaa.png",
    alt: {
      fr: "Page d'accueil du site Y-GAMAA",
      en: "Home page of the Y-GAMAA website",
    },
    summary: {
      fr: "Site de mon activité de conseil et formation IA, Y-GAMAA.",
      en: "Website for my independent consulting and AI training practice, Y-GAMAA.",
    },
    tech: ["Nuxt", "TypeScript", "IA"],
    metric: null,
    captured: "2026",
  },
  {
    id: "revealjs-effects",
    name: "Revealjs Effects",
    category: "perso",
    url: "https://revealjs-cool-effects.web.app/",
    image: "portfolio/revealjs-effects.png",
    alt: {
      fr: "Démonstration d'effets visuels pour Reveal.js",
      en: "Visual effects demo for Reveal.js",
    },
    summary: {
      fr: "Démonstration d'effets visuels personnalisés pour les présentations Reveal.js.",
      en: "Demo of custom visual effects for Reveal.js presentations.",
    },
    tech: [],
    metric: null,
    captured: "2023",
  },
  {
    id: "credit-agricole",
    name: "Crédit Agricole",
    category: "pro",
    url: "https://www.credit-agricole.fr/ca-paris/particulier.html",
    image: "portfolio/credit-agricole.png",
    alt: {
      fr: "Site grand public du Crédit Agricole",
      en: "Crédit Agricole public website",
    },
    summary: {
      fr: "Team lead de la refonte du site grand public, sur AEM CMS.",
      en: "Team lead for the redesign of the public website, on AEM CMS.",
    },
    tech: ["AEM", "OSGI", "Java"],
    metric: null,
    captured: "2017",
  },
  {
    id: "promod",
    name: "Promod",
    category: "pro",
    url: "https://www.promod.fr",
    image: "portfolio/promod.png",
    alt: { fr: "Site e-commerce Promod", en: "Promod e-commerce website" },
    summary: {
      fr: "Architecte et leader de la refonte front et app magasin.",
      en: "Architect and Product Owner for the technical debt catch-up and the renewal of the in-store frontend technology.",
    },
    tech: ["Flutter", "Dart", "Java"],
    metric: null,
    captured: "2018",
  },
  {
    id: "resume",
    name: "My Resume",
    category: "perso",
    url: "https://yohannfontaine-resume.web.app/",
    image: "portfolio/yohann-resume.png",
    alt: { fr: "Ce site", en: "This website" },
    summary: {
      fr: "Ce site. Refonte complète sur Astro, sans JavaScript livré au navigateur.",
      en: "This site. Rebuilt on Astro, with zero JavaScript shipped to the browser.",
    },
    tech: ["Astro", "TypeScript", "IA"],
    metric: {
      fr: "260 kB au total, 2,4 kB de CSS",
      en: "260 kB total, 2.4 kB of CSS",
    },
    captured: "2026",
  },
];

export const socialLinks: SocialLink[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/yohann-fontaine-a680331b/",
  },
  { id: "github", label: "GitHub", url: "https://github.com/yohannfontaine" },
  {
    id: "codingame",
    label: "CodinGame",
    url: "https://www.codingame.com/profile/4ce08406f55cfcda54ff772a3bf44a836486523",
  },
  {
    id: "instagram",
    label: "Instagram",
    url: "https://www.instagram.com/yohannfontaine/",
  },
];
