import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import CtaBanner from "@/components/CtaBanner";
import SectionHeading from "@/components/SectionHeading";
import FaqAccordion from "@/components/FaqAccordion";
import JsonLd, { faqJsonLd } from "@/components/JsonLd";
import SpotPriceBoard from "@/components/SpotPriceBoard";
import DataSourceNote from "@/components/DataSourceNote";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/constants";
import {
  PRICE_AREAS,
  PRICE_AREA_LABELS,
  SPOT_SOURCE,
  formatDanishDate,
  formatOre,
  getSpotSnapshot,
  hourLabel,
} from "@/lib/elpriser";

// Regenerate at most every 15 minutes (ISR), so the page is static and fast
// but picks up new day-ahead prices shortly after they are published.
export const revalidate = 900;

export const metadata: Metadata = pageMetadata({
  title: "Elpriser time for time i dag og i morgen (DK1 og DK2)",
  description:
    "Dagens og morgendagens elpriser time for time for Vest- og Østdanmark. Officielle spotpriser fra Energinet, opdateret automatisk – se de billigste timer.",
  path: "/elpriser-time-for-time",
  keywords: ["elpriser time for time", "elpris i dag", "elpriser i morgen", "spotpris strøm", "elpris DK1", "elpris DK2"],
});

const faqItems = [
  {
    question: "Hvad betyder spotpris på strøm?",
    answer:
      "Spotprisen er den engrospris på el, der handles time for time på den nordiske elbørs Nord Pool. Har du en elaftale med variabel/spotpris, følger din elpris typisk denne time-pris tillagt et fast tillæg.",
  },
  {
    question: "Hvorfor svinger elprisen så meget i løbet af dagen?",
    answer:
      "Prisen afhænger af udbud og efterspørgsel time for time. Når mange bruger strøm samtidig – f.eks. om aftenen – og produktionen fra vind og sol er lav, stiger prisen. Om natten og i blæsende, solrige perioder falder prisen ofte.",
  },
  {
    question: "Kan jeg se elpriserne for i morgen?",
    answer:
      "Ja, spotpriserne for det kommende døgn offentliggøres typisk omkring kl. 13-14 dagen før på Nord Pools og Energinets hjemmesider, så du kan planlægge dit forbrug i god tid.",
  },
];

export default async function ElpriserTimeForTimePage() {
  const snapshot = await getSpotSnapshot();
  const url = `${siteConfig.url}/elpriser-time-for-time`;

  const datasetJsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Elpriser time for time i Danmark (DK1 og DK2)",
    description:
      "Day-ahead spotpriser på el for Vestdanmark (DK1) og Østdanmark (DK2) i øre/kWh, vist som timegennemsnit. Gengivet fra Energinets Energi Data Service.",
    url,
    inLanguage: "da-DK",
    isAccessibleForFree: true,
    spatialCoverage: { "@type": "Place", name: "Danmark" },
    temporalCoverage: snapshot?.today.DK1?.date ?? snapshot?.today.DK2?.date,
    dateModified: snapshot?.fetchedAt,
    variableMeasured: "Spotpris på el (øre/kWh ekskl. moms)",
    creator: { "@type": "Organization", name: "Energinet", url: "https://energinet.dk" },
    isBasedOn: SPOT_SOURCE.url,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    distribution: {
      "@type": "DataDownload",
      encodingFormat: "application/json",
      contentUrl: SPOT_SOURCE.apiUrl,
    },
  };

  return (
    <>
      <JsonLd data={faqJsonLd(faqItems)} />
      {snapshot && <JsonLd data={datasetJsonLd} />}
      <PageHero
        eyebrow="Elpriser time for time"
        title="Elpriser time for time – i dag og i morgen"
        lead="Se den officielle spotpris på strøm for hver time i Vest- og Østdanmark. Priserne hentes automatisk fra Energinet, så du kan lægge dit forbrug i de billigste timer."
        breadcrumb={[{ name: "Elpriser time for time", href: "/elpriser-time-for-time" }]}
      />

      <section className="py-14">
        <Container className="max-w-4xl">
          {snapshot ? (
            <>
              <div id="kort-fortalt" className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {PRICE_AREAS.map((area) => {
                  const day = snapshot.today[area];
                  if (!day) return null;
                  return (
                    <div key={area} className="rounded-2xl border border-border bg-brand-sky/50 p-5">
                      <p className="text-xs font-semibold uppercase tracking-wide text-brand-blue">
                        {PRICE_AREA_LABELS[area]} · {formatDanishDate(day.date)}
                      </p>
                      <p className="mt-2 text-sm text-brand-navy">
                        Gennemsnit i dag: <strong>{formatOre(day.average, true)}</strong> pr. kWh inkl. moms.
                        Billigste time er <strong>kl. {hourLabel(day.min)}</strong> ({formatOre(day.min.price, true)}),
                        dyreste er <strong>kl. {hourLabel(day.max)}</strong> ({formatOre(day.max.price, true)}).
                      </p>
                      {snapshot.avg30d[area] && (
                        <p className="mt-1 text-xs text-foreground/60">
                          Gennemsnit de seneste {snapshot.avg30d[area]!.days} dage:{" "}
                          {formatOre(snapshot.avg30d[area]!.average, true)} inkl. moms.
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
              <SpotPriceBoard snapshot={snapshot} />
            </>
          ) : (
            <div className="rounded-2xl border border-border bg-white p-6 sm:p-8">
              <h2 className="font-display font-bold text-brand-navy">Priserne kunne ikke hentes lige nu</h2>
              <p className="mt-2 text-sm text-foreground/70">
                Vi viser kun officielle priser og aldrig estimerede tal. Energi Data Service svarede ikke
                ved seneste opdatering – prøv igen om lidt, eller se priserne direkte hos{" "}
                <a href={SPOT_SOURCE.url} target="_blank" rel="noopener" className="underline">
                  Energinet
                </a>
                .
              </p>
            </div>
          )}

          <div className="mt-6">
            <DataSourceNote fetchedAt={snapshot?.fetchedAt} resolutionMinutes={snapshot?.resolutionMinutes} />
          </div>

          <div className="prose-article mt-8">
            <h2>Hvad er spotprisen på strøm?</h2>
            <p>
              Spotprisen er den pris, elselskaberne indbyrdes handler strøm
              til på den nordiske elbørs Nord Pool, time for time. Prisen
              fastsættes ud fra udbud og efterspørgsel og offentliggøres for
              hver af Danmarks to prisområder, DK1 (Vestdanmark) og DK2
              (Østdanmark). Har du en elaftale med variabel pris, betaler du
              typisk spotprisen tillagt elselskabets tillæg pr. kWh.
            </p>

            <h2>Hvorfor er der forskel på timerne?</h2>
            <p>
              Elprisen påvirkes af flere faktorer: vejret (vind- og
              solproduktion), det samlede elforbrug i Norden, temperaturen,
              og hvor meget el der kan importeres eller eksporteres via
              udlandsforbindelserne. Typisk er strømmen dyrest i
              morgentimerne og om aftenen, hvor mange bruger strøm samtidig,
              mens den ofte er billigst om natten.
            </p>

            <h2>Sådan bruger du elpriser time for time til at spare</h2>
            <ul>
              <li>
                Læg opvaskemaskine, vaskemaskine og tørretumbler til at køre
                om natten eller midt på dagen.
              </li>
              <li>
                Oplad elbilen i de billige timer – mange ladebokse kan
                planlægges automatisk.
              </li>
              <li>
                Brug en varmepumpe med smart styring, så opvarmning sker, når
                strømmen er billigst.
              </li>
              <li>
                Overvej en elaftale med timeafregning, hvis du kan flytte en
                stor del af dit forbrug – læs mere i{" "}
                <Link href="/blog/timeafregning-flyt-dit-forbrug">
                  vores guide til timeafregning
                </Link>
                .
              </li>
            </ul>

            <h2>DK1 og DK2 – forskel på øst og vest</h2>
            <p>
              Danmark er delt i to elprisområder. Vestdanmark (DK1) og
              Østdanmark (DK2) kan have forskellige spotpriser, blandt andet
              fordi de er forbundet til forskellige nabolande og har
              forskellig produktionssammensætning. Du kan læse mere om,
              hvorfor priserne kan afvige, i vores artikel om{" "}
              <Link href="/blog/elpriser-i-dk1-vs-dk2">DK1 vs. DK2</Link>.
            </p>
          </div>
        </Container>
      </section>

      <Container className="pb-14">
        <CtaBanner
          title="Find en elaftale, der passer til dit forbrugsmønster"
          subtitle="Nogle elselskaber belønner fleksibelt forbrug bedre end andre. Se dine muligheder gratis."
        />
      </Container>

      <section className="bg-surface py-14">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Spørgsmål og svar" title="Ofte stillede spørgsmål" />
          <div className="mt-10">
            <FaqAccordion items={faqItems} />
          </div>
        </Container>
      </section>
    </>
  );
}
