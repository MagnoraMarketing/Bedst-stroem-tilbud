import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type BlogFaq = {
  question: string;
  answer: string;
};

export type BlogFrontmatter = {
  title: string;
  // Shorter, keyword-first title for the <title> tag / search result snippet.
  // Falls back to `title` when not set.
  seoTitle: string;
  description: string;
  excerpt: string;
  date: string;
  // Date of the last substantial content update. Falls back to `date`.
  updated: string;
  category: string;
  keywords: string[];
  // "Kort fortalt" key takeaways shown at the top of the article.
  summary: string[];
  faq: BlogFaq[];
};

export type BlogPost = BlogFrontmatter & {
  slug: string;
  content: string;
  readingTime: string;
  wordCount: number;
};

export type TocItem = {
  id: string;
  text: string;
};

/** URL-safe anchor id for a heading, keeping Danish letters readable. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/æ/g, "ae")
    .replace(/ø/g, "oe")
    .replace(/å/g, "aa")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Strips inline markdown (links, emphasis, code) from a heading. */
export function plainText(markdown: string): string {
  return markdown
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]/g, "")
    .trim();
}

/** Table of contents built from the article's `## ` headings. */
export function getToc(content: string): TocItem[] {
  return content
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => {
      const text = plainText(line.slice(3));
      return { id: slugify(text), text };
    });
}

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getPostBySlug(slug: string): BlogPost {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content, { wordsPerMinute: 190 });

  return {
    slug,
    content,
    title: data.title,
    seoTitle: data.seoTitle ?? data.title,
    description: data.description,
    excerpt: data.excerpt,
    date: data.date,
    updated: data.updated ?? data.date,
    category: data.category,
    keywords: data.keywords ?? [],
    summary: data.summary ?? [],
    faq: data.faq ?? [],
    readingTime: `${Math.max(1, Math.round(stats.minutes))} min. læsning`,
    wordCount: stats.words,
  };
}

export function getAllPosts(): BlogPost[] {
  return getAllSlugs()
    .map((slug) => getPostBySlug(slug))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getRelatedPosts(current: BlogPost, limit = 3): BlogPost[] {
  const all = getAllPosts().filter((p) => p.slug !== current.slug);
  const currentKeywords = new Set(current.keywords.map((k) => k.toLowerCase()));

  // Rank by shared category first, then by overlapping keywords, so related
  // links form tight topic clusters (good for both readers and crawlers).
  const score = (post: BlogPost) =>
    (post.category === current.category ? 10 : 0) +
    post.keywords.filter((k) => currentKeywords.has(k.toLowerCase())).length;

  return all
    .map((post) => ({ post, score: score(post) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post);
}
