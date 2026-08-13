import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import CtaBanner from "@/components/CtaBanner";
import SectionHeading from "@/components/SectionHeading";
import FaqAccordion from "@/components/FaqAccordion";
import JsonLd, { faqJsonLd } from "@/components/JsonLd";
import { CheckIcon, ShieldCheckIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Billigste elselskab – find det lige nu",
  description:
    "Find det billigste elselskab lige nu. Se hvad der reelt gør et elselskab billigt, og hvad du skal kigge efter, før du skifter.",
  alternates: { canonical: "/billigste-elselskab" },
};

const checklist = [
  {
    title: "Se på totalprisen, ikke kun kWh-prisen",
    description:
      "Et lavt tillæg pr. kWh kan hurtigt blive opvejet af et højt månedligt abonnement. Regn altid den samlede pris ud fra dit forventede forbrug.",
  },
  {
    title: "Tjek bindingsperiode og opsigelsesvarsel",
    description:
      "Nogle af de billigste tilbud kræver binding. Vær sikker på, at du er tryg ved vilkårene, før du skriver under.",
  },
  {
    title: "Undersøg om prisen er fast eller variabel",
    description:
      "En lav pris her og nu er ikke nødvendigvis lav om et halvt år, hvis den følger markedet. Overvej hvad der passer til din økonomi.",
  },
  {
    title: "Kig efter skjulte gebyrer",
    description:
      "Opkrævningsgebyr, papirfaktura-tillæg og oprettelsesgebyr kan gøre et tilsyneladende billigt tilbud dyrere i praksis.",
  },
];

const faqItems = [
  {
    question: "Hvordan finder jeg det billigste elselskab lige nu?",
    answer:
      "Priserne ændrer sig løbende, så den mest pålidelige metode er at indhente friske tilbud, der er tilpasset dit forbrug og din bopæl. Udfyld vores formular, og få op til 3 aktuelle tilbud at sammenligne.",
  },
  {
    question: "Er det billigste elselskab altid det bedste valg?",
    answer:
      "Ikke nødvendigvis. Det er værd at kigge på totalprisen, binding, kundeservice og eventuelt grøn profil – ikke kun kWh-prisen isoleret set.",
  },
  {
    question: "Koster det noget at skifte til et billigere elselskab?",
    answer:
      "De fleste danske elselskaber tager ikke gebyr for selve skiftet, og der er ingen afbrydelse i din strømforsyning. Tjek dog altid vilkårene for din nuværende aftale for eventuelt opsigelsesgebyr.",
  },
];

export default function BilligsteElselskabPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqItems)} />
      <PageHero
        eyebrow="Billigste elselskab"
        title="Find det billigste elselskab lige nu"
        lead="Der findes ikke ét fast svar på, hvilket elselskab der er billigst – det afhænger af dit forbrug, din bopæl og dine ønsker til binding. Her får du en guide til at finde det rigtige for netop dig."
        breadcrumb={[{ name: "Billigste elselskab", href: "/billigste-elselskab" }]}
      />

      <section className="py-14">
        <Container className="max-w-4xl">
          <div className="prose-article">
            <p>
              Søgninger som &quot;billigste elselskab&quot; giver ofte
              øjebliksbilleder, der hurtigt bliver forældede – priserne på
              elmarkedet ændrer sig løbende, og det, der var billigst i sidste
              måned, er ikke nødvendigvis billigst i dag. Den mest sikre
              metode til at finde det aktuelt billigste tilbud for netop din
              husstand er derfor at sammenligne friske priser baseret på dit
              forbrug.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {checklist.map((item) => (
              <div key={item.title} className="rounded-2xl border border-border bg-white p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-sky text-brand-blue">
                  <ShieldCheckIcon className="w-5 h-5" />
                </div>
                <h3 className="mt-3 font-display font-bold text-brand-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/65">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="prose-article mt-10">
            <h2>Hvad gør et elselskab &quot;billigt&quot;?</h2>
            <p>
              Et billigt elselskab er ikke nødvendigvis det med lavest
              kWh-pris alene. Den reelle besparelse afhænger af summen af
              kWh-pris, abonnement, eventuel binding og gebyrer, holdt op
              imod dit faktiske forbrug. En lejlighed med lavt forbrug vil
              ofte have gavn af et produkt uden fast abonnement, mens en
              husstand med højt forbrug (f.eks. med varmepumpe eller elbil)
              kan have mere gavn af en lav kWh-pris, selv med et fast gebyr.
            </p>

            <h2>Fastpris eller spotpris – hvad er billigst?</h2>
            <p>
              Der findes ikke ét entydigt svar. Historisk har spotpris/
              variabel pris ofte været billigere i gennemsnit, men med større
              udsving. Fastpris giver forudsigelighed, men kan i perioder med
              lave markedspriser vise sig dyrere. Læs mere i vores guide om{" "}
              <Link href="/blog/fast-eller-variabel-elpris">
                fast eller variabel elpris
              </Link>
              .
            </p>

            <h2>Husk at gense din aftale løbende</h2>
            <p>
              Selvom du fandt det billigste elselskab for et år siden, er der
              ingen garanti for, at det stadig er tilfældet i dag. Det kan
              betale sig at sammenligne priser mindst én gang om året, eller
              når din nuværende binding udløber.
            </p>
          </div>

          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              "Tilbud tilpasset dit konkrete forbrug",
              "Overblik over flere danske elselskaber",
              "Ingen binding for at få tilbud",
              "Helt gratis at bruge",
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
          title="Se de aktuelt billigste tilbud til din husstand"
          subtitle="Vi matcher dig med op til 3 relevante tilbud fra danske elselskaber."
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
