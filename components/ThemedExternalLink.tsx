"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import {
  buttonSpring,
  buttonTap,
  primaryButtonHover,
  secondaryButtonHover,
} from "@/lib/motion-presets";
import { appendSyncParams } from "@/lib/sync-url";
import { isThemeMode, type ThemeMode } from "@/lib/theme-sync";

type ThemedExternalLinkProps = React.ComponentProps<typeof motion.a> & {
  href: string;
  fallbackTheme?: ThemeMode;
  variant?: "primary" | "secondary" | "ghost";
};

export default function ThemedExternalLink({
  href,
  fallbackTheme = "dark",
  variant = "ghost",
  children,
  ...props
}: ThemedExternalLinkProps) {
  const { resolvedTheme } = useTheme();
  const { locale, mounted: localeMounted } = useLocale();
  const [themeMounted, setThemeMounted] = useState(false);
  const reduced = useReducedMotion() ?? false;

  useEffect(() => {
    let active = true;

    queueMicrotask(() => {
      if (active) setThemeMounted(true);
    });

    return () => {
      active = false;
    };
  }, []);

  const theme =
    themeMounted && isThemeMode(resolvedTheme) ? resolvedTheme : fallbackTheme;
  const syncedLocale = localeMounted ? locale : "en";

  const whileHover =
    variant === "primary"
      ? primaryButtonHover(reduced)
      : variant === "secondary"
        ? secondaryButtonHover(reduced)
        : secondaryButtonHover(reduced);

  return (
    <motion.a
      href={appendSyncParams(href, { theme, locale: syncedLocale })}
      whileHover={whileHover}
      whileTap={buttonTap(reduced)}
      transition={buttonSpring(reduced)}
      {...props}
    >
      {children}
    </motion.a>
  );
}
