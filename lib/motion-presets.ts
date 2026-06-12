import type { Transition, Variants } from "motion/react";

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const revealViewport = {
  once: true,
  amount: 0.2,
  margin: "-8% 0px -8% 0px" as const,
};

export const easeOut: Transition = {
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1],
};

export const accordionTransition = (reduced: boolean): Transition =>
  reduced
    ? { duration: 0 }
    : { duration: 0.35, ease: [0.4, 0, 0.2, 1] };

export const buttonSpring = (reduced: boolean): Transition =>
  reduced ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 28 };

export const floatTransition = (reduced: boolean): Transition =>
  reduced
    ? { duration: 0 }
    : { duration: 6, repeat: Infinity, ease: "easeInOut" };

export const floatKeyframes = (reduced: boolean) =>
  reduced ? { y: 0 } : { y: [0, -10, 0] };

export const cardHover = (reduced: boolean) =>
  reduced ? undefined : { y: -4 };

export const primaryButtonHover = (reduced: boolean) =>
  reduced
    ? undefined
    : {
        scale: 1.02,
        boxShadow: "0 12px 28px -12px rgba(79, 70, 229, 0.45)",
      };

export const secondaryButtonHover = (reduced: boolean) =>
  reduced ? undefined : { scale: 1.015 };

export const buttonTap = (reduced: boolean) =>
  reduced ? undefined : { scale: 0.98 };
