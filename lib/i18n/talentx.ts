import type { Locale } from "@/lib/locale-sync";

const en = {
  nav: {
    recruiting: "Recruiting",
    resumeX: "ResumeX",
    getInTouch: "Get in touch",
    linkedInAria: "TalentX on LinkedIn",
    menu: "Menu",
    menuAria: "Site navigation",
    items: {
      home: "Home",
      why: "Why TalentX",
      team: "Portfolio",
      faq: "FAQ",
      contact: "Contact",
    },
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
    summary: "5 reasons companies choose TalentX",
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
  meetTheTeam: {
    eyebrow: "Team",
    title: "Meet the Founder",
    hint: "Meet the founder",
    vicente: {
      name: "Vicente Barrientos",
      subtitle: "Founder / Talent Partner",
    },
  },
  profile: {
    backHome: "Back to homepage",
    vicente: {
      title: "Vicente Barrientos",
      subtitle: "Founder / Talent Partner",
      bio: "Vicente Barrientos is a global talent acquisition professional with deep experience recruiting across the U.S., Canada, LATAM, Europe, and Australia. He partners with founders and hiring leaders to build high-impact technical, business, and executive teams for fast-growing companies. At TalentX, Vicente leads search strategy, client partnerships, and hands-on recruiting execution.",
    },
  },
  leadership: {
    eyebrow: "Leadership",
    title: "Senior recruiting expertise, directly involved",
    description:
      "TalentX is led by Vicente Barrientos, who works directly with clients throughout every search. Global recruiting experience, market insight, and hands-on execution come together to help companies make exceptional hires.",
    partner: "Partner",
    viewLinkedIn: "View LinkedIn",
    talentxLinkedIn: "TalentX on LinkedIn",
    partners: [
      {
        name: "Vicente Barrientos",
        bio: "Global talent acquisition professional with experience recruiting across the U.S., Canada, LATAM, Europe, and Australia. Specialized in technical, business, finance, legal, and startup hiring for high-growth companies.",
        regions:
          "Experienced partnering with founders, executives, and hiring managers to build engineering, data, operations, and commercial teams in competitive talent markets.",
      },
    ],
  },
  services: {
    eyebrow: "Services",
    title: "Recruiting built for modern teams",
    summary: "4 recruiting solutions",
    items: [
      {
        title: "Technical Recruiting",
        description:
          "Software engineering, data, AI, DevOps, infrastructure, and product talent for fast-growing teams.",
      },
      {
        title: "Business, Operations, Finance & Legal",
        description:
          "Business-critical hires across operations, finance, legal, people, and corporate functions.",
      },
      {
        title: "Sourcing-as-a-Service",
        description:
          "Targeted candidate sourcing, outreach, and pipeline development without full-cycle recruiting overhead.",
      },
      {
        title: "Remote & Contractor Hiring",
        description:
          "Flexible hiring solutions for distributed teams operating across multiple markets and time zones.",
      },
    ],
  },
  expertise: {
    eyebrow: "Areas of Expertise",
    title: "Deep recruiting experience across the functions that power modern companies.",
    summary: "8 functional specializations",
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
    summary: "5-step hiring process",
    description:
      "A proven search process designed to balance speed, quality, and candidate experience.",
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
  faq: {
    eyebrow: "FAQ",
    title: "Common questions",
    summary: "5 answers about working with TalentX",
    description:
      "Quick answers about how we work, who you work with, and what to expect from a TalentX engagement.",
    items: [
      {
        question: "Who will I work with directly?",
        answer:
          "You work directly with Vicente throughout the search — not junior coordinators or account layers.",
      },
      {
        question: "What types of roles do you recruit for?",
        answer:
          "We support technical, business, finance, legal, operations, and executive hiring across the U.S., LATAM, and Europe.",
      },
      {
        question: "Do you offer sourcing-only support?",
        answer:
          "Yes. We offer full-cycle search, sourcing-as-a-service, and flexible project-based hiring models.",
      },
      {
        question: "How quickly can we get started?",
        answer:
          "After an initial discovery call, we can typically begin market mapping and outreach within days.",
      },
      {
        question: "How do we get in touch?",
        answer:
          "Book a consultation, email us, call, message on WhatsApp, or connect via LinkedIn from the contact section.",
      },
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
    whatsapp: "WhatsApp",
    linkedin: "LinkedIn",
    linkedinValue: "TalentX Recruiting",
    cta: "Schedule a Consultation",
  },
  footer: {
    tagline: "Technical Recruiting | Business Recruiting | Executive Search",
    linkedin: "LinkedIn",
    whatsapp: "WhatsApp",
    copyright: "© 2026 TalentX Recruiting. All rights reserved.",
  },
  vicentePortfolio: {
    eyebrow: "Portfolio",
    subtitle:
      "Technical Recruiter · Founder, TalentX Recruiting · Recruiting Partner at Goodwin",
    subtitleSub: "Global Talent Acquisition · AI Product Builder",
    intro:
      "I partner with founders and hiring leaders on technical, business, and executive hiring across the U.S., Canada, LATAM, Europe, and Australia — and I build AI-powered products.",
    visitProject: "Visit project",
    sections: {
      projects: { eyebrow: "Tech creations", title: "What I build" },
    },
    status: {
      live: "Live",
      private: "Private access",
      building: "In development",
    },
    projects: {
      fundosmart: {
        tagline: "Agtech · Livestock farm management",
        shotAlt: "FundoSmart homepage showing cattle pasture below Osorno volcano",
        description:
          "A web platform to run cattle farms in southern Chile: paddock maps drawn as real polygons, a 360° record for every animal, milk production, breeding, health, and costs. Its centerpiece is an auditable importer that migrates years of history out of the legacy Cooprinsem systems while keeping every original file hashed and intact.",
      },
      condosync: {
        tagline: "Proptech · B2B SaaS",
        shotAlt: "CondoSync homepage showing a condominium financial dashboard",
        description:
          "Common-expense software for condominium managers in Chile. It replaces fragile spreadsheets with a verified prorating engine, AI-assisted Excel import, a resident portal, online payments through Mercado Pago and Webpay, WhatsApp and email reminders, and automatic bank reconciliation.",
      },
      talentx: {
        tagline: "Recruiting · Brand and digital platform",
        shotAlt: "TalentX Recruiting homepage with a global talent acquisition headline",
        description:
          "The site you are on right now. A bilingual, fully animated recruiting platform built to carry the TalentX brand — services, positioning, and proof that AI belongs inside talent acquisition rather than bolted onto it.",
      },
      resumex: {
        tagline: "AI · Job search workspace",
        shotAlt: "ResumeX workspace showing resume and job-search tools",
        description:
          "An AI job-search workspace: it formats resumes, scores them against a job description, surfaces the real gaps, drafts tailored cover letters, finds openings, and auto-fills applications through a Chrome extension — with a tracker following every role from applied to offer.",
      },
      osornofactory: {
        tagline: "AI software studio",
        shotAlt: "OsornoFactory homepage showing an AI agent workflow",
        description:
          "An AI software factory based in Osorno, Chile. It designs, builds, and ships production software through multi-agent engineering workflows: AI products, SaaS platforms, autonomous agents, internal tools, and fundable MVPs in weeks instead of quarters.",
      },
      mapulengua: {
        tagline: "Edtech · Indigenous language",
        shotAlt: "Mapulengua welcome screen with its pudú guide",
        description:
          "A mobile-first app for learning Mapudungun in Spanish, structured as a journey down Chile through ten regions from Arica to Punta Arenas. Tap-first lessons, spaced repetition, XP, streaks, and achievements — guided by Küme the condor and a pudú — with content reviewed for cultural accuracy.",
      },
    },
  },
} as const;

const es = {
  nav: {
    recruiting: "Reclutamiento",
    resumeX: "ResumeX",
    getInTouch: "Contáctanos",
    linkedInAria: "TalentX en LinkedIn",
    menu: "Menú",
    menuAria: "Navegación del sitio",
    items: {
      home: "Inicio",
      why: "Por qué TalentX",
      team: "Portafolio",
      faq: "FAQ",
      contact: "Contacto",
    },
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
    summary: "5 razones por las que las empresas eligen TalentX",
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
  meetTheTeam: {
    eyebrow: "Equipo",
    title: "Conoce al fundador",
    hint: "Conoce al fundador",
    vicente: {
      name: "Vicente Barrientos",
      subtitle: "Founder / Talent Partner",
    },
  },
  profile: {
    backHome: "Volver al inicio",
    vicente: {
      title: "Vicente Barrientos",
      subtitle: "Founder / Talent Partner",
      bio: "Vicente Barrientos es un profesional global de adquisición de talento con amplia experiencia reclutando en EE. UU., Canadá, LATAM, Europa y Australia. Trabaja con founders y líderes de contratación para construir equipos técnicos, de negocios y ejecutivos de alto impacto en empresas en crecimiento. En TalentX, Vicente lidera la estrategia de búsqueda, las relaciones con clientes y la ejecución práctica del reclutamiento.",
    },
  },
  leadership: {
    eyebrow: "Liderazgo",
    title: "Experiencia senior en reclutamiento, directamente involucrada",
    description:
      "TalentX está liderado por Vicente Barrientos, quien trabaja directamente con los clientes en cada búsqueda. La experiencia global, el conocimiento del mercado y la ejecución práctica se combinan para ayudar a las empresas a hacer contrataciones excepcionales.",
    partner: "Socio",
    viewLinkedIn: "Ver LinkedIn",
    talentxLinkedIn: "TalentX en LinkedIn",
    partners: [
      {
        name: "Vicente Barrientos",
        bio: "Profesional global de adquisición de talento con experiencia reclutando en EE. UU., Canadá, LATAM, Europa y Australia. Especializado en contratación técnica, de negocios, finanzas, legal y startups para empresas en crecimiento.",
        regions:
          "Experiencia trabajando con founders, ejecutivos y hiring managers para construir equipos de ingeniería, data, operaciones y comercial en mercados de talento competitivos.",
      },
    ],
  },
  services: {
    eyebrow: "Servicios",
    title: "Reclutamiento diseñado para equipos modernos",
    summary: "4 soluciones de reclutamiento",
    items: [
      {
        title: "Reclutamiento técnico",
        description:
          "Talento en ingeniería de software, data, IA, DevOps, infraestructura y producto para equipos en crecimiento.",
      },
      {
        title: "Negocios, operaciones, finanzas y legal",
        description:
          "Contrataciones críticas en operaciones, finanzas, legal, people y funciones corporativas.",
      },
      {
        title: "Sourcing-as-a-Service",
        description:
          "Sourcing de candidatos, outreach y desarrollo de pipeline sin la sobrecarga de un ciclo completo.",
      },
      {
        title: "Contratación remota y por contrato",
        description:
          "Soluciones flexibles para equipos distribuidos en múltiples mercados y zonas horarias.",
      },
    ],
  },
  expertise: {
    eyebrow: "Áreas de expertise",
    title: "Experiencia profunda en reclutamiento en las funciones que impulsan las empresas modernas.",
    summary: "8 especializaciones funcionales",
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
    summary: "Proceso de contratación en 5 pasos",
    description:
      "Un proceso de búsqueda probado diseñado para equilibrar velocidad, calidad y experiencia del candidato.",
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
  faq: {
    eyebrow: "FAQ",
    title: "Preguntas frecuentes",
    summary: "5 respuestas sobre trabajar con TalentX",
    description:
      "Respuestas rápidas sobre cómo trabajamos, con quién trabajarás y qué esperar de un engagement con TalentX.",
    items: [
      {
        question: "¿Con quién trabajaré directamente?",
        answer:
          "Trabajas directamente con Vicente durante toda la búsqueda, no con coordinadores junior ni capas de cuenta.",
      },
      {
        question: "¿Qué tipos de roles reclutan?",
        answer:
          "Apoyamos contratación técnica, de negocios, finanzas, legal, operaciones y ejecutiva en EE. UU., LATAM y Europa.",
      },
      {
        question: "¿Ofrecen soporte solo de sourcing?",
        answer:
          "Sí. Ofrecemos búsqueda full-cycle, sourcing-as-a-service y modelos flexibles de contratación por proyecto.",
      },
      {
        question: "¿Qué tan rápido podemos empezar?",
        answer:
          "Después de una llamada inicial de discovery, normalmente podemos comenzar el mapeo de mercado y outreach en pocos días.",
      },
      {
        question: "¿Cómo nos contactamos?",
        answer:
          "Agenda una consulta, escríbenos por email, llama, envía un WhatsApp o conéctate por LinkedIn desde la sección de contacto.",
      },
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
    whatsapp: "WhatsApp",
    linkedin: "LinkedIn",
    linkedinValue: "TalentX Recruiting",
    cta: "Agendar una consulta",
  },
  footer: {
    tagline: "Reclutamiento técnico | Reclutamiento de negocios | Búsqueda ejecutiva",
    linkedin: "LinkedIn",
    whatsapp: "WhatsApp",
    copyright: "© 2026 TalentX Recruiting. Todos los derechos reservados.",
  },
  vicentePortfolio: {
    eyebrow: "Portafolio",
    subtitle:
      "Recruiter técnico · Fundador, TalentX Recruiting · Recruiting Partner en Goodwin",
    subtitleSub: "Adquisición de talento global · Constructor de productos con IA",
    intro:
      "Trabajo con fundadores y líderes de contratación en búsquedas técnicas, de negocios y ejecutivas en EE. UU., Canadá, LATAM, Europa y Australia — y construyo productos con IA.",
    visitProject: "Ver proyecto",
    sections: {
      projects: { eyebrow: "Creaciones tech", title: "Lo que construyo" },
    },
    status: {
      live: "En línea",
      private: "Acceso privado",
      building: "En desarrollo",
    },
    projects: {
      fundosmart: {
        tagline: "Agtech · Gestión de predios ganaderos",
        shotAlt: "Página de inicio de FundoSmart con ganado bajo el volcán Osorno",
        description:
          "Plataforma web para administrar predios ganaderos del sur de Chile: mapas de potreros dibujados como polígonos reales, ficha 360° de cada animal, producción lechera, reproducción, sanidad y costos. Su pieza central es un importador auditable que migra años de historia desde los sistemas legados de Cooprinsem, manteniendo cada archivo original íntegro y verificado.",
      },
      condosync: {
        tagline: "Proptech · SaaS B2B",
        shotAlt: "Página de inicio de CondoSync con un panel financiero para condominios",
        description:
          "Software de gastos comunes para administradores de condominios en Chile. Reemplaza las planillas frágiles con un motor de prorrateo verificado, importación de Excel asistida por IA, portal de residentes, pagos en línea con Mercado Pago y Webpay, recordatorios por WhatsApp y correo, y conciliación bancaria automática.",
      },
      talentx: {
        tagline: "Recruiting · Marca y plataforma digital",
        shotAlt: "Página de inicio de TalentX Recruiting con su propuesta de adquisición global de talento",
        description:
          "El sitio en el que estás ahora mismo. Una plataforma de reclutamiento bilingüe y completamente animada, construida para sostener la marca TalentX: servicios, posicionamiento y la prueba de que la IA es parte del reclutamiento, no un accesorio.",
      },
      resumex: {
        tagline: "IA · Workspace de búsqueda de empleo",
        shotAlt: "Workspace de ResumeX con herramientas de currículum y búsqueda laboral",
        description:
          "Un workspace de búsqueda de empleo con IA: formatea currículums, los evalúa contra una descripción de cargo, muestra las brechas reales, redacta cartas de presentación a medida, busca ofertas y completa postulaciones con una extensión de Chrome — con un tracker que sigue cada proceso desde la postulación hasta la oferta.",
      },
      osornofactory: {
        tagline: "Fábrica de software de IA",
        shotAlt: "Página de inicio de OsornoFactory con un flujo de agentes de IA",
        description:
          "Una fábrica de software de IA con base en Osorno, Chile. Diseña, construye y lanza software de producción con flujos de ingeniería multi-agente: productos de IA, plataformas SaaS, agentes autónomos, herramientas internas y MVPs financiables en semanas, no en trimestres.",
      },
      mapulengua: {
        tagline: "Edtech · Lengua originaria",
        shotAlt: "Pantalla de bienvenida de Mapulengua con su guía pudú",
        description:
          "Una app mobile-first para aprender mapudungun desde el español, estructurada como un viaje por Chile a través de diez regiones, de Arica a Punta Arenas. Lecciones tap-first, repetición espaciada, XP, rachas y logros — guiados por Küme, el cóndor, y un pudú — con el contenido revisado por su exactitud cultural.",
      },
    },
  },
} as const;

export const talentxMessages = { en, es } as const;

export type TalentXMessages = (typeof talentxMessages)[Locale];

export function getTalentXMessages(locale: Locale): TalentXMessages {
  return talentxMessages[locale];
}
