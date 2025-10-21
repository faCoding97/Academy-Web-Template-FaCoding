import type { MetadataRoute } from "next";
import siteData from "@/data/site.json";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${siteData.site.baseUrl}/sitemap.xml`,
  };
}
