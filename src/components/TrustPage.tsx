import Link from "next/link";
import type { ReactNode } from "react";
import Container from "./Container";
import PageHero from "./PageHero";
import JsonLd from "./JsonLd";
import { siteConfig } from "@/lib/constants";

export const TRUST_PAGES_UPDATED = "2026-11-03";

export const trustLinks = [
  { label: "Om os", href: "/om-os" },
  { label: "Redaktionel politik", href: "/redaktionel-politik" },
  { label: "Sådan beregner vi elpriser", href: "/saadan-beregner-vi-elpriser" },
  { label: "Sådan tjener vi penge", href: "/saadan-tjener-vi-penge" },
  { label: "Kilder", href: "/kilder" },
];

/** Shared layout for E-E-A-T / transparency pages. */
export default function TrustPage({
  title,
  lead,
  path,
  description,
  children,
}: {
  title: string;
  lead: string;
  path: string;
  description: string;
  children: ReactNode;
}) {
  const url = `${siteConfig.url}${path}`;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": path === "/om-os" ? "AboutPage" : "WebPage",
          "@id": `${url}#webpage`,
          url,
          name: title,
          description,
          inLanguage: "da-DK",
          dateModified: TRUST_PAGES_UPDATED,
          isPartOf: { "@id": `${siteConfig.url}/#website` },
          publisher: { "@id": `${siteConfig.url}/#organization` },
        }}
      />
      <PageHero title={title} lead={lead} breadcrumb={[{ name: title, href: path }]} />
      <section className="py-14">
        <Container className="max-w-3xl">
          <p className="mb-6 text-sm text-foreground/55">
            Senest opdateret{" "}
            <time dateTime={TRUST_PAGES_UPDATED}>
              {new Date(TRUST_PAGES_UPDATED).toLocaleDateString("da-DK", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </p>
          <div className="prose-article">{children}</div>
          <nav aria-label="Gennemsigtighed" className="mt-12 rounded-2xl border border-border bg-surface p-5">
            <p className="font-display text-sm font-bold text-brand-navy">Mere om gennemsigtighed</p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {trustLinks
                .filter((l) => l.href !== path)
                .map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-brand-blue hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        </Container>
      </section>
    </>
  );
}
