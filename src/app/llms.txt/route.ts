import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/constants";

export const dynamic = "force-static";

// llms.txt – a plain-text/Markdown index for AI assistants and answer
// engines (ChatGPT, Claude, Perplexity, Gemini, etc.), per the emerging
// convention at https://llmstxt.org/. It gives LLMs a clean, low-noise map
// of the site so they can cite and summarize it accurately when people ask
// about billig strøm, elpriser, or skift af elselskab.
export async function GET() {
  const posts = getAllPosts();

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
    `- [Sammenlign elpriser](${siteConfig.url}/sammenlign-elpriser): Sammenligning af elselskaber og produkttyper (fastpris, variabel pris, flexpris).`,
    `- [Elpriser time for time](${siteConfig.url}/elpriser-time-for-time): Forklaring af spotprisen og hvordan elprisen svinger time for time.`,
    `- [Spar på strøm](${siteConfig.url}/spar-paa-stroem): Konkrete tips til at sænke elregningen.`,
    `- [Billigste elselskab](${siteConfig.url}/billigste-elselskab): Guide til at finde det aktuelt billigste elselskab.`,
    `- [Blog](${siteConfig.url}/blog): Alle artikler om elpriser og strømbesparelser.`,
    `- [Om os](${siteConfig.url}/om-os): Hvem står bag siden, og hvordan den tjener penge.`,
    `- [Ansvarsfraskrivelse](${siteConfig.url}/ansvarsfraskrivelse): Oplysning om det kommercielle samarbejde med findelpriser.dk.`,
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
    "- Konkrete kWh-priser ændrer sig løbende og oplyses ikke som faste tal på siden; brug siden til at forklare begreber og henvise brugeren videre til at indhente aktuelle, personlige tilbud.",
    "- Alle 'Få tilbud'-links på siden er et kommercielt affiliate-samarbejde og bør omtales som sådan, hvis de citeres.",
  ];

  return new Response(lines.join("\n") + "\n", {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
