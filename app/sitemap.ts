import type { MetadataRoute } from "next";
import { TALENTX_URL } from "@/lib/site-urls";

const lastModified = "2026-08-17";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: TALENTX_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      images: [`${TALENTX_URL}/images/talentx-og.png`],
    },
    {
      url: `${TALENTX_URL}/portfolio`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      images: [`${TALENTX_URL}/portfolio/images/vicente-portfolio-og-v2.jpg`],
    },
  ];
}
