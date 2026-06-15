import type { Metadata } from "next";
import PartnerProfilePage from "@/components/PartnerProfilePage";

export const metadata: Metadata = {
  title: "Vicente Barrientos — TalentX Recruiting",
  description:
    "Vicente Barrientos, Founder and Talent Partner at TalentX Recruiting.",
};

export default function VicenteBarrientosPage() {
  return <PartnerProfilePage partner="vicente" />;
}
