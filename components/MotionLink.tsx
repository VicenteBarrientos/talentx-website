"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ComponentProps } from "react";
import {
  buttonSpring,
  buttonTap,
  primaryButtonHover,
  secondaryButtonHover,
} from "@/lib/motion-presets";

type MotionLinkVariant = "primary" | "secondary" | "ghost";

type MotionLinkProps = ComponentProps<typeof motion.a> & {
  variant?: MotionLinkVariant;
};

export default function MotionLink({
  variant = "ghost",
  className,
  children,
  ...props
}: MotionLinkProps) {
  const reduced = useReducedMotion() ?? false;

  const whileHover =
    variant === "primary"
      ? primaryButtonHover(reduced)
      : secondaryButtonHover(reduced);

  return (
    <motion.a
      className={className}
      whileHover={whileHover}
      whileTap={buttonTap(reduced)}
      transition={buttonSpring(reduced)}
      {...props}
    >
      {children}
    </motion.a>
  );
}
