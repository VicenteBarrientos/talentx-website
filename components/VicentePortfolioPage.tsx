"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
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

const PROJECT_CENTERS = [0.159, 0.326, 0.492, 0.659, 0.826, 0.992];
const PROJECT_SCRUB_TIMES = [0.5, 1.5, 2.5, 3.5, 4.5, 5.5];
const SCRUB_HOLD = 0.032;
const SCRUB_SCROLL_STOPS = [
  0,
  ...PROJECT_CENTERS.flatMap((center) => [
    Math.max(0, center - SCRUB_HOLD),
    Math.min(1, center + SCRUB_HOLD),
  ]),
];
// Lead-in, the six stops, lead-out — in seconds, so this must match the
// traversal clip's real duration. Currently a 6s flight.
const SCRUB_TIMES = [
  0,
  ...PROJECT_SCRUB_TIMES.flatMap((time) => [time, time]),
];
const SCRUB_FINAL_TIME = 6;
const SCRUB_FRAME_DURATION = 1 / 12;
type JourneyPhase = "before" | "active" | "after";
// Pointer check keeps the 2.33 MB seek-oriented traversal off touch devices.
// Phones use the lightweight ambient loop instead of unreliable video seeks.
const SCRUB_MEDIA_QUERY = "(min-width: 1024px) and (pointer: fine)";
// A seek that never reports back means the decoder is not cooperating.
// Give slow/throttled presentation several windows before using the loop.
const SCRUB_SEEK_TIMEOUT_MS = 800;
const SCRUB_SEEK_STRIKES = 6;
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

function PointerDepthCard({ children }: { children: React.ReactNode }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef({ x: 0.5, y: 0.18 });
  const pointerFrameRef = useRef<number | null>(null);

  const resetPointer = useCallback(() => {
    if (pointerFrameRef.current !== null) {
      cancelAnimationFrame(pointerFrameRef.current);
      pointerFrameRef.current = null;
    }

    const card = frameRef.current;
    card?.style.setProperty("--card-shift-x", "0px");
    card?.style.setProperty("--card-shift-y", "0px");
    card?.style.setProperty("--card-icon-shift-x", "0px");
    card?.style.setProperty("--card-icon-shift-y", "0px");
    card?.style.setProperty("--card-glow-x", "50%");
    card?.style.setProperty("--card-glow-y", "18%");
  }, []);

  const movePointer = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (
      event.pointerType !== "mouse" ||
      !window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches
    ) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    pointerRef.current = {
      x: Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width)),
      y: Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height)),
    };

    if (pointerFrameRef.current !== null) return;

    pointerFrameRef.current = requestAnimationFrame(() => {
      pointerFrameRef.current = null;
      const card = frameRef.current;
      if (!card) return;

      const { x, y } = pointerRef.current;
      card.style.setProperty("--card-shift-x", `${(x - 0.5) * 7}px`);
      card.style.setProperty("--card-shift-y", `${(y - 0.5) * 7}px`);
      card.style.setProperty("--card-icon-shift-x", `${(0.5 - x) * 2.5}px`);
      card.style.setProperty("--card-icon-shift-y", `${(0.5 - y) * 2.5}px`);
      card.style.setProperty("--card-glow-x", `${x * 100}%`);
      card.style.setProperty("--card-glow-y", `${y * 100}%`);
    });
  }, []);

  useEffect(() => resetPointer, [resetPointer]);

  return (
    <div
      ref={frameRef}
      className={styles.projectFrame}
      onPointerMove={movePointer}
      onPointerLeave={resetPointer}
      onPointerCancel={resetPointer}
    >
      {children}
    </div>
  );
}

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

function subscribeToPageLoad(onStoreChange: () => void) {
  if (document.readyState === "complete") {
    return () => {};
  }

  window.addEventListener("load", onStoreChange, { once: true });
  return () => window.removeEventListener("load", onStoreChange);
}

function getPageLoadSnapshot() {
  return document.readyState === "complete";
}

function getServerPageLoadSnapshot() {
  return false;
}

function mapRangeValue(input: number, inputs: number[], outputs: number[]) {
  const clampedInput = Math.min(inputs.at(-1) ?? input, Math.max(inputs[0] ?? input, input));

  for (let index = 1; index < inputs.length; index += 1) {
    const upperInput = inputs[index];
    if (clampedInput > upperInput) continue;

    const lowerInput = inputs[index - 1];
    const lowerOutput = outputs[index - 1];
    const upperOutput = outputs[index];
    const span = upperInput - lowerInput;
    const ratio = span === 0 ? 1 : (clampedInput - lowerInput) / span;
    return lowerOutput + (upperOutput - lowerOutput) * ratio;
  }

  return outputs.at(-1) ?? 0;
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
      <circle cx="20" cy="20" r="20" className="fill-rose-100" />
      <rect x="12" y="10" width="16" height="20" rx="2" className="fill-rose-200" />
      <path
        d="M15 16h10M15 19h10M15 22h6"
        className="stroke-rose-500"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="27" cy="27" r="5" className="fill-rose-500" />
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
  private: "bg-zinc-400",
  building: "bg-amber-400",
};

// "Live" is the baseline here — every project ships and every card links out,
// so six identical pills carry no information. Only flag the exceptions.
function StatusPill({ status, label }: { status: ProjectStatus; label: string }) {
  if (status === "live") {
    return null;
  }

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
  const exitRef = useRef<HTMLDivElement>(null);
  const atmosphereVideoRef = useRef<HTMLVideoElement>(null);
  const scrubVideoRef = useRef<HTMLVideoElement>(null);
  const pendingScrubTimeRef = useRef(0);
  const scrubSeekInFlightRef = useRef(false);
  const scrubFrameCallbackRef = useRef<number | null>(null);
  const scrubPaintFallbackRef = useRef<number | null>(null);
  const scrubPaintTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrubSeekWatchdogRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrubPrimeAnimationFrameRef = useRef<number | null>(null);
  const scrubSeekStrikesRef = useRef(0);
  const scrubSeekGenerationRef = useRef(0);
  const scrubInFlightGenerationRef = useRef(0);
  const continueAfterScrubFramePaintRef = useRef<((video: HTMLVideoElement) => void) | null>(null);
  const [activeProject, setActiveProject] = useState(0);
  const [journeyPhase, setJourneyPhase] = useState<JourneyPhase>("before");
  const [finaleReady, setFinaleReady] = useState(false);
  const [scrubReady, setScrubReady] = useState(false);
  const [scrubFailed, setScrubFailed] = useState(false);
  const pageLoaded = useSyncExternalStore(
    subscribeToPageLoad,
    getPageLoadSnapshot,
    getServerPageLoadSnapshot,
  );
  const scrubCapable = useSyncExternalStore(
    subscribeToScrubCapability,
    getScrubCapabilitySnapshot,
    getServerScrubCapabilitySnapshot,
  );
  const scrubEligible = mounted && !prefersReducedMotion && scrubCapable;
  // The poster is the LCP element; hold the traversal until the rest of
  // the page has finished loading so it does not compete for bandwidth.
  const scrubMounted = scrubEligible && pageLoaded;
  const scrubVisible = scrubMounted && scrubReady && !scrubFailed && journeyPhase !== "before";
  const atmosphereEnabled = cameraEnabled && (!scrubEligible || scrubFailed);
  const atmosphereActive = atmosphereEnabled && journeyPhase === "active";
  const atmosphereVisible = atmosphereEnabled && journeyPhase !== "before";
  const showDestination = journeyPhase === "after";
  const { scrollYProgress } = useScroll({
    target: journeyRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const atmosphere = atmosphereVideoRef.current;
    if (!atmosphere) return;

    if (!atmosphereActive) {
      atmosphere.pause();
      if (journeyPhase === "before" && atmosphere.readyState >= HTMLMediaElement.HAVE_METADATA) {
        atmosphere.currentTime = 0;
      }
      return;
    }

    atmosphere.play().catch(() => {
      // Autoplay restrictions leave the exact opening still visible.
    });
  }, [atmosphereActive, journeyPhase]);

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
      Math.min(SCRUB_FINAL_TIME, video.duration - SCRUB_FRAME_DURATION),
    );

    const clampedTime = Math.min(maximumTime, Math.max(0, requestedTime));
    return Math.round(clampedTime / SCRUB_FRAME_DURATION) * SCRUB_FRAME_DURATION;
  }, []);

  const clearSeekWatchdog = useCallback(() => {
    if (scrubSeekWatchdogRef.current !== null) {
      clearTimeout(scrubSeekWatchdogRef.current);
      scrubSeekWatchdogRef.current = null;
    }
  }, []);

  // Refs break the seek -> presentation -> latest-seek callback cycle without
  // teaching React that every scroll frame is component state.
  const seekToLatestScrubTimeRef = useRef<(() => void) | null>(null);

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

    const armSeekWatchdog = () => {
      clearSeekWatchdog();

      const checkSeek = () => {
        scrubSeekWatchdogRef.current = null;

        if (video.seeking) {
          scrubSeekStrikesRef.current += 1;

          if (scrubSeekStrikesRef.current >= SCRUB_SEEK_STRIKES) {
            scrubSeekInFlightRef.current = false;
            setScrubFailed(true);
            setScrubReady(false);
            return;
          }

          scrubSeekWatchdogRef.current = setTimeout(checkSeek, SCRUB_SEEK_TIMEOUT_MS);
          return;
        }

        // Some browsers can miss `seeked`; still require a presented frame
        // before unlocking the next coalesced seek.
        continueAfterScrubFramePaintRef.current?.(video);
      };

      scrubSeekWatchdogRef.current = setTimeout(checkSeek, SCRUB_SEEK_TIMEOUT_MS);
    };

    const nextTime = clampScrubTime(video, pendingScrubTimeRef.current);
    scrubInFlightGenerationRef.current = scrubSeekGenerationRef.current;
    scrubSeekInFlightRef.current = true;

    if (Math.abs(video.currentTime - nextTime) <= SCRUB_FRAME_DURATION / 2) {
      if (video.seeking) {
        armSeekWatchdog();
      } else {
        continueAfterScrubFramePaintRef.current?.(video);
      }
      return;
    }

    video.currentTime = nextTime;
    armSeekWatchdog();
  }, [clampScrubTime, clearSeekWatchdog, scrubEligible, scrubFailed]);

  useEffect(() => {
    seekToLatestScrubTimeRef.current = seekToLatestScrubTime;
  }, [seekToLatestScrubTime]);

  const cancelScheduledScrubPaint = useCallback(() => {
    clearSeekWatchdog();

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
  }, [clearSeekWatchdog]);

  const continueAfterScrubFramePaint = useCallback((video: HTMLVideoElement) => {
    cancelScheduledScrubPaint();
    let settled = false;

    const flushLatest = () => {
      if (settled) return;
      settled = true;
      if (scrubFrameCallbackRef.current !== null && "cancelVideoFrameCallback" in video) {
        video.cancelVideoFrameCallback(scrubFrameCallbackRef.current);
      }
      scrubFrameCallbackRef.current = null;
      scrubPaintFallbackRef.current = null;
      if (scrubPaintTimeoutRef.current !== null) {
        clearTimeout(scrubPaintTimeoutRef.current);
        scrubPaintTimeoutRef.current = null;
      }
      clearSeekWatchdog();
      const completedGeneration = scrubInFlightGenerationRef.current;
      scrubSeekStrikesRef.current = 0;
      scrubSeekInFlightRef.current = false;
      setScrubReady(true);
      queueMicrotask(() => {
        if (completedGeneration !== scrubSeekGenerationRef.current) {
          seekToLatestScrubTimeRef.current?.();
        }
      });
    };

    const confirmWithoutVideoFrameCallback = () => {
      if (settled) return;
      scrubPaintTimeoutRef.current = null;

      if (!video.seeking && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        scrubPaintFallbackRef.current = requestAnimationFrame(() => {
          scrubPaintFallbackRef.current = requestAnimationFrame(flushLatest);
        });
        return;
      }

      scrubSeekStrikesRef.current += 1;

      if (scrubSeekStrikesRef.current >= SCRUB_SEEK_STRIKES) {
        settled = true;
        scrubSeekInFlightRef.current = false;
        setScrubFailed(true);
        setScrubReady(false);
        return;
      }

      scrubPaintTimeoutRef.current = setTimeout(
        confirmWithoutVideoFrameCallback,
        SCRUB_SEEK_TIMEOUT_MS,
      );
    };

    const retryPresentation = () => {
      if (settled) return;
      if (scrubFrameCallbackRef.current !== null && "cancelVideoFrameCallback" in video) {
        video.cancelVideoFrameCallback(scrubFrameCallbackRef.current);
      }
      scrubFrameCallbackRef.current = null;
      scrubPaintTimeoutRef.current = null;
      if (!video.seeking && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        // In backgrounded or throttled tabs Chrome may suppress RVFC entirely,
        // even though the decoded frame is ready. Double-rAF is the conservative
        // presentation fallback and avoids treating that as a media failure.
        scrubPaintFallbackRef.current = requestAnimationFrame(() => {
          scrubPaintFallbackRef.current = requestAnimationFrame(flushLatest);
        });
        return;
      }

      confirmWithoutVideoFrameCallback();
    };

    const supportsVideoFrameCallback =
      typeof video.requestVideoFrameCallback === "function";

    if (supportsVideoFrameCallback) {
      scrubFrameCallbackRef.current = video.requestVideoFrameCallback(flushLatest);
      scrubPaintTimeoutRef.current = setTimeout(retryPresentation, SCRUB_SEEK_TIMEOUT_MS);
      return;
    }

    confirmWithoutVideoFrameCallback();
  }, [cancelScheduledScrubPaint, clearSeekWatchdog]);

  useEffect(() => {
    continueAfterScrubFramePaintRef.current = continueAfterScrubFramePaint;
  }, [continueAfterScrubFramePaint]);

  useEffect(() => cancelScheduledScrubPaint, [cancelScheduledScrubPaint]);

  useEffect(() => {
    if (!scrubMounted || scrubFailed || scrubReady) return;

    const video = scrubVideoRef.current;
    if (!video || video.readyState < HTMLMediaElement.HAVE_METADATA) return;

    const primeVideoFrameCallback = async () => {
      try {
        await video.play();
        scrubPrimeAnimationFrameRef.current = requestAnimationFrame(() => {
          video.pause();
          scrubPrimeAnimationFrameRef.current = null;
          continueAfterScrubFramePaintRef.current?.(video);
        });
      } catch {
        // Muted autoplay can still be blocked. The double-rAF confirmation in
        // the presentation helper keeps the poster/fallback path functional.
        continueAfterScrubFramePaintRef.current?.(video);
      }
    };

    void primeVideoFrameCallback();

    return () => {
      if (scrubPrimeAnimationFrameRef.current !== null) {
        cancelAnimationFrame(scrubPrimeAnimationFrameRef.current);
        scrubPrimeAnimationFrameRef.current = null;
      }
      video.pause();
    };
  }, [scrubFailed, scrubMounted, scrubReady]);

  useEffect(() => () => {
    if (scrubPrimeAnimationFrameRef.current !== null) {
      cancelAnimationFrame(scrubPrimeAnimationFrameRef.current);
    }
  }, []);

  const syncProgress = useCallback((progress: number) => {
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
    pendingScrubTimeRef.current = mapRangeValue(progress, SCRUB_SCROLL_STOPS, SCRUB_TIMES);
    scrubSeekGenerationRef.current += 1;

    seekToLatestScrubTimeRef.current?.();
  }, []);

  const syncExitProgress = useCallback((progress: number) => {
    const requestedTime = mapRangeValue(
      progress,
      [0, 1],
      [PROJECT_SCRUB_TIMES.at(-1) ?? 0, SCRUB_FINAL_TIME],
    );
    pendingScrubTimeRef.current = requestedTime;
    scrubSeekGenerationRef.current += 1;
    seekToLatestScrubTimeRef.current?.();
  }, []);

  useLayoutEffect(() => {
    let animationFrame: number | null = null;

    const syncJourneyFromViewport = () => {
      animationFrame = null;
      const journey = journeyRef.current;
      if (!journey) return;

      const bounds = journey.getBoundingClientRect();
      if (bounds.top > 1) {
        setJourneyPhase((current) => (current === "before" ? current : "before"));
        syncProgress(0);
        return;
      }

      const exit = exitRef.current;
      if (exit && exit.getBoundingClientRect().bottom <= window.innerHeight + 1) {
        setJourneyPhase((current) => (current === "after" ? current : "after"));
        setActiveProject(PROJECT_CENTERS.length - 1);
        pendingScrubTimeRef.current = SCRUB_FINAL_TIME;
        scrubSeekGenerationRef.current += 1;
        seekToLatestScrubTimeRef.current?.();
        return;
      }

      setJourneyPhase((current) => (current === "active" ? current : "active"));

      if (exit) {
        const exitBounds = exit.getBoundingClientRect();
        if (exitBounds.top < window.innerHeight) {
          const exitProgressValue = Math.min(
            1,
            Math.max(0, (window.innerHeight - exitBounds.top) / Math.max(1, exitBounds.height)),
          );
          setActiveProject(PROJECT_CENTERS.length - 1);
          syncExitProgress(exitProgressValue);
          return;
        }
      }

      const progress = Math.min(1, Math.max(0, -bounds.top / Math.max(1, bounds.height - window.innerHeight)));
      syncProgress(progress);
    };

    const scheduleSync = () => {
      if (animationFrame !== null) return;
      animationFrame = requestAnimationFrame(syncJourneyFromViewport);
    };

    syncJourneyFromViewport();
    window.addEventListener("scroll", scheduleSync, { passive: true });
    window.addEventListener("resize", scheduleSync);
    window.addEventListener("pageshow", scheduleSync);

    return () => {
      window.removeEventListener("scroll", scheduleSync);
      window.removeEventListener("resize", scheduleSync);
      window.removeEventListener("pageshow", scheduleSync);
      if (animationFrame !== null) cancelAnimationFrame(animationFrame);
    };
  }, [syncExitProgress, syncProgress]);

  useEffect(() => {
    if (!scrubMounted || scrubFailed) return;

    if (journeyPhase === "before") {
      pendingScrubTimeRef.current = 0;
    } else if (journeyPhase === "after") {
      pendingScrubTimeRef.current = SCRUB_FINAL_TIME;
    }
    scrubSeekGenerationRef.current += 1;
    seekToLatestScrubTimeRef.current?.();
  }, [journeyPhase, scrubFailed, scrubMounted]);

  const PROJECTS: {
    id: string;
    name: string;
    icon: React.ReactNode;
    tagline: string;
    description: string;
    stack: string[];
    status: ProjectStatus;
    shot?: string;
    href?: string;
    external?: boolean;
  }[] = [
    {
      id: "fundosmart",
      shot: "/images/projects/fundosmart.webp",
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
      shot: "/images/projects/condosync.webp",
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
      shot: "/images/projects/talentx.webp",
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
      shot: "/images/projects/resumex.webp",
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
      shot: "/images/projects/osornofactory.webp",
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
      shot: "/images/projects/mapulengua.webp",
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
        className={`${styles.backdrop} ${journeyPhase === "before" ? styles.coverPhase : ""} ${journeyPhase === "after" ? styles.finalePhase : ""} pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#061321]`}
        aria-hidden="true"
      >
        <Image
          src="/images/vicente-portfolio-studio-cover.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.coverImage}
        />
        <div
          className={`${styles.mediaStage} ${journeyPhase !== "before" ? styles.mediaStageVisible : ""} absolute -inset-[12%]`}
        >
          <Image
            src="/images/vicente-portfolio-opening.webp"
            alt=""
            fill
            unoptimized
            sizes="100vw"
            className="object-cover object-[62%_center] sm:object-center"
          />
          {atmosphereEnabled && (
            <video
              ref={atmosphereVideoRef}
              className={`${styles.atmosphereVideo} ${atmosphereVisible ? styles.atmosphereVideoVisible : ""} absolute inset-0 h-full w-full object-cover object-[62%_center] sm:object-center`}
              loop
              muted
              playsInline
              preload="metadata"
              poster="/images/vicente-portfolio-opening.webp"
              onCanPlay={(event) => {
                if (!atmosphereActive) {
                  event.currentTarget.pause();
                  return;
                }

                event.currentTarget.play().catch(() => {
                  // Low Power Mode and autoplay policy intentionally fall back
                  // to the opening image without affecting the content layer.
                });
              }}
            >
              <source src="/videos/vicente-portfolio-world.mp4" type="video/mp4" />
            </video>
          )}
          {scrubMounted && !scrubFailed && (
            <video
              ref={scrubVideoRef}
              className={`${styles.scrubVideo} ${scrubVisible ? styles.scrubVideoReady : ""} object-[62%_center] sm:object-center`}
              muted
              playsInline
              preload="auto"
              poster="/images/vicente-portfolio-opening.webp"
              onLoadStart={() => {
                cancelScheduledScrubPaint();
                scrubSeekInFlightRef.current = false;
                setScrubReady(false);
              }}
              onLoadedMetadata={(event) => {
                const video = event.currentTarget;
                video.pause();
                const requestedTime = clampScrubTime(video, pendingScrubTimeRef.current);
                pendingScrubTimeRef.current = requestedTime;
                seekToLatestScrubTime();
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
          <Image
            src="/images/vicente-portfolio-destination.webp"
            alt=""
            fill
            unoptimized
            sizes="100vw"
            className={`${styles.destinationImage} ${showDestination ? styles.destinationImageVisible : ""} object-cover object-[62%_center] sm:object-center`}
          />
          <Image
            src="/images/vicente-portfolio-finale.webp"
            alt=""
            fill
            sizes="100vw"
            loading="eager"
            onLoad={() => setFinaleReady(true)}
            className={`${styles.finaleImage} ${showDestination && finaleReady ? styles.finaleImageVisible : ""}`}
          />
          {mounted && prefersReducedMotion && journeyPhase === "active" && (
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
        </div>
        <div
          className={`${styles.stars} ${!mounted || journeyPhase !== "active" ? styles.starsPaused : ""}`}
        />
        <div className={styles.scrim} />
        <div className={styles.vignette} />
      </div>

      <nav
        className={`${styles.routeRail} ${journeyPhase === "active" ? styles.routeNavVisible : ""}`}
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
        className={`${styles.routeDock} ${journeyPhase === "active" ? styles.routeNavVisible : ""}`}
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
          className={styles.hero}
          initial={reduced ? false : { opacity: 0, y: 24, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...easeOut, duration: 0.75 }}
        >
          <div className={styles.heroCopy}>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200 sm:text-xs">
              {vp.eyebrow}
            </p>
            <h1 className="mt-4 text-[clamp(2.8rem,6.1vw,5.6rem)] font-black uppercase leading-[0.86] tracking-[-0.065em] text-white">
              <span className="block">Vicente</span>
              <span className="block text-cyan-300">Barrientos</span>
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-base font-semibold leading-relaxed text-slate-100 sm:text-lg lg:mx-0">
              {vp.subtitle}
            </p>
            <p className="mt-1 text-sm text-slate-200 sm:text-base">
              {vp.subtitleSub}
            </p>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-100 sm:text-base lg:mx-0">
              {vp.intro}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
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
            className={`${styles.heroScrollCue} absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 transition hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-100`}
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
            <div className={`${styles.journeyIntro} mx-auto w-full max-w-5xl px-6 py-12 text-center sm:px-12 sm:py-16`}>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200 sm:text-xs">
                {vp.sections.projects.eyebrow}
              </p>
              <h2 className="mt-4 text-[clamp(2.7rem,7vw,6rem)] font-black uppercase leading-[0.9] tracking-[-0.055em] text-white">
                {vp.sections.projects.title}
              </h2>
            </div>
          </div>

          {/* The route: each project is a stop, joined by a trail that draws as you scroll */}
          <div className="relative mx-auto max-w-6xl">
            {PROJECTS.map((project, index) => (
              <div
                key={project.id}
                className="flex min-h-[110svh] items-center py-16"
              >

                <motion.div
                  id={`project-${project.id}`}
                  className={`relative w-full max-w-4xl scroll-mt-24 ${index % 2 === 0 ? "mr-auto" : "ml-auto"}`}
                  initial={reduced ? false : { opacity: 0, y: 28, scale: 0.985 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={revealViewport}
                  transition={{ ...easeOut, duration: 0.7 }}
                >
                  <PointerDepthCard>
                    <div className={styles.projectGlow} aria-hidden="true" />
                    <div className={`${styles.projectCard} relative rounded-[1.75rem] p-5 sm:p-7 lg:p-8`}>
                      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.93fr)_minmax(0,1.07fr)] lg:items-stretch lg:gap-8">
                        <div className="relative z-10 flex min-w-0 flex-col">
                          <div className="flex flex-wrap items-start justify-between gap-4">
                            <div className="flex min-w-0 items-center gap-4">
                              <div className={`${styles.projectIcon} h-12 w-12 shrink-0 overflow-hidden rounded-2xl border border-white/15 shadow-[0_12px_36px_-16px_rgba(94,201,230,0.75)] sm:h-14 sm:w-14`}>
                                {project.icon}
                              </div>
                              <div className="min-w-0">
                                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
                                  {String(index + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
                                </p>
                                <h3 className="mt-1 truncate text-[clamp(1.9rem,4vw,3.2rem)] font-black leading-none tracking-[-0.045em] text-white">
                                  {project.name}
                                </h3>
                              </div>
                            </div>
                            <StatusPill status={project.status} label={vp.status[project.status]} />
                          </div>

                          <p className="mt-7 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-200/90">
                            {project.tagline}
                          </p>
                          <p className="mt-4 text-sm leading-relaxed text-slate-200 sm:text-[0.95rem]">
                            {project.description}
                          </p>

                          <div className="mt-6 flex flex-wrap gap-2">
                            {project.stack.map((tech) => (
                              <span
                                key={tech}
                                className="rounded-full border border-white/12 bg-[#061321]/55 px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-slate-200"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          {project.href && (
                            <div className="mt-7 lg:mt-auto lg:pt-7">
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

                        {project.shot && (
                          <div className={`${styles.projectMedia} relative min-h-48 overflow-hidden rounded-[1.25rem] border border-white/14 bg-white/[0.04] shadow-[0_28px_70px_-34px_rgba(0,0,0,0.95)] sm:min-h-56 lg:min-h-0`}>
                            <Image
                              src={project.shot}
                              alt=""
                              fill
                              sizes="(min-width: 1024px) 430px, 90vw"
                              className="object-cover object-top"
                            />
                            <div className={styles.projectMediaShade} aria-hidden="true" />
                          </div>
                        )}
                      </div>
                    </div>
                  </PointerDepthCard>
                </motion.div>
              </div>
            ))}
          </div>
        </section>

        <div
          ref={exitRef}
          className="h-[30svh] sm:h-[40svh]"
          aria-hidden="true"
        />

        <motion.section
          className={`${styles.finalOutro} max-w-3xl px-6 py-14 text-center sm:px-12 sm:py-16`}
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
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-slate-200 sm:text-base lg:mx-0">
            {vp.subtitleSub}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
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
