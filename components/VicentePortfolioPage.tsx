"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import TopNav from "@/components/TopNav";
import { useLocale } from "@/components/LocaleProvider";
import { easeOut, revealViewport } from "@/lib/motion-presets";
import { RESUMEX_URL } from "@/lib/site-urls";
import styles from "./VicentePortfolioPage.module.css";

const VICENTE_LINKEDIN = "https://www.linkedin.com/in/vicente-barrientos/";
const VICENTE_GITHUB = "https://github.com/VicenteBarrientos";

const FUNDOSMART_URL = "https://fundosmart.com/";
const CONDOSYNC_URL = "https://www.condosync.cl";
const OSORNOFACTORY_URL = "https://osorno-ai-forge.vercel.app/";
const MAPULENGUA_URL = "https://mapulengua.vercel.app/";

const JOURNEY_STOPS = [
  0, 0.16, 0.26, 0.31, 0.41, 0.45, 0.55, 0.59, 0.69, 0.73, 0.83, 0.87,
  0.97, 1,
];
const WORLD_SCALE = [
  1.03, 1.23, 1.23, 1.28, 1.28, 1.24, 1.24, 1.3, 1.3, 1.26, 1.26, 1.2,
  1.2, 1.05,
];
const WORLD_X = [
  "0%", "8%", "8%", "-7%", "-7%", "3%", "3%", "-9%", "-9%", "7%",
  "7%", "-4%", "-4%", "0%",
];
const WORLD_Y = [
  "0%", "-4%", "-4%", "2%", "2%", "-2%", "-2%", "-6%", "-6%", "4%",
  "4%", "-3%", "-3%", "0%",
];
const PROJECT_CENTERS = [0.159, 0.326, 0.492, 0.659, 0.826, 0.992];
const SCRUB_SCROLL_STOPS = [0, ...PROJECT_CENTERS, 1];
const SCRUB_TIMES = [0, 0.85, 2.5, 4.15, 5.8, 7.45, 9.1, 10];
const SCRUB_FRAME_DURATION = 1 / 12;
const SCRUB_MEDIA_QUERY = "(min-width: 640px)";
const MAP_MARKERS = [
  { left: "12%", top: "72%" },
  { left: "35%", top: "54%" },
  { left: "54%", top: "57%" },
  { left: "59%", top: "45%" },
  { left: "74%", top: "45%" },
  { left: "70%", top: "35%" },
];

type NavigatorWithConnection = Navigator & {
  connection?: EventTarget & { saveData?: boolean };
};

function subscribeToScrubCapability(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(SCRUB_MEDIA_QUERY);
  const connection = (navigator as NavigatorWithConnection).connection;

  mediaQuery.addEventListener("change", onStoreChange);
  connection?.addEventListener("change", onStoreChange);

  return () => {
    mediaQuery.removeEventListener("change", onStoreChange);
    connection?.removeEventListener("change", onStoreChange);
  };
}

function getScrubCapabilitySnapshot() {
  const connection = (navigator as NavigatorWithConnection).connection;
  return window.matchMedia(SCRUB_MEDIA_QUERY).matches && !connection?.saveData;
}

function getServerScrubCapabilitySnapshot() {
  return false;
}

// ─── Project icons ─────────────────────────────────────────────────────────────

function FundoSmartIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-full w-full" aria-hidden="true">
      <circle cx="20" cy="20" r="20" className="fill-emerald-100" />
      <path
        d="M10 25l3-11 9-3 8 6-2 11-13 1z"
        className="fill-emerald-500/25 stroke-emerald-600"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="19" cy="19" r="2.8" className="fill-emerald-600" />
    </svg>
  );
}

function CondoSyncIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-full w-full" aria-hidden="true">
      <circle cx="20" cy="20" r="20" className="fill-sky-100" />
      <rect x="10" y="15" width="9" height="15" rx="1" className="fill-sky-300" />
      <rect x="20" y="10" width="10" height="20" rx="1" className="fill-sky-500" />
      <path
        d="M22.5 14h1.5M26 14h1.5M22.5 18h1.5M26 18h1.5M22.5 22h1.5M26 22h1.5"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M12.5 19h1.5M15.5 19h1.5M12.5 23h1.5M15.5 23h1.5"
        className="stroke-sky-600"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TalentXIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-full w-full" aria-hidden="true">
      <circle cx="20" cy="20" r="20" className="fill-cyan-100" />
      <path
        d="M14 28V18l6-6 6 6v10"
        className="stroke-cyan-600"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <rect x="17" y="22" width="6" height="6" rx="0.5" className="fill-cyan-500" />
      <path d="M12 18h16" className="stroke-cyan-600" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ResumeXIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-full w-full" aria-hidden="true">
      <circle cx="20" cy="20" r="20" className="fill-brand-100" />
      <rect x="12" y="10" width="16" height="20" rx="2" className="fill-brand-200" />
      <path
        d="M15 16h10M15 19h10M15 22h6"
        className="stroke-brand-500"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="27" cy="27" r="5" className="fill-brand-500" />
      <path d="M25.5 27l1 1 2-2" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function OsornoFactoryIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-full w-full" aria-hidden="true">
      <circle cx="20" cy="20" r="20" className="fill-violet-100" />
      <path d="M20 11l11 18H9l11-18z" className="fill-violet-500" />
      <path d="M20 11l4.2 6.9-2.1-1.1-2.1 1.1-2.1-1.1-2.1 1.1L20 11z" fill="white" />
      <circle cx="20" cy="24.5" r="1.8" className="fill-violet-200" />
    </svg>
  );
}

function MapulenguaIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-full w-full" aria-hidden="true">
      <circle cx="20" cy="20" r="20" className="fill-amber-100" />
      <path
        d="M11 14a2 2 0 012-2h14a2 2 0 012 2v9a2 2 0 01-2 2h-8l-5 4v-4h-1a2 2 0 01-2-2v-9z"
        className="fill-amber-500"
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
  live: "bg-emerald-400",
  private: "bg-zinc-400 ",
  building: "bg-amber-400",
};

function StatusPill({ status, label }: { status: ProjectStatus; label: string }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-300">
      <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[status]}`} />
      {label}
    </span>
  );
}

// ─── Journey map ───────────────────────────────────────────────────────────────

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function VicentePortfolioPage() {
  const { t, mounted } = useLocale();
  const prefersReducedMotion = useReducedMotion() ?? false;
  const reduced = mounted && prefersReducedMotion;
  const cameraEnabled = mounted && !prefersReducedMotion;
  const vp = t.vicentePortfolio;
  const journeyRef = useRef<HTMLElement>(null);
  const scrubVideoRef = useRef<HTMLVideoElement>(null);
  const pendingScrubTimeRef = useRef(0);
  const scrubSeekInFlightRef = useRef(false);
  const scrubFrameCallbackRef = useRef<number | null>(null);
  const scrubPaintFallbackRef = useRef<number | null>(null);
  const scrubPaintTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeProject, setActiveProject] = useState(0);
  const [scrubReady, setScrubReady] = useState(false);
  const [scrubFailed, setScrubFailed] = useState(false);
  const scrubCapable = useSyncExternalStore(
    subscribeToScrubCapability,
    getScrubCapabilitySnapshot,
    getServerScrubCapabilitySnapshot,
  );
  const scrubEligible = mounted && !prefersReducedMotion && scrubCapable;
  const scrubActive = scrubEligible && scrubReady && !scrubFailed;
  const { scrollYProgress } = useScroll({
    target: journeyRef,
    offset: ["start start", "end end"],
  });
  const journeyProgress = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 30,
    mass: 0.24,
  });
  const worldScale = useTransform(
    journeyProgress,
    JOURNEY_STOPS,
    WORLD_SCALE,
  );
  const worldX = useTransform(
    journeyProgress,
    JOURNEY_STOPS,
    WORLD_X,
  );
  const worldY = useTransform(
    journeyProgress,
    JOURNEY_STOPS,
    WORLD_Y,
  );
  const scrubTime = useTransform(
    scrollYProgress,
    SCRUB_SCROLL_STOPS,
    SCRUB_TIMES,
  );

  useEffect(() => {
    const previousScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";

    return () => {
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
    };
  }, []);

  const clampScrubTime = useCallback((video: HTMLVideoElement, requestedTime: number) => {
    const maximumTime = Math.max(
      0,
      Math.min(SCRUB_TIMES.at(-1) ?? 0, video.duration - SCRUB_FRAME_DURATION),
    );

    const clampedTime = Math.min(maximumTime, Math.max(0, requestedTime));
    return Math.round(clampedTime / SCRUB_FRAME_DURATION) * SCRUB_FRAME_DURATION;
  }, []);

  const seekToLatestScrubTime = useCallback(() => {
    const video = scrubVideoRef.current;
    if (
      !scrubEligible ||
      scrubFailed ||
      !video ||
      video.readyState < HTMLMediaElement.HAVE_METADATA ||
      scrubSeekInFlightRef.current
    ) {
      return;
    }

    const nextTime = clampScrubTime(video, pendingScrubTimeRef.current);
    if (Math.abs(video.currentTime - nextTime) <= SCRUB_FRAME_DURATION / 2) {
      setScrubReady(true);
      return;
    }

    scrubSeekInFlightRef.current = true;
    video.currentTime = nextTime;
  }, [clampScrubTime, scrubEligible, scrubFailed]);

  const cancelScheduledScrubPaint = useCallback(() => {
    const video = scrubVideoRef.current;
    if (video && scrubFrameCallbackRef.current !== null && "cancelVideoFrameCallback" in video) {
      video.cancelVideoFrameCallback(scrubFrameCallbackRef.current);
    }
    scrubFrameCallbackRef.current = null;

    if (scrubPaintFallbackRef.current !== null) {
      cancelAnimationFrame(scrubPaintFallbackRef.current);
      scrubPaintFallbackRef.current = null;
    }

    if (scrubPaintTimeoutRef.current !== null) {
      clearTimeout(scrubPaintTimeoutRef.current);
      scrubPaintTimeoutRef.current = null;
    }
  }, []);

  const continueAfterScrubFramePaint = useCallback((video: HTMLVideoElement) => {
    cancelScheduledScrubPaint();

    const flushLatest = () => {
      if (scrubFrameCallbackRef.current !== null && "cancelVideoFrameCallback" in video) {
        video.cancelVideoFrameCallback(scrubFrameCallbackRef.current);
      }
      scrubFrameCallbackRef.current = null;
      scrubPaintFallbackRef.current = null;
      if (scrubPaintTimeoutRef.current !== null) {
        clearTimeout(scrubPaintTimeoutRef.current);
        scrubPaintTimeoutRef.current = null;
      }
      scrubSeekInFlightRef.current = false;
      setScrubReady(true);
      seekToLatestScrubTime();
    };

    if ("requestVideoFrameCallback" in video) {
      scrubFrameCallbackRef.current = video.requestVideoFrameCallback(flushLatest);
      scrubPaintTimeoutRef.current = setTimeout(flushLatest, 120);
      return;
    }

    scrubPaintFallbackRef.current = requestAnimationFrame(() => {
      scrubPaintFallbackRef.current = requestAnimationFrame(flushLatest);
    });
  }, [cancelScheduledScrubPaint, seekToLatestScrubTime]);

  useEffect(() => cancelScheduledScrubPaint, [cancelScheduledScrubPaint]);

  useMotionValueEvent(scrubTime, "change", (requestedTime) => {
    pendingScrubTimeRef.current = requestedTime;
    seekToLatestScrubTime();
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    let nearest = 0;
    let shortestDistance = Number.POSITIVE_INFINITY;

    PROJECT_CENTERS.forEach((center, index) => {
      const distance = Math.abs(progress - center);
      if (distance < shortestDistance) {
        shortestDistance = distance;
        nearest = index;
      }
    });

    setActiveProject((current) => (current === nearest ? current : nearest));
  });

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
    <div className={`${styles.page} relative min-h-screen overflow-clip text-white`}>
      {/* Fixed video backdrop — the page scrolls over it */}
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#061321]"
        aria-hidden="true"
      >
        <motion.div
          className={`${styles.world} absolute -inset-[12%]`}
          style={cameraEnabled && !scrubActive ? { scale: worldScale, x: worldX, y: worldY } : undefined}
        >
          <Image
            src="/images/vicente-portfolio-world.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[62%_center] sm:object-center"
          />
          {cameraEnabled && (!scrubEligible || scrubFailed) && (
            <video
              className={`${styles.atmosphere} absolute inset-0 h-full w-full object-cover object-[62%_center] sm:object-center`}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/images/vicente-portfolio-world.webp"
            >
              <source src="/videos/vicente-portfolio-world.mp4" type="video/mp4" />
            </video>
          )}
          {!scrubActive && (
            <div className={styles.mapMarkers}>
              {PROJECTS.map((project, index) => (
                <div
                  key={project.id}
                  className={`${styles.mapMarker} ${activeProject === index ? styles.mapMarkerActive : ""}`}
                  style={MAP_MARKERS[index]}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{project.name}</strong>
                </div>
              ))}
            </div>
          )}
        </motion.div>
        {scrubEligible && !scrubFailed && (
          <video
            ref={scrubVideoRef}
            className={`${styles.scrubVideo} ${scrubReady ? styles.scrubVideoReady : ""}`}
            muted
            playsInline
            preload="auto"
            poster="/images/vicente-portfolio-world.webp"
            onLoadStart={() => {
              cancelScheduledScrubPaint();
              scrubSeekInFlightRef.current = false;
              setScrubReady(false);
            }}
            onLoadedMetadata={(event) => {
              const video = event.currentTarget;
              video.pause();
              const requestedTime = clampScrubTime(video, scrubTime.get());
              pendingScrubTimeRef.current = requestedTime;
              if (Math.abs(video.currentTime - requestedTime) > SCRUB_FRAME_DURATION / 2) {
                seekToLatestScrubTime();
              } else {
                continueAfterScrubFramePaint(video);
              }
            }}
            onSeeked={(event) => {
              continueAfterScrubFramePaint(event.currentTarget);
            }}
            onError={() => {
              cancelScheduledScrubPaint();
              scrubSeekInFlightRef.current = false;
              setScrubFailed(true);
              setScrubReady(false);
            }}
          >
            <source src="/videos/vicente-portfolio-traversal.mp4" type="video/mp4" />
          </video>
        )}
        <div className={styles.stars} />
        <div className={styles.scrim} />
        <div className={styles.vignette} />
      </div>

      <nav
        className={styles.routeRail}
        aria-label={`${vp.sections.projects.title} navigation`}
      >
        <span className={styles.routeLine} aria-hidden="true">
          <motion.span className={styles.routeFill} style={{ scaleY: scrollYProgress }} />
        </span>
        {PROJECTS.map((project, index) => (
          <a
            key={project.id}
            href={`#project-${project.id}`}
            onClick={() => setActiveProject(index)}
            aria-label={`${index + 1} of ${PROJECTS.length}: ${project.name}`}
            aria-current={activeProject === index ? "step" : undefined}
            className={`${styles.routeLink} ${activeProject === index ? styles.routeLinkActive : ""}`}
          >
            <span className={styles.routeLabel}>{project.name}</span>
            <span className={styles.routeDot} aria-hidden="true" />
          </a>
        ))}
      </nav>

      <nav
        className={styles.routeDock}
        aria-label={`${vp.sections.projects.title} navigation`}
      >
        <span className={styles.routeCount} aria-hidden="true">
          {String(activeProject + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
        </span>
        <span className={styles.routeDockName} aria-hidden="true">
          {PROJECTS[activeProject]?.name}
        </span>
        <span className={styles.routeDockDots}>
          {PROJECTS.map((project, index) => (
            <a
              key={project.id}
              href={`#project-${project.id}`}
              onClick={() => setActiveProject(index)}
              aria-label={`${index + 1} of ${PROJECTS.length}: ${project.name}`}
              aria-current={activeProject === index ? "step" : undefined}
              className={`${styles.routeDockLink} ${activeProject === index ? styles.routeDockLinkActive : ""}`}
            >
              <span aria-hidden="true" />
            </a>
          ))}
        </span>
      </nav>

      <TopNav variant="cinematic" />

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-24 sm:px-6 sm:pt-28 lg:px-8">

        {/* ── Hero header ── */}
        <motion.div
          className={`${styles.glass} relative flex min-h-[68svh] flex-col items-center justify-center gap-6 rounded-[2rem] px-6 py-16 text-center sm:min-h-[70svh] sm:px-12 lg:px-20`}
          initial={reduced ? false : { opacity: 0, y: 24, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...easeOut, duration: 0.75 }}
        >
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[1.6rem] border border-cyan-100/25 shadow-[0_18px_55px_-20px_rgba(67,194,226,0.75)] sm:h-28 sm:w-28">
            <Image
              src="/partners/vicente-barrientos.png"
              alt="Vicente Barrientos"
              fill
              className="object-cover object-top"
              sizes="128px"
              priority
            />
          </div>
          <div className="min-w-0 max-w-4xl">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200 sm:text-xs">
              {vp.eyebrow}
            </p>
            <h1 className="mt-4 text-[clamp(3rem,8.4vw,7.4rem)] font-black uppercase leading-[0.86] tracking-[-0.065em] text-white">
              <span className="block">Vicente</span>
              <span className="block text-cyan-300">Barrientos</span>
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-base font-semibold leading-relaxed text-slate-100 sm:text-lg">
              {vp.subtitle}
            </p>
            <p className="mt-1 text-sm text-slate-400 sm:text-base">
              {vp.subtitleSub}
            </p>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
              {vp.intro}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href={VICENTE_LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-cyan-200/30 bg-cyan-300 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-[#061321] shadow-[0_12px_35px_-16px_rgba(94,201,230,0.9)] transition hover:-translate-y-0.5 hover:bg-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-100"
              >
                <LinkedInIcon />
                LinkedIn
              </Link>
              <Link
                href={VICENTE_GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:-translate-y-0.5 hover:border-cyan-100/35 hover:bg-cyan-200/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-100"
              >
                <GitHubIcon />
                GitHub
              </Link>
            </div>
          </div>
          <a
            href="#portfolio-journey"
            aria-label={vp.sections.projects.title}
            className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 transition hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-100"
          >
            <span className={styles.scrollCue} aria-hidden="true" />
          </a>
        </motion.div>

        {/* ── Projects ── */}
        <section
          ref={journeyRef}
          id="portfolio-journey"
          className="mt-[22svh] scroll-mt-24 sm:mt-[30svh]"
        >
          <div className="flex min-h-[100svh] items-center py-16">
            <div className={`${styles.glass} w-full rounded-[2rem] px-6 py-12 text-center sm:px-12 sm:py-16`}>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200 sm:text-xs">
                {vp.sections.projects.eyebrow}
              </p>
              <h2 className="mt-4 text-[clamp(2.7rem,7vw,6rem)] font-black uppercase leading-[0.9] tracking-[-0.055em] text-white">
                {vp.sections.projects.title}
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                {vp.intro}
              </p>
            </div>
          </div>

          {/* The route: each project is a stop, joined by a trail that draws as you scroll */}
          <div className="relative mx-auto max-w-5xl">
            {PROJECTS.map((project, index) => (
              <div
                key={project.id}
                className="flex min-h-[110svh] items-center py-16"
              >

                <motion.div
                  id={`project-${project.id}`}
                  className={`${styles.glass} relative w-full max-w-3xl scroll-mt-24 rounded-[2rem] p-4 sm:p-7 lg:p-9 ${index % 2 === 0 ? "ml-auto" : "mr-auto"}`}
                  initial={reduced ? false : { opacity: 0, y: 28, scale: 0.985 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={revealViewport}
                  transition={{ ...easeOut, duration: 0.7 }}
                >
                  <div className="relative">
                    <div
                      className="pointer-events-none absolute inset-x-10 -bottom-3 h-10 rounded-[50%] bg-cyan-300/20 blur-2xl"
                      aria-hidden="true"
                    />
                    <div className={`${styles.projectCard} relative flex flex-col rounded-[1.55rem] p-6 sm:p-9`}>
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-2xl border border-white/15 shadow-[0_12px_36px_-16px_rgba(94,201,230,0.75)] sm:h-14 sm:w-14">
                            {project.icon}
                          </div>
                          <div>
                            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
                              {String(index + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
                            </p>
                            <h3 className="mt-1 text-[clamp(1.9rem,5vw,3.5rem)] font-black leading-none tracking-[-0.045em] text-white">
                          {project.name}
                            </h3>
                          </div>
                        </div>
                        <StatusPill status={project.status} label={vp.status[project.status]} />
                      </div>
                      <p className="mt-7 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-200/85">
                        {project.tagline}
                      </p>

                      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
                        {project.description}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {project.href && (
                        <div className="mt-7">
                          <Link
                            href={project.href}
                            {...(project.external
                              ? { target: "_blank", rel: "noopener noreferrer" }
                              : {})}
                            className="inline-flex items-center gap-2 rounded-full border border-cyan-200/25 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-cyan-100 transition hover:-translate-y-0.5 hover:border-cyan-100/45 hover:bg-cyan-300 hover:text-[#061321] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-100"
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
        </section>

        <motion.section
          className={`${styles.glass} mx-auto mt-[30svh] max-w-3xl rounded-[2rem] px-6 py-14 text-center sm:mt-[40svh] sm:px-12 sm:py-16`}
          initial={reduced ? false : { opacity: 0, y: 28, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={revealViewport}
          transition={{ ...easeOut, duration: 0.7 }}
        >
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">
            {vp.eyebrow}
          </p>
          <h2 className="mt-4 text-[clamp(2.5rem,7vw,5rem)] font-black uppercase leading-[0.9] tracking-[-0.055em] text-white">
            Vicente <span className="text-cyan-300">Barrientos</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            {vp.subtitleSub}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={VICENTE_LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-cyan-200/30 bg-cyan-300 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-[#061321] transition hover:-translate-y-0.5 hover:bg-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-100"
            >
              <LinkedInIcon />
              LinkedIn
            </Link>
            <Link
              href={VICENTE_GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:-translate-y-0.5 hover:border-cyan-100/35 hover:bg-cyan-200/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-100"
            >
              <GitHubIcon />
              GitHub
            </Link>
          </div>
        </motion.section>

      </main>
    </div>
  );
}
