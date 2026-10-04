import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/** 本番以外（Vercelのプレビュー）はインデックスさせない */
export default function robots(): MetadataRoute.Robots {
  const isProd = process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production" && !process.env.VERCEL_ENV;
  if (!isProd) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/contact/thanks", "/protection/contact/thanks", "/cleaning/contact/thanks", "/recruit/entry/thanks"] },
      // AI検索のクローラーも明示的に許可（事実をサイトから拾わせる）
      { userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended", "Bingbot"], allow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
