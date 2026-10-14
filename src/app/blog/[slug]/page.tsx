import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ReactNode } from "react";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBanner from "@/components/CtaBanner";
import BlogCard from "@/components/BlogCard";
import SectionHeading from "@/components/SectionHeading";
import FaqAccordion from "@/components/FaqAccordion";
import JsonLd, { faqJsonLd } from "@/components/JsonLd";
import {
  getAllSlugs,
  getPostBySlug,
  getRelatedPosts,
  getToc,
  slugify,
} from "@/lib/blog";
import { AFFILIATE_URL, siteConfig } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";

// Markdown links to "/tilbud" are in-article affiliate CTAs: send them to the
// partner link and render them as buttons.
const AFFILIATE_PLACEHOLDER = "/tilbud";

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (node && typeof node === "object" && "props" in node) {
    return textOf((node.props as { children?: ReactNode }).children);
  }
  return "";
}

const markdownComponents: Components = {
  a({ href, children }) {
    if (href === AFFILIATE_PLACEHOLDER) {
      return (
        <a
          href={AFFILIATE_URL}
          target="_blank"
          rel="nofollow sponsored noopener"
          className="affiliate-cta"
        >
          {children}
        </a>
      );
    }
    if (href?.startsWith("/")) {
      return <Link href={href}>{children}</Link>;
    }
    return (
      <a href={href} target="_blank" rel="noopener">
        {children}
      </a>
    );
  },
  // Anchor ids on h2s power the table of contents and give search engines
  // "jump to" links into the article.
  h2({ children }) {
    return <h2 id={slugify(textOf(children))}>{children}</h2>;
  },
  table({ children }) {
    return (
      <div className="table-wrap">
        <table>{children}</table>
      </div>
    );
  },
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("da-DK", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const slugs = getAllSlugs();
  if (!slugs.includes(slug)) return {};
  const post = getPostBySlug(slug);

  const base = pageMetadata({
    title: post.seoTitle,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
  });

  return {
    ...base,
    authors: [{ name: siteConfig.name, url: `${siteConfig.url}/om-os` }],
    openGraph: {
      ...base.openGraph,
      title: post.title,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: [siteConfig.name],
      section: post.category,
      tags: post.keywords,
    },
    twitter: {
      ...base.twitter,
      title: post.title,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const slugs = getAllSlugs();
  if (!slugs.includes(slug)) notFound();

  const post = getPostBySlug(slug);
  const related = getRelatedPosts(post);
  const toc = getToc(post.content);
  const url = `${siteConfig.url}/blog/${post.slug}`;

  // Split the markdown body on top-level headings so we can insert an
  // in-article CTA roughly halfway through the piece.
  const sections = post.content.split(/\n(?=## )/);
  const midpoint = Math.max(1, Math.ceil(sections.length / 2));
  const firstHalf = sections.slice(0, midpoint).join("\n");
  const secondHalf = sections.slice(midpoint).join("\n");

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    alternativeHeadline: post.seoTitle !== post.title ? post.seoTitle : undefined,
    description: post.description,
    abstract: post.summary.length > 0 ? post.summary.join(" ") : undefined,
    image: {
      "@type": "ImageObject",
      url: `${url}/opengraph-image`,
      width: 1200,
      height: 630,
    },
    datePublished: post.date,
    dateModified: post.updated,
    wordCount: post.wordCount,
    timeRequired: `PT${Math.max(1, Math.round(post.wordCount / 190))}M`,
    keywords: post.keywords.join(", "),
    articleSection: post.category,
    inLanguage: "da-DK",
    isAccessibleForFree: true,
    author: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: `${siteConfig.url}/om-os`,
    },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["#artikel-titel", "#kort-fortalt"],
    },
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      {post.faq.length > 0 && <JsonLd data={faqJsonLd(post.faq)} />}
      <article className="py-10 sm:py-14">
        <Container className="max-w-3xl">
          <Breadcrumbs
            items={[
              { name: "Blog", href: "/blog" },
              { name: post.title, href: `/blog/${post.slug}` },
            ]}
          />

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-brand-blue">
            <span className="rounded-full bg-brand-sky px-3 py-1">{post.category}</span>
            <span className="text-foreground/40">{post.readingTime}</span>
            <span className="text-foreground/40">
              Udgivet <time dateTime={post.date}>{formatDate(post.date)}</time>
            </span>
            {post.updated !== post.date && (
              <span className="text-foreground/40">
                Opdateret <time dateTime={post.updated}>{formatDate(post.updated)}</time>
              </span>
            )}
          </div>

          <h1
            id="artikel-titel"
            className="mt-3 font-display text-3xl font-bold text-brand-navy sm:text-4xl"
          >
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-foreground/70">{post.excerpt}</p>
          <p className="mt-3 text-sm text-foreground/50">
            Af redaktionen på{" "}
            <Link href="/om-os" className="underline underline-offset-2 hover:text-brand-blue">
              {siteConfig.name}
            </Link>
          </p>

          {post.summary.length > 0 && (
            <aside
              id="kort-fortalt"
              aria-label="Kort fortalt"
              className="mt-8 rounded-2xl border border-border bg-brand-sky/50 p-6"
            >
              <p className="font-display text-sm font-bold uppercase tracking-wide text-brand-blue">
                Kort fortalt
              </p>
              <ul className="mt-3 space-y-2 text-[0.95rem] leading-relaxed text-brand-navy">
                {post.summary.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span aria-hidden="true" className="mt-0.5 text-brand-blue">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          {toc.length >= 3 && (
            <nav
              aria-label="Indholdsfortegnelse"
              className="mt-6 rounded-2xl border border-border bg-white p-6"
            >
              <p className="font-display text-sm font-bold uppercase tracking-wide text-brand-navy">
                Indhold
              </p>
              <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-foreground/75">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="hover:text-brand-blue hover:underline">
                      {item.text}
                    </a>
                  </li>
                ))}
                {post.faq.length > 0 && (
                  <li>
                    <a href="#ofte-stillede-spoergsmaal" className="hover:text-brand-blue hover:underline">
                      Ofte stillede spørgsmål
                    </a>
                  </li>
                )}
              </ol>
            </nav>
          )}

          <div className="mt-8">
            <CtaBanner compact />
          </div>

          <div className="prose-article mt-8">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{firstHalf}</ReactMarkdown>
          </div>

          {secondHalf && (
            <>
              <div className="my-10">
                <CtaBanner
                  compact
                  title="Er du klar til at sammenligne priser?"
                  subtitle="Få op til 3 gratis tilbud fra danske elselskaber."
                />
              </div>
              <div className="prose-article">
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{secondHalf}</ReactMarkdown>
              </div>
            </>
          )}

          {post.faq.length > 0 && (
            <section id="ofte-stillede-spoergsmaal" className="mt-12 scroll-mt-24">
              <h2 className="mb-5 font-display text-2xl font-bold text-brand-navy">
                Ofte stillede spørgsmål
              </h2>
              <FaqAccordion items={post.faq} />
            </section>
          )}

          <div className="mt-12">
            <CtaBanner />
          </div>
        </Container>
      </article>

      {related.length > 0 && (
        <section className="bg-surface py-14">
          <Container>
            <SectionHeading center={false} eyebrow="Læs også" title="Relaterede artikler" />
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((relatedPost) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
