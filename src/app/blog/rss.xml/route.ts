import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/constants";

export const dynamic = "force-static";

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

// RSS 2.0 feed of all blog posts. Bing, feed readers and news aggregators use
// it to discover new and updated articles faster than via the sitemap alone.
export async function GET() {
  const posts = getAllPosts();
  const feedUrl = `${siteConfig.url}/blog/rss.xml`;
  const lastBuild = posts.reduce(
    (latest, post) => (post.updated > latest ? post.updated : latest),
    posts[0]?.updated ?? "2026-01-01"
  );

  const items = posts
    .map((post) => {
      const url = `${siteConfig.url}/blog/${post.slug}`;
      return [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <description>${escapeXml(post.description)}</description>`,
        `      <category>${escapeXml(post.category)}</category>`,
        `      <pubDate>${new Date(post.date).toUTCString()}</pubDate>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${siteConfig.name} – Blog`)}</title>
    <link>${siteConfig.url}/blog</link>
    <description>${escapeXml("Guides og gode råd om elpriser, billig strøm og hvordan du sparer penge på elregningen.")}</description>
    <language>da-dk</language>
    <lastBuildDate>${new Date(lastBuild).toUTCString()}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
