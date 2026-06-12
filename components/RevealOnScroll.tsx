"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { easeOut, fadeInUp, revealViewport } from "@/lib/motion-presets";

type RevealOnScrollProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function RevealOnScroll({
  children,
  className,
  delay = 0,
}: RevealOnScrollProps) {
  const reduced = useReducedMotion() ?? false;

  return (
    <motion.div
      className={className}
      variants={fadeInUp}
      initial={reduced ? "visible" : "hidden"}
      whileInView="visible"
      viewport={revealViewport}
      transition={{ ...easeOut, delay: reduced ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
}
