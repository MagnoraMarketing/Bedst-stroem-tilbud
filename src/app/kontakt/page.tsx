import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import CtaBanner from "@/components/CtaBanner";
import { siteConfig } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Kontakt",
  description: `Kom i kontakt med ${siteConfig.name}. Vi svarer gerne på spørgsmål om siden, vores indhold eller samarbejder.`,
  path: "/kontakt",
});

export default function KontaktPage() {
  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title="Kom i kontakt med os"
        lead="Har du spørgsmål til siden, vores artikler eller et samarbejde?"
        breadcrumb={[{ name: "Kontakt", href: "/kontakt" }]}
      />

      <section className="py-14">
        <Container className="max-w-2xl">
          <div className="rounded-2xl border border-border bg-white p-8">
            <h2 className="font-display text-xl font-bold text-brand-navy">
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
