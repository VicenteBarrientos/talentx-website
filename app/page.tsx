const TALENTX_LINKEDIN = "https://www.linkedin.com/company/talentxrecruiting";
const VICENTE_LINKEDIN = "https://www.linkedin.com/in/vicente-barrientos/";
const BENJAMIN_LINKEDIN =
  "https://www.linkedin.com/in/benjam%C3%ADn-mahave-cornejo-39b2aa129/";
const CONTACT_EMAIL = "vicente@talentxrecruiting.com";
const CONTACT_PHONE = "+1 929 737 0194";
const CONTACT_PHONE_HREF = "tel:+19297370194";
const RESUMEX_URL = "https://resume-x-rose.vercel.app";

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

function HeadshotPlaceholder({ initials }: { initials: string }) {
  return (
    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 text-lg font-semibold tracking-wide text-cyan-100">
      {initials}
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
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-zinc-400">
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
      initials: "VB",
      bio: "Global talent acquisition professional with experience recruiting across the U.S., Canada, LATAM, Europe, and Australia, specializing in technical, business, finance, legal, and startup recruiting.",
      linkedin: VICENTE_LINKEDIN,
    },
    {
      name: "Benjamín Mahave Cornejo",
      initials: "BM",
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
    <div className="min-h-screen bg-[#050816] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-[28rem] w-[28rem] rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-sky-400/10 blur-3xl" />
      </div>

      <header className="relative z-10 border-b border-white/10 bg-[#050816]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-cyan-300">
              TALENTX
            </p>
            <p className="text-xs text-zinc-400">Recruiting</p>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href={RESUMEX_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-zinc-400 transition hover:text-cyan-200"
            >
              ResumeX
            </a>
            <a
              href={TALENTX_LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TalentX on LinkedIn"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-zinc-300 transition hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-200"
            >
              <LinkedInIcon className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:border-cyan-300/50 hover:bg-cyan-400/20"
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
            <p className="mb-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1.5 text-sm font-medium text-cyan-200">
              Global Talent Acquisition for High-Growth Teams
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-white via-cyan-100 to-blue-300 bg-clip-text text-transparent">
                We help U.S. and international companies hire exceptional
                technical and business talent across the U.S., LATAM, and Europe.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300 sm:text-xl">
              Fast, strategic, and human-centered recruiting designed for modern
              startups.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-4 text-sm font-semibold text-[#050816] shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02] hover:shadow-cyan-500/30"
              >
                Book a Call
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/10"
              >
                Explore Services
              </a>
            </div>
          </div>

          <div className="mt-14 border-t border-white/10 pt-8">
            <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-zinc-500 sm:text-sm">
              {trustStrip.join(" • ")}
            </p>
            <p className="mt-4 text-center text-sm text-zinc-400">
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
                className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-6 transition hover:border-cyan-400/20 hover:-translate-y-1"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
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
                className="group flex flex-col rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-8 transition hover:border-cyan-400/25 hover:shadow-lg hover:shadow-cyan-500/10"
              >
                <div className="flex items-start gap-5">
                  <HeadshotPlaceholder initials={partner.initials} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium uppercase tracking-wide text-cyan-300">
                      Partner
                    </p>
                    <h3 className="mt-1 text-2xl font-bold tracking-tight text-white">
                      {partner.name}
                    </h3>
                  </div>
                </div>
                <p className="mt-5 flex-1 text-sm leading-relaxed text-zinc-300">
                  {partner.bio}
                </p>
                {"regions" in partner && partner.regions && (
                  <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                    {partner.regions}
                  </p>
                )}
                {"sectors" in partner && partner.sectors && (
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {partner.sectors}
                  </p>
                )}
                <a
                  href={partner.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2.5 text-sm font-semibold text-cyan-100 transition hover:border-cyan-300/50 hover:bg-cyan-400/20"
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
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-zinc-200 transition hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-100"
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
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-cyan-400/30 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-cyan-500/10"
              >
                <div className="mb-4 h-1 w-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition group-hover:w-16" />
                <h3 className="text-xl font-semibold text-white">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
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
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm font-medium text-zinc-200 transition hover:border-cyan-400/25 hover:bg-white/[0.06] hover:text-white"
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
                className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-cyan-400/25 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-cyan-500/5"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 text-xs font-bold text-cyan-300">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Commitments */}
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-12">
            <SectionIntro
              eyebrow="Commitments"
              title="How we work with every client"
            />
            <ul className="grid gap-4 sm:grid-cols-2">
              {commitments.map((commitment) => (
                <li
                  key={commitment}
                  className="flex gap-3 rounded-xl border border-white/10 bg-[#050816]/40 p-4 text-sm leading-relaxed text-zinc-300 transition hover:border-cyan-400/20"
                >
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
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
                className="flex gap-3 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-5 text-sm leading-relaxed text-zinc-300 transition hover:border-cyan-400/20"
              >
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-cyan-400/80" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ResumeX */}
        <section id="resumex" className="mx-auto max-w-6xl px-6 py-20">
          <div className="rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-blue-600/10 to-transparent p-8 text-center sm:p-14">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              AI RESUME REVIEW
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Try ResumeX
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-zinc-300">
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
                  className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-200"
                >
                  {badge}
                </span>
              ))}
            </div>
            <a
              href={RESUMEX_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-4 text-sm font-semibold text-[#050816] shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02] hover:shadow-cyan-500/30"
            >
              Try ResumeX Free
            </a>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mx-auto max-w-6xl px-6 py-20">
          <div className="rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-blue-600/10 to-transparent p-8 text-center sm:p-14">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Contact
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Let&apos;s Build Your Next Great Hire
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-zinc-300">
              Ready to discuss a search, sourcing support, or a broader hiring
              strategy? Reach out directly.
            </p>

            <div className="mx-auto mt-8 grid w-full max-w-3xl gap-3 text-left sm:grid-cols-3">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="min-w-0 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-cyan-400/25 hover:bg-white/[0.06]"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-cyan-300">
                  Email
                </p>
                <p className="mt-2 break-words text-xs leading-snug text-zinc-200 sm:text-sm">
                  {CONTACT_EMAIL}
                </p>
              </a>
              <a
                href={CONTACT_PHONE_HREF}
                className="min-w-0 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-cyan-400/25 hover:bg-white/[0.06]"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-cyan-300">
                  Phone
                </p>
                <p className="mt-2 text-sm text-zinc-200">{CONTACT_PHONE}</p>
              </a>
              <a
                href={TALENTX_LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-0 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-cyan-400/25 hover:bg-white/[0.06]"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-cyan-300">
                  LinkedIn
                </p>
                <p className="mt-2 text-sm text-zinc-200">TalentX Recruiting</p>
              </a>
            </div>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-4 text-sm font-semibold text-[#050816] shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02] hover:shadow-cyan-500/30"
            >
              Schedule a Consultation
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="font-semibold text-white">TalentX Recruiting</p>
              <p className="mt-2 text-sm text-zinc-500">
                Technical Recruiting | Business Recruiting | Executive Search
              </p>
            </div>
            <div className="flex flex-col gap-2 text-sm text-zinc-400">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                LinkedIn
              </p>
              <a
                href={TALENTX_LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-cyan-300"
              >
                TalentX
              </a>
              <a
                href={VICENTE_LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-cyan-300"
              >
                Vicente Barrientos
              </a>
              <a
                href={BENJAMIN_LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-cyan-300"
              >
                Benjamín Mahave Cornejo
              </a>
            </div>
          </div>
          <p className="mt-8 text-xs text-zinc-600">
            © 2026 TalentX Recruiting. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
