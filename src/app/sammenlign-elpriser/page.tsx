import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import CtaBanner from "@/components/CtaBanner";
import SectionHeading from "@/components/SectionHeading";
import FaqAccordion from "@/components/FaqAccordion";
import JsonLd, { faqJsonLd } from "@/components/JsonLd";
import { CheckIcon } from "@/components/icons";
import { pageMetadata } from "@/lib/seo";
import OfferCalculator from "@/components/OfferCalculator";
import DataSourceNote from "@/components/DataSourceNote";
import { getSpotSnapshot } from "@/lib/elpriser";

export const revalidate = 900;

export const metadata: Metadata = pageMetadata({
  title: "Sammenlign elpriser og elselskaber",
  description:
    "Sammenlign elpriser og elselskaber: beregn årsprisen ud fra spottillæg, abonnement, gebyrer og binding med aktuelle spotpriser fra Energinet for DK1 og DK2.",
  path: "/sammenlign-elpriser",
  keywords: [
    "sammenlign elpriser",
    "sammenlign elselskaber",
    "billig strøm",
    "elpris sammenligning",
  ],
});

const faqItems = [
  {
    question: "Hvad er forskellen på elpris, elafgift og transport?",
    answer:
      "Elprisen er selve prisen på strømmen, som elselskabet sætter. Elafgiften er en fast statsafgift, mens transport dækker netselskabets omkostninger til at fragte strømmen til din bolig. Kun elprisen og evt. abonnement varierer mellem elselskaber.",
  },
  {
    question: "Kan jeg sammenligne alle elselskaber ét sted?",
    answer:
      "Forsyningstilsynets officielle prisportal elpris.dk viser elselskabernes anmeldte produkter. Har du allerede konkrete tilbud, kan du bruge vores beregner ovenfor til at sammenligne den samlede årlige pris. Via vores samarbejdspartner kan du desuden få op til 3 uforpligtende tilbud.",
  },
  {
    question: "Hvorfor viser I ikke en færdig liste over alle elselskabers priser?",
    answer:
      "Fordi vi kun vil vise priser, vi kan dokumentere og holde opdateret. Der findes i dag ingen åben, maskinlæsbar kilde til alle elselskabers spottillæg og gebyrer, som vi kan hente automatisk. Indtil vi har en verificerbar datakilde, viser vi officielle spotpriser fra Energinet og lader dig indtaste tallene fra de tilbud, du selv har fået.",
  },
  {
    question: "Er det bedst med fast eller variabel elpris?",
    answer:
      "Det afhænger af din risikovillighed og dit forbrugsmønster. Fastpris giver forudsigelighed, mens variabel pris (spotpris) historisk set ofte har været billigere over tid, men svinger mere fra måned til måned.",
  },
];

export default async function SammenlignElpriserPage() {
  const snapshot = await getSpotSnapshot();
  const avgSpot = {
    DK1: snapshot?.avg30d.DK1?.average ?? snapshot?.today.DK1?.average ?? null,
    DK2: snapshot?.avg30d.DK2?.average ?? snapshot?.today.DK2?.average ?? null,
  };

  return (
    <>
      <JsonLd data={faqJsonLd(faqItems)} />
      <PageHero
        eyebrow="Elpriser"
        title="Sammenlign elpriser og elselskaber"
        lead="Sammenlign elaftaler på det, der faktisk koster penge: spottillæg, abonnement, gebyrer, introtilbud og binding. Brug beregneren med dagsaktuelle spotpriser fra Energinet."
        breadcrumb={[{ name: "Sammenlign elpriser", href: "/sammenlign-elpriser" }]}
      />

      <section className="py-14">
        <Container className="max-w-4xl">
          <div className="prose-article">
            <p>
              Når du skal <strong>sammenligne elpriser</strong>, er det nemt at
              fare vild i produkttyper, tillæg og gebyrer. De fleste danske
              elselskaber sælger i store træk tre typer produkter, og
              forskellen mellem dem kan betyde flere hundrede kroner om året
              for en gennemsnitlig husstand.
            </p>
          </div>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="bg-surface text-left text-brand-navy">
                  <th className="px-4 py-3 font-display font-bold">Produkttype</th>
                  <th className="px-4 py-3 font-display font-bold">Sådan virker det</th>
                  <th className="px-4 py-3 font-display font-bold">Bedst til</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-4 py-3 font-semibold text-brand-navy">Fastpris</td>
                  <td className="px-4 py-3 text-foreground/70">
                    Du betaler en fast pris pr. kWh i en aftalt periode, uanset
                    hvordan markedsprisen svinger.
                  </td>
                  <td className="px-4 py-3 text-foreground/70">
                    Dig der ønsker forudsigelighed i budgettet.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-brand-navy">
                    Variabel / spotpris
                  </td>
                  <td className="px-4 py-3 text-foreground/70">
                    Prisen følger elmarkedets time-for-time-priser, ofte
                    tillagt et fast tillæg pr. kWh.
                  </td>
                  <td className="px-4 py-3 text-foreground/70">
                    Dig der kan flytte forbrug til billige timer.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-brand-navy">Flexpris</td>
                  <td className="px-4 py-3 text-foreground/70">
                    En mellemting, hvor prisen justeres løbende, men typisk
                    ikke lige så ofte som ren spotpris.
                  </td>
                  <td className="px-4 py-3 text-foreground/70">
                    Dig der vil have lidt forudsigelighed uden fuld binding.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <section id="beregner" className="mt-12 scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-brand-navy">
              Beregn og sammenlign dine eltilbud
            </h2>
            <p className="mt-2 text-foreground/70">
              Indtast tallene fra de tilbud, du har fået (spottillæg, abonnement, gebyrer, introrabat
              og binding), og se den samlede estimerede årspris side om side. Alle beløb indtastes
              inkl. moms, som elselskaberne skal oplyse dem til private.
            </p>
            <div className="mt-6">
              <OfferCalculator avgSpot={avgSpot} />
            </div>
            <div className="mt-4">
              <DataSourceNote fetchedAt={snapshot?.fetchedAt} resolutionMinutes={snapshot?.resolutionMinutes} />
            </div>
          </section>

          <div className="prose-article mt-12">
            <h2>Sådan er din elregning sat sammen</h2>
            <p>
              Den samlede pris, du betaler pr. kWh, består typisk af fire
              elementer: selve elprisen, transport til netselskabet,
              elafgiften til staten og moms. Det er kun elprisen (og et
              eventuelt abonnement), der reelt varierer mellem elselskaber –
              resten er stort set ens, uanset hvem du handler med. Derfor er
              det netop på selve elprisen, du kan finde en besparelse ved at
              skifte. Læs mere i vores guide om{" "}
              <Link href="/blog/saadan-er-din-elregning-sat-sammen">
                hvordan elregningen er sat sammen
              </Link>
              .
            </p>

            <h2>Hvad bør du kigge efter, når du sammenligner?</h2>
            <ul>
              <li>
                <strong>Pris pr. kWh / spottillæg</strong> – den vigtigste faktor, men se
                den i sammenhæng med abonnement.
              </li>
              <li>
                <strong>Introtilbud</strong> – en rabat de første måneder er fin, men
                sammenlign altid prisen <em>efter</em> introperioden.
              </li>
              <li>
                <strong>Gebyrer og betalingsform</strong> – nogle selskaber tager gebyr for
                papirfaktura eller bestemte betalingsformer.
              </li>
              <li>
                <strong>Abonnement/gebyr</strong> – et månedligt fast beløb,
                som kan opveje en lav kWh-pris ved lavt forbrug.
              </li>
              <li>
                <strong>Binding</strong> – hvor lang tid er du låst fast, og
                hvad koster det at komme ud af aftalen igen?
              </li>
              <li>
                <strong>Grøn strøm</strong> – tilbyder selskabet oprindelsesgaranteret
                el fra vind eller sol?
              </li>
              <li>
                <strong>Kundeservice og vilkår</strong> – hvor nemt er det at
                komme i kontakt, og hvad siger opsigelsesvilkårene?
              </li>
            </ul>

            <h2>Elpriser og elselskaber – derfor er der forskel</h2>
            <p>
              Elselskaber indkøber strøm på samme engrosmarked, men sætter
              selv deres avance, produktmix og gebyrstruktur. Det betyder, at
              to selskaber kan have markant forskellige priser, selvom de i
              praksis leverer den samme strøm gennem det samme elnet. Den
              eneste måde at finde det bedste tilbud på er derfor at{" "}
              <strong>sammenligne aktivt</strong> – og gerne med jævne
              mellemrum, da priserne ændrer sig løbende.
            </p>

            <h2>Officielle kilder til elselskabernes priser</h2>
            <p>
              Forsyningstilsynet driver den officielle prisportal{" "}
              <a href="https://elpris.dk" target="_blank" rel="noopener">elpris.dk</a>, hvor
              elselskaberne skal anmelde deres produkter. Den dagsaktuelle spotpris for DK1 og DK2
              finder du på vores side med{" "}
              <Link href="/elpriser-time-for-time">elpriser time for time</Link>, som henter data
              direkte fra Energinet. Læs mere om vores metode og kilder i{" "}
              <Link href="/saadan-beregner-vi-elpriser">Sådan beregner vi elpriser</Link>.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              "Beregneren viser alle faste beløb og gebyrer",
              "Tilbud fra danske elselskaber",
              "100% gratis og uforpligtende",
              "Du bestemmer selv, om du siger ja tak",
            ].map((point) => (
              <div key={point} className="flex items-center gap-2 text-sm text-foreground/75">
                <CheckIcon className="w-5 h-5 text-success shrink-0" />
                {point}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Container className="pb-14">
        <CtaBanner
          title="Se hvad du kan spare på din elaftale"
          subtitle="Udfyld formularen og modtag op til 3 tilbud fra danske elselskaber – helt gratis."
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
