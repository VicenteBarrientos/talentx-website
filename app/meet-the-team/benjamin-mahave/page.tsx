import type { Metadata } from "next";
import PartnerProfilePage from "@/components/PartnerProfilePage";

export const metadata: Metadata = {
  title: "Benjamin Mahave — TalentX Recruiting",
  description:
    "Benjamin Mahave, Co-Founder and Talent Partner at TalentX Recruiting.",
};

export default function BenjaminMahavePage() {
  return <PartnerProfilePage partner="benjamin" />;
}
