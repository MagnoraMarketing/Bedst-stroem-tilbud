import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import CtaBanner from "@/components/CtaBanner";
import { CheckIcon } from "@/components/icons";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Om os",
  description: `Læs om ${siteConfig.name}, og hvordan vi hjælper danskere med at sammenligne elpriser og finde en billigere elaftale.`,
  alternates: { canonical: "/om-os" },
};

export default function OmOsPage() {
  return (
    <>
      <PageHero
        eyebrow="Om os"
        title={`Om ${siteConfig.name}`}
        lead="Vi hjælper danske husstande med at få overblik over elmarkedet og komme videre til konkrete tilbud på en billigere elaftale."
        breadcrumb={[{ name: "Om os", href: "/om-os" }]}
      />

      <section className="py-14">
        <Container className="max-w-3xl">
          <div className="prose-article">
            <h2>Vores mission</h2>
            <p>
              Elmarkedet i Danmark kan være svært at gennemskue: mange
              produkttyper, skiftende priser og forskellige vilkår gør det
              tidskrævende at finde ud af, om man reelt betaler for meget.
              {" "}
              {siteConfig.name} blev skabt for at gøre det nemmere at
              sammenligne elpriser og komme videre til konkrete tilbud – uden
              at det kræver timers research.
            </p>

            <h2>Hvad vi laver</h2>
            <p>
              Vi udgiver guides og artikler om elpriser, elselskaber og
              strømbesparelser, og vi hjælper besøgende videre til at
              indhente uforpligtende tilbud fra danske elselskaber gennem
              vores samarbejdspartner findelpriser.dk. Vi er ikke selv et
              elselskab, og vi sælger ikke strøm – vi formidler kontakten
              mellem dig og elselskaberne.
            </p>

            <h2>Sådan tjener vi penge</h2>
            <p>
              {siteConfig.name} er gratis at bruge for dig. Vi modtager en
              provision fra vores samarbejdspartnere, når en besøgende
              indgår en aftale via et af vores links. Det påvirker ikke den
              pris, du bliver tilbudt, og det koster ikke ekstra for dig. Du
              kan læse mere om dette i vores{" "}
              <a href="/ansvarsfraskrivelse" className="underline">
                ansvarsfraskrivelse
              </a>
              .
            </p>

            <h2>Hvorfor stole på os?</h2>
            <ul>
              <li>Vi er uafhængige af de enkelte elselskaber.</li>
              <li>Vores indhold er skrevet for at være letforståeligt og opdateret.</li>
              <li>Det er altid gratis og uforpligtende at indhente tilbud.</li>
              <li>Du bestemmer selv, om du vil sige ja tak til et tilbud.</li>
            </ul>
          </div>

          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              "Uafhængig sammenligning",
              "Ingen forpligtelser",
              "Fokus på gennemsigtighed",
              "Danske elselskaber",
            ].map((point) => (
              <li key={point} className="flex items-center gap-2 text-sm text-foreground/75">
                <CheckIcon className="w-5 h-5 text-success shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Container className="pb-14">
        <CtaBanner />
      </Container>
    </>
  );
}
