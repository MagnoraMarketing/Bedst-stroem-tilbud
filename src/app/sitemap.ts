import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/constants";

// Date the static pages were last meaningfully changed. Bing in particular
// relies on <lastmod>, and it stops trusting it if every URL claims to change
// on every deploy – so bump this by hand when page content changes.
const STATIC_PAGES_UPDATED = "2026-10-14";

const staticRoutes: { path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" | "yearly" }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/sammenlign-elpriser", priority: 0.9, changeFrequency: "weekly" },
  { path: "/billigste-elselskab", priority: 0.9, changeFrequency: "weekly" },
  { path: "/elpriser-time-for-time", priority: 0.9, changeFrequency: "daily" },
  { path: "/spar-paa-stroem", priority: 0.8, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/om-os", priority: 0.4, changeFrequency: "yearly" },
  { path: "/kontakt", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privatlivspolitik", priority: 0.2, changeFrequency: "yearly" },
  { path: "/ansvarsfraskrivelse", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latestPost = posts.reduce(
    (latest, post) => (post.updated > latest ? post.updated : latest),
    STATIC_PAGES_UPDATED
  );

  const pages = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    // The blog index changes whenever a post is published or updated.
    lastModified: new Date(route.path === "/blog" ? latestPost : STATIC_PAGES_UPDATED),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const postRoutes = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.updated),
    changeFrequency: "monthly" as const,
    priority: 0.7,
    images: [`${siteConfig.url}/blog/${post.slug}/opengraph-image`],
  }));

  return [...pages, ...postRoutes];
}
