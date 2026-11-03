import type { Metadata } from "next";
import Link from "next/link";
import TrustPage from "@/components/TrustPage";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/constants";

const path = "/saadan-tjener-vi-penge";
const description = `Sådan finansieres ${siteConfig.name}: provision via affiliate-samarbejde med findelpriser.dk (via Partner-ads), og hvordan vi holder det adskilt fra vores indhold.`;

export const metadata: Metadata = pageMetadata({
  title: "Sådan tjener vi penge (affiliate-oplysning)",
  description,
  path,
});

export default function Page() {
  return (
    <TrustPage
      title="Sådan tjener vi penge"
      lead="Siden er gratis for dig. Her er den fulde forklaring på, hvordan den alligevel kan finansieres."
      path={path}
      description={description}
    >
      <h2>Kort fortalt</h2>
      <ul>
        <li>{siteConfig.name} er ikke et elselskab og sælger ikke strøm.</li>
        <li>
          Knapper som &quot;Hent gratis tilbud&quot; er <strong>annoncer</strong>. De fører til vores
          samarbejdspartner findelpriser.dk via affiliate-netværket Partner-ads.
        </li>
        <li>
          Vi modtager <strong>provision</strong>, når en besøgende via et af disse links indgår en aftale
          (eller afgiver en forespørgsel, afhængigt af kampagnens vilkår).
        </li>
        <li>Det koster ikke ekstra for dig, og provisionen påvirker ikke den pris, du bliver tilbudt.</li>
      </ul>

      <h2>Hvordan kan du se, hvad der er en annonce?</h2>
      <p>
        Alle affiliate-links er markeret med teksten &quot;Annonce&quot; i nærheden af knappen og har
        attributten <code>rel=&quot;sponsored&quot;</code>, så søgemaskiner også kan se, at der er tale om
        et kommercielt link. Links til offentlige kilder som Energinet og Forsyningstilsynet er
        almindelige, redaktionelle links.
      </p>

      <h2>Hvad provisionen ikke påvirker</h2>
      <ul>
        <li>Spotpriserne på siden kommer direkte fra Energinet og kan ikke påvirkes af nogen partner.</li>
        <li>
          <Link href="/sammenlign-elpriser#beregner">Beregneren</Link> regner kun på de tal, du selv
          indtaster, og fremhæver ikke bestemte elselskaber.
        </li>
        <li>
          Artiklernes råd følger vores <Link href="/redaktionel-politik">redaktionelle politik</Link> –
          også når rådet er, at du ikke behøver at skifte.
        </li>
      </ul>

      <h2>Cookies og måling</h2>
      <p>
        Partner-ads bruger tracking for at kunne registrere en henvisning. Vi bruger desuden Google
        Analytics til anonym statistik. Læs mere i vores{" "}
        <Link href="/privatlivspolitik">privatlivspolitik</Link>.
      </p>
    </TrustPage>
  );
}
