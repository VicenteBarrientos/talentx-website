/**
 * TalentX is light-only — there is no in-app theme switch. What remains here
 * is the outbound contract: links to ResumeX carry a `theme` param so that
 * site can honor it (ResumeX is also light-only and currently ignores inbound
 * theme, but the sync param keeps the cross-site URL contract intact).
 */
export const THEME_PARAM = "theme";

export type ThemeMode = "light" | "dark";

export function isThemeMode(value: string | null | undefined): value is ThemeMode {
  return value === "light" || value === "dark";
}

export function appendThemeToUrl(url: string, theme: ThemeMode): string {
  const parsed = new URL(url);
  parsed.searchParams.set(THEME_PARAM, theme);
  return parsed.toString();
}
