import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBanner from "@/components/CtaBanner";
import BlogCard from "@/components/BlogCard";
import SectionHeading from "@/components/SectionHeading";
import JsonLd from "@/components/JsonLd";
import { getAllSlugs, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/constants";

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

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
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

  // Split the markdown body on top-level headings so we can insert an
  // in-article CTA roughly halfway through the piece.
  const sections = post.content.split(/\n(?=## )/);
  const midpoint = Math.max(1, Math.ceil(sections.length / 2));
  const firstHalf = sections.slice(0, midpoint).join("\n");
  const secondHalf = sections.slice(midpoint).join("\n");

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: { "@type": "Organization", name: siteConfig.name },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <article className="py-10 sm:py-14">
        <Container className="max-w-3xl">
          <Breadcrumbs
            items={[
              { name: "Blog", href: "/blog" },
              { name: post.title, href: `/blog/${post.slug}` },
            ]}
          />

          <div className="mt-4 flex items-center gap-3 text-xs font-medium text-brand-blue">
            <span className="rounded-full bg-brand-sky px-3 py-1">{post.category}</span>
            <span className="text-foreground/40">{post.readingTime}</span>
            <time dateTime={post.date} className="text-foreground/40">
              {new Date(post.date).toLocaleDateString("da-DK", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </div>

          <h1 className="mt-3 font-display text-3xl font-bold text-brand-navy sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-foreground/70">{post.excerpt}</p>

          <div className="mt-8">
            <CtaBanner compact />
          </div>

          <div className="prose-article mt-8">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{firstHalf}</ReactMarkdown>
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
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{secondHalf}</ReactMarkdown>
              </div>
            </>
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
