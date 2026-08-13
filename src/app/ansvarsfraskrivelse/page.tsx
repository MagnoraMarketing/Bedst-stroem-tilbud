import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Ansvarsfraskrivelse",
  description: `Læs om ${siteConfig.name}s rolle som uafhængig markedsføringsside og vores samarbejde med findelpriser.dk.`,
  alternates: { canonical: "/ansvarsfraskrivelse" },
};

export default function AnsvarsfraskrivelsePage() {
  return (
    <>
      <PageHero
        title="Ansvarsfraskrivelse"
        lead="Gennemsigtighed er vigtigt for os. Her kan du læse om, hvordan siden fungerer, og hvordan vi tjener penge."
        breadcrumb={[{ name: "Ansvarsfraskrivelse", href: "/ansvarsfraskrivelse" }]}
      />

      <section className="py-14">
        <Container className="max-w-3xl">
          <div className="prose-article">
            <h2>Vi er en markedsføringsside – ikke et elselskab</h2>
            <p>
              {siteConfig.name} er en uafhængig markedsførings- og
              informationsside. Vi sælger ikke selv strøm og er ikke et
              elselskab eller netselskab. Vores formål er at hjælpe dig med
              at få overblik over elmarkedet og komme videre til
              uforpligtende tilbud fra danske elselskaber via vores
              samarbejdspartner, findelpriser.dk.
            </p>

            <h2>Sådan tjener vi penge</h2>
            <p>
              Vi indgår kommercielle samarbejder med aktører på elmarkedet,
              herunder findelpriser.dk, og modtager provision, når en
              besøgende på vores side klikker videre og indgår en aftale.
              Dette annonceres tydeligt i forbindelse med vores
              handlingsopfordringer (call-to-action-knapper) på siden, i
              overensstemmelse med markedsføringslovens krav om
              gennemsigtighed i reklame. Provisionen påvirker ikke den pris,
              du selv bliver tilbudt.
            </p>

            <h2>Ingen garanti for nøjagtighed</h2>
            <p>
              Indholdet på siden – herunder artikler, eksempler og
              illustrative beregninger af besparelser – er udarbejdet med
              omhu, men skal betragtes som generel information og ikke som
              personlig rådgivning. Konkrete priser, vilkår og
              besparelsespotentiale fastsættes af de enkelte elselskaber og
              kan afvige fra de eksempler, vi bruger til at illustrere
              pointer. Vi anbefaler altid, at du læser vilkårene grundigt,
              inden du indgår en aftale.
            </p>

            <h2>Eksterne links</h2>
            <p>
              Siden indeholder links til eksterne samarbejdspartnere. Når du
              forlader vores side, er du underlagt disse siders egne vilkår
              og privatlivspolitikker, som vi ikke har indflydelse på.
            </p>

            <h2>Kontakt</h2>
            <p>
              Har du spørgsmål til denne ansvarsfraskrivelse, er du velkommen
              til at skrive til os på{" "}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
