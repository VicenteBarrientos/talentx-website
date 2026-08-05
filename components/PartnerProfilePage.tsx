"use client";

import Image from "next/image";
import TopNav from "@/components/TopNav";
import { useLocale } from "@/components/LocaleProvider";

type PartnerSlug = "vicente";

const PARTNER_PHOTOS: Record<PartnerSlug, string> = {
  vicente: "/partners/vicente-barrientos.png",
};

export default function PartnerProfilePage({ partner }: { partner: PartnerSlug }) {
  const { t } = useLocale();
  const profile = t.profile[partner];

  return (
    <div className="relative min-h-screen text-zinc-900">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand-100/60 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-[28rem] w-[28rem] rounded-full bg-blue-100/40 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-brand-50/80 blur-3xl" />
      </div>

      <TopNav />

      <main className="relative z-10 mx-auto max-w-3xl px-6 pb-16 pt-24 sm:py-28">
        <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:gap-8 sm:text-left">
          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-3xl border border-brand-200 shadow-sm sm:h-32 sm:w-32">
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
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
              {t.meetTheTeam.title}
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              {profile.title}
            </h1>
            <p className="mt-2 text-lg font-medium text-brand-700">
              {profile.subtitle}
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-base leading-relaxed text-zinc-600">
            {profile.bio}
          </p>
        </div>
      </main>
    </div>
  );
}
