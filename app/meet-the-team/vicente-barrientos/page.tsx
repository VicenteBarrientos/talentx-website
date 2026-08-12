import type { Metadata } from "next";
import VicentePortfolioPage from "@/components/VicentePortfolioPage";

const title = "Portfolio — Vicente Barrientos | TalentX Recruiting";
const description =
  "Tech portfolio of Vicente Barrientos: FundoSmart, CondoSync, TalentX, ResumeX, OsornoFactory and Mapulengua.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/meet-the-team/vicente-barrientos",
  },
  openGraph: {
    title,
    description,
    type: "profile",
    url: "/meet-the-team/vicente-barrientos",
    images: [
      {
        url: "/images/vicente-portfolio-og.jpg",
        width: 1200,
        height: 675,
        alt: "Vicente Barrientos — building AI-powered products from Osorno, Chile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/vicente-portfolio-og.jpg"],
  },
};

export default function VicenteBarrientosPage() {
  return <VicentePortfolioPage />;
}
