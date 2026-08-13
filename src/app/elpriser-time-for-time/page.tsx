import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import CtaBanner from "@/components/CtaBanner";
import SectionHeading from "@/components/SectionHeading";
import FaqAccordion from "@/components/FaqAccordion";
import JsonLd, { faqJsonLd } from "@/components/JsonLd";
import { ClockIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Elpriser time for time – se spotprisen på strøm",
  description:
    "Se hvordan elpriser time for time (spotprisen) fungerer, hvorfor prisen svinger hen over døgnet, og hvordan du kan flytte dit elforbrug til de billige timer.",
  alternates: { canonical: "/elpriser-time-for-time" },
};

const hours = [
  { time: "00-06", label: "Nat", level: 25 },
  { time: "06-09", label: "Morgen", level: 70 },
  { time: "09-16", label: "Dag", level: 45 },
  { time: "16-20", label: "Aften", level: 90 },
  { time: "20-24", label: "Sen aften", level: 40 },
];

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

export default function ElpriserTimeForTimePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqItems)} />
      <PageHero
        eyebrow="Elpriser time for time"
        title="Elpriser time for time: Se spotprisen på strøm"
        lead="Elprisen ændrer sig time for time hen over døgnet. Her får du overblikket over, hvornår strømmen typisk er billigst og dyrest – og hvordan du kan bruge det til at spare penge."
        breadcrumb={[{ name: "Elpriser time for time", href: "/elpriser-time-for-time" }]}
      />

      <section className="py-14">
        <Container className="max-w-4xl">
          <div className="rounded-2xl border border-border bg-white p-6 sm:p-8">
            <div className="flex items-center gap-2 text-brand-navy">
              <ClockIcon className="w-5 h-5" />
              <h2 className="font-display font-bold">Typisk prismønster i løbet af døgnet</h2>
            </div>
            <p className="mt-2 text-sm text-foreground/60">
              Illustrativt eksempel på, hvordan elprisen ofte fordeler sig
              hen over et almindeligt hverdagsdøgn. De faktiske priser
              varierer fra dag til dag afhængigt af vejr, forbrug og
              produktion.
            </p>
            <div className="mt-6 space-y-4">
              {hours.map((slot) => (
                <div key={slot.time}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium text-brand-navy">
                      {slot.time} – {slot.label}
                    </span>
                    <span className="text-foreground/50">
                      {slot.level > 70 ? "Højt niveau" : slot.level > 40 ? "Middel niveau" : "Lavt niveau"}
                    </span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-surface">
                    <div
                      className={`h-2.5 rounded-full ${
                        slot.level > 70
                          ? "bg-accent-dark"
                          : slot.level > 40
                          ? "bg-brand-blue"
                          : "bg-success"
                      }`}
                      style={{ width: `${slot.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
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
