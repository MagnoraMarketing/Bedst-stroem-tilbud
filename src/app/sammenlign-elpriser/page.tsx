import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import CtaBanner from "@/components/CtaBanner";
import SectionHeading from "@/components/SectionHeading";
import FaqAccordion from "@/components/FaqAccordion";
import JsonLd, { faqJsonLd } from "@/components/JsonLd";
import { CheckIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Sammenlign elpriser og elselskaber",
  description:
    "Sammenlign elpriser og elselskaber i Danmark. Se forskellen på fastpris, variabel pris og flexpris, og find frem til den billigste elaftale for din husstand.",
  alternates: { canonical: "/sammenlign-elpriser" },
};

const faqItems = [
  {
    question: "Hvad er forskellen på elpris, elafgift og transport?",
    answer:
      "Elprisen er selve prisen på strømmen, som elselskabet sætter. Elafgiften er en fast statsafgift, mens transport dækker netselskabets omkostninger til at fragte strømmen til din bolig. Kun elprisen og evt. abonnement varierer mellem elselskaber.",
  },
  {
    question: "Kan jeg sammenligne alle elselskaber ét sted?",
    answer:
      "Ja, ved at udfylde vores formular sammenligner du automatisk tilbud fra flere danske elselskaber, i stedet for selv at skulle undersøge hvert selskab enkeltvis.",
  },
  {
    question: "Er det bedst med fast eller variabel elpris?",
    answer:
      "Det afhænger af din risikovillighed og dit forbrugsmønster. Fastpris giver forudsigelighed, mens variabel pris (spotpris) historisk set ofte har været billigere over tid, men svinger mere fra måned til måned.",
  },
];

export default function SammenlignElpriserPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqItems)} />
      <PageHero
        eyebrow="Elpriser"
        title="Sammenlign elpriser og elselskaber"
        lead="Elmarkedet i Danmark er fyldt med forskellige produkter og priser. Her får du et hurtigt overblik, så du nemmere kan gennemskue, hvad der reelt kan betale sig for din husstand."
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

          <div className="prose-article mt-8">
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
                <strong>Pris pr. kWh</strong> – den vigtigste faktor, men se
                den i sammenhæng med abonnement.
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
          </div>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              "Ingen skjulte gebyrer i vores sammenligning",
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
