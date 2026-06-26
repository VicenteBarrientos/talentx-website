"use client";

import { motion, useReducedMotion } from "motion/react";

export default function FloatingAstronaut({ className }: { className?: string }) {
  const reduced = useReducedMotion() ?? false;

  return (
    <motion.div
      className={className}
      animate={reduced ? {} : { y: [0, -18, 0], rotate: [0, 3, -2, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg
        viewBox="0 0 200 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Helmet glow */}
        <ellipse cx="100" cy="82" rx="52" ry="52" fill="#67e8f9" opacity="0.08" />

        {/* Helmet outer */}
        <circle cx="100" cy="82" r="46" fill="#0d1230" stroke="#1e3a5f" strokeWidth="2" />

        {/* Helmet visor */}
        <ellipse cx="100" cy="85" rx="30" ry="26"
          fill="url(#visor_grad)"
          stroke="#67e8f9"
          strokeWidth="1.2"
          opacity="0.95"
        />

        {/* Visor reflection */}
        <ellipse cx="90" cy="76" rx="8" ry="5" fill="white" opacity="0.12" transform="rotate(-20 90 76)" />
        <ellipse cx="112" cy="80" rx="3" ry="2" fill="white" opacity="0.08" />

        {/* Helmet ring */}
        <ellipse cx="100" cy="124" rx="40" ry="8" fill="#0f2040" stroke="#1e3a5f" strokeWidth="1.5" />

        {/* Body suit */}
        <rect x="62" y="122" width="76" height="90" rx="20" fill="#0d1230" stroke="#1e3a5f" strokeWidth="1.5" />

        {/* Chest panel */}
        <rect x="80" y="138" width="40" height="28" rx="6" fill="#0a1628" stroke="#67e8f9" strokeWidth="1" opacity="0.8" />
        <circle cx="92" cy="148" r="3" fill="#67e8f9" opacity="0.7" />
        <circle cx="100" cy="148" r="3" fill="#4f46e5" opacity="0.7" />
        <circle cx="108" cy="148" r="3" fill="#67e8f9" opacity="0.4" />
        <rect x="86" y="156" width="28" height="3" rx="1.5" fill="#1e3a5f" />

        {/* Left arm */}
        <rect x="28" y="126" width="36" height="22" rx="11" fill="#0d1230" stroke="#1e3a5f" strokeWidth="1.5" transform="rotate(15 28 126)" />
        {/* Left glove */}
        <ellipse cx="22" cy="162" rx="13" ry="10" fill="#0a1628" stroke="#67e8f9" strokeWidth="1" opacity="0.9" />

        {/* Right arm */}
        <rect x="136" y="126" width="36" height="22" rx="11" fill="#0d1230" stroke="#1e3a5f" strokeWidth="1.5" transform="rotate(-15 172 126)" />
        {/* Right glove */}
        <ellipse cx="178" cy="162" rx="13" ry="10" fill="#0a1628" stroke="#67e8f9" strokeWidth="1" opacity="0.9" />

        {/* Left boot */}
        <ellipse cx="82" cy="214" rx="16" ry="10" fill="#0a1628" stroke="#1e3a5f" strokeWidth="1.5" />
        {/* Right boot */}
        <ellipse cx="118" cy="214" rx="16" ry="10" fill="#0a1628" stroke="#1e3a5f" strokeWidth="1.5" />

        {/* Jetpack */}
        <rect x="68" y="130" width="16" height="40" rx="6" fill="#091224" stroke="#1e3a5f" strokeWidth="1" />
        <rect x="116" y="130" width="16" height="40" rx="6" fill="#091224" stroke="#1e3a5f" strokeWidth="1" />

        {/* Jetpack flames */}
        <motion.ellipse
          cx="76" cy="175"
          rx="5" ry="8"
          fill="#67e8f9"
          opacity="0.5"
          animate={reduced ? {} : { ry: [8, 14, 6, 10, 8], opacity: [0.5, 0.8, 0.3, 0.7, 0.5] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.ellipse
          cx="124" cy="175"
          rx="5" ry="8"
          fill="#67e8f9"
          opacity="0.5"
          animate={reduced ? {} : { ry: [8, 12, 7, 13, 8], opacity: [0.5, 0.7, 0.4, 0.8, 0.5] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Stars around astronaut */}
        {[
          { cx: 20, cy: 30, r: 1.5 },
          { cx: 175, cy: 50, r: 1 },
          { cx: 35, cy: 200, r: 1.2 },
          { cx: 170, cy: 220, r: 1.5 },
          { cx: 155, cy: 25, r: 1 },
          { cx: 10, cy: 120, r: 1 },
        ].map(({ cx, cy, r }, i) => (
          <motion.circle
            key={i}
            cx={cx} cy={cy} r={r}
            fill="white"
            animate={reduced ? {} : { opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
          />
        ))}

        <defs>
          <linearGradient id="visor_grad" x1="70" y1="62" x2="130" y2="110" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1e4080" />
            <stop offset="50%" stopColor="#0d2a5e" />
            <stop offset="100%" stopColor="#050816" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}
