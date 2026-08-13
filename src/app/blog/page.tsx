import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import CtaBanner from "@/components/CtaBanner";
import BlogCard from "@/components/BlogCard";
import JsonLd from "@/components/JsonLd";
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Blog om elpriser og strømbesparelser",
  description:
    "Nyheder, guides og gode råd om elpriser, billig strøm og hvordan du sparer penge på din elregning. Opdateret jævnligt.",
  path: "/blog",
  keywords: ["elpriser nyheder", "billig strøm blog", "strømbesparelser", "el nyheder"],
});

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const categories = Array.from(new Set(posts.map((post) => post.category)));

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteConfig.url}/blog/${post.slug}`,
      name: post.title,
    })),
  };

  return (
    <>
      <JsonLd data={itemListJsonLd} />
      <PageHero
        eyebrow="Blog"
        title="Nyheder og gode råd om elpriser"
        lead="Vi følger elmarkedet tæt og samler de vigtigste guides om billig strøm, elpriser og strømbesparelser, så du altid kan handle klogt."
        breadcrumb={[{ name: "Blog", href: "/blog" }]}
      />

      <section className="py-14">
        <Container>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-border bg-white px-4 py-1.5 text-sm font-medium text-brand-navy"
              >
                {category}
              </span>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </Container>
      </section>

      <Container className="pb-14">
        <CtaBanner />
      </Container>
    </>
  );
}
