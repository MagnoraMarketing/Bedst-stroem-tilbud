import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import CtaBanner from "@/components/CtaBanner";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Kontakt",
  description: `Kom i kontakt med ${siteConfig.name}. Vi svarer gerne på spørgsmål om siden, vores indhold eller samarbejder.`,
  alternates: { canonical: "/kontakt" },
};

export default function KontaktPage() {
  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title="Kom i kontakt med os"
        lead="Har du spørgsmål til siden, vores artikler eller et samarbejde? Skriv til os – vi svarer så hurtigt, vi kan."
        breadcrumb={[{ name: "Kontakt", href: "/kontakt" }]}
      />

      <section className="py-14">
        <Container className="max-w-2xl">
          <div className="rounded-2xl border border-border bg-white p-8">
            <h2 className="font-display text-xl font-bold text-brand-navy">E-mail</h2>
            <p className="mt-2 text-foreground/70">
              Den hurtigste måde at komme i kontakt med os på er via e-mail:
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-3 inline-block font-semibold text-brand-blue hover:underline"
            >
              {siteConfig.email}
            </a>

            <h2 className="mt-8 font-display text-xl font-bold text-brand-navy">
              Spørgsmål om en konkret elaftale?
            </h2>
            <p className="mt-2 text-foreground/70">
              Hvis du allerede har modtaget et tilbud eller er blevet kunde
              hos et elselskab gennem vores side, skal du kontakte det
              pågældende elselskab direkte, da de har ansvaret for din
              konkrete aftale, fakturering og kundeservice.
            </p>
          </div>
        </Container>
      </section>

      <Container className="pb-14">
        <CtaBanner />
      </Container>
    </>
  );
}
