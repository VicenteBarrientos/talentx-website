"use client";

import createGlobe from "cobe";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

const LOCATIONS = [
  { id: "usa", label: "USA", location: [39.8283, -98.5795] as [number, number] },
  { id: "latam", label: "LATAM", location: [-15.6, -56.1] as [number, number] },
  { id: "europe", label: "EUROPE", location: [50.1109, 8.6821] as [number, number] },
  { id: "australia", label: "AUSTRALIA", location: [-25.2744, 133.7751] as [number, number] },
] as const;

const ARCS = [
  { from: LOCATIONS[0].location, to: LOCATIONS[1].location },
  { from: LOCATIONS[0].location, to: LOCATIONS[2].location },
  { from: LOCATIONS[0].location, to: LOCATIONS[3].location },
  { from: LOCATIONS[1].location, to: LOCATIONS[2].location },
  { from: LOCATIONS[1].location, to: LOCATIONS[3].location },
] as const;

/** Light-canvas globe colors matched to the brand navy accent. */
const GLOBE = {
  dark: 0.72,
  mapBrightness: 5.8,
  mapBaseBrightness: 0.03,
  baseColor: [0.72, 0.84, 0.94] as [number, number, number],
  markerColor: [0.11, 0.21, 0.35] as [number, number, number],
  glowColor: [0.16, 0.32, 0.48] as [number, number, number],
  arcColor: [0.24, 0.39, 0.57] as [number, number, number],
};

export default function ConnectedGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number | null>(null);
  const phiRef = useRef(0.2);
  const [width, setWidth] = useState(500);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!container) return;

    const syncSize = () => setWidth(Math.min(container.clientWidth, 540));
    syncSize();
    const observer = new ResizeObserver(syncSize);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || width <= 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const globe = createGlobe(canvas, {
      devicePixelRatio: pixelRatio,
      width: width * pixelRatio,
      height: width * pixelRatio,
      phi: phiRef.current,
      theta: 0.12,
      dark: GLOBE.dark,
      diffuse: 1.35,
      mapSamples: 24000,
      mapBrightness: GLOBE.mapBrightness,
      mapBaseBrightness: GLOBE.mapBaseBrightness,
      baseColor: GLOBE.baseColor,
      markerColor: GLOBE.markerColor,
      glowColor: GLOBE.glowColor,
      opacity: 0.98,
      scale: 0.92,
      markers: LOCATIONS.map((location) => ({
        id: location.id,
        location: location.location,
        size: 0.055,
        color: GLOBE.markerColor,
      })),
      arcs: ARCS.map((arc) => ({
        from: arc.from,
        to: arc.to,
        color: GLOBE.arcColor,
      })),
      arcColor: GLOBE.arcColor,
      arcWidth: 0.65,
      arcHeight: 0.28,
      markerElevation: 0.025,
    });

    const render = () => {
      if (!reduced) phiRef.current += 0.0022;
      globe.update({ phi: phiRef.current });
      frameRef.current = requestAnimationFrame(render);
    };
    frameRef.current = requestAnimationFrame(render);

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      globe.destroy();
    };
  }, [width]);

  return (
    <div
      className="tx-cobe-globe relative mx-auto aspect-square w-full max-w-[540px]"
      role="img"
      aria-label="Rotating globe showing TalentX connections across the USA, Latin America, Europe, and Australia"
    >
      <div className="tx-cobe-stars absolute inset-[3%] rounded-full" />
      <div className="tx-cobe-halo absolute inset-[11%] rounded-full" />
      <canvas
        ref={canvasRef}
        className="relative z-[1] h-full w-full"
        style={{ width, height: width, maxWidth: "100%", aspectRatio: "1" }}
      />
      {LOCATIONS.map((location) => (
        <span
          key={location.id}
          className="tx-cobe-label"
          style={
            {
              positionAnchor: `--cobe-${location.id}`,
              opacity: `var(--cobe-visible-${location.id}, 0)`,
            } as CSSProperties
          }
        >
          <i />
          {location.label}
        </span>
      ))}
      <div className="absolute inset-x-0 bottom-[2%] z-[2] text-center text-[9px] font-semibold uppercase tracking-[0.32em] text-zinc-500">
        Live global talent network
      </div>
    </div>
  );
}
