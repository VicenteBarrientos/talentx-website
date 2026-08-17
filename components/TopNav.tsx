"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import LanguageToggle from "@/components/LanguageToggle";
import { useLocale } from "@/components/LocaleProvider";
import { easeOut } from "@/lib/motion-presets";

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-4 w-4 flex-col justify-center gap-[3px]" aria-hidden="true">
      <span
        className={`block h-[1.5px] w-full rounded-full bg-current transition-transform duration-300 ${
          open ? "translate-y-[4.5px] rotate-45" : ""
        }`}
      />
      <span
        className={`block h-[1.5px] w-full rounded-full bg-current transition-opacity duration-300 ${
          open ? "opacity-0" : ""
        }`}
      />
      <span
        className={`block h-[1.5px] w-full rounded-full bg-current transition-transform duration-300 ${
          open ? "-translate-y-[4.5px] -rotate-45" : ""
        }`}
      />
    </span>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-3.5 w-3.5 shrink-0 transition-transform duration-300 ${
        open ? "rotate-90" : ""
      }`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function usePrefersHover() {
  const [prefersHover, setPrefersHover] = useState<boolean | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setPrefersHover(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return prefersHover;
}

const NAV_LINK_ITEMS = [
  { key: "home", href: "/" },
  { key: "why", href: "/#why" },
  { key: "faq", href: "/#faq" },
  { key: "contact", href: "/#contact" },
] as const;

const RESUMEX_URL = "/resumex";

const TEAM_MEMBERS = [
  { key: "vicente", href: "/portfolio" },
] as const;

const linkClassName =
  "block px-5 py-3.5 text-sm font-medium text-zinc-700 transition hover:bg-brand-50/70 hover:text-brand-700";

const submenuLinkClassName =
  "block px-5 py-2.5 pl-8 text-sm text-zinc-600 transition hover:bg-brand-50/70 hover:text-brand-700";

export default function TopNav({ variant = "light" }: { variant?: "light" | "cinematic" }) {
  const { t } = useLocale();
  const reduced = useReducedMotion() ?? false;
  const prefersHover = usePrefersHover();
  const navRef = useRef<HTMLDivElement>(null);

  const [pinnedOpen, setPinnedOpen] = useState(false);
  const [hoverOpen, setHoverOpen] = useState(false);
  const [teamPinnedOpen, setTeamPinnedOpen] = useState(false);
  const [teamHoverOpen, setTeamHoverOpen] = useState(false);

  const showMenu = pinnedOpen || (prefersHover === true && hoverOpen);
  const showTeamSubmenu =
    teamPinnedOpen || (prefersHover === true && teamHoverOpen);

  const closeMenu = () => {
    setPinnedOpen(false);
    setHoverOpen(false);
    setTeamPinnedOpen(false);
    setTeamHoverOpen(false);
  };

  useEffect(() => {
    if (!pinnedOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [pinnedOpen]);

  const itemLabels: Record<(typeof NAV_LINK_ITEMS)[number]["key"], string> = {
    home: t.nav.items.home,
    why: t.nav.items.why,
    faq: t.nav.items.faq,
    contact: t.nav.items.contact,
  };

  const memberLabels: Record<(typeof TEAM_MEMBERS)[number]["key"], string> = {
    vicente: t.meetTheTeam.vicente.name,
  };

  const cinematic = variant === "cinematic";
  const menuLinkClassName = cinematic
    ? "block px-5 py-3.5 text-sm font-medium text-slate-200 transition hover:bg-cyan-300/10 hover:text-white"
    : linkClassName;
  const menuSubmenuLinkClassName = cinematic
    ? "block px-5 py-2.5 pl-8 text-sm text-slate-300 transition hover:bg-cyan-300/10 hover:text-white"
    : submenuLinkClassName;

  const handleMenuButtonClick = () => {
    if (prefersHover === true) {
      setPinnedOpen((current) => !current);
    } else {
      setPinnedOpen((current) => !current);
    }
  };

  const handleTeamRowClick = () => {
    if (prefersHover !== true) {
      setTeamPinnedOpen((current) => !current);
    }
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div
        ref={navRef}
        className="pointer-events-auto mx-auto max-w-3xl"
        onMouseEnter={() => setHoverOpen(true)}
        onMouseLeave={() => {
          setHoverOpen(false);
          setTeamHoverOpen(false);
          if (!pinnedOpen) setTeamPinnedOpen(false);
        }}
      >
        <nav
          className={`flex items-center justify-between rounded-full px-4 py-2.5 backdrop-blur-xl sm:px-5 ${
            cinematic
              ? "border border-cyan-100/15 bg-[#061321]/70 shadow-[0_18px_60px_-24px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.08)]"
              : "border border-zinc-200/80 bg-white/75 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.12)]"
          }`}
          aria-label={t.nav.menuAria}
        >
          <Link
            href="/"
            onClick={closeMenu}
            className="group flex min-w-0 items-center gap-2 pr-2 transition hover:opacity-80"
          >
            <span className={`text-sm font-semibold tracking-[0.22em] ${cinematic ? "text-white" : "text-brand-600"}`}>
              TALENTX
            </span>
            <span className={`hidden text-xs sm:inline ${cinematic ? "text-slate-400" : "text-zinc-500"}`}>
              {t.nav.recruiting}
            </span>
          </Link>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <LanguageToggle variant={cinematic ? "cinematic" : "light"} />
            <button
              type="button"
              onClick={handleMenuButtonClick}
              aria-expanded={showMenu}
              aria-controls="talentx-nav-menu"
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition sm:px-3.5 sm:text-sm ${
                cinematic
                  ? "border border-cyan-100/15 bg-white/[0.06] text-slate-200 hover:border-cyan-200/35 hover:bg-cyan-200/10 hover:text-white"
                  : "border border-zinc-200/80 bg-zinc-50/80 text-zinc-700 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
              }`}
            >
              {t.nav.menu}
              <HamburgerIcon open={showMenu} />
            </button>
          </div>
        </nav>

        <AnimatePresence initial={false}>
          {showMenu && (
            <motion.div
              id="talentx-nav-menu"
              initial={reduced ? false : { opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, y: -6, scale: 0.98 }}
              transition={easeOut}
              className={`mt-2 overflow-hidden rounded-3xl backdrop-blur-xl ${
                cinematic
                  ? "border border-cyan-100/15 bg-[#061321]/90 shadow-[0_24px_70px_-28px_rgba(0,0,0,0.9)]"
                  : "border border-zinc-200/80 bg-white/90 shadow-[0_16px_48px_-16px_rgba(0,0,0,0.18)]"
              }`}
            >
              <ul className={cinematic ? "divide-y divide-white/10" : "divide-y divide-zinc-200/80"}>
                {NAV_LINK_ITEMS.slice(0, 2).map((item) => (
                  <li key={item.key}>
                    <Link href={item.href} onClick={closeMenu} className={menuLinkClassName}>
                      {itemLabels[item.key]}
                    </Link>
                  </li>
                ))}

                <li
                  onMouseEnter={() => setTeamHoverOpen(true)}
                  onMouseLeave={() => setTeamHoverOpen(false)}
                >
                  <button
                    type="button"
                    onClick={handleTeamRowClick}
                    aria-expanded={showTeamSubmenu}
                    aria-controls="talentx-team-submenu"
                    className={`flex w-full items-center justify-between px-5 py-3.5 text-left text-sm font-medium transition ${
                      showTeamSubmenu
                        ? cinematic
                          ? "bg-cyan-300/10 text-white"
                          : "bg-brand-50/70 text-brand-700"
                        : cinematic
                          ? "text-slate-200 hover:bg-cyan-300/10 hover:text-white"
                          : "text-zinc-700 hover:bg-brand-50/70 hover:text-brand-700"
                    }`}
                  >
                    <span>{t.nav.items.team}</span>
                    <ChevronIcon open={showTeamSubmenu} />
                  </button>

                  <AnimatePresence initial={false}>
                    {showTeamSubmenu && (
                      <motion.ul
                        id="talentx-team-submenu"
                        initial={reduced ? false : { opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={reduced ? undefined : { opacity: 0, height: 0 }}
                        transition={easeOut}
                        className={`overflow-hidden border-t ${cinematic ? "border-white/10 bg-black/15" : "border-zinc-200/60 bg-zinc-50/60"}`}
                      >
                        {TEAM_MEMBERS.map((member, index) => (
                          <motion.li
                            key={member.key}
                            initial={reduced ? false : { opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ ...easeOut, delay: reduced ? 0 : index * 0.05 }}
                          >
                            <a
                              href={member.href}
                              onClick={closeMenu}
                              className={menuSubmenuLinkClassName}
                            >
                              {memberLabels[member.key]}
                            </a>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>

                {NAV_LINK_ITEMS.slice(2).map((item) => (
                  <li key={item.key}>
                    <Link href={item.href} onClick={closeMenu} className={menuLinkClassName}>
                      {itemLabels[item.key]}
                    </Link>
                  </li>
                ))}

                <li>
                  <Link href={RESUMEX_URL} onClick={closeMenu} className={menuLinkClassName}>
                    {t.nav.resumeX}
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
