import type { MetadataRoute } from "next";
import siteData from "@/data/site.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteData.site.baseUrl;
  const staticRoutes = ["/", "/courses", "/about", "/contact"].map((p) => ({
    url: `${base}${p}`,
    changeFrequency: "weekly" as const,
    priority: p === "/" ? 1 : 0.7,
  }));

  const courses = siteData.courses.map((c) => ({
    url: `${base}/courses/${c.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...courses];
}
