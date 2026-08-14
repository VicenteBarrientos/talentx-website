import type { Metadata } from "next";
import VicentePortfolioPage from "@/components/VicentePortfolioPage";
import {
  TALENTX_URL,
  VICENTE_GITHUB_URL,
  VICENTE_LINKEDIN_URL,
} from "@/lib/site-urls";

const portfolioUrl = `${TALENTX_URL}/portfolio`;
const title = "Vicente Barrientos — Technical Recruiter | TalentX";
const description =
  "Vicente Barrientos is a technical recruiter, TalentX founder, and Recruiting Partner at Goodwin helping U.S. and international teams hire exceptional talent.";
const socialImage = "/images/vicente-portfolio-og.jpg";
const socialImageAlt =
  "A glowing route across floating islands toward two snow-covered volcanoes";

export const metadata: Metadata = {
  title,
  description,
  authors: [{ name: "Vicente Barrientos", url: portfolioUrl }],
  creator: "Vicente Barrientos",
  publisher: "TalentX Recruiting",
  category: "Recruiting",
  alternates: {
    canonical: "/portfolio",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title,
    description,
    type: "profile",
    url: "/portfolio",
    siteName: "TalentX Recruiting",
    locale: "en_US",
    firstName: "Vicente",
    lastName: "Barrientos",
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 675,
        alt: socialImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [
      {
        url: socialImage,
        alt: socialImageAlt,
      },
    ],
  },
};

const profileJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${portfolioUrl}#profile-page`,
  url: portfolioUrl,
  name: title,
  description,
  dateModified: "2026-08-14",
  mainEntity: {
    "@type": "Person",
    "@id": `${portfolioUrl}#vicente-barrientos`,
    name: "Vicente Barrientos",
    givenName: "Vicente",
    familyName: "Barrientos",
    url: portfolioUrl,
    image: `${TALENTX_URL}/partners/vicente-barrientos.png`,
    description,
    jobTitle: [
      "Technical Recruiter",
      "Founder, TalentX Recruiting",
      "Recruiting Partner at Goodwin",
    ],
    worksFor: {
      "@type": "Organization",
      "@id": `${TALENTX_URL}/#organization`,
      name: "TalentX Recruiting",
      url: TALENTX_URL,
    },
    knowsAbout: [
      "Technical recruiting",
      "Talent acquisition",
      "Executive search",
      "Global recruiting",
      "Recruiting technology",
    ],
    sameAs: [VICENTE_LINKEDIN_URL, VICENTE_GITHUB_URL],
  },
};

export default function PortfolioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profileJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <VicentePortfolioPage />
    </>
  );
}
