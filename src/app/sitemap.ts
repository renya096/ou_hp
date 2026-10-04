import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { guardServices } from "@/content/services";
import { news } from "@/content/news";
import { columns } from "@/content/columns";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const stat = (path: string, priority = 0.6, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly") => ({
    url: `${site.url}${path}`, lastModified: now, changeFrequency, priority,
  });
  return [
    stat("/", 1, "weekly"),
    stat("/services", 0.9),
    ...guardServices.map((s) => stat(s.path, 0.9)),
    stat("/pricing", 0.8),
    stat("/works", 0.7),
    stat("/faq", 0.6),
    stat("/protection", 0.9),
    stat("/protection/corporate", 0.8),
    stat("/protection/creators", 0.8),
    stat("/protection/personal", 0.8),
    stat("/protection/flow", 0.6),
    stat("/protection/contact", 0.5),
    stat("/en/bodyguard", 0.7),
    stat("/cleaning", 0.8),
    stat("/cleaning/store", 0.7),
    stat("/cleaning/minpaku", 0.7),
    stat("/cleaning/outdoor", 0.7),
    stat("/cleaning/contact", 0.5),
    stat("/company", 0.7),
    stat("/company/education", 0.6),
    stat("/legal", 0.3, "yearly"),
    stat("/privacy", 0.3, "yearly"),
    stat("/news", 0.6, "weekly"),
    ...news.map((n) => ({ url: `${site.url}/news/${n.slug}`, lastModified: new Date(n.date), changeFrequency: "yearly" as const, priority: 0.5 })),
    stat("/recruit", 0.8, "weekly"),
    stat("/recruit/security", 0.8, "weekly"),
    stat("/recruit/cleaning", 0.7, "weekly"),
    stat("/recruit/bodyguard", 0.6),
    stat("/recruit/faq", 0.5),
    stat("/recruit/entry", 0.5),
    stat("/contact", 0.7),
    stat("/column", 0.7, "weekly"),
    ...columns.map((c) => ({ url: `${site.url}/column/${c.slug}`, lastModified: new Date(c.updatedAt ?? c.publishedAt), changeFrequency: "monthly" as const, priority: 0.6 })),
    stat("/glossary", 0.6),
  ];
}
