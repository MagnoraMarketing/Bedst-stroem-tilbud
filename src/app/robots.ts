import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants";

// AI/LLM crawlers and answer-engine bots we explicitly want indexing the
// site, so it can be surfaced in ChatGPT, Perplexity, Claude, Gemini, etc.
// when people search for things like "billig strøm" or "billigste elpris".
const aiCrawlers = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "Amazonbot",
  "meta-externalagent",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: aiCrawlers, allow: "/" },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
