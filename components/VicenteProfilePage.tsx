"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import TopNav from "@/components/TopNav";
import { useLocale } from "@/components/LocaleProvider";
import { easeOut, revealViewport } from "@/lib/motion-presets";
import { RESUMEX_URL, TALENTX_URL } from "@/lib/site-urls";

const VICENTE_LINKEDIN = "https://www.linkedin.com/in/vicente-barrientos/";
const VICENTE_GITHUB = "https://github.com/VicenteBarrientos";

// ─── Icons ────────────────────────────────────────────────────────────────────

function MapulanguaIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-full w-full" aria-hidden="true">
      <circle cx="20" cy="20" r="20" className="fill-emerald-100 dark:fill-emerald-400/20" />
      <path
        d="M20 8c0 0-8 5-8 13a8 8 0 0016 0C28 13 20 8 20 8z"
        className="fill-emerald-500 dark:fill-emerald-400"
      />
      <path
        d="M20 14v12M15 19c1.5-1 3.5-1.5 5-1.5s3.5.5 5 1.5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
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

function ExternalLinkIcon() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
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

function GradCapIcon() {
  return (
    <svg className="h-5 w-5 text-indigo-600 dark:text-cyan-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 12v5c3.33 1.5 8.67 1.5 12 0v-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Section wrapper ───────────────────────────────────────────────────────────

function Section({
  eyebrow,
  title,
  children,
  reduced,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  reduced: boolean;
}) {
  return (
    <motion.section
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={easeOut}
    >
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-600 dark:text-cyan-300">
          {eyebrow}
        </p>
        <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
          {title}
        </h2>
      </div>
      {children}
    </motion.section>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function VicenteProfilePage() {
  const { t } = useLocale();
  const reduced = useReducedMotion() ?? false;
  const vp = t.vicenteProfile;

  const TECH_PROJECTS = [
    {
      id: "talentx",
      icon: <TalentXIcon />,
      name: "TalentX Website",
      tagline: vp.projects.talentx.tagline,
      description: vp.projects.talentx.description,
      href: TALENTX_URL,
    },
    {
      id: "resumex",
      icon: <ResumeXIcon />,
      name: "ResumeX",
      tagline: vp.projects.resumex.tagline,
      description: vp.projects.resumex.description,
      href: RESUMEX_URL,
    },
    {
      id: "mapulengua",
      icon: <MapulanguaIcon />,
      name: "Mapulengua",
      tagline: vp.projects.mapulengua.tagline,
      description: vp.projects.mapulengua.description,
      href: "https://mapulengua.vercel.app/",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50/80 via-white to-white text-zinc-900 dark:bg-[#050816] dark:bg-none dark:text-white">
      {/* Ambient blobs */}
      <div className="pointer-events-none fixed inset-0 hidden overflow-hidden dark:block">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-[28rem] w-[28rem] rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-sky-400/10 blur-3xl" />
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
          <div>
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

        <div className="mt-12 space-y-16">

          {/* ── 1. Summary ── */}
          <Section eyebrow={vp.sections.summary.eyebrow} title={vp.sections.summary.title} reduced={reduced}>
            <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-white/[0.03] sm:p-9">
              {vp.summary.map((para, i) => (
                <p
                  key={i}
                  className={`text-base leading-relaxed text-zinc-600 dark:text-zinc-300${i > 0 ? " mt-4" : ""}`}
                >
                  {para}
                </p>
              ))}
            </div>
          </Section>

          {/* ── 2. Tech Projects ── */}
          <Section eyebrow={vp.sections.projects.eyebrow} title={vp.sections.projects.title} reduced={reduced}>
            <div className="grid gap-4 sm:gap-5">
              {TECH_PROJECTS.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={revealViewport}
                  transition={{ ...easeOut, delay: reduced ? 0 : index * 0.07 }}
                >
                  <div className="group rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition-colors hover:border-indigo-200 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-cyan-400/20 sm:p-7">
                    <div className="flex items-start gap-4">
                      <div className="h-11 w-11 shrink-0 overflow-hidden rounded-2xl">
                        {project.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
                            {project.name}
                          </h3>
                          <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-xs font-medium text-zinc-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-400">
                            {project.tagline}
                          </span>
                        </div>
                        <p className="mt-2.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                          {project.description}
                        </p>
                        {project.href && (
                          <Link
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1.5 text-xs font-semibold text-indigo-700 transition hover:border-indigo-300 hover:bg-indigo-100 dark:border-cyan-400/25 dark:bg-cyan-400/10 dark:text-cyan-200 dark:hover:border-cyan-300/40 dark:hover:bg-cyan-400/15"
                          >
                            {vp.visitProject}
                            <ExternalLinkIcon />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* ── 3. Professional Journey ── */}
          <Section eyebrow={vp.sections.career.eyebrow} title={vp.sections.career.title} reduced={reduced}>
            <div className="relative">
              <div className="absolute left-[19px] top-2 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-indigo-200 via-indigo-100 to-transparent dark:from-white/15 dark:via-white/5 sm:block" />
              <div className="space-y-5">
                {vp.career.map((role, index) => (
                  <motion.div
                    key={role.company + role.period}
                    initial={reduced ? false : { opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={revealViewport}
                    transition={{ ...easeOut, delay: reduced ? 0 : index * 0.07 }}
                    className="flex gap-5"
                  >
                    <div className="relative mt-5 hidden shrink-0 sm:block">
                      <div className="h-2.5 w-2.5 rounded-full border-2 border-indigo-400 bg-white dark:border-cyan-400 dark:bg-[#050816]" />
                    </div>
                    <div className="flex-1 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03] sm:p-7">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600 dark:text-cyan-300">
                            {role.company}
                          </p>
                          <h3 className="mt-1 text-base font-bold text-zinc-900 dark:text-white sm:text-lg">
                            {role.title}
                          </h3>
                        </div>
                        <span className="shrink-0 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-400">
                          {role.period}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                        {role.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Section>

          {/* ── 4. Education ── */}
          <Section eyebrow={vp.sections.education.eyebrow} title={vp.sections.education.title} reduced={reduced}>
            <div className="space-y-4">
              {vp.education.map((edu) => (
                <div
                  key={edu.institution}
                  className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03] sm:p-7"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-indigo-200 bg-indigo-50 dark:border-white/10 dark:bg-white/[0.04]">
                      <GradCapIcon />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600 dark:text-cyan-300">
                        {edu.institution}
                      </p>
                      <h3 className="mt-1 text-base font-bold text-zinc-900 dark:text-white">
                        {edu.degree}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                        {edu.note}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

        </div>
      </main>
    </div>
  );
}
