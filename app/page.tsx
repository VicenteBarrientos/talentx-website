import type { Metadata } from "next";
import TalentXHome from "@/components/TalentXHome";

const title = "TalentX Recruiting — Global Talent Acquisition";
const description =
  "Senior, hands-on recruiting for high-growth teams across the U.S., LATAM, and Europe.";
const socialImageAlt = "TalentX Recruiting logo";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: "/",
    siteName: "TalentX Recruiting",
    locale: "en_US",
    images: [
      {
        url: "/images/talentx-og.png",
        width: 400,
        height: 400,
        alt: socialImageAlt,
      },
    ],
  },
};

export default function Home() {
  return <TalentXHome />;
}
