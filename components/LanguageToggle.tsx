"use client";

import { useLocale } from "@/components/LocaleProvider";

const buttonClass =
  "inline-flex min-w-[2.25rem] items-center justify-center px-2 py-1 text-xs font-semibold transition";

export default function LanguageToggle({ variant = "light" }: { variant?: "light" | "cinematic" }) {
  const { locale, setLocale, t, mounted } = useLocale();
  const cinematic = variant === "cinematic";

  return (
    <div
      className={`inline-flex h-10 items-center rounded-full border p-1 ${
        cinematic
          ? "border-cyan-100/15 bg-white/[0.06] text-slate-300"
          : "border-zinc-200 bg-white text-zinc-600"
      }`}
      role="group"
      aria-label={locale === "en" ? t.language.switchToSpanish : t.language.switchToEnglish}
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
        className={`${buttonClass} rounded-full ${
          mounted && locale === "en"
            ? cinematic
              ? "bg-cyan-300 text-[#061321]"
              : "bg-brand-600 text-white"
            : cinematic
              ? "hover:text-white"
              : "hover:text-brand-700"
        }`}
      >
        {t.language.english}
      </button>
      <button
        type="button"
        onClick={() => setLocale("es")}
        aria-pressed={locale === "es"}
        className={`${buttonClass} rounded-full ${
          mounted && locale === "es"
            ? cinematic
              ? "bg-cyan-300 text-[#061321]"
              : "bg-brand-600 text-white"
            : cinematic
              ? "hover:text-white"
              : "hover:text-brand-700"
        }`}
      >
        {t.language.spanish}
      </button>
    </div>
  );
}
