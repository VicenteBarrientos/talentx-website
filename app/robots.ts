import type { MetadataRoute } from "next";
import { TALENTX_URL } from "@/lib/site-urls";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${TALENTX_URL}/sitemap.xml`,
    host: TALENTX_URL,
  };
}
