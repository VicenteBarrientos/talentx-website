import type { Locale } from "@/lib/locale-sync";

const en = {
  nav: {
    recruiting: "Recruiting",
    resumeX: "ResumeX",
    getInTouch: "Get in touch",
    linkedInAria: "TalentX on LinkedIn",
  },
  language: {
    switchToSpanish: "Switch to Spanish",
    switchToEnglish: "Switch to English",
    english: "EN",
    spanish: "ES",
  },
  hero: {
    badge: "Global Talent Acquisition for High-Growth Teams",
    headline:
      "We help U.S. and international companies hire exceptional technical and business talent across the U.S., LATAM, and Europe.",
    subheadline:
      "Fast, strategic, and human-centered recruiting designed for modern startups.",
    bookCall: "Book a Call",
    exploreServices: "Explore Services",
    trustStrip: [
      "Technical Recruiting",
      "Business & Operations",
      "Finance & Accounting",
      "Executive Search",
      "Remote Hiring",
    ],
    trustFootnote:
      "Experienced recruiting across the U.S., Canada, LATAM, Europe, and Australia.",
  },
  why: {
    eyebrow: "Why TalentX",
    title: "Built for teams that need results, not bureaucracy",
    description:
      "TalentX gives growing companies the speed, judgment, and access of a senior recruiting partner — without the overhead, handoffs, or generic playbooks of a large agency.",
    items: [
      {
        title: "Faster hiring",
        description:
          "Move from role brief to qualified candidates without the delays of a large agency workflow.",
      },
      {
        title: "Better candidate quality",
        description:
          "Targeted outreach and rigorous screening focused on fit, motivation, and long-term impact.",
      },
      {
        title: "Access to global talent",
        description:
          "Reach experienced professionals across the U.S., Canada, LATAM, Europe, and Australia.",
      },
      {
        title: "Senior-level recruiting support",
        description:
          "Work directly with experienced recruiters — not junior coordinators or account layers.",
      },
      {
        title: "Flexible engagement models",
        description:
          "Choose full-cycle search, sourcing support, or project-based hiring based on your needs.",
      },
    ],
  },
  leadership: {
    eyebrow: "Leadership",
    title: "Experienced recruiters, directly involved",
    description:
      "TalentX is led by experienced recruiting professionals who work directly with clients throughout every search. We combine global recruiting experience, market insight, and hands-on execution to help companies make exceptional hires.",
    partner: "Partner",
    viewLinkedIn: "View LinkedIn",
    talentxLinkedIn: "TalentX on LinkedIn",
    partners: [
      {
        name: "Vicente Barrientos",
        bio: "Global talent acquisition professional with experience recruiting across the U.S., Canada, LATAM, Europe, and Australia, specializing in technical, business, finance, legal, and startup recruiting.",
      },
      {
        name: "Benjamín Mahave Cornejo",
        bio: "Global recruiter and talent acquisition professional with experience across Latin America, executive search, organizational development, people strategy, and consulting environments. Former BCG recruiting specialist with experience at Turner & Townsend, Cencosud, BCG, and EY.",
        regions:
          "Regional experience across Chile, Argentina, Uruguay, and Colombia.",
        sectors:
          "Talent acquisition for real estate, infrastructure, natural resources, consulting, technology, and executive search roles.",
      },
    ],
  },
  services: {
    eyebrow: "Services",
    title: "Recruiting built for modern teams",
    items: [
      {
        title: "Technical Recruiting",
        description:
          "Full-stack, backend, data, DevOps, and product engineering hires across competitive global markets.",
      },
      {
        title: "Business, Operations, Finance & Legal",
        description:
          "Operators, finance leaders, legal counsel, and cross-functional talent that helps scale high-growth teams.",
      },
      {
        title: "Sourcing-as-a-Service",
        description:
          "Dedicated pipeline development, outreach, and candidate engagement without full-cycle overhead.",
      },
      {
        title: "Remote & Contractor Hiring",
        description:
          "Flexible hiring models for distributed teams across the U.S., LATAM, Europe, and beyond.",
      },
    ],
  },
  expertise: {
    eyebrow: "Areas of Expertise",
    title: "Specialized recruiting across technical and business functions",
    areas: [
      "Software Engineering",
      "Data & AI",
      "Product Management",
      "Finance & Accounting",
      "Operations",
      "Legal & Compliance",
      "Go-to-Market",
      "Executive Leadership",
    ],
  },
  process: {
    eyebrow: "Recruiting Process",
    title: "A clear path from brief to hire",
    description: "A structured, transparent process designed to deliver quality and speed.",
    steps: [
      {
        step: "01",
        title: "Discovery",
        description:
          "Align on role scope, hiring bar, compensation, timeline, and success metrics.",
      },
      {
        step: "02",
        title: "Market mapping",
        description:
          "Identify target companies, talent pools, and sourcing channels across relevant regions.",
      },
      {
        step: "03",
        title: "Outreach & screening",
        description:
          "Engage qualified candidates with tailored messaging and structured qualification.",
      },
      {
        step: "04",
        title: "Interview support",
        description:
          "Coordinate interviews, calibrate feedback, and keep momentum through the decision.",
      },
      {
        step: "05",
        title: "Close & onboarding",
        description:
          "Support offer negotiation and a smooth start for candidates joining your team.",
      },
    ],
  },
  commitments: {
    eyebrow: "Commitments",
    title: "How we work with every client",
    items: [
      "Clear communication at every stage of the search",
      "Confidential, professional handling of sensitive hiring needs",
      "Data-informed sourcing with a human, relationship-driven touch",
      "Flexible engagement models tailored to your hiring velocity",
      "Partnership built on trust, accountability, and results",
    ],
  },
  socialProof: {
    eyebrow: "Why Companies Work With TalentX",
    title: "Credibility built on experience and execution",
    items: [
      "Global recruiting experience across multiple continents",
      "Experience supporting startups and scaling organizations",
      "Hands-on partner involvement in every search",
      "Specialized expertise across technical and business functions",
      "Flexible recruiting and sourcing models",
    ],
  },
  resumex: {
    eyebrow: "AI RESUME REVIEW",
    title: "Try ResumeX",
    description:
      "Upload a resume and get instant AI-powered feedback on structure, clarity, keywords, and role alignment.",
    attribution:
      "Built by TalentX Recruiting to help candidates improve their resumes before applying.",
    badges: ["AI-powered analysis", "Instant feedback", "Free to use"],
    cta: "Try ResumeX Free",
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's Build Your Next Great Hire",
    description:
      "Ready to discuss a search, sourcing support, or a broader hiring strategy? Reach out directly.",
    email: "Email",
    phone: "Phone",
    linkedin: "LinkedIn",
    linkedinValue: "TalentX Recruiting",
    cta: "Schedule a Consultation",
  },
  footer: {
    tagline: "Technical Recruiting | Business Recruiting | Executive Search",
    linkedin: "LinkedIn",
    copyright: "© 2026 TalentX Recruiting. All rights reserved.",
  },
} as const;

const es = {
  nav: {
    recruiting: "Reclutamiento",
    resumeX: "ResumeX",
    getInTouch: "Contáctanos",
    linkedInAria: "TalentX en LinkedIn",
  },
  language: {
    switchToSpanish: "Cambiar a español",
    switchToEnglish: "Cambiar a inglés",
    english: "EN",
    spanish: "ES",
  },
  hero: {
    badge: "Adquisición de talento global para equipos en crecimiento",
    headline:
      "Ayudamos a empresas de EE. UU. e internacionales a contratar talento técnico y de negocios excepcional en EE. UU., LATAM y Europa.",
    subheadline:
      "Reclutamiento ágil, estratégico y centrado en las personas, diseñado para startups modernas.",
    bookCall: "Agendar una llamada",
    exploreServices: "Explorar servicios",
    trustStrip: [
      "Reclutamiento técnico",
      "Negocios y operaciones",
      "Finanzas y contabilidad",
      "Búsqueda ejecutiva",
      "Contratación remota",
    ],
    trustFootnote:
      "Experiencia en reclutamiento en EE. UU., Canadá, LATAM, Europa y Australia.",
  },
  why: {
    eyebrow: "Por qué TalentX",
    title: "Hecho para equipos que necesitan resultados, no burocracia",
    description:
      "TalentX ofrece a las empresas en crecimiento la velocidad, el criterio y el acceso de un socio senior de reclutamiento, sin la burocracia, los traspasos ni los playbooks genéricos de una agencia grande.",
    items: [
      {
        title: "Contratación más rápida",
        description:
          "Pasa del brief del rol a candidatos calificados sin los retrasos de una agencia grande.",
      },
      {
        title: "Mejor calidad de candidatos",
        description:
          "Outreach dirigido y evaluación rigurosa enfocada en encaje, motivación e impacto a largo plazo.",
      },
      {
        title: "Acceso a talento global",
        description:
          "Alcanza profesionales con experiencia en EE. UU., Canadá, LATAM, Europa y Australia.",
      },
      {
        title: "Soporte senior de reclutamiento",
        description:
          "Trabaja directamente con reclutadores experimentados, no con coordinadores junior ni capas de cuenta.",
      },
      {
        title: "Modelos de engagement flexibles",
        description:
          "Elige búsqueda full-cycle, soporte de sourcing o contratación por proyecto según tus necesidades.",
      },
    ],
  },
  leadership: {
    eyebrow: "Liderazgo",
    title: "Reclutadores con experiencia, directamente involucrados",
    description:
      "TalentX está liderado por profesionales de reclutamiento con experiencia que trabajan directamente con los clientes en cada búsqueda. Combinamos experiencia global, conocimiento del mercado y ejecución práctica para ayudar a las empresas a hacer contrataciones excepcionales.",
    partner: "Socio",
    viewLinkedIn: "Ver LinkedIn",
    talentxLinkedIn: "TalentX en LinkedIn",
    partners: [
      {
        name: "Vicente Barrientos",
        bio: "Profesional global de adquisición de talento con experiencia reclutando en EE. UU., Canadá, LATAM, Europa y Australia, especializado en reclutamiento técnico, de negocios, finanzas, legal y startups.",
      },
      {
        name: "Benjamín Mahave Cornejo",
        bio: "Reclutador global y profesional de adquisición de talento con experiencia en América Latina, executive search, desarrollo organizacional, estrategia de personas y entornos de consultoría. Ex especialista de reclutamiento en BCG con experiencia en Turner & Townsend, Cencosud, BCG y EY.",
        regions:
          "Experiencia regional en Chile, Argentina, Uruguay y Colombia.",
        sectors:
          "Adquisición de talento para real estate, infraestructura, recursos naturales, consultoría, tecnología y roles de executive search.",
      },
    ],
  },
  services: {
    eyebrow: "Servicios",
    title: "Reclutamiento diseñado para equipos modernos",
    items: [
      {
        title: "Reclutamiento técnico",
        description:
          "Contrataciones full-stack, backend, data, DevOps e ingeniería de producto en mercados globales competitivos.",
      },
      {
        title: "Negocios, operaciones, finanzas y legal",
        description:
          "Operadores, líderes de finanzas, counsel legal y talento cross-funcional para escalar equipos en crecimiento.",
      },
      {
        title: "Sourcing-as-a-Service",
        description:
          "Desarrollo de pipeline, outreach y engagement de candidatos sin la sobrecarga de un ciclo completo.",
      },
      {
        title: "Contratación remota y por contrato",
        description:
          "Modelos flexibles para equipos distribuidos en EE. UU., LATAM, Europa y más allá.",
      },
    ],
  },
  expertise: {
    eyebrow: "Áreas de expertise",
    title: "Reclutamiento especializado en funciones técnicas y de negocio",
    areas: [
      "Ingeniería de software",
      "Data e IA",
      "Product Management",
      "Finanzas y contabilidad",
      "Operaciones",
      "Legal y compliance",
      "Go-to-Market",
      "Liderazgo ejecutivo",
    ],
  },
  process: {
    eyebrow: "Proceso de reclutamiento",
    title: "Un camino claro del brief a la contratación",
    description: "Un proceso estructurado y transparente diseñado para entregar calidad y velocidad.",
    steps: [
      {
        step: "01",
        title: "Discovery",
        description:
          "Alineación sobre alcance del rol, hiring bar, compensación, timeline y métricas de éxito.",
      },
      {
        step: "02",
        title: "Mapeo de mercado",
        description:
          "Identificación de empresas objetivo, pools de talento y canales de sourcing en regiones relevantes.",
      },
      {
        step: "03",
        title: "Outreach y screening",
        description:
          "Engagement de candidatos calificados con mensajes personalizados y calificación estructurada.",
      },
      {
        step: "04",
        title: "Soporte en entrevistas",
        description:
          "Coordinación de entrevistas, calibración de feedback y momentum hasta la decisión.",
      },
      {
        step: "05",
        title: "Cierre y onboarding",
        description:
          "Apoyo en negociación de oferta y un inicio fluido para candidatos que se unen al equipo.",
      },
    ],
  },
  commitments: {
    eyebrow: "Compromisos",
    title: "Cómo trabajamos con cada cliente",
    items: [
      "Comunicación clara en cada etapa de la búsqueda",
      "Manejo confidencial y profesional de necesidades de contratación sensibles",
      "Sourcing basado en datos con un enfoque humano y relacional",
      "Modelos de engagement flexibles adaptados a tu velocidad de contratación",
      "Partnership basado en confianza, responsabilidad y resultados",
    ],
  },
  socialProof: {
    eyebrow: "Por qué las empresas trabajan con TalentX",
    title: "Credibilidad basada en experiencia y ejecución",
    items: [
      "Experiencia global en reclutamiento en múltiples continentes",
      "Experiencia apoyando startups y organizaciones en crecimiento",
      "Participación directa de socios en cada búsqueda",
      "Expertise especializado en funciones técnicas y de negocio",
      "Modelos flexibles de reclutamiento y sourcing",
    ],
  },
  resumex: {
    eyebrow: "REVISIÓN DE CV CON IA",
    title: "Prueba ResumeX",
    description:
      "Sube un currículum y recibe feedback instantáneo con IA sobre estructura, claridad, keywords y alineación con el rol.",
    attribution:
      "Creado por TalentX Recruiting para ayudar a candidatos a mejorar sus currículums antes de postular.",
    badges: ["Análisis con IA", "Feedback instantáneo", "Gratis"],
    cta: "Probar ResumeX gratis",
  },
  contact: {
    eyebrow: "Contacto",
    title: "Construyamos tu próxima gran contratación",
    description:
      "¿Listo para hablar de una búsqueda, soporte de sourcing o una estrategia de contratación más amplia? Escríbenos directamente.",
    email: "Email",
    phone: "Teléfono",
    linkedin: "LinkedIn",
    linkedinValue: "TalentX Recruiting",
    cta: "Agendar una consulta",
  },
  footer: {
    tagline: "Reclutamiento técnico | Reclutamiento de negocios | Búsqueda ejecutiva",
    linkedin: "LinkedIn",
    copyright: "© 2026 TalentX Recruiting. Todos los derechos reservados.",
  },
} as const;

export const talentxMessages = { en, es } as const;

export type TalentXMessages = (typeof talentxMessages)[Locale];

export function getTalentXMessages(locale: Locale): TalentXMessages {
  return talentxMessages[locale];
}
