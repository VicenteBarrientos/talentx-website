"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

import { THEME_STORAGE_KEY } from "@/lib/theme-sync";

export default function ThemeProvider({
  children,
  defaultTheme = "dark",
}: {
  children: React.ReactNode;
  defaultTheme?: "light" | "dark";
}) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={defaultTheme}
      enableSystem={false}
      storageKey={THEME_STORAGE_KEY}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
