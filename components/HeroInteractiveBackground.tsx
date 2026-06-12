"use client";

import Image from "next/image";
import {
  useEffect,
  useMemo,
  useRef,
  type CSSProperties,
  type RefObject,
} from "react";

type HeroInteractiveBackgroundProps = {
  containerRef: RefObject<HTMLElement | null>;
};

type Star = {
  id: number;
  left: string;
  top: string;
  size: number;
  opacity: number;
  duration: string;
  delay: string;
};

const STAR_COUNT = 42;

function createStars(): Star[] {
  return Array.from({ length: STAR_COUNT }, (_, index) => ({
    id: index,
    left: `${((index * 37 + 13) % 97) + 1}%`,
    top: `${((index * 53 + 19) % 94) + 2}%`,
    size: index % 4 === 0 ? 2 : 1,
    opacity: 0.12 + (index % 6) * 0.05,
    duration: `${4 + (index % 5) * 1.4}s`,
    delay: `${-(index % 9) * 0.55}s`,
  }));
}

function parallaxStyle(
  xMultiplier: number,
  yMultiplier: number,
): CSSProperties {
  return {
    transform: `translate3d(calc(var(--hero-px, 0) * ${xMultiplier}px), calc(var(--hero-py, 0) * ${yMultiplier}px), 0)`,
    willChange: "transform",
  };
}

export default function HeroInteractiveBackground({
  containerRef,
}: HeroInteractiveBackgroundProps) {
  const stars = useMemo(() => createStars(), []);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const handleMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      targetRef.current = {
        x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((event.clientY - rect.top) / rect.height - 0.5) * 2,
      };
    };

    const handleLeave = () => {
      targetRef.current = { x: 0, y: 0 };
    };

    const animate = () => {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.055;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.055;

      container.style.setProperty("--hero-px", currentRef.current.x.toFixed(4));
      container.style.setProperty("--hero-py", currentRef.current.y.toFixed(4));

      frameRef.current = window.requestAnimationFrame(animate);
    };

    container.addEventListener("mousemove", handleMove);
    container.addEventListener("mouseleave", handleLeave);
    frameRef.current = window.requestAnimationFrame(animate);

    const stopMotion = () => {
      targetRef.current = { x: 0, y: 0 };
      currentRef.current = { x: 0, y: 0 };
      container.style.setProperty("--hero-px", "0");
      container.style.setProperty("--hero-py", "0");
    };

    const onReducedMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) stopMotion();
    };

    reducedMotion.addEventListener("change", onReducedMotionChange);

    return () => {
      container.removeEventListener("mousemove", handleMove);
      container.removeEventListener("mouseleave", handleLeave);
      reducedMotion.removeEventListener("change", onReducedMotionChange);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [containerRef]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden [--hero-px:0] [--hero-py:0]"
    >
      <div
        className="absolute inset-0 transition-opacity duration-700 dark:opacity-100"
        style={parallaxStyle(6, 4)}
      >
        {stars.map((star) => (
          <span
            key={star.id}
            className="hero-star absolute rounded-full bg-indigo-400/70 dark:bg-cyan-100/80"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDuration: star.duration,
              animationDelay: star.delay,
              ["--star-opacity" as string]: String(star.opacity),
            }}
          />
        ))}
      </div>

      <div
        className="absolute -right-12 top-[16%] h-56 w-56 rounded-full bg-indigo-300/20 blur-3xl transition-opacity duration-700 dark:bg-cyan-500/10 lg:h-72 lg:w-72"
        style={parallaxStyle(-18, -12)}
      />
      <div
        className="absolute right-[10%] top-[32%] h-40 w-40 rounded-full bg-blue-400/15 blur-3xl dark:bg-blue-600/15"
        style={parallaxStyle(-28, -18)}
      />
      <div
        className="absolute right-[22%] top-[48%] h-28 w-28 rounded-full bg-cyan-300/10 blur-2xl dark:bg-cyan-400/10"
        style={parallaxStyle(14, 10)}
      />

      <div
        className="absolute inset-y-0 right-0 w-full sm:w-[92%] lg:w-[min(68rem,72vw)]"
        style={parallaxStyle(16, 10)}
      >
        <div className="absolute inset-0 opacity-[0.34] saturate-[0.85] sm:opacity-[0.44] lg:opacity-[0.52] dark:opacity-[0.7] dark:saturate-100 lg:dark:opacity-[0.86]">
          <Image
            src="/images/talentx-hero.png"
            alt=""
            fill
            priority
            className="object-cover object-[72%_42%] sm:object-[68%_40%] lg:object-[62%_38%]"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-indigo-50/95 dark:to-[#050816]/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/80 via-indigo-50/20 to-transparent dark:from-[#050816]/90 dark:via-[#050816]/35 dark:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/90 via-transparent to-white dark:from-[#050816]/85 dark:via-transparent dark:to-[#050816]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_40%,rgba(238,242,255,0.92)_0%,rgba(238,242,255,0.55)_38%,transparent_68%)] dark:bg-[radial-gradient(ellipse_at_28%_42%,rgba(5,8,22,0.96)_0%,rgba(5,8,22,0.72)_42%,transparent_72%)]" />
        <div className="absolute inset-0 [mask-image:linear-gradient(to_left,transparent_0%,black_22%,black_72%,transparent_100%),linear-gradient(to_bottom,transparent_0%,black_18%,black_78%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_left,transparent_0%,black_22%,black_72%,transparent_100%),linear-gradient(to_bottom,transparent_0%,black_18%,black_78%,transparent_100%)]" />
      </div>
    </div>
  );
}
