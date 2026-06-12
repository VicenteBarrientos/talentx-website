import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";
import ThemedExternalLink from "@/components/ThemedExternalLink";
import { RESUMEX_URL } from "@/lib/site-urls";

const TALENTX_LINKEDIN = "https://www.linkedin.com/company/talentxrecruiting";
const VICENTE_LINKEDIN = "https://www.linkedin.com/in/vicente-barrientos/";
const BENJAMIN_LINKEDIN =
  "https://www.linkedin.com/in/benjam%C3%ADn-mahave-cornejo-39b2aa129/";
const CONTACT_EMAIL = "vicente@talentxrecruiting.com";
const CONTACT_PHONE = "+1 929 737 0194";
const CONTACT_PHONE_HREF = "tel:+19297370194";

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

function PartnerHeadshot({
  name,
  photo,
}: {
  name: string;
  photo: string;
}) {
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

export default function Home() {
  const partners = [
    {
      name: "Vicente Barrientos",
      photo: "/partners/vicente-barrientos.png",
      bio: "Global talent acquisition professional with experience recruiting across the U.S., Canada, LATAM, Europe, and Australia, specializing in technical, business, finance, legal, and startup recruiting.",
      linkedin: VICENTE_LINKEDIN,
    },
    {
      name: "Benjamín Mahave Cornejo",
      photo: "/partners/benjamin-mahave-cornejo.png",
      bio: "Global recruiter and talent acquisition professional with experience across Latin America, executive search, organizational development, people strategy, and consulting environments. Former BCG recruiting specialist with experience at Turner & Townsend, Cencosud, BCG, and EY.",
      regions:
        "Regional experience across Chile, Argentina, Uruguay, and Colombia.",
      sectors:
        "Talent acquisition for real estate, infrastructure, natural resources, consulting, technology, and executive search roles.",
      linkedin: BENJAMIN_LINKEDIN,
    },
  ];

  const services = [
    {
      title: "Technical Recruiting",
      description:
        "Full-stack, backend, data, DevOps, and product engineering hires across competitive global markets.",
    },
    {
      title: "Business, Operations, Finance & Legal",
      description:
        "Operators, finance leaders, legal counsel, and cross-functional talent that helps scale high-growth teams.",
    },
    {
      title: "Sourcing-as-a-Service",
      description:
        "Dedicated pipeline development, outreach, and candidate engagement without full-cycle overhead.",
    },
    {
      title: "Remote & Contractor Hiring",
      description:
        "Flexible hiring models for distributed teams across the U.S., LATAM, Europe, and beyond.",
    },
  ];

  const whyTalentX = [
    {
      title: "Faster hiring",
      description:
        "Move from role brief to qualified candidates without the delays of a large agency workflow.",
    },
    {
      title: "Better candidate quality",
      description:
        "Targeted outreach and rigorous screening focused on fit, motivation, and long-term impact.",
    },
    {
      title: "Access to global talent",
      description:
        "Reach experienced professionals across the U.S., Canada, LATAM, Europe, and Australia.",
    },
    {
      title: "Senior-level recruiting support",
      description:
        "Work directly with experienced recruiters — not junior coordinators or account layers.",
    },
    {
      title: "Flexible engagement models",
      description:
        "Choose full-cycle search, sourcing support, or project-based hiring based on your needs.",
    },
  ];

  const expertise = [
    "Software Engineering",
    "Data & AI",
    "Product Management",
    "Finance & Accounting",
    "Operations",
    "Legal & Compliance",
    "Go-to-Market",
    "Executive Leadership",
  ];

  const process = [
    {
      step: "01",
      title: "Discovery",
      description:
        "Align on role scope, hiring bar, compensation, timeline, and success metrics.",
    },
    {
      step: "02",
      title: "Market mapping",
      description:
        "Identify target companies, talent pools, and sourcing channels across relevant regions.",
    },
    {
      step: "03",
      title: "Outreach & screening",
      description:
        "Engage qualified candidates with tailored messaging and structured qualification.",
    },
    {
      step: "04",
      title: "Interview support",
      description:
        "Coordinate interviews, calibrate feedback, and keep momentum through the decision.",
    },
    {
      step: "05",
      title: "Close & onboarding",
      description:
        "Support offer negotiation and a smooth start for candidates joining your team.",
    },
  ];

  const socialProof = [
    "Global recruiting experience across multiple continents",
    "Experience supporting startups and scaling organizations",
    "Hands-on partner involvement in every search",
    "Specialized expertise across technical and business functions",
    "Flexible recruiting and sourcing models",
  ];

  const commitments = [
    "Clear communication at every stage of the search",
    "Confidential, professional handling of sensitive hiring needs",
    "Data-informed sourcing with a human, relationship-driven touch",
    "Flexible engagement models tailored to your hiring velocity",
    "Partnership built on trust, accountability, and results",
  ];

  const trustStrip = [
    "Technical Recruiting",
    "Business & Operations",
    "Finance & Accounting",
    "Executive Search",
    "Remote Hiring",
  ];

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
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Recruiting</p>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <ThemedExternalLink
              href={RESUMEX_URL}
              target="_blank"
              rel="noopener noreferrer"
              fallbackTheme="dark"
              className="text-sm font-medium text-zinc-600 transition hover:text-indigo-700 dark:text-zinc-400 dark:hover:text-cyan-200"
            >
              ResumeX
            </ThemedExternalLink>
            <ThemeToggle />
            <a
              href={TALENTX_LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TalentX on LinkedIn"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 dark:border-white/15 dark:text-zinc-300 dark:hover:border-cyan-400/40 dark:hover:bg-cyan-400/10 dark:hover:text-cyan-200"
            >
              <LinkedInIcon className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 transition hover:border-indigo-300 hover:bg-indigo-100 dark:border-cyan-400/30 dark:bg-cyan-400/10 dark:text-cyan-100 dark:hover:border-cyan-300/50 dark:hover:bg-cyan-400/20"
            >
              Get in touch
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pb-16 pt-20 sm:pt-28">
          <div className="max-w-4xl">
            <p className="mb-4 inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-200">
              Global Talent Acquisition for High-Growth Teams
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="text-zinc-900 dark:bg-gradient-to-r dark:from-white dark:via-cyan-100 dark:to-blue-300 dark:bg-clip-text dark:text-transparent">
                We help U.S. and international companies hire exceptional
                technical and business talent across the U.S., LATAM, and Europe.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600 sm:text-xl dark:text-zinc-300">
              Fast, strategic, and human-centered recruiting designed for modern
              startups.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 dark:bg-gradient-to-r dark:from-cyan-400 dark:to-blue-500 dark:text-[#050816] dark:shadow-lg dark:shadow-cyan-500/20 dark:hover:scale-[1.02] dark:hover:shadow-cyan-500/30"
              >
                Book a Call
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white px-8 py-4 text-sm font-semibold text-zinc-800 transition hover:border-indigo-400 hover:bg-indigo-50 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-white/25 dark:hover:bg-white/10"
              >
                Explore Services
              </a>
            </div>
          </div>

          <div className="mt-14 border-t border-zinc-200 pt-8 dark:border-white/10">
            <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-zinc-500 sm:text-sm">
              {trustStrip.join(" • ")}
            </p>
            <p className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
              Experienced recruiting across the U.S., Canada, LATAM, Europe, and
              Australia.
            </p>
          </div>
        </section>

        {/* Why TalentX */}
        <section id="why" className="mx-auto max-w-6xl px-6 py-20">
          <SectionIntro
            eyebrow="Why TalentX"
            title="Built for teams that need results, not bureaucracy"
            description="TalentX gives growing companies the speed, judgment, and access of a senior recruiting partner — without the overhead, handoffs, or generic playbooks of a large agency."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyTalentX.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-indigo-300 hover:shadow-md dark:border-white/10 dark:bg-transparent dark:bg-gradient-to-b dark:from-white/[0.05] dark:to-transparent dark:shadow-none dark:hover:border-cyan-400/20 dark:hover:shadow-none dark:hover:-translate-y-1"
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
        </section>

        {/* Leadership */}
        <section id="leadership" className="mx-auto max-w-6xl px-6 py-20">
          <SectionIntro
            eyebrow="Leadership"
            title="Experienced recruiters, directly involved"
            description="TalentX is led by experienced recruiting professionals who work directly with clients throughout every search. We combine global recruiting experience, market insight, and hands-on execution to help companies make exceptional hires."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {partners.map((partner) => (
              <article
                key={partner.name}
                className="group flex flex-col rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition hover:border-indigo-300 hover:shadow-md dark:border-white/10 dark:bg-transparent dark:bg-gradient-to-b dark:from-white/[0.06] dark:to-white/[0.02] dark:shadow-none dark:hover:border-cyan-400/25 dark:hover:shadow-none dark:hover:shadow-lg dark:hover:shadow-cyan-500/10"
              >
                <div className="flex items-start gap-5">
                  <PartnerHeadshot name={partner.name} photo={partner.photo} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium uppercase tracking-wide text-indigo-600 dark:text-cyan-300">
                      Partner
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
                {"sectors" in partner && partner.sectors && (
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                    {partner.sectors}
                  </p>
                )}
                <a
                  href={partner.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-5 py-2.5 text-sm font-semibold text-indigo-700 transition hover:border-indigo-300 hover:bg-indigo-100 dark:border-cyan-400/30 dark:bg-cyan-400/10 dark:text-cyan-100 dark:hover:border-cyan-300/50 dark:hover:bg-cyan-400/20"
                >
                  <LinkedInIcon className="h-4 w-4" />
                  View LinkedIn
                </a>
              </article>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <a
              href={TALENTX_LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 transition hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-700 dark:border-white/15 dark:bg-white/5 dark:text-zinc-200 dark:hover:border-cyan-400/30 dark:hover:bg-cyan-400/10 dark:hover:text-cyan-100"
            >
              <LinkedInIcon className="h-4 w-4" />
              TalentX on LinkedIn
            </a>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="mx-auto max-w-6xl px-6 py-20">
          <SectionIntro
            eyebrow="Services"
            title="Recruiting built for modern teams"
          />
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <article
                key={service.title}
                className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-indigo-300 hover:shadow-md dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none dark:hover:border-cyan-400/30 dark:hover:bg-white/[0.06] dark:hover:shadow-lg dark:hover:shadow-cyan-500/10"
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
        </section>

        {/* Areas of Expertise */}
        <section id="expertise" className="mx-auto max-w-6xl px-6 py-20">
          <SectionIntro
            eyebrow="Areas of Expertise"
            title="Specialized recruiting across technical and business functions"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {expertise.map((area) => (
              <article
                key={area}
                className="rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-sm font-medium text-zinc-700 shadow-sm transition hover:border-indigo-300 hover:text-zinc-900 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-200 dark:shadow-none dark:hover:border-cyan-400/25 dark:hover:bg-white/[0.06] dark:hover:text-white"
              >
                {area}
              </article>
            ))}
          </div>
        </section>

        {/* Recruiting Process */}
        <section id="process" className="mx-auto max-w-6xl px-6 py-20">
          <SectionIntro
            eyebrow="Recruiting Process"
            title="A clear path from brief to hire"
            description="A structured, transparent process designed to deliver quality and speed."
          />
          <div className="grid gap-5 lg:grid-cols-5">
            {process.map((item) => (
              <article
                key={item.step}
                className="relative rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-indigo-300 hover:shadow-md dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none dark:hover:border-cyan-400/25 dark:hover:bg-white/[0.06] dark:hover:shadow-none dark:hover:shadow-lg dark:hover:shadow-cyan-500/5"
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
        </section>

        {/* Commitments */}
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm sm:p-12 dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none">
            <SectionIntro
              eyebrow="Commitments"
              title="How we work with every client"
            />
            <ul className="grid gap-4 sm:grid-cols-2">
              {commitments.map((commitment) => (
                <li
                  key={commitment}
                  className="flex gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm leading-relaxed text-zinc-700 transition hover:border-indigo-300 dark:border-white/10 dark:bg-[#050816]/40 dark:text-zinc-300 dark:hover:border-cyan-400/20 dark:hover:shadow-none"
                >
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500 dark:bg-gradient-to-r dark:from-cyan-400 dark:to-blue-500" />
                  <span>{commitment}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Social Proof */}
        <section className="mx-auto max-w-6xl px-6 py-20">
          <SectionIntro
            eyebrow="Why Companies Work With TalentX"
            title="Credibility built on experience and execution"
          />
          <ul className="grid gap-4 sm:grid-cols-2">
            {socialProof.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-2xl border border-zinc-200 bg-white p-5 text-sm leading-relaxed text-zinc-700 shadow-sm transition hover:border-indigo-300 dark:border-white/10 dark:bg-transparent dark:bg-gradient-to-b dark:from-white/[0.04] dark:to-transparent dark:text-zinc-300 dark:shadow-none dark:hover:border-cyan-400/20 dark:hover:shadow-none"
              >
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-indigo-500 dark:bg-cyan-400/80" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ResumeX */}
        <section id="resumex" className="mx-auto max-w-6xl px-6 py-20">
          <div className="rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-50/80 via-white to-indigo-50/40 p-8 text-center shadow-sm sm:p-14 dark:border-cyan-400/20 dark:bg-none dark:bg-gradient-to-br dark:from-cyan-500/10 dark:via-blue-600/10 dark:to-transparent dark:shadow-none">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-cyan-300">
              AI RESUME REVIEW
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-inherit">
              Try ResumeX
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              Upload a resume and get instant AI-powered feedback on structure,
              clarity, keywords, and role alignment.
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-zinc-500">
              Built by TalentX Recruiting to help candidates improve their
              resumes before applying.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {[
                "AI-powered analysis",
                "Instant feedback",
                "Free to use",
              ].map((badge) => (
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
              className="mt-8 inline-flex items-center justify-center rounded-full bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 dark:bg-gradient-to-r dark:from-cyan-400 dark:to-blue-500 dark:text-[#050816] dark:shadow-lg dark:shadow-cyan-500/20 dark:hover:scale-[1.02] dark:hover:shadow-cyan-500/30"
            >
              Try ResumeX Free
            </ThemedExternalLink>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mx-auto max-w-6xl px-6 py-20">
          <div className="rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-50/80 via-white to-indigo-50/40 p-8 text-center shadow-sm sm:p-14 dark:border-cyan-400/20 dark:bg-none dark:bg-gradient-to-br dark:from-cyan-500/10 dark:via-blue-600/10 dark:to-transparent dark:shadow-none">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-cyan-300">
              Contact
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-inherit">
              Let&apos;s Build Your Next Great Hire
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              Ready to discuss a search, sourcing support, or a broader hiring
              strategy? Reach out directly.
            </p>

            <div className="mx-auto mt-8 grid w-full max-w-3xl gap-3 text-left sm:grid-cols-3">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="min-w-0 rounded-xl border border-zinc-200 bg-white p-4 transition hover:border-indigo-300 hover:shadow-sm dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-cyan-400/25 dark:hover:bg-white/[0.06] dark:hover:shadow-none"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-cyan-300">
                  Email
                </p>
                <p className="mt-2 break-words text-xs leading-snug text-zinc-700 sm:text-sm dark:text-zinc-200">
                  {CONTACT_EMAIL}
                </p>
              </a>
              <a
                href={CONTACT_PHONE_HREF}
                className="min-w-0 rounded-xl border border-zinc-200 bg-white p-4 transition hover:border-indigo-300 hover:shadow-sm dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-cyan-400/25 dark:hover:bg-white/[0.06] dark:hover:shadow-none"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-cyan-300">
                  Phone
                </p>
                <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-200">
                  {CONTACT_PHONE}
                </p>
              </a>
              <a
                href={TALENTX_LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-0 rounded-xl border border-zinc-200 bg-white p-4 transition hover:border-indigo-300 hover:shadow-sm dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-cyan-400/25 dark:hover:bg-white/[0.06] dark:hover:shadow-none"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-cyan-300">
                  LinkedIn
                </p>
                <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-200">
                  TalentX Recruiting
                </p>
              </a>
            </div>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 dark:bg-gradient-to-r dark:from-cyan-400 dark:to-blue-500 dark:text-[#050816] dark:shadow-lg dark:shadow-cyan-500/20 dark:hover:scale-[1.02] dark:hover:shadow-cyan-500/30"
            >
              Schedule a Consultation
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-zinc-200 bg-white/60 backdrop-blur-sm dark:border-white/10 dark:bg-transparent dark:backdrop-blur-none">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="font-semibold text-zinc-900 dark:text-white">
                TalentX Recruiting
              </p>
              <p className="mt-2 text-sm text-zinc-500">
                Technical Recruiting | Business Recruiting | Executive Search
              </p>
            </div>
            <div className="flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                LinkedIn
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
                Vicente Barrientos
              </a>
              <a
                href={BENJAMIN_LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-indigo-600 dark:hover:text-cyan-300"
              >
                Benjamín Mahave Cornejo
              </a>
            </div>
          </div>
          <p className="mt-8 text-xs text-zinc-400 dark:text-zinc-600">
            © 2026 TalentX Recruiting. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
