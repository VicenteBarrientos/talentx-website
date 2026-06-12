"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import AccordionSection from "@/components/AccordionSection";
import HeroNetworkBackground from "@/components/HeroNetworkBackground";
import LanguageToggle from "@/components/LanguageToggle";
import MotionLink from "@/components/MotionLink";
import RevealOnScroll from "@/components/RevealOnScroll";
import ThemeToggle from "@/components/ThemeToggle";
import ThemedExternalLink from "@/components/ThemedExternalLink";
import { useLocale } from "@/components/LocaleProvider";
import {
  cardHover,
  easeOut,
  fadeInUp,
  revealViewport,
} from "@/lib/motion-presets";
import { RESUMEX_URL } from "@/lib/site-urls";

const TALENTX_LINKEDIN = "https://www.linkedin.com/company/talentxrecruiting";
const VICENTE_LINKEDIN = "https://www.linkedin.com/in/vicente-barrientos/";
const BENJAMIN_LINKEDIN =
  "https://www.linkedin.com/in/benjam%C3%ADn-mahave-cornejo-39b2aa129/";
const CONTACT_EMAIL = "vicente@talentxrecruiting.com";
const CONTACT_PHONE = "+1 929 737 0194";
const CONTACT_PHONE_HREF = "tel:+19297370194";
const CONTACT_WHATSAPP = "+56 9 3371 3285";
const CONTACT_WHATSAPP_HREF = "https://wa.me/56933713285";
const SCHEDULER_URL =
  "https://scheduler.zoom.us/vicente-barrientos/initial-contact";

const PARTNER_PHOTOS = [
  "/partners/vicente-barrientos.png",
  "/partners/benjamin-mahave-cornejo.png",
] as const;

const PARTNER_LINKEDIN = [VICENTE_LINKEDIN, BENJAMIN_LINKEDIN] as const;

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.883 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

const contactCardClassName =
  "block min-w-0 rounded-xl border border-zinc-200 bg-white p-4 transition hover:border-indigo-300 hover:shadow-sm dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-cyan-400/25 dark:hover:bg-white/[0.06] dark:hover:shadow-none";

const contactLabelClassName =
  "text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-cyan-300";

function PartnerHeadshot({ name, photo }: { name: string; photo: string }) {
  return (
    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-indigo-200 dark:border-white/10">
      <Image
        src={photo}
        alt={name}
        fill
        className="object-cover object-top"
        sizes="80px"
      />
    </div>
  );
}

function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-12 max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-cyan-300">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-inherit sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      )}
    </div>
  );
}

export default function TalentXHome() {
  const { t } = useLocale();
  const reduced = useReducedMotion() ?? false;

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50/80 via-white to-white text-zinc-900 dark:bg-[#050816] dark:bg-none dark:text-white">
      <div className="pointer-events-none fixed inset-0 hidden overflow-hidden dark:block">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-[28rem] w-[28rem] rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-sky-400/10 blur-3xl" />
      </div>

      <header className="relative z-10 border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-[#050816]/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-indigo-600 dark:text-cyan-300">
              TALENTX
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{t.nav.recruiting}</p>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <ThemedExternalLink
              href={RESUMEX_URL}
              target="_blank"
              rel="noopener noreferrer"
              fallbackTheme="dark"
              className="text-sm font-medium text-zinc-600 transition hover:text-indigo-700 dark:text-zinc-400 dark:hover:text-cyan-200"
            >
              {t.nav.resumeX}
            </ThemedExternalLink>
            <LanguageToggle />
            <ThemeToggle />
            <a
              href={TALENTX_LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.nav.linkedInAria}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 dark:border-white/15 dark:text-zinc-300 dark:hover:border-cyan-400/40 dark:hover:bg-cyan-400/10 dark:hover:text-cyan-200"
            >
              <LinkedInIcon className="h-4 w-4" />
            </a>
            <MotionLink
              href={SCHEDULER_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              className="rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 transition hover:border-indigo-300 hover:bg-indigo-100 dark:border-cyan-400/30 dark:bg-cyan-400/10 dark:text-cyan-100 dark:hover:border-cyan-300/50 dark:hover:bg-cyan-400/20"
            >
              {t.nav.getInTouch}
            </MotionLink>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section className="relative isolate overflow-hidden">
          <HeroNetworkBackground />
          <div className="relative z-10 mx-auto max-w-6xl px-6 pb-16 pt-20 sm:pt-28">
            <motion.div
              className="max-w-4xl"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: reduced ? 0 : 0.08, delayChildren: 0.05 },
                },
              }}
              initial={reduced ? "visible" : "hidden"}
              animate="visible"
            >
              <motion.p
                variants={fadeInUp}
                transition={easeOut}
                className="mb-4 inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-200"
              >
                {t.hero.badge}
              </motion.p>
              <motion.h1
                variants={fadeInUp}
                transition={easeOut}
                className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
              >
                <span className="text-zinc-900 dark:bg-gradient-to-r dark:from-white dark:via-cyan-100 dark:to-blue-300 dark:bg-clip-text dark:text-transparent">
                  {t.hero.headline}
                </span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                transition={easeOut}
                className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600 sm:text-xl dark:text-zinc-300"
              >
                {t.hero.subheadline}
              </motion.p>
              <motion.div
                variants={fadeInUp}
                transition={easeOut}
                className="mt-10 flex flex-col gap-4 sm:flex-row"
              >
                <MotionLink
                  href={SCHEDULER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 dark:bg-gradient-to-r dark:from-cyan-400 dark:to-blue-500 dark:text-[#050816] dark:shadow-lg dark:shadow-cyan-500/20 dark:hover:shadow-cyan-500/30"
                >
                  {t.hero.bookCall}
                </MotionLink>
                <MotionLink
                  href="#services"
                  variant="secondary"
                  className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white px-8 py-4 text-sm font-semibold text-zinc-800 transition hover:border-indigo-400 hover:bg-indigo-50 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-white/25 dark:hover:bg-white/10"
                >
                  {t.hero.exploreServices}
                </MotionLink>
              </motion.div>
            </motion.div>

            <motion.div
              className="mt-14 border-t border-zinc-200 pt-8 dark:border-white/10"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ...easeOut, delay: reduced ? 0 : 0.35 }}
            >
              <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-zinc-500 sm:text-sm">
                {t.hero.trustStrip.join(" • ")}
              </p>
              <p className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
                {t.hero.trustFootnote}
              </p>
            </motion.div>
          </div>
        </section>

        <AccordionSection
          id="why"
          eyebrow={t.why.eyebrow}
          title={t.why.title}
          summary={t.why.summary}
          description={t.why.description}
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.why.items.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-zinc-200 bg-zinc-50/80 p-6 transition hover:border-indigo-300 dark:border-white/10 dark:bg-[#050816]/40 dark:hover:border-cyan-400/20"
              >
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-inherit">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </AccordionSection>

        <section id="leadership" className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <SectionIntro
            eyebrow={t.leadership.eyebrow}
            title={t.leadership.title}
            description={t.leadership.description}
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {t.leadership.partners.map((partner, index) => (
              <motion.article
                key={partner.name}
                initial={reduced ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={{ ...easeOut, delay: reduced ? 0 : index * 0.08 }}
                whileHover={cardHover(reduced)}
                className="group flex flex-col rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition hover:border-indigo-300 hover:shadow-md dark:border-white/10 dark:bg-transparent dark:bg-gradient-to-b dark:from-white/[0.06] dark:to-white/[0.02] dark:shadow-none dark:hover:border-cyan-400/25 dark:hover:shadow-none dark:hover:shadow-lg dark:hover:shadow-cyan-500/10"
              >
                <div className="flex items-start gap-5">
                  <PartnerHeadshot
                    name={partner.name}
                    photo={PARTNER_PHOTOS[index]}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium uppercase tracking-wide text-indigo-600 dark:text-cyan-300">
                      {t.leadership.partner}
                    </p>
                    <h3 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                      {partner.name}
                    </h3>
                  </div>
                </div>
                <p className="mt-5 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {partner.bio}
                </p>
                {"regions" in partner && partner.regions && (
                  <p className="mt-4 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                    {partner.regions}
                  </p>
                )}
                <MotionLink
                  href={PARTNER_LINKEDIN[index]}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-5 py-2.5 text-sm font-semibold text-indigo-700 transition hover:border-indigo-300 hover:bg-indigo-100 dark:border-cyan-400/30 dark:bg-cyan-400/10 dark:text-cyan-100 dark:hover:border-cyan-300/50 dark:hover:bg-cyan-400/20"
                >
                  <LinkedInIcon className="h-4 w-4" />
                  {t.leadership.viewLinkedIn}
                </MotionLink>
              </motion.article>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <MotionLink
              href={TALENTX_LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 transition hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-700 dark:border-white/15 dark:bg-white/5 dark:text-zinc-200 dark:hover:border-cyan-400/30 dark:hover:bg-cyan-400/10 dark:hover:text-cyan-100"
            >
              <LinkedInIcon className="h-4 w-4" />
              {t.leadership.talentxLinkedIn}
            </MotionLink>
          </div>
        </section>

        <AccordionSection
          id="services"
          eyebrow={t.services.eyebrow}
          title={t.services.title}
          summary={t.services.summary}
        >
          <div className="grid gap-6 md:grid-cols-2">
            {t.services.items.map((service) => (
              <article
                key={service.title}
                className="group rounded-2xl border border-zinc-200 bg-zinc-50/80 p-6 transition hover:border-indigo-300 dark:border-white/10 dark:bg-[#050816]/40 dark:hover:border-cyan-400/25"
              >
                <div className="mb-4 h-1 w-12 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition group-hover:w-16 dark:from-cyan-400 dark:to-blue-500" />
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </AccordionSection>

        <AccordionSection
          id="expertise"
          eyebrow={t.expertise.eyebrow}
          title={t.expertise.title}
          summary={t.expertise.summary}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.expertise.areas.map((area) => (
              <article
                key={area}
                className="rounded-2xl border border-zinc-200 bg-zinc-50/80 px-5 py-4 text-sm font-medium text-zinc-700 transition hover:border-indigo-300 hover:text-zinc-900 dark:border-white/10 dark:bg-[#050816]/40 dark:text-zinc-200 dark:hover:border-cyan-400/25 dark:hover:text-white"
              >
                {area}
              </article>
            ))}
          </div>
        </AccordionSection>

        <AccordionSection
          id="process"
          eyebrow={t.process.eyebrow}
          title={t.process.title}
          summary={t.process.summary}
          description={t.process.description}
        >
          <div className="grid gap-5 lg:grid-cols-5">
            {t.process.steps.map((item) => (
              <article
                key={item.step}
                className="relative rounded-2xl border border-zinc-200 bg-zinc-50/80 p-5 transition hover:border-indigo-300 dark:border-white/10 dark:bg-[#050816]/40 dark:hover:border-cyan-400/25"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-indigo-200 bg-indigo-50 text-xs font-bold text-indigo-700 dark:border-cyan-400/30 dark:bg-cyan-400/10 dark:text-cyan-300">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-inherit">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </AccordionSection>

        <section id="resumex" className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <div className="rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-50/80 via-white to-indigo-50/40 p-8 text-center shadow-sm sm:p-14 dark:border-cyan-400/20 dark:bg-none dark:bg-gradient-to-br dark:from-cyan-500/10 dark:via-blue-600/10 dark:to-transparent dark:shadow-none">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-cyan-300">
              {t.resumex.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-inherit">
              {t.resumex.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              {t.resumex.description}
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-zinc-500">
              {t.resumex.attribution}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {t.resumex.badges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-200"
                >
                  {badge}
                </span>
              ))}
            </div>
            <ThemedExternalLink
              href={RESUMEX_URL}
              target="_blank"
              rel="noopener noreferrer"
              fallbackTheme="dark"
              variant="primary"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 dark:bg-gradient-to-r dark:from-cyan-400 dark:to-blue-500 dark:text-[#050816] dark:shadow-lg dark:shadow-cyan-500/20 dark:hover:shadow-cyan-500/30"
            >
              {t.resumex.cta}
            </ThemedExternalLink>
          </div>
        </section>

        <RevealOnScroll>
          <section id="contact" className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
            <div className="rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-50/80 via-white to-indigo-50/40 p-8 text-center shadow-sm sm:p-14 dark:border-cyan-400/20 dark:bg-none dark:bg-gradient-to-br dark:from-cyan-500/10 dark:via-blue-600/10 dark:to-transparent dark:shadow-none">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-cyan-300">
              {t.contact.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-inherit">
              {t.contact.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              {t.contact.description}
            </p>

            <div className="mx-auto mt-8 grid w-full max-w-5xl grid-cols-1 gap-3 text-left sm:grid-cols-2 lg:grid-cols-4">
              <a href={`mailto:${CONTACT_EMAIL}`} className={contactCardClassName}>
                <p className={contactLabelClassName}>{t.contact.email}</p>
                <p className="mt-2 break-words text-xs leading-snug text-zinc-700 sm:text-sm dark:text-zinc-200">
                  {CONTACT_EMAIL}
                </p>
              </a>
              <a href={CONTACT_PHONE_HREF} className={contactCardClassName}>
                <p className={contactLabelClassName}>{t.contact.phone}</p>
                <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-200">
                  {CONTACT_PHONE}
                </p>
              </a>
              <a
                href={TALENTX_LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className={contactCardClassName}
              >
                <p className={contactLabelClassName}>{t.contact.linkedin}</p>
                <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-200">
                  {t.contact.linkedinValue}
                </p>
              </a>
              <a
                href={CONTACT_WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className={contactCardClassName}
              >
                <div className="flex items-center gap-2">
                  <WhatsAppIcon className="h-4 w-4 shrink-0 text-indigo-600 dark:text-cyan-300" />
                  <p className={contactLabelClassName}>{t.contact.whatsapp}</p>
                </div>
                <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-200">
                  {CONTACT_WHATSAPP}
                </p>
              </a>
            </div>

            <MotionLink
              href={SCHEDULER_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 dark:bg-gradient-to-r dark:from-cyan-400 dark:to-blue-500 dark:text-[#050816] dark:shadow-lg dark:shadow-cyan-500/20 dark:hover:shadow-cyan-500/30"
            >
              {t.contact.cta}
            </MotionLink>
            </div>
          </section>
        </RevealOnScroll>
      </main>

      <footer className="relative z-10 border-t border-zinc-200 bg-white/60 backdrop-blur-sm dark:border-white/10 dark:bg-transparent dark:backdrop-blur-none">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="font-semibold text-zinc-900 dark:text-white">
                TalentX Recruiting
              </p>
              <p className="mt-2 text-sm text-zinc-500">{t.footer.tagline}</p>
            </div>
            <div className="flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                {t.footer.linkedin}
              </p>
              <a
                href={TALENTX_LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-indigo-600 dark:hover:text-cyan-300"
              >
                TalentX
              </a>
              <a
                href={VICENTE_LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-indigo-600 dark:hover:text-cyan-300"
              >
                {t.leadership.partners[0].name}
              </a>
              <a
                href={BENJAMIN_LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-indigo-600 dark:hover:text-cyan-300"
              >
                {t.leadership.partners[1].name}
              </a>
              <a
                href={CONTACT_WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-indigo-600 dark:hover:text-cyan-300"
              >
                {t.footer.whatsapp}
              </a>
            </div>
          </div>
          <p className="mt-8 text-xs text-zinc-400 dark:text-zinc-600">
            {t.footer.copyright}
          </p>
        </div>
      </footer>
    </div>
  );
}
