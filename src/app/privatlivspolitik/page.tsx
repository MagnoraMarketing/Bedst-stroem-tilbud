import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import { siteConfig } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privatlivspolitik",
  description: `Læs ${siteConfig.name}s privatlivspolitik, herunder hvordan vi behandler persondata og bruger cookies.`,
  path: "/privatlivspolitik",
});

export default function PrivatlivspolitikPage() {
  return (
    <>
      <PageHero
        title="Privatlivspolitik"
        lead="Sådan behandler vi dine personoplysninger, når du besøger og bruger vores hjemmeside."
        breadcrumb={[{ name: "Privatlivspolitik", href: "/privatlivspolitik" }]}
      />

      <section className="py-14">
        <Container className="max-w-3xl">
          <div className="prose-article">
            <p>
              Sidst opdateret: {new Date().toLocaleDateString("da-DK", { year: "numeric", month: "long", day: "numeric" })}
            </p>

            <h2>1. Dataansvarlig</h2>
            <p>
              {siteConfig.name} ejes og drives af [Virksomhedsnavn], CVR-nr.
              [CVR-nummer]. Har du spørgsmål til denne privatlivspolitik,
              kan du kontakte os på{" "}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
            </p>

            <h2>2. Hvilke oplysninger indsamler vi?</h2>
            <p>
              Når du besøger vores hjemmeside, indsamler vi automatisk
              tekniske oplysninger såsom IP-adresse, browsertype og hvilke
              sider du besøger, via cookies og lignende teknologier. Hvis du
              klikker videre til vores samarbejdspartner for at indhente
              tilbud på strøm, vil du blive bedt om at afgive personlige
              oplysninger (f.eks. navn, adresse og kontaktoplysninger)
              direkte til samarbejdspartneren – disse oplysninger behandles
              efter deres egen privatlivspolitik, ikke vores.
            </p>

            <h2>3. Formål med behandlingen</h2>
            <ul>
              <li>At drive og forbedre hjemmesiden.</li>
              <li>At analysere trafik og brugeradfærd med henblik på optimering.</li>
              <li>At kunne henvise dig til relevante tilbud hos vores samarbejdspartnere.</li>
            </ul>

            <h2>4. Cookies</h2>
            <p>
              Vi bruger cookies til at forbedre din oplevelse på siden, måle
              trafik og til markedsføringsformål, herunder til at spore, om
              du klikker videre til vores samarbejdspartneres tilbud. Du kan
              til enhver tid slette eller blokere cookies i din
              browserindstillinger, men det kan påvirke visse funktioner på
              siden.
            </p>

            <h2>5. Videregivelse af oplysninger</h2>
            <p>
              Vi videregiver ikke dine personoplysninger til tredjepart, ud
              over hvad der er nødvendigt for at levere vores service – f.eks.
              når du selv aktivt vælger at indhente tilbud via et link til
              vores samarbejdspartner findelpriser.dk.
            </p>

            <h2>6. Dine rettigheder</h2>
            <p>
              Du har efter databeskyttelsesforordningen (GDPR) ret til at få
              indsigt i, berigtiget eller slettet de oplysninger, vi
              behandler om dig, samt ret til at gøre indsigelse mod
              behandlingen. Kontakt os på {siteConfig.email} for at gøre brug
              af dine rettigheder.
            </p>

            <h2>7. Klage</h2>
            <p>
              Du kan klage over vores behandling af dine personoplysninger
              til Datatilsynet, Carl Jacobsens Vej 35, 2500 Valby,{" "}
              <a href="https://www.datatilsynet.dk" target="_blank" rel="noopener noreferrer">
                www.datatilsynet.dk
              </a>
              .
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
