import type { Metadata } from "next";
import VicentePortfolioPage from "@/components/VicentePortfolioPage";

export const metadata: Metadata = {
  title: "Portfolio — Vicente Barrientos | TalentX Recruiting",
  description:
    "Tech portfolio of Vicente Barrientos: FundoSmart, CondoSync, TalentX, ResumeX, OsornoFactory and Mapulengua.",
};

export default function VicenteBarrientosPage() {
  return <VicentePortfolioPage />;
}
