import type { Metadata } from "next";
import Link from "next/link";
import TrustPage from "@/components/TrustPage";
import { pageMetadata } from "@/lib/seo";
import { SPOT_SOURCE } from "@/lib/elpriser";

const path = "/saadan-beregner-vi-elpriser";
const description =
  "Sådan henter og beregner vi elpriser: datakilde, opdateringsfrekvens, omregning, moms, tariffer og afgifter – og hvilke forudsætninger vores beregner bygger på.";

export const metadata: Metadata = pageMetadata({
  title: "Sådan beregner vi elpriser – metode og kilder",
  description,
  path,
});

export default function Page() {
  return (
    <TrustPage
      title="Sådan beregner vi elpriser"
      lead="Alle tal på siden skal kunne efterprøves. Her beskriver vi præcis, hvor priserne kommer fra, hvordan vi regner, og hvad der er med – og ikke med."
      path={path}
      description={description}
    >
      <h2>1. Spotpriser (elpriser time for time)</h2>
      <p>
        Spotprisen hentes automatisk fra{" "}
        <a href={SPOT_SOURCE.url} target="_blank" rel="noopener">
          {SPOT_SOURCE.name}
        </a>
        , datasættet <strong>{SPOT_SOURCE.dataset}</strong>. Det er den officielle day-ahead-pris
        fra den fælleseuropæiske elbørs for de to danske prisområder: <strong>DK1</strong>{" "}
        (Jylland og Fyn) og <strong>DK2</strong> (Sjælland, øerne og Bornholm).
      </p>
      <ul>
        <li>
          <strong>Opdatering:</strong> Siderne gendannes automatisk højst hvert 15. minut. Morgendagens
          priser offentliggøres normalt omkring kl. 13 dagen før og vises, så snart de er tilgængelige.
        </li>
        <li>
          <strong>Enhed:</strong> Kilden oplyser kr. pr. MWh. Vi dividerer med 1.000 og viser øre pr. kWh.
        </li>
        <li>
          <strong>Tidsopløsning:</strong> Day-ahead-markedet afregnes i 15-minutters perioder. Vi viser
          det simple gennemsnit af periodernes priser inden for hver time, så du får én pris pr. time.
        </li>
        <li>
          <strong>Moms:</strong> Kildens priser er uden moms. Når vi viser &quot;inkl. moms&quot;, lægger
          vi 25 % til.
        </li>
        <li>
          <strong>Dagsgennemsnit og 30-dages gennemsnit:</strong> Simpelt gennemsnit af timepriserne.
          Kun hele døgn med komplette data indgår.
        </li>
        <li>
          <strong>Ingen data = ingen tal:</strong> Hvis kilden ikke svarer, viser vi en besked om det –
          vi erstatter aldrig manglende data med estimater.
        </li>
      </ul>

      <h2>2. Hvad spotprisen ikke indeholder</h2>
      <p>Din samlede kWh-pris består af flere dele. Spotprisen er kun den første:</p>
      <ul>
        <li><strong>Spotpris</strong> – engrosprisen fra elbørsen (det, vi viser time for time).</li>
        <li><strong>Elselskabets tillæg og abonnement</strong> – den eneste del, der varierer mellem elselskaber.</li>
        <li><strong>Nettarif</strong> – fastsættes af dit lokale netselskab og varierer typisk efter tidspunkt på døgnet.</li>
        <li><strong>Energinets tariffer</strong> – for transmissionsnet og systemdrift.</li>
        <li><strong>Elafgift</strong> – statsafgift; de aktuelle satser fremgår hos Skatteministeriet/Skattestyrelsen.</li>
        <li><strong>Moms</strong> – 25 % af det hele.</li>
      </ul>
      <p>
        Nettarif, Energinets tariffer og elafgift betaler du uanset hvilket elselskab, du vælger. Derfor
        udelader vores beregner dem, når der sammenlignes elselskaber – de ville gøre tallene større,
        men ikke ændre rækkefølgen.
      </p>

      <h2>3. Beregneren til eltilbud</h2>
      <p>
        <Link href="/sammenlign-elpriser#beregner">Beregneren</Link> regner den estimerede årlige pris
        for den del af elregningen, der afhænger af elselskabet:
      </p>
      <p>
        <strong>
          (spotpris inkl. moms + tillæg) × årligt forbrug + abonnement × 12 + øvrige gebyrer
        </strong>
      </p>
      <ul>
        <li>For fastprisprodukter bruges den faste kWh-pris i stedet for spotpris + tillæg.</li>
        <li>Introrabat trækkes kun fra i første år. Vi viser derfor både 1. år og efterfølgende år.</li>
        <li>
          Spotprisen er som udgangspunkt 30-dages gennemsnittet for det valgte prisområde. Det er et
          historisk tal, ikke en prognose – du kan selv ændre det.
        </li>
        <li>
          Vi antager, at dit forbrug fordeler sig som markedets gennemsnit hen over døgnet. Bruger du
          mest strøm i dyre timer, bliver din reelle spotpris højere – og omvendt.
        </li>
        <li>Tallene du indtaster bliver i din browser. Vi gemmer dem ikke.</li>
      </ul>

      <h2>4. Regneeksempler i artikler</h2>
      <p>
        Når vi i artikler bruger regneeksempler, er de markeret som eksempler, og forudsætningerne
        (forbrug, pris pr. kWh, periode) står ved eksemplet. Eksempler er ikke tilbud og ikke en
        garanti for en bestemt besparelse.
      </p>

      <h2>5. Hvad vi ikke gør</h2>
      <ul>
        <li>Vi viser ikke elselskabers priser, som vi ikke kan dokumentere og holde opdateret.</li>
        <li>Vi rangerer ikke elselskaber efter, hvem der betaler os provision.</li>
        <li>Vi bruger ikke anmeldelser eller ratings, vi ikke selv kan dokumentere.</li>
      </ul>
      <p>
        Finder du en fejl i vores tal, vil vi meget gerne vide det – se{" "}
        <Link href="/redaktionel-politik">vores redaktionelle politik</Link> for, hvordan vi retter fejl.
      </p>
    </TrustPage>
  );
}
