"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getTalentXMessages, type TalentXMessages } from "@/lib/i18n/talentx";
import {
  isLocale,
  LOCALE_STORAGE_KEY,
  syncLocaleToCookie,
  type Locale,
} from "@/lib/locale-sync";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TalentXMessages;
  mounted: boolean;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export default function LocaleProvider({
  children,
  defaultLocale = "en",
}: {
  children: ReactNode;
  defaultLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    const initial = isLocale(stored) ? stored : defaultLocale;
    setLocaleState(initial);
    document.documentElement.lang = initial;
    setMounted(true);
  }, [defaultLocale]);

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
    document.documentElement.lang = nextLocale;
    syncLocaleToCookie(nextLocale);
  };

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: getTalentXMessages(locale),
      mounted,
    }),
    [locale, mounted],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return context;
}
