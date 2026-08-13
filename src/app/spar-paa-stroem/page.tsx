import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import CtaBanner from "@/components/CtaBanner";
import SectionHeading from "@/components/SectionHeading";
import FaqAccordion from "@/components/FaqAccordion";
import JsonLd, { faqJsonLd } from "@/components/JsonLd";
import { StatCard } from "@/components/FeatureCard";
import { CheckIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Spar penge på strøm – se hvor meget du kan spare",
  description:
    "Se hvor meget du kan spare på strøm ved at skifte elselskab og ændre dine vaner. Konkrete tips til at sænke elregningen for hus og lejlighed.",
  alternates: { canonical: "/spar-paa-stroem" },
};

const savingsTips = [
  {
    title: "Skift til en billigere elaftale",
    saving: "Op til 2.400 kr./år",
    description:
      "Den enkeltstående faktor, der oftest gør den største forskel, er selve elprisen. Et skift væk fra en dyr, gammel aftale kan mærkes direkte på bundlinjen.",
  },
  {
    title: "Flyt dit forbrug til billige timer",
    saving: "200-600 kr./år",
    description:
      "Ved at bruge vaskemaskine, opvasker og elbil-oplader uden for spidsbelastning kan du udnytte de billigere timer på spotprisen.",
  },
  {
    title: "Sænk standby-forbruget",
    saving: "300-800 kr./år",
    description:
      "Standby-strøm fra tv, router, spillekonsol og opladere kan hurtigt løbe op. Brug stikkontakter med afbryder på apparater, du sjældent bruger.",
  },
  {
    title: "Optimer varme og varmt vand",
    saving: "500-1.500 kr./år",
    description:
      "Sænk temperaturen én grad, efterisoler, og indstil varmepumpen korrekt. Varme og varmt vand er ofte de største strømposter i en husstand.",
  },
];

const faqItems = [
  {
    question: "Hvor meget kan en gennemsnitlig husstand spare på strøm?",
    answer:
      "Det afhænger meget af dit nuværende elselskab og forbrug, men mange husstande kan realistisk spare mellem 500 og 2.500 kroner om året ved at skifte til en billigere elaftale og justere forbrugsvaner.",
  },
  {
    question: "Er det besværligt at ændre sine strømvaner?",
    answer:
      "Nej, de fleste tips kræver blot små justeringer – som at flytte vasketøjet til aftenen eller sætte apparater på en stikdåse med afbryder. Den største besparelse kommer typisk fra selve elaftalen.",
  },
  {
    question: "Hvilken enkeltstående ændring giver mest at spare?",
    answer:
      "For de fleste er det at skifte til en billigere elaftale, der giver det største og hurtigste udslag – uden at du behøver ændre dine vaner overhovedet.",
  },
];

export default function SparPaaStroemPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqItems)} />
      <PageHero
        eyebrow="Spar penge"
        title="Hvor meget kan du spare på strøm?"
        lead="Der er typisk to veje til en lavere elregning: en billigere elaftale og smartere forbrugsvaner. Her får du overblikket over, hvad der reelt batter noget."
        breadcrumb={[{ name: "Spar på strøm", href: "/spar-paa-stroem" }]}
      />

      <section className="py-14">
        <Container>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value="2.400 kr." label="Potentiel årlig besparelse*" />
            <StatCard value="4" label="Konkrete spareområder" />
            <StatCard value="2 min." label="At sammenligne priser" />
            <StatCard value="0 kr." label="I gebyr hos os" />
          </div>
          <p className="mt-3 text-center text-xs text-foreground/50">
            *Estimat baseret på et gennemsnitligt elforbrug. Din faktiske
            besparelse afhænger af dit nuværende forbrug og din nuværende
            aftale.
          </p>
        </Container>
      </section>

      <section className="pb-14">
        <Container className="max-w-4xl">
          <SectionHeading
            center={false}
            eyebrow="Spareområder"
            title="4 konkrete måder at sænke elregningen på"
          />
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {savingsTips.map((tip) => (
              <div key={tip.title} className="rounded-2xl border border-border bg-white p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display font-bold text-brand-navy">{tip.title}</h3>
                  <span className="shrink-0 rounded-full bg-success-light px-3 py-1 text-xs font-semibold text-success">
                    {tip.saving}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-foreground/65">
                  {tip.description}
                </p>
              </div>
            ))}
          </div>

          <div className="prose-article mt-10">
            <h2>Sådan kommer du i gang</h2>
            <p>
              Den hurtigste og mest effektive gevinst kommer typisk fra at
              sammenligne elpriser og skifte til en billigere aftale – det
              tager kun et par minutter og kræver ingen ændring af dine
              vaner. Derefter kan du løbende finjustere med de mindre tips
              for at presse elregningen endnu længere ned. Få konkrete
              eksempler i vores guide om{" "}
              <Link href="/blog/saadan-bruger-du-mindre-stroem-i-hverdagen">
                15 nemme måder at bruge mindre strøm på
              </Link>
              , eller læs om, hvordan du kan{" "}
              <Link href="/blog/stroembesparelse-i-boligen">
                spare på varmepumpe og hvidevarer
              </Link>
              .
            </p>

            <h2>Hvorfor batter det så meget at skifte elselskab?</h2>
            <p>
              Fordi det typisk er den eneste post på elregningen, hvor
              udbyderne reelt konkurrerer om din pris. Elafgift, transport og
              moms er stort set ens uanset elselskab, så forskellen mellem en
              dyr og en billig aftale ligger næsten udelukkende i selve
              elprisen og et eventuelt abonnement.
            </p>
          </div>

          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              "Ingen bindingskrav for at få tilbud",
              "Tilbud tilpasset dit forbrug",
              "Sammenlign flere selskaber på én gang",
              "Skift kun, hvis det kan betale sig for dig",
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
        <CtaBanner
          title="Se hvor meget du konkret kan spare"
          subtitle="Udfyld formularen og få op til 3 tilbud tilpasset dit forbrug – gratis og uforpligtende."
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
