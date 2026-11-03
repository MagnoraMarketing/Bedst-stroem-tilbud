import type { Metadata } from "next";
import TrustPage from "@/components/TrustPage";
import { pageMetadata } from "@/lib/seo";

const path = "/kilder";
const description =
  "De primære kilder bag vores elpriser og artikler: Energinet, Energi Data Service, Forsyningstilsynet (elpris.dk), Skatteministeriet, Energistyrelsen og Nord Pool.";

export const metadata: Metadata = pageMetadata({
  title: "Kilder – hvor vores tal om elpriser kommer fra",
  description,
  path,
});

const sources = [
  {
    name: "Energi Data Service (Energinet)",
    url: "https://www.energidataservice.dk/",
    use: "Officielle day-ahead spotpriser for DK1 og DK2, hentet automatisk til elpriser time for time og beregneren.",
  },
  {
    name: "Energinet",
    url: "https://energinet.dk/",
    use: "Systemansvarlig virksomhed: Energinets tariffer, prisområder og elmarkedets funktion.",
  },
  {
    name: "Forsyningstilsynet – elpris.dk",
    url: "https://elpris.dk/",
    use: "Officiel prisportal, hvor elselskaberne anmelder deres elprodukter. Henvises til ved sammenligning af elselskaber.",
  },
  {
    name: "Forsyningstilsynet",
    url: "https://forsyningstilsynet.dk/",
    use: "Regulering af elmarkedet, netselskabernes tariffer og forbrugerforhold.",
  },
  {
    name: "Skatteministeriet",
    url: "https://www.skm.dk/",
    use: "Elafgiftens satser og ændringer i afgiftsregler.",
  },
  {
    name: "Energistyrelsen",
    url: "https://ens.dk/",
    use: "Energispareråd, statistik over energiforbrug og energipolitik.",
  },
  {
    name: "Nord Pool",
    url: "https://www.nordpoolgroup.com/",
    use: "Elbørsen, hvor day-ahead-priserne dannes.",
  },
  {
    name: "Ankenævnet på Energiområdet",
    url: "https://www.energianke.dk/",
    use: "Forbrugerrettigheder ved klager over elselskaber.",
  },
];

export default function Page() {
  return (
    <TrustPage
      title="Kilder"
      lead="Vi bygger vores tal og råd på primære, offentlige kilder. Her er de vigtigste – og hvad vi bruger dem til."
      path={path}
      description={description}
    >
      <ul>
        {sources.map((s) => (
          <li key={s.url}>
            <a href={s.url} target="_blank" rel="noopener">
              <strong>{s.name}</strong>
            </a>{" "}
            – {s.use}
          </li>
        ))}
      </ul>
      <h2>Kildeangivelse i artikler</h2>
      <p>
        Når en artikel bygger på et bestemt tal eller en regel, linker vi så vidt muligt direkte til
        kilden. Tal, der ændrer sig (fx afgifter og tariffer), dateres i teksten.
      </p>
    </TrustPage>
  );
}
