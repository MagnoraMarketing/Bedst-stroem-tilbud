import type { Metadata } from "next";
import Link from "next/link";
import TrustPage from "@/components/TrustPage";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/constants";

const path = "/redaktionel-politik";
const description = `Sådan arbejder redaktionen på ${siteConfig.name}: kildekrav, faktatjek, opdatering af artikler, rettelser og adskillelse af redaktionelt indhold og annoncer.`;

export const metadata: Metadata = pageMetadata({
  title: "Redaktionel politik",
  description,
  path,
});

export default function Page() {
  return (
    <TrustPage
      title="Redaktionel politik"
      lead="Elpriser og privatøkonomi kræver præcision. Her er de regler, vores indhold skal leve op til."
      path={path}
      description={description}
    >
      <h2>Formål</h2>
      <p>
        Vores indhold skal hjælpe danske husstande med at forstå deres elregning og træffe et oplyst
        valg af elaftale. Det skal være korrekt, opdateret og let at forstå – også når det betyder, at vi
        fraråder at skifte.
      </p>

      <h2>Kilder og faktatjek</h2>
      <ul>
        <li>
          Faktuelle påstande om priser, afgifter, tariffer og regler skal bygge på primære kilder som
          Energinet, Forsyningstilsynet, Skatteministeriet, Energistyrelsen og netselskaberne. Se{" "}
          <Link href="/kilder">vores kildeliste</Link>.
        </li>
        <li>Tal, der ændrer sig over tid, dateres eller hentes automatisk fra kilden.</li>
        <li>Regneeksempler markeres tydeligt som eksempler med forudsætninger.</li>
        <li>Vi opfinder ikke statistik, citater, anmeldelser eller ratings.</li>
      </ul>

      <h2>Opdatering</h2>
      <p>
        Artikler gennemgås, når regler, afgifter eller markedsforhold ændrer sig væsentligt. Datoen for
        seneste væsentlige opdatering står ved hver artikel. Mindre sproglige rettelser ændrer ikke
        datoen.
      </p>

      <h2>Rettelser</h2>
      <p>
        Opdager vi – eller gør du os opmærksom på – en faktuel fejl, retter vi den hurtigst muligt og
        opdaterer artiklens dato. Væsentlige rettelser noteres i artiklen.
      </p>

      <h2>Annoncer og redaktionelt indhold</h2>
      <p>
        Siden er finansieret af provision fra samarbejdspartnere (se{" "}
        <Link href="/saadan-tjener-vi-penge">Sådan tjener vi penge</Link>). Kommercielle links er
        markeret som annonce og har <code>rel=&quot;sponsored&quot;</code>. Samarbejdspartnere har ikke
        indflydelse på artiklernes indhold, konklusioner eller vores metode til at beregne elpriser.
      </p>

      <h2>Brug af AI og værktøjer</h2>
      <p>
        Vi kan bruge digitale værktøjer, herunder AI, til research, struktur og korrektur. Alt indhold
        gennemgås af redaktionen, og faktuelle oplysninger kontrolleres mod kilderne, før det udgives.
      </p>

      <h2>Ingen personlig rådgivning</h2>
      <p>
        Indholdet er generel information. Konkrete priser og vilkår fastsættes af elselskaberne – læs
        altid vilkårene, før du indgår en aftale. Se også vores{" "}
        <Link href="/ansvarsfraskrivelse">ansvarsfraskrivelse</Link>.
      </p>
    </TrustPage>
  );
}
