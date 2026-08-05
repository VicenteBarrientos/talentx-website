"use client";

import { useLocale } from "@/components/LocaleProvider";

const buttonClass =
  "inline-flex min-w-[2.25rem] items-center justify-center px-2 py-1 text-xs font-semibold transition";

export default function LanguageToggle() {
  const { locale, setLocale, t, mounted } = useLocale();

  return (
    <div
      className="inline-flex h-10 items-center rounded-full border border-zinc-200 bg-white p-1 text-zinc-600"
      role="group"
      aria-label={locale === "en" ? t.language.switchToSpanish : t.language.switchToEnglish}
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
        className={`${buttonClass} rounded-full ${
          mounted && locale === "en"
            ? "bg-brand-600 text-white"
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
            ? "bg-brand-600 text-white"
            : "hover:text-brand-700"
        }`}
      >
        {t.language.spanish}
      </button>
    </div>
  );
}
