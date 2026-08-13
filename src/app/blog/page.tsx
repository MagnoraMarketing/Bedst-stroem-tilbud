import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import CtaBanner from "@/components/CtaBanner";
import BlogCard from "@/components/BlogCard";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog om elpriser og strømbesparelser",
  description:
    "Nyheder, guides og gode råd om elpriser, billig strøm og hvordan du sparer penge på din elregning. Opdateret jævnligt.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const categories = Array.from(new Set(posts.map((post) => post.category)));

  return (
    <>
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
