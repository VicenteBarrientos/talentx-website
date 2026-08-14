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
import {
  RESUMEX_URL,
  VICENTE_GITHUB_URL,
  VICENTE_LINKEDIN_URL,
} from "@/lib/site-urls";
import styles from "./VicentePortfolioPage.module.css";

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
// The journey is a preloaded frame sequence, not a scrubbed video: 73 stills at
// 12 fps covering the same 6 s flight. Seeking a video was latency-bound and
// showed only a quarter of the footage during a normal scroll.
const JOURNEY_FRAME_COUNT = 73;
const journeyFrameSrc = (index: number) =>
  `/images/journey/f_${String(index + 1).padStart(3, "0")}.webp`;
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

const SCRAMBLE_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// The eyebrow settles out of noise into its word. Only the aria-hidden copy is
// ever scrambled — the real string stays in the DOM — so a screen reader can
// never read a half-decoded word. Monospace plus a fixed length keeps the box
// the same width throughout, so nothing around it moves.
function ScrambleText({ text, active }: { text: string; active: boolean }) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!active) return;

    let step = 0;
    const total = text.length * 3 + 6;

    const interval = setInterval(() => {
      step += 1;
      const settled = Math.floor((step / total) * text.length);

      if (step >= total) {
        setDisplay(text);
        clearInterval(interval);
        return;
      }

      setDisplay(
        text
          .split("")
          .map((character, index) =>
            index < settled || character === " "
              ? character
              : SCRAMBLE_ALPHABET[Math.floor(Math.random() * SCRAMBLE_ALPHABET.length)],
          )
          .join(""),
      );
    }, 45);

    return () => clearInterval(interval);
  }, [active, text]);

  // Reading through `active` rather than resetting state in the effect keeps the
  // server render, reduced-motion and post-settle output identical to `text`.
  return (
    <>
      <span aria-hidden="true">{active ? display : text}</span>
      <span className="sr-only">{text}</span>
    </>
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

function subscribeToDataSaver(onStoreChange: () => void) {
  const connection = (navigator as NavigatorWithConnection).connection;

  connection?.addEventListener("change", onStoreChange);
  return () => connection?.removeEventListener("change", onStoreChange);
}

function getDataSaverSnapshot() {
  return Boolean((navigator as NavigatorWithConnection).connection?.saveData);
}

function getServerDataSaverSnapshot() {
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
    <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-brand-200 bg-white/80 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-600">
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
  const dockDotsRef = useRef<HTMLSpanElement>(null);
  const dockDraggingRef = useRef(false);
  const dockMovedRef = useRef(false);
  const dockStartXRef = useRef(0);
  // Sampled once per drag, so the mapping cannot slide under the pointer if the
  // dock relayouts mid-gesture.
  const dockCentresRef = useRef<number[]>([]);
  const coverVideoRef = useRef<HTMLVideoElement>(null);
  const atmosphereVideoRef = useRef<HTMLVideoElement>(null);
  const frameSurfaceRef = useRef<HTMLImageElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameIndexRef = useRef(-1);
  const pendingScrubTimeRef = useRef(0);
  const showFrameForTimeRef = useRef<((time: number) => void) | null>(null);
  const [activeProject, setActiveProject] = useState(0);
  const [journeyPhase, setJourneyPhase] = useState<JourneyPhase>("before");
  const [coverVideoReady, setCoverVideoReady] = useState(false);
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
  const dataSaver = useSyncExternalStore(
    subscribeToDataSaver,
    getDataSaverSnapshot,
    getServerDataSaverSnapshot,
  );
  // Keep the priority image as the LCP element, then bring the decorative loop
  // in after load. Reduced-motion, data-saver and autoplay failures continue to
  // see the same complete studio artwork rather than an empty video surface.
  const coverVideoEnabled = cameraEnabled && !dataSaver && pageLoaded;
  const coverVideoActive = coverVideoEnabled && journeyPhase === "before";
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
    const coverVideo = coverVideoRef.current;
    if (!coverVideo) return;

    if (!coverVideoActive) {
      coverVideo.pause();
      return;
    }

    coverVideo.play().catch(() => {
      // The priority studio image remains visible when autoplay is unavailable.
    });
  }, [coverVideoActive]);

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


  // Drawing a preloaded frame replaces seeking a video. The old pipeline was
  // latency-bound: it issued a seek, waited for presentation, then jumped to the
  // newest target — so a normal scroll showed 19 of the clip's 73 frames and
  // lurched up to seven frames at a time. An image swap has no such ceiling.
  const showFrameForTime = useCallback((requestedTime: number) => {
    const surface = frameSurfaceRef.current;
    const frames = framesRef.current;
    if (!surface || frames.length === 0) return;

    const index = Math.min(
      frames.length - 1,
      Math.max(0, Math.round(requestedTime / SCRUB_FRAME_DURATION)),
    );
    if (index === currentFrameIndexRef.current) return;

    const frame = frames[index];
    if (!frame) return;

    currentFrameIndexRef.current = index;
    surface.src = frame.src;
  }, []);

  useEffect(() => {
    showFrameForTimeRef.current = showFrameForTime;
  }, [showFrameForTime]);

  // Preload and decode every frame before the journey may be scrubbed, so a
  // swap during scroll is a pointer assignment and never a network round trip.
  useEffect(() => {
    if (!scrubMounted || scrubFailed) return;

    let cancelled = false;
    const loaded: HTMLImageElement[] = [];

    const preload = async () => {
      try {
        await Promise.all(
          Array.from({ length: JOURNEY_FRAME_COUNT }, (_, i) => {
            // `Image` here is next/image; the DOM constructor lives on window.
            const image = new window.Image();
            image.src = journeyFrameSrc(i);
            loaded[i] = image;
            return image.decode().catch(() => undefined);
          }),
        );

        if (cancelled) return;

        if (loaded.some((image) => !image?.complete || image.naturalWidth === 0)) {
          setScrubFailed(true);
          return;
        }

        framesRef.current = loaded;
        currentFrameIndexRef.current = -1;
        showFrameForTimeRef.current?.(pendingScrubTimeRef.current);
        setScrubReady(true);
      } catch {
        if (!cancelled) setScrubFailed(true);
      }
    };

    void preload();

    return () => {
      cancelled = true;
    };
  }, [scrubFailed, scrubMounted, showFrameForTime]);


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

    showFrameForTimeRef.current?.(pendingScrubTimeRef.current);
  }, []);

  const syncExitProgress = useCallback((progress: number) => {
    const requestedTime = mapRangeValue(
      progress,
      [0, 1],
      [PROJECT_SCRUB_TIMES.at(-1) ?? 0, SCRUB_FINAL_TIME],
    );
    pendingScrubTimeRef.current = requestedTime;
    showFrameForTimeRef.current?.(pendingScrubTimeRef.current);
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
            showFrameForTimeRef.current?.(pendingScrubTimeRef.current);
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
    showFrameForTimeRef.current?.(pendingScrubTimeRef.current);
  }, [journeyPhase, scrubFailed, scrubMounted]);

  // A stop is reached by centring its card, which is also how the scroll math
  // is verified — so navigate to the same place the constants describe, rather
  // than to the anchor's top-aligned position.
  const scrollToStop = useCallback(
    (index: number) => {
      const cards = document.querySelectorAll<HTMLElement>('[id^="project-"]');
      if (cards.length === 0) return;

      const card = cards[Math.min(cards.length - 1, Math.max(0, index))];
      if (!card) return;

      const bounds = card.getBoundingClientRect();
      window.scrollTo({
        top: bounds.top + window.scrollY + bounds.height / 2 - window.innerHeight / 2,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    },
    [prefersReducedMotion],
  );

  // Dragging across the dock flies the traversal. Each dot's centre maps to its
  // own entry in PROJECT_CENTERS, so releasing over a dot lands on that stop
  // rather than somewhere proportional to the dock's width. Scrolling is
  // instant on purpose: a smooth animation would lag behind the finger.
  const scrubDockToClientX = useCallback((clientX: number) => {
    const journey = journeyRef.current;
    const centres = dockCentresRef.current;
    if (!journey || centres.length !== PROJECT_CENTERS.length) return;

    const progress = mapRangeValue(clientX, centres, PROJECT_CENTERS);
    const range = Math.max(1, journey.offsetHeight - window.innerHeight);
    const top = journey.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({ top: top + progress * range, behavior: "auto" });
  }, []);

  const endDockDrag = useCallback((event: React.PointerEvent<HTMLSpanElement>) => {
    if (!dockDraggingRef.current) return;
    dockDraggingRef.current = false;
    try {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    } catch {
      // Already released by the browser.
    }
  }, []);

  // Travel the journey from the keyboard. Deliberately no arrows, Page keys,
  // Home/End or Space: the journey is ~6,000px of readable cards, and taking
  // those away would cost keyboard-only visitors line-by-line scrolling to buy
  // a shortcut. J/K, N/P and 1-6 carry no native scrolling meaning.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      const target = event.target as HTMLElement | null;
      if (
        target?.isContentEditable ||
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT"
      ) {
        return;
      }

      const key = event.key.toLowerCase();

      if (key === "j" || key === "n") {
        event.preventDefault();
        scrollToStop(journeyPhase === "before" ? 0 : activeProject + 1);
        return;
      }

      if (key === "k" || key === "p") {
        event.preventDefault();
        scrollToStop(journeyPhase === "after" ? activeProject : activeProject - 1);
        return;
      }

      if (key >= "1" && key <= "9") {
        event.preventDefault();
        scrollToStop(Number(key) - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeProject, journeyPhase, scrollToStop]);

  const PROJECTS: {
    id: string;
    name: string;
    icon: React.ReactNode;
    tagline: string;
    description: string;
    stack: string[];
    status: ProjectStatus;
    shot?: string;
    shotAlt?: string;
    href?: string;
    external?: boolean;
  }[] = [
    {
      id: "fundosmart",
      shot: "/images/projects/fundosmart.webp",
      shotAlt: vp.projects.fundosmart.shotAlt,
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
      shotAlt: vp.projects.condosync.shotAlt,
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
      shotAlt: vp.projects.talentx.shotAlt,
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
      shotAlt: vp.projects.resumex.shotAlt,
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
      shotAlt: vp.projects.osornofactory.shotAlt,
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
      shotAlt: vp.projects.mapulengua.shotAlt,
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
    <div className={`${styles.page} relative min-h-screen overflow-clip text-zinc-950`}>
      {/* Fixed video backdrop — the page scrolls over it */}
      <div
        className={`${styles.backdrop} ${journeyPhase === "before" ? styles.coverPhase : ""} ${journeyPhase === "after" ? styles.finalePhase : ""} pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#e2e6ec]`}
        aria-hidden="true"
      >
        {/* Same src and sizes as the sharp copy below, so the softened side
            fill reuses the optimized file rather than costing a download. */}
        <Image
          src="/images/vicente-portfolio-studio-cover.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.coverFill}
        />
        <Image
          src="/images/vicente-portfolio-studio-cover.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.coverImage}
        />
        {coverVideoEnabled && (
          <video
            ref={coverVideoRef}
            className={`${styles.coverVideo} ${coverVideoReady && coverVideoActive ? styles.coverVideoVisible : ""}`}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/images/vicente-portfolio-studio-cover.webp"
            onCanPlay={(event) => {
              setCoverVideoReady(true);

              if (!coverVideoActive) {
                event.currentTarget.pause();
                return;
              }

              event.currentTarget.play().catch(() => {
                // Autoplay restrictions intentionally leave the still visible.
              });
            }}
            onError={() => setCoverVideoReady(false)}
            aria-hidden="true"
          >
            <source src="/videos/vicente-portfolio-studio-loop.mp4" type="video/mp4" />
          </video>
        )}
        <div
          className={`${styles.mediaStage} ${journeyPhase !== "before" ? styles.mediaStageVisible : ""} absolute inset-0`}
        >
          {/* One static wash behind the whole stage. It is the opening still and
              never changes, so it rasterizes once — blurring the live journey
              frame instead would re-blur the viewport on every frame swap. */}
          <Image
            src="/images/vicente-portfolio-opening.webp"
            alt=""
            fill
            unoptimized
            sizes="100vw"
            className={styles.stageFill}
          />
          <Image
            src="/images/vicente-portfolio-opening.webp"
            alt=""
            fill
            unoptimized
            sizes="100vw"
            className={`${styles.openingImage} object-[62%_center] sm:object-center`}
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
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              ref={frameSurfaceRef}
              alt=""
              aria-hidden="true"
              src={journeyFrameSrc(0)}
              decoding="sync"
              className={`${styles.scrubVideo} ${scrubVisible ? styles.scrubVideoReady : ""} object-[62%_center] sm:object-center`}
            />
          )}
          <Image
            src="/images/vicente-portfolio-destination.webp"
            alt=""
            fill
            unoptimized
            sizes="100vw"
            className={`${styles.destinationImage} ${showDestination ? styles.destinationImageVisible : ""} object-[62%_center] sm:object-center`}
          />
          <Image
            src="/images/vicente-portfolio-finale.webp"
            alt=""
            fill
            sizes="100vw"
            loading="eager"
            className={`${styles.finaleFill} ${showDestination && finaleReady ? styles.finaleFillVisible : ""}`}
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
        aria-keyshortcuts="J K 1 2 3 4 5 6"
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
        {/* Announced to assistive tech by aria-keyshortcuts above; this is the
            sighted equivalent, and the rail only renders where a keyboard is. */}
        <span className={styles.routeHint} aria-hidden="true">
          <kbd>J</kbd>
          <kbd>K</kbd>
        </span>
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
        <span
          ref={dockDotsRef}
          className={styles.routeDockDots}
          onPointerDown={(event) => {
            dockDraggingRef.current = true;
            dockMovedRef.current = false;
            dockStartXRef.current = event.clientX;
            dockCentresRef.current = Array.from(event.currentTarget.children, (dot) => {
              const bounds = dot.getBoundingClientRect();
              return bounds.left + bounds.width / 2;
            });
            // Capture keeps the drag alive past the dock's edges. Losing it is
            // survivable — the drag just ends at the boundary — so never let a
            // refusal take the handler down with it.
            try {
              event.currentTarget.setPointerCapture(event.pointerId);
            } catch {
              // Pointer already released, or capture unsupported.
            }
          }}
          onPointerMove={(event) => {
            if (!dockDraggingRef.current) return;
            if (Math.abs(event.clientX - dockStartXRef.current) > 3) {
              dockMovedRef.current = true;
            }
            if (!dockMovedRef.current) return;
            scrubDockToClientX(event.clientX);
          }}
          onPointerUp={endDockDrag}
          onPointerCancel={endDockDrag}
          // A drag that ends over a dot must not also follow that dot's anchor.
          onClickCapture={(event) => {
            if (!dockMovedRef.current) return;
            event.preventDefault();
            event.stopPropagation();
          }}
        >
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

      <TopNav />

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-24 sm:px-6 sm:pt-28 lg:px-8">

        {/* ── Hero header ── */}
        <motion.div
          className={styles.hero}
          initial={reduced ? false : { opacity: 0, y: 24, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...easeOut, duration: 0.75 }}
        >
          <div className={styles.heroCopy}>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-100 sm:text-xs">
              <ScrambleText text={vp.eyebrow} active={cameraEnabled} />
            </p>
            <h1 className={`${styles.displayHeading} mt-4 text-[clamp(2.8rem,6.1vw,5.6rem)] font-black uppercase leading-[0.86] tracking-[-0.065em] text-white`}>
              {["Vicente", "Barrientos"].map((line, index) => (
                <span key={line} className={styles.heroLineMask}>
                  <motion.span
                    className="block"
                    initial={reduced ? false : { y: "115%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.95, delay: 0.12 + index * 0.11, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-base font-semibold leading-relaxed text-white sm:text-lg lg:mx-0">
              {vp.subtitle}
            </p>
            <p className="mt-1 text-sm text-brand-100 sm:text-base">
              {vp.subtitleSub}
            </p>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-zinc-100 sm:text-base lg:mx-0">
              {vp.intro}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Link
                href={VICENTE_LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-brand-600 bg-brand-600 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-[0_18px_55px_-20px_rgba(29,53,89,0.55)] transition hover:-translate-y-0.5 hover:border-brand-700 hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                <LinkedInIcon />
                LinkedIn
              </Link>
              <Link
                href={VICENTE_GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/75 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-zinc-700 transition hover:-translate-y-0.5 hover:border-brand-300 hover:bg-white hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                <GitHubIcon />
                GitHub
              </Link>
            </div>
          </div>
          <a
            href="#portfolio-journey"
            aria-label={vp.sections.projects.title}
            className={`${styles.heroScrollCue} absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-100 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white`}
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
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-100 sm:text-xs">
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
                              <div className={`${styles.projectIcon} h-12 w-12 shrink-0 overflow-hidden rounded-2xl border border-brand-200 shadow-[0_12px_36px_-16px_rgba(29,53,89,0.35)] sm:h-14 sm:w-14`}>
                                {project.icon}
                              </div>
                              <div className="min-w-0">
                                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-600">
                                  {String(index + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
                                </p>
                                <h3 className="mt-1 truncate text-[clamp(1.9rem,4vw,3.2rem)] font-black leading-none tracking-[-0.045em] text-zinc-950">
                                  {project.name}
                                </h3>
                              </div>
                            </div>
                            <StatusPill status={project.status} label={vp.status[project.status]} />
                          </div>

                          <p className="mt-7 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600">
                            {project.tagline}
                          </p>
                          <p className="mt-4 text-sm leading-relaxed text-zinc-600 sm:text-[0.95rem]">
                            {project.description}
                          </p>

                          <div className="mt-6 flex flex-wrap gap-2">
                            {project.stack.map((tech) => (
                              <span
                                key={tech}
                                className="rounded-full border border-brand-200 bg-brand-50/90 px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-zinc-700"
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
                                className="inline-flex items-center gap-2 rounded-full border border-brand-600 bg-brand-600 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:-translate-y-0.5 hover:border-brand-700 hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                              >
                                {vp.visitProject}
                                {project.external ? <ExternalLinkIcon /> : <ArrowRightIcon />}
                              </Link>
                            </div>
                          )}
                        </div>

                        {project.shot && (
                          <div className={`${styles.projectMedia} ${styles.projectShot} relative aspect-[16/10] overflow-hidden rounded-[1.25rem] lg:self-start`}>
                            <Image
                              src={project.shot}
                              alt={project.shotAlt ?? ""}
                              fill
                              sizes="(min-width: 1024px) 430px, 90vw"
                              className="object-contain"
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
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-100">
            {vp.eyebrow}
          </p>
          <h2 className={`${styles.displayHeading} mt-4 text-[clamp(2.5rem,7vw,5rem)] font-black uppercase leading-[0.9] tracking-[-0.055em] text-white`}>
            Vicente Barrientos
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-zinc-100 sm:text-base lg:mx-0">
            {vp.subtitleSub}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Link
              href={VICENTE_LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-brand-600 bg-brand-600 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:-translate-y-0.5 hover:border-brand-700 hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              <LinkedInIcon />
              LinkedIn
            </Link>
            <Link
              href={VICENTE_GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/75 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-zinc-700 transition hover:-translate-y-0.5 hover:border-brand-300 hover:bg-white hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
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
