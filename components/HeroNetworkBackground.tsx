"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useMemo, useState, type ReactNode } from "react";

type NetworkNode = {
  id: number;
  x: number;
  y: number;
  r: number;
  layer: 0 | 1 | 2;
  hub?: boolean;
  pulseDelay: number;
};

type NetworkEdge = {
  from: number;
  to: number;
  strong?: boolean;
};

const NODES: NetworkNode[] = [
  { id: 0, x: 74, y: 38, r: 2.4, layer: 2, hub: true, pulseDelay: 0 },
  { id: 1, x: 58, y: 22, r: 1.3, layer: 1, pulseDelay: 0.4 },
  { id: 2, x: 88, y: 24, r: 1.1, layer: 1, pulseDelay: 0.8 },
  { id: 3, x: 92, y: 48, r: 1.2, layer: 2, pulseDelay: 1.1 },
  { id: 4, x: 82, y: 68, r: 1.4, layer: 2, pulseDelay: 0.6 },
  { id: 5, x: 62, y: 58, r: 1.2, layer: 1, pulseDelay: 1.4 },
  { id: 6, x: 48, y: 42, r: 1, layer: 0, pulseDelay: 0.2 },
  { id: 7, x: 54, y: 72, r: 1.1, layer: 0, pulseDelay: 1.8 },
  { id: 8, x: 96, y: 72, r: 0.9, layer: 0, pulseDelay: 2.1 },
  { id: 9, x: 38, y: 28, r: 0.9, layer: 0, pulseDelay: 0.9 },
  { id: 10, x: 68, y: 12, r: 1, layer: 1, pulseDelay: 1.6 },
  { id: 11, x: 44, y: 58, r: 0.85, layer: 0, pulseDelay: 2.4 },
  { id: 12, x: 86, y: 38, r: 1.15, layer: 2, pulseDelay: 0.5 },
  { id: 13, x: 30, y: 44, r: 0.8, layer: 0, pulseDelay: 1.2 },
];

const EDGES: NetworkEdge[] = [
  { from: 0, to: 1, strong: true },
  { from: 0, to: 2, strong: true },
  { from: 0, to: 3, strong: true },
  { from: 0, to: 4, strong: true },
  { from: 0, to: 5, strong: true },
  { from: 0, to: 12 },
  { from: 1, to: 6 },
  { from: 1, to: 10 },
  { from: 2, to: 10 },
  { from: 2, to: 12 },
  { from: 3, to: 12 },
  { from: 3, to: 8 },
  { from: 4, to: 5 },
  { from: 4, to: 8 },
  { from: 5, to: 7 },
  { from: 5, to: 11 },
  { from: 6, to: 9 },
  { from: 6, to: 13 },
  { from: 7, to: 11 },
  { from: 9, to: 13 },
];

const LAYER_PARALLAX = { 0: 6, 1: 12, 2: 18 } as const;

function getNode(id: number) {
  const node = NODES.find((entry) => entry.id === id);
  if (!node) {
    throw new Error(`Missing network node ${id}`);
  }
  return node;
}

function ParallaxLayer({
  layer,
  reduced,
  pointerFine,
  mouseX,
  mouseY,
  drift,
  children,
}: {
  layer: 0 | 1 | 2;
  reduced: boolean;
  pointerFine: boolean;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  drift: boolean;
  children: ReactNode;
}) {
  const strength = LAYER_PARALLAX[layer];
  const x = useTransform(mouseX, [-0.5, 0.5], [-strength, strength]);
  const y = useTransform(mouseY, [-0.5, 0.5], [-strength * 0.7, strength * 0.7]);

  return (
    <motion.g
      style={pointerFine && !reduced ? { x, y } : undefined}
      animate={
        reduced || !drift
          ? undefined
          : {
              translateX: [0, 1.2, 0, -1.2, 0],
              translateY: [0, -0.8, 0, 0.8, 0],
            }
      }
      transition={
        reduced || !drift
          ? undefined
          : {
              duration: 24 + layer * 4,
              repeat: Infinity,
              ease: "easeInOut",
            }
      }
    >
      {children}
    </motion.g>
  );
}

type HeroNetworkBackgroundProps = {
  className?: string;
};

export default function HeroNetworkBackground({
  className = "",
}: HeroNetworkBackgroundProps) {
  const reduced = useReducedMotion() ?? false;
  const [pointerFine, setPointerFine] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 36, damping: 22, mass: 0.6 });
  const springY = useSpring(mouseY, { stiffness: 36, damping: 22, mass: 0.6 });

  useEffect(() => {
    let active = true;

    queueMicrotask(() => {
      if (!active) return;
      setPointerFine(window.matchMedia("(pointer: fine)").matches);
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (reduced || !pointerFine) {
      return;
    }

    const handleMove = (event: MouseEvent) => {
      mouseX.set(event.clientX / window.innerWidth - 0.5);
      mouseY.set(event.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY, pointerFine, reduced]);

  const nodesByLayer = useMemo(
    () =>
      ([0, 1, 2] as const).map((layer) =>
        NODES.filter((node) => node.layer === layer),
      ),
    [],
  );

  const edgesByLayer = useMemo(
    () =>
      ([0, 1, 2] as const).map((layer) =>
        EDGES.filter((edge) => {
          const from = getNode(edge.from);
          const to = getNode(edge.to);
          return Math.max(from.layer, to.layer) === layer;
        }),
      ),
    [],
  );

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_40%,rgba(29,53,89,0.08),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_85%_65%,rgba(62,100,145,0.06),transparent_60%)]" />

      <svg
        className="absolute inset-0 h-full w-full opacity-70"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        role="presentation"
      >
        <defs>
          <linearGradient id="tx-edge-strong" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(29, 53, 89)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="rgb(62, 100, 145)" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="tx-edge-soft" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(110, 138, 174)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="rgb(62, 100, 145)" stopOpacity="0.28" />
          </linearGradient>
          <radialGradient id="tx-node-glow">
            <stop offset="0%" stopColor="rgb(198, 211, 228)" stopOpacity="0.95" />
            <stop offset="100%" stopColor="rgb(62, 100, 145)" stopOpacity="0.2" />
          </radialGradient>
          <filter id="tx-soft-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {([0, 1, 2] as const).map((layer) => (
          <ParallaxLayer
            key={layer}
            layer={layer}
            reduced={reduced}
            pointerFine={pointerFine}
            mouseX={springX}
            mouseY={springY}
            drift={layer > 0 && !isMobile}
          >
            <g>
              {edgesByLayer[layer].map((edge) => {
                const from = getNode(edge.from);
                const to = getNode(edge.to);
                return (
                  <motion.line
                    key={`${edge.from}-${edge.to}`}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke={edge.strong ? "url(#tx-edge-strong)" : "url(#tx-edge-soft)"}
                    strokeWidth={edge.strong ? 0.22 : 0.14}
                    strokeLinecap="round"
                    initial={{ opacity: edge.strong ? 0.45 : 0.25 }}
                    animate={
                      reduced
                        ? undefined
                        : {
                            opacity: edge.strong
                              ? [0.35, 0.6, 0.35]
                              : [0.18, 0.32, 0.18],
                          }
                    }
                    transition={
                      reduced
                        ? undefined
                        : {
                            duration: 5 + layer,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: (edge.from + edge.to) * 0.08,
                          }
                    }
                  />
                );
              })}

              {nodesByLayer[layer].map((node) => (
                <g key={node.id}>
                  {node.hub && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.r * 3.2}
                      fill="url(#tx-node-glow)"
                      opacity={0.22}
                      filter="url(#tx-soft-glow)"
                    />
                  )}
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={node.r}
                    fill={node.hub ? "rgb(29, 53, 89)" : "rgb(62, 100, 145)"}
                    initial={{ opacity: node.hub ? 0.85 : 0.55 }}
                    animate={
                      reduced
                        ? undefined
                        : {
                            opacity: node.hub
                              ? [0.7, 1, 0.7]
                              : [0.35, 0.75, 0.35],
                          }
                    }
                    transition={
                      reduced
                        ? undefined
                        : {
                            duration: node.hub ? 4.5 : 3.5 + node.pulseDelay,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: node.pulseDelay,
                          }
                    }
                  />
                </g>
              ))}
            </g>
          </ParallaxLayer>
        ))}
      </svg>

      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/20" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/80" />
    </div>
  );
}
