export const dynamic = "force-static";
import { SITE_URL } from "@/lib/seo";

const AI_BOTS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended", "Applebot-Extended", "Bingbot"];

export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }, ...AI_BOTS.map((userAgent) => ({ userAgent, allow: "/", disallow: ["/api/"] }))],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
