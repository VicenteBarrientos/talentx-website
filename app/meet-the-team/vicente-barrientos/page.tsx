import type { Metadata } from "next";
import VicenteProfilePage from "@/components/VicenteProfilePage";

export const metadata: Metadata = {
  title: "Vicente Barrientos — TalentX Recruiting",
  description:
    "Vicente Barrientos is a recruiting leader and entrepreneur. Recruiting Partner at Goodwin Recruiting and Founder of TalentX Recruiting.",
};

export default function VicenteBarrientosPage() {
  return <VicenteProfilePage />;
}
