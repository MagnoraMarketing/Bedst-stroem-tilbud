import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import BlogCard from "@/components/BlogCard";
import JsonLd from "@/components/JsonLd";
import { authors, getAuthor } from "@/lib/authors";
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return authors.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const author = getAuthor((await params).slug);
  if (!author) return {};
  return pageMetadata({
    title: `${author.name} – ${author.jobTitle}`,
    description: author.bio.slice(0, 155),
    path: `/forfattere/${author.slug}`,
  });
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const author = getAuthor((await params).slug);
  if (!author) notFound();
  const posts = getAllPosts().filter((p) => p.author === author.slug);
  const url = `${siteConfig.url}/forfattere/${author.slug}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          url,
          mainEntity: {
            "@type": "Person",
            "@id": `${url}#person`,
            name: author.name,
            jobTitle: author.jobTitle,
            description: author.bio,
            knowsAbout: author.expertise,
            sameAs: author.sameAs,
            image: author.image ? `${siteConfig.url}${author.image}` : undefined,
            worksFor: { "@id": `${siteConfig.url}/#organization` },
          },
        }}
      />
      <PageHero
        eyebrow={author.jobTitle}
        title={author.name}
        lead={author.bio}
        breadcrumb={[{ name: author.name, href: `/forfattere/${author.slug}` }]}
      />
      <section className="py-14">
        <Container>
          <h2 className="font-display text-2xl font-bold text-brand-navy">Artikler af {author.name}</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
