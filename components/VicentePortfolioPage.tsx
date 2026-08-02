"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import TopNav from "@/components/TopNav";
import { useLocale } from "@/components/LocaleProvider";
import { easeOut, revealViewport } from "@/lib/motion-presets";
import { RESUMEX_URL } from "@/lib/site-urls";

const VICENTE_LINKEDIN = "https://www.linkedin.com/in/vicente-barrientos/";
const VICENTE_GITHUB = "https://github.com/VicenteBarrientos";

const FUNDOSMART_URL = "https://fundosmart.com/";
const CONDOSYNC_URL = "https://www.condosync.cl";
const OSORNOFACTORY_URL = "https://osorno-ai-forge.vercel.app/";
const MAPULENGUA_URL = "https://mapulengua.vercel.app/";

// ─── Project icons ─────────────────────────────────────────────────────────────

function FundoSmartIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-full w-full" aria-hidden="true">
      <circle cx="20" cy="20" r="20" className="fill-emerald-100 dark:fill-emerald-400/20" />
      <path
        d="M10 25l3-11 9-3 8 6-2 11-13 1z"
        className="fill-emerald-500/25 stroke-emerald-600 dark:fill-emerald-400/20 dark:stroke-emerald-300"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="19" cy="19" r="2.8" className="fill-emerald-600 dark:fill-emerald-300" />
    </svg>
  );
}

function CondoSyncIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-full w-full" aria-hidden="true">
      <circle cx="20" cy="20" r="20" className="fill-sky-100 dark:fill-sky-400/20" />
      <rect x="10" y="15" width="9" height="15" rx="1" className="fill-sky-300 dark:fill-sky-400/40" />
      <rect x="20" y="10" width="10" height="20" rx="1" className="fill-sky-500 dark:fill-sky-400" />
      <path
        d="M22.5 14h1.5M26 14h1.5M22.5 18h1.5M26 18h1.5M22.5 22h1.5M26 22h1.5"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M12.5 19h1.5M15.5 19h1.5M12.5 23h1.5M15.5 23h1.5"
        className="stroke-sky-600 dark:stroke-sky-200"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TalentXIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-full w-full" aria-hidden="true">
      <circle cx="20" cy="20" r="20" className="fill-cyan-100 dark:fill-cyan-400/20" />
      <path
        d="M14 28V18l6-6 6 6v10"
        className="stroke-cyan-600 dark:stroke-cyan-400"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <rect x="17" y="22" width="6" height="6" rx="0.5" className="fill-cyan-500 dark:fill-cyan-400" />
      <path d="M12 18h16" className="stroke-cyan-600 dark:stroke-cyan-400" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ResumeXIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-full w-full" aria-hidden="true">
      <circle cx="20" cy="20" r="20" className="fill-indigo-100 dark:fill-indigo-400/20" />
      <rect x="12" y="10" width="16" height="20" rx="2" className="fill-indigo-200 dark:fill-indigo-400/30" />
      <path
        d="M15 16h10M15 19h10M15 22h6"
        className="stroke-indigo-500 dark:stroke-indigo-400"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="27" cy="27" r="5" className="fill-indigo-500 dark:fill-indigo-400" />
      <path d="M25.5 27l1 1 2-2" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function OsornoFactoryIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-full w-full" aria-hidden="true">
      <circle cx="20" cy="20" r="20" className="fill-violet-100 dark:fill-violet-400/20" />
      <path d="M20 11l11 18H9l11-18z" className="fill-violet-500 dark:fill-violet-400" />
      <path d="M20 11l4.2 6.9-2.1-1.1-2.1 1.1-2.1-1.1-2.1 1.1L20 11z" fill="white" />
      <circle cx="20" cy="24.5" r="1.8" className="fill-violet-200 dark:fill-violet-900/60" />
    </svg>
  );
}

function MapulenguaIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-full w-full" aria-hidden="true">
      <circle cx="20" cy="20" r="20" className="fill-amber-100 dark:fill-amber-400/20" />
      <path
        d="M11 14a2 2 0 012-2h14a2 2 0 012 2v9a2 2 0 01-2 2h-8l-5 4v-4h-1a2 2 0 01-2-2v-9z"
        className="fill-amber-500 dark:fill-amber-400"
      />
      <path d="M16 17.5h8M16 20.5h5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ─── Small icons ───────────────────────────────────────────────────────────────

function ExternalLinkIcon() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

// ─── Status pill ───────────────────────────────────────────────────────────────

type ProjectStatus = "live" | "private" | "building";

const STATUS_DOT: Record<ProjectStatus, string> = {
  live: "bg-emerald-500 dark:bg-emerald-400",
  private: "bg-zinc-400 dark:bg-zinc-500",
  building: "bg-amber-500 dark:bg-amber-400",
};

function StatusPill({ status, label }: { status: ProjectStatus; label: string }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-[11px] font-medium text-zinc-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-400">
      <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[status]}`} />
      {label}
    </span>
  );
}

// ─── Journey map ───────────────────────────────────────────────────────────────

/** Winding trail drawn between two waypoints; it draws itself as you scroll past. */
function TrailSegment({ index, reduced }: { index: number; reduced: boolean }) {
  const bow = index % 2 === 0 ? 5 : 39;
  const d = `M22 0 Q ${bow} 52 22 104`;

  // Taller than the space it occupies: the tail runs under the next waypoint
  // so the route reads as continuous instead of breaking between stops.
  return (
    <div className="pointer-events-none -mb-12 h-[104px]" aria-hidden="true">
      <svg width="44" height="104" viewBox="0 0 44 104" fill="none">
        <path
          d={d}
          className="stroke-indigo-300/60 dark:stroke-white/15"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="2 7"
        />
        <motion.path
          d={d}
          className="stroke-indigo-500 dark:stroke-cyan-300"
          strokeWidth="2"
          strokeLinecap="round"
          initial={reduced ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
    </div>
  );
}

/** A stop on the route: the project icon as its landmark, lit once you reach it. */
function Waypoint({ icon, step, reduced }: { icon: React.ReactNode; step: number; reduced: boolean }) {
  return (
    <motion.div
      className="absolute left-0 top-6 h-11 w-11"
      initial={reduced ? false : { scale: 0.6, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
    >
      <motion.div
        className="pointer-events-none absolute -inset-2 rounded-full bg-indigo-400/25 blur-lg dark:bg-cyan-300/25"
        initial={reduced ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      />
      <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-lg ring-2 ring-white/80 dark:ring-white/15">
        {icon}
      </div>
      <span className="absolute -bottom-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-indigo-600 text-[10px] font-bold text-white shadow dark:border-[#050816] dark:bg-cyan-400 dark:text-[#050816]">
        {step}
      </span>
    </motion.div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function VicentePortfolioPage() {
  const { t } = useLocale();
  const reduced = useReducedMotion() ?? false;
  const vp = t.vicentePortfolio;

  // Parallax on the star field so the sky drifts slower than the route
  const { scrollY } = useScroll();
  const starsY = useTransform(scrollY, [0, 3000], [0, -220]);

  const PROJECTS: {
    id: string;
    name: string;
    icon: React.ReactNode;
    tagline: string;
    description: string;
    stack: string[];
    status: ProjectStatus;
    href?: string;
    external?: boolean;
  }[] = [
    {
      id: "fundosmart",
      name: "FundoSmart",
      icon: <FundoSmartIcon />,
      tagline: vp.projects.fundosmart.tagline,
      description: vp.projects.fundosmart.description,
      stack: ["Next.js 16", "Cloudflare D1", "R2", "Drizzle", "Leaflet"],
      status: "live",
      href: FUNDOSMART_URL,
      external: true,
    },
    {
      id: "condosync",
      name: "CondoSync",
      icon: <CondoSyncIcon />,
      tagline: vp.projects.condosync.tagline,
      description: vp.projects.condosync.description,
      stack: ["Next.js 16", "Prisma 7", "Neon", "AI Gateway", "Mercado Pago"],
      status: "live",
      href: CONDOSYNC_URL,
      external: true,
    },
    {
      id: "talentx",
      name: "TalentX",
      icon: <TalentXIcon />,
      tagline: vp.projects.talentx.tagline,
      description: vp.projects.talentx.description,
      stack: ["Next.js 16", "React 19", "Tailwind 4", "Motion"],
      status: "live",
      href: "/",
    },
    {
      id: "resumex",
      name: "ResumeX",
      icon: <ResumeXIcon />,
      tagline: vp.projects.resumex.tagline,
      description: vp.projects.resumex.description,
      stack: ["Next.js", "Prisma", "OpenAI", "NextAuth", "Stripe"],
      status: "live",
      href: RESUMEX_URL,
      external: true,
    },
    {
      id: "osornofactory",
      name: "OsornoFactory",
      icon: <OsornoFactoryIcon />,
      tagline: vp.projects.osornofactory.tagline,
      description: vp.projects.osornofactory.description,
      stack: ["TanStack Start", "Vite", "React", "Tailwind", "shadcn/ui"],
      status: "live",
      href: OSORNOFACTORY_URL,
      external: true,
    },
    {
      id: "mapulengua",
      name: "Mapulengua",
      icon: <MapulenguaIcon />,
      tagline: vp.projects.mapulengua.tagline,
      description: vp.projects.mapulengua.description,
      stack: ["Next.js 15", "React 19", "Tailwind 4", "PWA"],
      status: "live",
      href: MAPULENGUA_URL,
      external: true,
    },
  ];

  return (
    <div className="relative min-h-screen text-zinc-900 dark:text-white">
      {/* Fixed video backdrop — the page scrolls over it */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-white dark:bg-[#050816]"
        aria-hidden="true"
      >
        <video
          className="h-full w-full object-cover"
          poster="/videos/portfolio-bg.jpg"
          autoPlay={!reduced}
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/videos/portfolio-bg.webm" type="video/webm" />
          <source src="/videos/portfolio-bg.mp4" type="video/mp4" />
        </video>
        {/* Scrim: keeps text readable and tunes how much video shows per theme */}
        <div className="absolute inset-0 bg-white/85 dark:bg-[#050816]/70" />
        {/* Star field, dark only — drifts slower than the page for depth */}
        <motion.div
          className="absolute inset-[-25%] hidden dark:block"
          style={{
            y: reduced ? 0 : starsY,
            backgroundImage:
              "radial-gradient(circle, rgba(165,243,252,0.30) 0 1px, transparent 1.6px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-transparent to-white/75 dark:from-[#050816]/85 dark:via-transparent dark:to-[#050816]/85" />
      </div>

      <TopNav />

      <main className="relative z-10 mx-auto max-w-3xl px-6 pb-24 pt-24 sm:pt-28">

        {/* ── Hero header ── */}
        <motion.div
          className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={easeOut}
        >
          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-3xl border border-indigo-200 shadow-sm dark:border-white/10 sm:h-32 sm:w-32">
            <Image
              src="/partners/vicente-barrientos.png"
              alt="Vicente Barrientos"
              fill
              className="object-cover object-top"
              sizes="128px"
              priority
            />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-indigo-600 dark:text-cyan-300">
              {vp.eyebrow}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Vicente Barrientos
            </h1>
            <p className="mt-2 text-base font-medium text-indigo-700 dark:text-cyan-200">
              {vp.subtitle}
            </p>
            <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
              {vp.subtitleSub}
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
              <Link
                href={VICENTE_LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1.5 text-xs font-semibold text-indigo-700 transition hover:border-indigo-300 hover:bg-indigo-100 dark:border-cyan-400/25 dark:bg-cyan-400/10 dark:text-cyan-200 dark:hover:border-cyan-300/40 dark:hover:bg-cyan-400/15"
              >
                <LinkedInIcon />
                LinkedIn
              </Link>
              <Link
                href={VICENTE_GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-semibold text-zinc-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300 dark:hover:border-cyan-400/25 dark:hover:bg-cyan-400/10 dark:hover:text-cyan-100"
              >
                <GitHubIcon />
                GitHub
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ── Projects ── */}
        <motion.section
          className="mt-14 sm:mt-16"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={easeOut}
        >
          <div className="mb-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-600 dark:text-cyan-300">
              {vp.sections.projects.eyebrow}
            </p>
            <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              {vp.sections.projects.title}
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              {vp.intro}
            </p>
          </div>

          {/* The route: each project is a stop, joined by a trail that draws as you scroll */}
          <div className="relative">
            {PROJECTS.map((project, index) => (
              <div key={project.id}>
                <TrailSegment index={index} reduced={reduced} />

                <motion.div
                  className="relative pl-14 sm:pl-[76px]"
                  initial={reduced ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={revealViewport}
                  transition={easeOut}
                >
                  <Waypoint icon={project.icon} step={index + 1} reduced={reduced} />

                  <div className="relative">
                    {/* Glow under the island */}
                    <div
                      className="pointer-events-none absolute inset-x-8 -bottom-2 h-8 rounded-[50%] bg-indigo-500/20 blur-xl dark:bg-cyan-400/20"
                      aria-hidden="true"
                    />
                    <div className="relative flex flex-col rounded-3xl border border-zinc-200 bg-white/75 p-5 shadow-lg backdrop-blur-xl transition-colors hover:border-indigo-200 dark:border-white/10 dark:bg-white/[0.05] dark:hover:border-cyan-400/20 sm:p-7">
                      <div className="flex flex-wrap items-start justify-between gap-x-2 gap-y-1.5">
                        <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
                          {project.name}
                        </h3>
                        <StatusPill status={project.status} label={vp.status[project.status]} />
                      </div>
                      <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
                        {project.tagline}
                      </p>

                      <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                        {project.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-[11px] font-medium text-zinc-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {project.href && (
                        <div className="mt-5">
                          <Link
                            href={project.href}
                            {...(project.external
                              ? { target: "_blank", rel: "noopener noreferrer" }
                              : {})}
                            className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1.5 text-xs font-semibold text-indigo-700 transition hover:border-indigo-300 hover:bg-indigo-100 dark:border-cyan-400/25 dark:bg-cyan-400/10 dark:text-cyan-200 dark:hover:border-cyan-300/40 dark:hover:bg-cyan-400/15"
                          >
                            {vp.visitProject}
                            {project.external ? <ExternalLinkIcon /> : <ArrowRightIcon />}
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.section>

      </main>
    </div>
  );
}
