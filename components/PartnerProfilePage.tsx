"use client";

import Image from "next/image";
import TopNav from "@/components/TopNav";
import { useLocale } from "@/components/LocaleProvider";

type PartnerSlug = "vicente" | "benjamin";

const PARTNER_PHOTOS: Record<PartnerSlug, string> = {
  vicente: "/partners/vicente-barrientos.png",
  benjamin: "/partners/benjamin-mahave-cornejo.png",
};

export default function PartnerProfilePage({ partner }: { partner: PartnerSlug }) {
  const { t } = useLocale();
  const profile = t.profile[partner];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50/80 via-white to-white text-zinc-900 dark:bg-[#050816] dark:bg-none dark:text-white">
      <div className="pointer-events-none fixed inset-0 hidden overflow-hidden dark:block">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-[28rem] w-[28rem] rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-sky-400/10 blur-3xl" />
      </div>

      <TopNav />

      <main className="relative z-10 mx-auto max-w-3xl px-6 pb-16 pt-24 sm:py-28">
        <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:gap-8 sm:text-left">
          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-3xl border border-indigo-200 shadow-sm dark:border-white/10 sm:h-32 sm:w-32">
            <Image
              src={PARTNER_PHOTOS[partner]}
              alt={profile.title}
              fill
              className="object-cover object-top"
              sizes="128px"
              priority
            />
          </div>
          <div className="mt-6 sm:mt-0">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-cyan-300">
              {t.meetTheTeam.title}
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              {profile.title}
            </h1>
            <p className="mt-2 text-lg font-medium text-indigo-700 dark:text-cyan-200">
              {profile.subtitle}
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/[0.03] sm:p-10">
          <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
            {profile.bio}
          </p>
        </div>
      </main>
    </div>
  );
}
