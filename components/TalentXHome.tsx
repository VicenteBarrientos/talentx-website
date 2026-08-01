"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import ConnectedGlobe from "@/components/ConnectedGlobe";
import CursorGlow from "@/components/CursorGlow";
import MotionLink from "@/components/MotionLink";
import RevealOnScroll from "@/components/RevealOnScroll";
import ScrollProgress from "@/components/ScrollProgress";
import TopNav from "@/components/TopNav";
import { useLocale } from "@/components/LocaleProvider";
import { RESUMEX_URL } from "@/lib/site-urls";

const TALENTX_LINKEDIN = "https://www.linkedin.com/company/talentxrecruiting";
const VICENTE_LINKEDIN = "https://www.linkedin.com/in/vicente-barrientos/";
const CONTACT_EMAIL = "vicente@talentxrecruiting.com";
const CONTACT_PHONE = "+1 929 737 0194";
const CONTACT_PHONE_HREF = "tel:+19297370194";
const CONTACT_WHATSAPP = "+56 9 3371 3285";
const CONTACT_WHATSAPP_HREF = "https://wa.me/56933713285";
const SCHEDULER_URL = "https://scheduler.zoom.us/vicente-barrientos/initial-contact";

function Arrow({ left = false }: { left?: boolean }) {
  return <span aria-hidden="true">{left ? "←" : "→"}</span>;
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center">
      <p className="tx-eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.045em] text-zinc-950 dark:text-white sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description && <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-8 text-zinc-600 dark:text-zinc-400 sm:text-lg">{description}</p>}
    </div>
  );
}

function OrbitalGlobe() {
  return <ConnectedGlobe />;
}

export default function TalentXHome() {
  const { t } = useLocale();
  const reduced = useReducedMotion() ?? false;
  const [serviceIndex, setServiceIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    if (reduced) return;
    const timer = window.setInterval(() => setServiceIndex((current) => (current + 1) % t.services.items.length), 6000);
    return () => window.clearInterval(timer);
  }, [reduced, t.services.items.length]);

  const service = t.services.items[serviceIndex];
  const duplicatedExpertise = [...t.expertise.areas, ...t.expertise.areas];

  return (
    <div className="tx-site min-h-screen overflow-hidden bg-[#f7f7f2] text-zinc-950 dark:bg-[#05070d] dark:text-white">
      <ScrollProgress />
      <CursorGlow />
      <TopNav />

      <main>
        <section id="home" className="relative flex min-h-[94svh] items-center overflow-hidden px-6 pb-20 pt-32 sm:pt-36">
          <div className="tx-grid absolute inset-0 opacity-60 dark:opacity-35" />
          <div className="absolute -left-40 top-10 h-[34rem] w-[34rem] rounded-full bg-indigo-400/15 blur-3xl dark:bg-cyan-400/10" />
          <div className="absolute -right-40 bottom-0 h-[38rem] w-[38rem] rounded-full bg-cyan-300/20 blur-3xl dark:bg-blue-600/10" />
          <div className="relative mx-auto w-full max-w-7xl">
            <motion.div initial={reduced ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <p className="tx-eyebrow inline-flex rounded-full border border-indigo-300/50 bg-white/70 px-4 py-2 backdrop-blur dark:border-cyan-300/20 dark:bg-white/[0.04]">{t.hero.badge}</p>
              <h1 className="mt-7 max-w-5xl text-balance text-[clamp(3.2rem,7vw,7rem)] font-semibold leading-[0.91] tracking-[-0.07em]">
                <span className="tx-gradient-text">Global talent.</span><br />
                <span>{t.hero.subheadline}</span>
              </h1>
              <p className="mt-8 max-w-2xl text-pretty text-lg leading-8 text-zinc-600 dark:text-zinc-300 sm:text-xl">{t.hero.headline}</p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <MotionLink href={SCHEDULER_URL} target="_blank" rel="noopener noreferrer" variant="primary" className="tx-primary-button">
                  {t.hero.bookCall} <Arrow />
                </MotionLink>
                <MotionLink href="#services" variant="secondary" className="tx-secondary-button">{t.hero.exploreServices}</MotionLink>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="border-y border-zinc-900/10 bg-white/60 py-5 backdrop-blur dark:border-white/10 dark:bg-white/[0.02]" aria-label={t.hero.trustFootnote}>
          <div className="tx-marquee">
            <div className="tx-marquee-track">
              {[...t.hero.trustStrip, ...t.hero.trustStrip].map((item, index) => <span key={`${item}-${index}`} className="flex items-center gap-5 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.22em] text-zinc-600 dark:text-zinc-300"><i className="h-1.5 w-1.5 rounded-full bg-indigo-500 dark:bg-cyan-300" />{item}</span>)}
            </div>
          </div>
        </section>

        <section id="why" className="relative px-6 py-28 sm:py-36">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow={t.why.eyebrow} title={t.why.title} description={t.why.description} />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {t.why.items.map((item, index) => (
                <RevealOnScroll key={item.title} delay={index * 0.05} className={index === 0 || index === 3 ? "lg:col-span-2" : ""}>
                  <article className="tx-card group h-full min-h-64 p-7">
                    <span className="text-sm font-medium text-indigo-500 dark:text-cyan-300">0{index + 1}</span>
                    <h3 className="mt-16 text-2xl font-semibold tracking-[-0.035em]">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">{item.description}</p>
                  </article>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-y border-zinc-900/10 bg-white/55 px-6 py-28 dark:border-white/10 dark:bg-white/[0.02] sm:py-36">
          <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
            <div><p className="tx-eyebrow">{t.hero.trustFootnote}</p><h2 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">Talent has no borders.<br /><span className="tx-gradient-text">Neither do we.</span></h2></div>
            <OrbitalGlobe />
          </div>
        </section>

        <section id="leadership" className="px-6 py-28 sm:py-36">
          <div className="mx-auto max-w-6xl">
            <SectionHeading eyebrow={t.leadership.eyebrow} title={t.leadership.title} description={t.leadership.description} />
            <RevealOnScroll>
              <article className="tx-card mx-auto grid max-w-4xl overflow-hidden p-3 md:grid-cols-[.65fr_1.35fr]">
                <div className="flex min-h-[350px] flex-col items-center justify-center rounded-[1.6rem] bg-gradient-to-br from-indigo-100 to-cyan-50 p-7 text-center dark:from-indigo-950 dark:to-cyan-950">
                  <div className="relative h-52 w-52 overflow-hidden rounded-full border-4 border-white/70 shadow-xl shadow-indigo-500/15 dark:border-white/10 sm:h-56 sm:w-56">
                    <Image src="/partners/vicente-barrientos.png" alt={t.leadership.partners[0].name} fill className="object-cover object-top" sizes="224px" />
                  </div>
                  <p className="mt-6 text-2xl font-semibold">{t.leadership.partners[0].name}</p>
                  <p className="mt-1 text-sm text-indigo-600 dark:text-cyan-200">{t.meetTheTeam.vicente.subtitle}</p>
                </div>
                <div className="flex flex-col justify-center p-7 sm:p-10">
                  <p className="tx-eyebrow">{t.meetTheTeam.eyebrow}</p>
                  <p className="mt-7 text-xl leading-9 text-zinc-700 dark:text-zinc-200">{t.leadership.partners[0].bio}</p>
                  <p className="mt-5 leading-8 text-zinc-600 dark:text-zinc-400">{t.leadership.partners[0].regions}</p>
                  <MotionLink href={VICENTE_LINKEDIN} target="_blank" rel="noopener noreferrer" variant="secondary" className="tx-secondary-button mt-8 w-fit">{t.leadership.viewLinkedIn} <Arrow /></MotionLink>
                </div>
              </article>
            </RevealOnScroll>
          </div>
        </section>

        <section id="services" className="relative overflow-hidden bg-indigo-50 px-6 py-28 text-zinc-950 dark:bg-black dark:text-white sm:py-36">
          <div className="tx-grid absolute inset-0 opacity-40 dark:opacity-20" />
          <div className="relative mx-auto max-w-7xl">
            <SectionHeading eyebrow={t.services.eyebrow} title={t.services.title} />
            <div className="mx-auto grid max-w-5xl items-stretch gap-5 md:grid-cols-[1fr_2fr]">
              <div className="space-y-2">
                {t.services.items.map((item, index) => <button key={item.title} type="button" onClick={() => setServiceIndex(index)} className={`w-full rounded-2xl px-5 py-4 text-left text-sm transition ${index === serviceIndex ? "bg-zinc-950 text-white shadow-lg shadow-indigo-500/15 dark:bg-white dark:text-zinc-950" : "border border-indigo-100 bg-white/75 text-zinc-600 hover:border-indigo-300 hover:bg-white hover:text-indigo-700 dark:border-transparent dark:bg-white/[0.05] dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"}`}><span className="mr-4 text-xs opacity-60">0{index + 1}</span>{item.title}</button>)}
              </div>
              <motion.article key={service.title} initial={reduced ? false : { opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="relative flex min-h-[390px] flex-col justify-between overflow-hidden rounded-[2rem] border border-indigo-200 bg-gradient-to-br from-white via-indigo-50 to-cyan-50 p-8 shadow-xl shadow-indigo-500/10 sm:p-12 dark:border-white/10 dark:bg-gradient-to-br dark:from-indigo-500/20 dark:via-white/[0.06] dark:to-cyan-400/10 dark:shadow-none">
                <span className="text-sm font-medium text-indigo-600 dark:text-cyan-300">0{serviceIndex + 1} / 0{t.services.items.length}</span>
                <div><h3 className="text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">{service.title}</h3><p className="mt-5 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">{service.description}</p></div>
              </motion.article>
            </div>
          </div>
        </section>

        <section className="overflow-hidden py-24 sm:py-28">
          <SectionHeading eyebrow={t.expertise.eyebrow} title={t.expertise.title} />
          <div className="tx-marquee tx-marquee-reverse border-y border-zinc-900/10 py-7 dark:border-white/10">
            <div className="tx-marquee-track">
              {duplicatedExpertise.map((area, index) => <span key={`${area}-${index}`} className="whitespace-nowrap text-3xl font-semibold tracking-[-0.04em] text-zinc-400 dark:text-zinc-600 sm:text-5xl">{area}<i className="ml-8 inline-block h-2 w-2 rounded-full bg-indigo-500 dark:bg-cyan-300" /></span>)}
            </div>
          </div>
        </section>

        <section id="process" className="px-6 py-28 sm:py-36">
          <div className="mx-auto max-w-6xl">
            <SectionHeading eyebrow={t.process.eyebrow} title={t.process.title} description={t.process.description} />
            <div className="relative mx-auto max-w-4xl before:absolute before:bottom-0 before:left-[1.35rem] before:top-0 before:w-px before:bg-gradient-to-b before:from-indigo-500 before:via-cyan-400 before:to-transparent sm:before:left-1/2">
              {t.process.steps.map((step, index) => <RevealOnScroll key={step.step} className={`relative mb-8 flex gap-6 sm:w-1/2 ${index % 2 ? "sm:ml-auto sm:pl-12" : "sm:pr-12 sm:text-right"}`}><span className={`absolute left-3 top-6 grid h-5 w-5 -translate-x-1/2 place-items-center rounded-full border-4 border-[#f7f7f2] bg-indigo-500 dark:border-[#05070d] dark:bg-cyan-300 sm:left-auto ${index % 2 ? "sm:-left-2.5" : "sm:-right-2.5"}`} /><article className="tx-card ml-10 w-full p-6 sm:ml-0"><span className="text-xs font-semibold text-indigo-500 dark:text-cyan-300">{step.step}</span><h3 className="mt-2 text-xl font-semibold">{step.title}</h3><p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">{step.description}</p></article></RevealOnScroll>)}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 sm:py-28">
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 p-8 text-white shadow-2xl shadow-indigo-500/20 sm:p-14 lg:p-20">
            <div className="tx-grid absolute inset-0 opacity-20" />
            <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto]">
              <div><p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-100">{t.resumex.eyebrow}</p><h2 className="mt-4 text-5xl font-semibold tracking-[-0.055em] sm:text-7xl">{t.resumex.title}</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-blue-50">{t.resumex.description}</p><div className="mt-6 flex flex-wrap gap-2">{t.resumex.badges.map((badge) => <span key={badge} className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs">{badge}</span>)}</div></div>
              <MotionLink href={RESUMEX_URL} target="_blank" rel="noopener noreferrer" variant="primary" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-semibold text-indigo-700 transition hover:scale-105">{t.resumex.cta} <Arrow /></MotionLink>
            </div>
          </div>
        </section>

        <section id="faq" className="px-6 py-28 sm:py-36">
          <div className="mx-auto max-w-4xl"><SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} description={t.faq.description} />
            <div className="divide-y divide-zinc-900/10 border-y border-zinc-900/10 dark:divide-white/10 dark:border-white/10">{t.faq.items.map((item, index) => <div key={item.question}><button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-medium"><span>{item.question}</span><span className={`text-2xl font-light transition ${openFaq === index ? "rotate-45" : ""}`}>+</span></button>{openFaq === index && <motion.p initial={reduced ? false : { opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl pb-7 leading-8 text-zinc-600 dark:text-zinc-400">{item.answer}</motion.p>}</div>)}</div>
          </div>
        </section>

        <section id="contact" className="relative overflow-hidden bg-indigo-50 px-6 py-28 text-zinc-950 dark:bg-black dark:text-white sm:py-36">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(99,102,241,.18),transparent_45%)] dark:bg-[radial-gradient(circle_at_50%_20%,rgba(34,211,238,.16),transparent_45%)]" />
          <div className="relative mx-auto max-w-6xl text-center"><p className="tx-eyebrow">{t.contact.eyebrow}</p><h2 className="mx-auto mt-5 max-w-5xl text-balance text-5xl font-semibold tracking-[-0.06em] sm:text-7xl lg:text-8xl">{t.contact.title}</h2><p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">{t.contact.description}</p><MotionLink href={SCHEDULER_URL} target="_blank" rel="noopener noreferrer" variant="primary" className="tx-primary-button mt-10">{t.contact.cta} <Arrow /></MotionLink>
            <div className="mt-16 grid gap-3 text-left sm:grid-cols-2 lg:grid-cols-4">{[[t.contact.email, CONTACT_EMAIL, `mailto:${CONTACT_EMAIL}`],[t.contact.phone, CONTACT_PHONE, CONTACT_PHONE_HREF],[t.contact.whatsapp, CONTACT_WHATSAPP, CONTACT_WHATSAPP_HREF],[t.contact.linkedin, t.contact.linkedinValue, TALENTX_LINKEDIN]].map(([label,value,href]) => <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className="rounded-2xl border border-indigo-200 bg-white/75 p-5 shadow-sm shadow-indigo-500/5 transition hover:border-indigo-400 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none dark:hover:border-cyan-300/30 dark:hover:bg-white/[0.08]"><span className="block text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600 dark:text-cyan-300">{label}</span><span className="mt-2 block break-words text-sm text-zinc-600 dark:text-zinc-300">{value}</span></a>)}</div>
          </div>
        </section>
      </main>

      <footer className="border-t border-indigo-200 bg-white px-6 py-10 text-zinc-600 dark:border-white/10 dark:bg-black dark:text-zinc-400"><div className="mx-auto flex max-w-7xl flex-col gap-5 text-sm sm:flex-row sm:items-center sm:justify-between"><div><span className="font-semibold tracking-[0.22em] text-zinc-950 dark:text-white">TALENTX</span><p className="mt-2">{t.footer.tagline}</p></div><div className="flex gap-5"><a className="transition hover:text-indigo-600 dark:hover:text-cyan-300" href={TALENTX_LINKEDIN} target="_blank" rel="noopener noreferrer">{t.footer.linkedin}</a><a className="transition hover:text-indigo-600 dark:hover:text-cyan-300" href={CONTACT_WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">{t.footer.whatsapp}</a></div><p>{t.footer.copyright}</p></div></footer>
    </div>
  );
}
