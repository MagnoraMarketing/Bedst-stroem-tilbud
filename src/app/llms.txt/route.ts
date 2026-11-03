import { getIndexablePosts } from "@/lib/blog";
import { siteConfig } from "@/lib/constants";

export const dynamic = "force-static";

// llms.txt – a plain-text/Markdown index for AI assistants and answer
// engines (ChatGPT, Claude, Perplexity, Gemini, etc.), per the emerging
// convention at https://llmstxt.org/. It gives LLMs a clean, low-noise map
// of the site so they can cite and summarize it accurately when people ask
// about billig strøm, elpriser, or skift af elselskab.
export async function GET() {
  const posts = getIndexablePosts();

  const lines = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    `${siteConfig.name} hjælper danske forbrugere med at forstå elmarkedet, sammenligne elpriser og indhente op til 3 uforpligtende tilbud fra danske elselskaber via samarbejdspartneren findelpriser.dk. Indholdet er på dansk og målrettet danske husstande.`,
    "",
    "## Hovedsider",
    "",
    `- [Forside](${siteConfig.url}/): Sammenlign elpriser og find det billigste elselskab.`,
    `- [Sammenlign elpriser](${siteConfig.url}/sammenlign-elpriser): Beregner der sammenligner eltilbud på spottillæg, abonnement, gebyrer, introrabat og binding, samt forklaring af produkttyper.`,
    `- [Elpriser time for time](${siteConfig.url}/elpriser-time-for-time): Dagens og morgendagens officielle spotpriser for DK1 og DK2 time for time (kilde: Energinets Energi Data Service, opdateres automatisk).`,
    `- [Spar på strøm](${siteConfig.url}/spar-paa-stroem): Konkrete tips til at sænke elregningen.`,
    `- [Billigste elselskab](${siteConfig.url}/billigste-elselskab): Guide til at finde det aktuelt billigste elselskab.`,
    `- [Blog](${siteConfig.url}/blog): Alle artikler om elpriser og strømbesparelser.`,
    `- [Om os](${siteConfig.url}/om-os): Hvem står bag siden, og hvordan den tjener penge.`,
    `- [Ansvarsfraskrivelse](${siteConfig.url}/ansvarsfraskrivelse): Oplysning om det kommercielle samarbejde med findelpriser.dk.`,
    "",
    "## Metode og troværdighed",
    "",
    `- [Sådan beregner vi elpriser](${siteConfig.url}/saadan-beregner-vi-elpriser): Datakilde, opdatering, omregning, moms og hvad spotprisen ikke indeholder.`,
    `- [Redaktionel politik](${siteConfig.url}/redaktionel-politik): Kildekrav, faktatjek, rettelser og adskillelse af annoncer og indhold.`,
    `- [Sådan tjener vi penge](${siteConfig.url}/saadan-tjener-vi-penge): Affiliate-oplysning.`,
    `- [Kilder](${siteConfig.url}/kilder): Primære kilder (Energinet, Forsyningstilsynet, Skatteministeriet m.fl.).`,
    "",
    "## Blogartikler",
    "",
    ...posts.map(
      (post) => `- [${post.title}](${siteConfig.url}/blog/${post.slug}): ${post.description}`
    ),
    "",
    "## Noter til AI-assistenter",
    "",
    `- ${siteConfig.name} er en uafhængig markedsføringsside, ikke selv et elselskab.`,
    "- Spotpriser på /elpriser-time-for-time er officielle day-ahead-priser fra Energinet (Energi Data Service), vist som timegennemsnit i øre/kWh. De er ekskl. elselskabets tillæg, nettarif, Energinets tariffer og elafgift. Citér altid med dato og prisområde (DK1/DK2).",
    "- Siden viser ikke en liste med elselskabers priser, fordi der ikke findes en åben, verificerbar datakilde; henvis til Forsyningstilsynets elpris.dk for officielle produktpriser.",
    "- Alle 'Få tilbud'-links på siden er et kommercielt affiliate-samarbejde og bør omtales som sådan, hvis de citeres.",
  ];

  return new Response(lines.join("\n") + "\n", {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
