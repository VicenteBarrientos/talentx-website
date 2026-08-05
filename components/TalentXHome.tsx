"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import ConnectedGlobe from "@/components/ConnectedGlobe";
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
      <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.045em] text-zinc-950 sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description && <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-8 text-zinc-600 sm:text-lg">{description}</p>}
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
    <div className="tx-site min-h-screen overflow-hidden text-zinc-950">
      <ScrollProgress />
      <TopNav />

      <main>
        <section id="home" className="relative flex min-h-[94svh] items-center overflow-hidden px-6 pb-20 pt-32 sm:pt-36">
          <div className="tx-grid absolute inset-0 opacity-60" />
          <div className="absolute -left-40 top-10 h-[34rem] w-[34rem] rounded-full bg-brand-100/60 blur-3xl" />
          <div className="absolute -right-40 bottom-0 h-[38rem] w-[38rem] rounded-full bg-blue-100/40 blur-3xl" />
          <div className="relative mx-auto w-full max-w-7xl">
            <motion.div initial={reduced ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <p className="tx-eyebrow inline-flex rounded-full border border-brand-300/50 bg-white/70 px-4 py-2 backdrop-blur">{t.hero.badge}</p>
              <h1 className="mt-7 max-w-5xl text-balance text-[clamp(3.2rem,7vw,7rem)] font-semibold leading-[0.91] tracking-[-0.07em]">
                <span className="tx-gradient-text">Global talent.</span><br />
                <span>{t.hero.subheadline}</span>
              </h1>
              <p className="mt-8 max-w-2xl text-pretty text-lg leading-8 text-zinc-600 sm:text-xl">{t.hero.headline}</p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <MotionLink href={SCHEDULER_URL} target="_blank" rel="noopener noreferrer" variant="primary" className="tx-primary-button">
                  {t.hero.bookCall} <Arrow />
                </MotionLink>
                <MotionLink href="#services" variant="secondary" className="tx-secondary-button">{t.hero.exploreServices}</MotionLink>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="border-y border-zinc-900/10 bg-white/60 py-5 backdrop-blur" aria-label={t.hero.trustFootnote}>
          <div className="tx-marquee">
            <div className="tx-marquee-track">
              {[...t.hero.trustStrip, ...t.hero.trustStrip].map((item, index) => <span key={`${item}-${index}`} className="flex items-center gap-5 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.22em] text-zinc-600"><i className="h-1.5 w-1.5 rounded-full bg-brand-500" />{item}</span>)}
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
                    <span className="text-sm font-medium text-brand-500">0{index + 1}</span>
                    <h3 className="mt-16 text-2xl font-semibold tracking-[-0.035em]">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-zinc-600">{item.description}</p>
                  </article>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-y border-zinc-900/10 bg-white/55 px-6 py-28 sm:py-36">
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
                <div className="flex min-h-[350px] flex-col items-center justify-center rounded-[1.6rem] bg-gradient-to-br from-brand-100 to-brand-50 p-7 text-center">
                  <div className="relative h-52 w-52 overflow-hidden rounded-full border-4 border-white/70 shadow-xl shadow-brand-500/15 sm:h-56 sm:w-56">
                    <Image src="/partners/vicente-barrientos.png" alt={t.leadership.partners[0].name} fill className="object-cover object-top" sizes="224px" />
                  </div>
                  <p className="mt-6 text-2xl font-semibold">{t.leadership.partners[0].name}</p>
                  <p className="mt-1 text-sm text-brand-600">{t.meetTheTeam.vicente.subtitle}</p>
                </div>
                <div className="flex flex-col justify-center p-7 sm:p-10">
                  <p className="tx-eyebrow">{t.meetTheTeam.eyebrow}</p>
                  <p className="mt-7 text-xl leading-9 text-zinc-700">{t.leadership.partners[0].bio}</p>
                  <p className="mt-5 leading-8 text-zinc-600">{t.leadership.partners[0].regions}</p>
                  <MotionLink href={VICENTE_LINKEDIN} target="_blank" rel="noopener noreferrer" variant="secondary" className="tx-secondary-button mt-8 w-fit">{t.leadership.viewLinkedIn} <Arrow /></MotionLink>
                </div>
              </article>
            </RevealOnScroll>
          </div>
        </section>

        <section id="services" className="relative overflow-hidden bg-brand-50 px-6 py-28 text-zinc-950 sm:py-36">
          <div className="tx-grid absolute inset-0 opacity-40" />
          <div className="relative mx-auto max-w-7xl">
            <SectionHeading eyebrow={t.services.eyebrow} title={t.services.title} />
            <div className="mx-auto grid max-w-5xl items-stretch gap-5 md:grid-cols-[1fr_2fr]">
              <div className="space-y-2">
                {t.services.items.map((item, index) => <button key={item.title} type="button" onClick={() => setServiceIndex(index)} className={`w-full rounded-2xl px-5 py-4 text-left text-sm transition ${index === serviceIndex ? "bg-brand-600 text-white shadow-lg shadow-brand-500/15" : "border border-brand-100 bg-white/75 text-zinc-600 hover:border-brand-300 hover:bg-white hover:text-brand-700"}`}><span className="mr-4 text-xs opacity-60">0{index + 1}</span>{item.title}</button>)}
              </div>
              <motion.article key={service.title} initial={reduced ? false : { opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="relative flex min-h-[390px] flex-col justify-between overflow-hidden rounded-[2rem] border border-brand-200 bg-gradient-to-br from-white via-brand-50 to-brand-100/60 p-8 shadow-xl shadow-brand-500/10 sm:p-12">
                <span className="text-sm font-medium text-brand-600">0{serviceIndex + 1} / 0{t.services.items.length}</span>
                <div><h3 className="text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">{service.title}</h3><p className="mt-5 max-w-xl text-lg leading-8 text-zinc-600">{service.description}</p></div>
              </motion.article>
            </div>
          </div>
        </section>

        <section className="overflow-hidden py-24 sm:py-28">
          <SectionHeading eyebrow={t.expertise.eyebrow} title={t.expertise.title} />
          <div className="tx-marquee tx-marquee-reverse border-y border-zinc-900/10 py-7">
            <div className="tx-marquee-track">
              {duplicatedExpertise.map((area, index) => <span key={`${area}-${index}`} className="whitespace-nowrap text-3xl font-semibold tracking-[-0.04em] text-zinc-400 sm:text-5xl">{area}<i className="ml-8 inline-block h-2 w-2 rounded-full bg-brand-500" /></span>)}
            </div>
          </div>
        </section>

        <section id="process" className="px-6 py-28 sm:py-36">
          <div className="mx-auto max-w-6xl">
            <SectionHeading eyebrow={t.process.eyebrow} title={t.process.title} description={t.process.description} />
            <div className="relative mx-auto max-w-4xl before:absolute before:bottom-0 before:left-[1.35rem] before:top-0 before:w-px before:bg-gradient-to-b before:from-brand-500 before:via-brand-300 before:to-transparent sm:before:left-1/2">
              {t.process.steps.map((step, index) => <RevealOnScroll key={step.step} className={`relative mb-8 flex gap-6 sm:w-1/2 ${index % 2 ? "sm:ml-auto sm:pl-12" : "sm:pr-12 sm:text-right"}`}><span className={`absolute left-3 top-6 grid h-5 w-5 -translate-x-1/2 place-items-center rounded-full border-4 border-[#f1f3f6] bg-brand-500 sm:left-auto ${index % 2 ? "sm:-left-2.5" : "sm:-right-2.5"}`} /><article className="tx-card ml-10 w-full p-6 sm:ml-0"><span className="text-xs font-semibold text-brand-500">{step.step}</span><h3 className="mt-2 text-xl font-semibold">{step.title}</h3><p className="mt-3 text-sm leading-7 text-zinc-600">{step.description}</p></article></RevealOnScroll>)}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 sm:py-28">
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-800 via-brand-600 to-brand-500 p-8 text-white shadow-2xl shadow-brand-500/20 sm:p-14 lg:p-20">
            <div className="tx-grid absolute inset-0 opacity-20" />
            <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto]">
              <div><p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-100">{t.resumex.eyebrow}</p><h2 className="mt-4 text-5xl font-semibold tracking-[-0.055em] sm:text-7xl">{t.resumex.title}</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-brand-50">{t.resumex.description}</p><div className="mt-6 flex flex-wrap gap-2">{t.resumex.badges.map((badge) => <span key={badge} className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs">{badge}</span>)}</div></div>
              <MotionLink href={RESUMEX_URL} target="_blank" rel="noopener noreferrer" variant="primary" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-semibold text-brand-700 transition hover:scale-105">{t.resumex.cta} <Arrow /></MotionLink>
            </div>
          </div>
        </section>

        <section id="faq" className="px-6 py-28 sm:py-36">
          <div className="mx-auto max-w-4xl"><SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} description={t.faq.description} />
            <div className="divide-y divide-zinc-900/10 border-y border-zinc-900/10">{t.faq.items.map((item, index) => <div key={item.question}><button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-medium"><span>{item.question}</span><span className={`text-2xl font-light transition ${openFaq === index ? "rotate-45" : ""}`}>+</span></button>{openFaq === index && <motion.p initial={reduced ? false : { opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl pb-7 leading-8 text-zinc-600">{item.answer}</motion.p>}</div>)}</div>
          </div>
        </section>

        <section id="contact" className="relative overflow-hidden bg-brand-50 px-6 py-28 text-zinc-950 sm:py-36">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(29,53,89,.12),transparent_45%)]" />
          <div className="relative mx-auto max-w-6xl text-center"><p className="tx-eyebrow">{t.contact.eyebrow}</p><h2 className="mx-auto mt-5 max-w-5xl text-balance text-5xl font-semibold tracking-[-0.06em] sm:text-7xl lg:text-8xl">{t.contact.title}</h2><p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-600">{t.contact.description}</p><MotionLink href={SCHEDULER_URL} target="_blank" rel="noopener noreferrer" variant="primary" className="tx-primary-button mt-10">{t.contact.cta} <Arrow /></MotionLink>
            <div className="mt-16 grid gap-3 text-left sm:grid-cols-2 lg:grid-cols-4">{[[t.contact.email, CONTACT_EMAIL, `mailto:${CONTACT_EMAIL}`],[t.contact.phone, CONTACT_PHONE, CONTACT_PHONE_HREF],[t.contact.whatsapp, CONTACT_WHATSAPP, CONTACT_WHATSAPP_HREF],[t.contact.linkedin, t.contact.linkedinValue, TALENTX_LINKEDIN]].map(([label,value,href]) => <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className="rounded-2xl border border-brand-200 bg-white/75 p-5 shadow-sm shadow-brand-500/5 transition hover:border-brand-400 hover:bg-white"><span className="block text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">{label}</span><span className="mt-2 block break-words text-sm text-zinc-600">{value}</span></a>)}</div>
          </div>
        </section>
      </main>

      <footer className="border-t border-brand-200 bg-white px-6 py-10 text-zinc-600"><div className="mx-auto flex max-w-7xl flex-col gap-5 text-sm sm:flex-row sm:items-center sm:justify-between"><div><span className="font-semibold tracking-[0.22em] text-zinc-950">TALENTX</span><p className="mt-2">{t.footer.tagline}</p></div><div className="flex gap-5"><a className="transition hover:text-brand-600" href={TALENTX_LINKEDIN} target="_blank" rel="noopener noreferrer">{t.footer.linkedin}</a><a className="transition hover:text-brand-600" href={CONTACT_WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">{t.footer.whatsapp}</a></div><p>{t.footer.copyright}</p></div></footer>
    </div>
  );
}
