"use client";

import { motion, useReducedMotion } from "motion/react";
import { useLocale } from "@/components/LocaleProvider";
import {
  buttonSpring,
  buttonTap,
  primaryButtonHover,
  secondaryButtonHover,
} from "@/lib/motion-presets";
import { appendSyncParams } from "@/lib/sync-url";
import { type ThemeMode } from "@/lib/theme-sync";

type ThemedExternalLinkProps = React.ComponentProps<typeof motion.a> & {
  href: string;
  /** Theme handed to the destination site. TalentX itself is light-only. */
  theme?: ThemeMode;
  variant?: "primary" | "secondary" | "ghost";
};

export default function ThemedExternalLink({
  href,
  theme = "light",
  variant = "ghost",
  children,
  ...props
}: ThemedExternalLinkProps) {
  const { locale, mounted: localeMounted } = useLocale();
  const reduced = useReducedMotion() ?? false;

  const syncedLocale = localeMounted ? locale : "en";

  const whileHover =
    variant === "primary"
      ? primaryButtonHover(reduced)
      : secondaryButtonHover(reduced);

  let syncedHref = href || "#";
  if (localeMounted) {
    try {
      syncedHref = appendSyncParams(href, { theme, locale: syncedLocale }) || syncedHref;
    } catch {
      syncedHref = href || "#";
    }
  }

  return (
    <motion.a
      href={syncedHref}
      whileHover={whileHover}
      whileTap={buttonTap(reduced)}
      transition={buttonSpring(reduced)}
      {...props}
    >
      {children}
    </motion.a>
  );
}
