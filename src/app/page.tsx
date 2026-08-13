import Link from "next/link";
import Container from "@/components/Container";
import CtaButton from "@/components/CtaButton";
import CtaBanner from "@/components/CtaBanner";
import SectionHeading from "@/components/SectionHeading";
import { FeatureCard, LinkFeatureCard, StatCard, StepCard } from "@/components/FeatureCard";
import FaqAccordion from "@/components/FaqAccordion";
import BlogCard from "@/components/BlogCard";
import JsonLd, { faqJsonLd } from "@/components/JsonLd";
import {
  BoltIcon,
  ChartIcon,
  CheckIcon,
  ClockIcon,
  DocumentSearchIcon,
  HouseIcon,
  LeafIcon,
  PiggyBankIcon,
  ShieldCheckIcon,
} from "@/components/icons";
import { getAllPosts } from "@/lib/blog";

const faqItems = [
  {
    question: "Er det gratis at bruge Billigste-Strømpris.dk?",
    answer:
      "Ja. Det er 100% gratis og uforpligtende at indhente tilbud gennem os. Du betaler aldrig for at sammenligne priser eller modtage tilbud fra elselskaber.",
  },
  {
    question: "Hvordan får jeg tilbud på en billigere elaftale?",
    answer:
      "Klik på en af knapperne på siden, udfyld nogle få oplysninger om din bolig og dit forbrug, og du bliver herefter kontaktet med op til 3 skarpe tilbud fra danske elselskaber, som du frit kan sammenligne.",
  },
  {
    question: "Er jeg forpligtet til at skifte elselskab?",
    answer:
      "Nej, du bestemmer selv. Du modtager tilbud og kan sammenligne dem i ro og mag – det er først en aftale, når du aktivt siger ja tak til et konkret tilbud.",
  },
  {
    question: "Hvor lang tid tager det at skifte elselskab?",
    answer:
      "Selve ansøgningen tager typisk kun få minutter. Herefter klarer det nye elselskab som regel hele skiftet for dig, og der er ingen afbrydelse i din strømforsyning undervejs.",
  },
  {
    question: "Hvorfor er der så stor forskel på elpriserne?",
    answer:
      "Elselskaber sætter selv deres avance og produkttyper, og priserne afhænger blandt andet af, om du vælger fast eller variabel pris, binding og eventuelle abonnementsgebyrer. Derfor kan det ofte betale sig at sammenligne, inden du vælger.",
  },
];

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 6);

  return (
    <>
      <JsonLd data={faqJsonLd(faqItems)} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-sky to-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-brand-blue/10 blur-3xl"
        />
        <Container className="relative grid grid-cols-1 items-center gap-12 py-14 sm:py-20 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-brand-navy shadow-sm ring-1 ring-border">
              <BoltIcon className="w-4 h-4 text-accent-dark" />
              Danmarks guide til billig strøm
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-brand-navy sm:text-5xl">
              Sammenlign elpriser og find dit{" "}
              <span className="text-brand-blue">billigste elselskab</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-foreground/70">
              Indhent op til 3 skarpe, uforpligtende tilbud fra danske
              elselskaber på under 2 minutter – og se, hvor meget din
              husstand kan spare på strømmen i 2026.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <CtaButton size="lg">Hent 3 gratis tilbud</CtaButton>
              <p className="text-sm text-foreground/60">
                Gratis · Uforpligtende · Klar på 2 minutter
              </p>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground/70">
              <li className="flex items-center gap-1.5">
                <CheckIcon className="w-4 h-4 text-success" /> Danske elselskaber
              </li>
              <li className="flex items-center gap-1.5">
                <CheckIcon className="w-4 h-4 text-success" /> Ingen skjulte gebyrer
              </li>
              <li className="flex items-center gap-1.5">
                <CheckIcon className="w-4 h-4 text-success" /> Skift på minutter
              </li>
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <div className="rounded-3xl border border-border bg-white p-6 shadow-xl">
              <p className="text-sm font-semibold text-foreground/50">
                Estimeret årlig besparelse
              </p>
              <p className="mt-1 font-display text-4xl font-bold text-success">
                op til 2.400 kr.*
              </p>
              <div className="mt-5 space-y-3">
                {[
                  { label: "Dit nuværende elselskab", value: 100, color: "bg-foreground/20" },
                  { label: "Gennemsnitligt elselskab", value: 78, color: "bg-brand-blue/50" },
                  { label: "Billigste elselskab", value: 55, color: "bg-success" },
                ].map((row) => (
                  <div key={row.label}>
                    <div className="mb-1 flex items-center justify-between text-xs text-foreground/60">
                      <span>{row.label}</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-surface">
                      <div
                        className={`h-2.5 rounded-full ${row.color}`}
                        style={{ width: `${row.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-xs text-foreground/40">
                *Eksempel baseret på et gennemsnitligt dansk elforbrug. Din
                faktiske besparelse afhænger af dit forbrug og din nuværende
                aftale.
              </p>
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-accent px-4 py-3 shadow-lg sm:block">
              <p className="text-xs font-semibold text-accent-foreground">
                Op til 3 tilbud
              </p>
              <p className="text-[11px] text-accent-foreground/70">
                fra danske elselskaber
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="py-10 sm:py-14">
        <Container className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard value="100%" label="Gratis & uforpligtende" />
          <StatCard value="op til 3" label="Tilbud pr. henvendelse" />
          <StatCard value="~2 min." label="At udfylde formularen" />
          <StatCard value="24/7" label="Elpriser time for time" />
        </Container>
      </section>

      {/* Feature links to main pages */}
      <section className="py-10 sm:py-14">
        <Container>
          <SectionHeading
            eyebrow="Kom videre"
            title="Alt du skal bruge for at finde en billigere elaftale"
            lead="Vi samler de vigtigste værktøjer og guides, så du hurtigt kan overskue elmarkedet og træffe det rigtige valg."
          />
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <LinkFeatureCard
              icon={<ChartIcon />}
              title="Sammenlign elpriser"
              description="Se hvordan elselskaberne og deres produkter adskiller sig, så du kan vælge det rigtige for din husstand."
              href="/sammenlign-elpriser"
            />
            <LinkFeatureCard
              icon={<ClockIcon />}
              title="Elpriser time for time"
              description="Følg spotprisen på strøm time for time og lær, hvordan du kan flytte dit forbrug til de billige timer."
              href="/elpriser-time-for-time"
            />
            <LinkFeatureCard
              icon={<PiggyBankIcon />}
              title="Spar på strøm"
              description="Konkrete råd og eksempler på, hvor meget en gennemsnitlig husstand kan spare på elregningen."
              href="/spar-paa-stroem"
            />
            <LinkFeatureCard
              icon={<ShieldCheckIcon />}
              title="Billigste elselskab"
              description="Sådan finder du frem til det billigste elselskab lige nu – og hvad du skal være opmærksom på."
              href="/billigste-elselskab"
            />
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="bg-surface py-14">
        <Container>
          <SectionHeading
            eyebrow="Sådan fungerer det"
            title="Find en billigere elaftale i 3 enkle trin"
          />
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <StepCard
              number={1}
              title="Udfyld formularen"
              description="Fortæl os lidt om din bolig og dit elforbrug. Det tager under 2 minutter."
            />
            <StepCard
              number={2}
              title="Modtag op til 3 tilbud"
              description="Vi videreformidler din forespørgsel til danske elselskaber, som sender dig konkrete tilbud."
            />
            <StepCard
              number={3}
              title="Vælg og spar"
              description="Sammenlign tilbuddene i ro og mag, og vælg det, der passer bedst til din husstand."
            />
          </div>
          <div className="mt-10 flex justify-center">
            <CtaButton size="lg">Kom i gang nu</CtaButton>
          </div>
        </Container>
      </section>

      {/* Why compare */}
      <section className="py-14">
        <Container>
          <SectionHeading
            eyebrow="Hvorfor sammenligne"
            title="Danskere betaler ofte for meget for deres strøm"
            lead="Mange bliver siddende på gamle aftaler i årevis, selvom markedet ændrer sig løbende. Et par minutters sammenligning kan gøre en stor forskel på årsbasis."
          />
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<HouseIcon />}
              title="Tilpasset din bolig"
              description="Elpriser og produkter passer forskelligt til lejligheder, huse og husstande med højt forbrug – vi hjælper dig med at finde det rette match."
            />
            <FeatureCard
              icon={<DocumentSearchIcon />}
              title="Gennemsigtige tilbud"
              description="Vi hjælper dig med at gennemskue elpris, elafgift, abonnement og transportomkostninger, så du ved, hvad du reelt betaler."
            />
            <FeatureCard
              icon={<LeafIcon />}
              title="Grønne alternativer"
              description="Flere elselskaber tilbyder grøn strøm fra vind- og solenergi til konkurrencedygtige priser."
            />
          </div>
        </Container>
      </section>

      <Container className="py-4">
        <CtaBanner />
      </Container>

      {/* Blog */}
      <section className="py-14">
        <Container>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading
              center={false}
              eyebrow="Nyheder og gode råd"
              title="Seneste artikler fra bloggen"
              lead="Hold dig opdateret på elmarkedet, og bliv klogere på, hvordan du sparer penge på strøm."
            />
            <Link
              href="/blog"
              className="shrink-0 text-sm font-semibold text-brand-blue hover:underline"
            >
              Se alle artikler →
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-surface py-14">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Spørgsmål og svar" title="Ofte stillede spørgsmål" />
          <div className="mt-10">
            <FaqAccordion items={faqItems} />
          </div>
        </Container>
      </section>

      <Container className="py-14">
        <CtaBanner
          title="Klar til at sænke din elregning?"
          subtitle="Det tager kun 2 minutter at komme i gang, og du er ikke forpligtet til noget."
          buttonText="Sammenlign priser nu"
        />
      </Container>
    </>
  );
}
