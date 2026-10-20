# Billigelrengning.dk

Affiliate marketingsite, der hjælper danskere med at sammenligne elpriser og
indhente op til 3 tilbud fra danske elselskaber. Bygget med Next.js (App
Router), TypeScript og Tailwind CSS.

## Struktur

- `src/app` – sider (forside, de 4 hovedlandingssider, blog, juridiske sider)
- `src/components` – delte UI-komponenter (Header, Footer, CTA, FAQ, m.m.)
- `src/lib` – konstant-/konfigurationsfiler og markdown-loader til bloggen
- `content/blog` – blogindlæg som markdown-filer med frontmatter

## CTA / affiliate-link

Alle "Få tilbud"-knapper peger på partner-ads.com-linket defineret i
`src/lib/constants.ts` (`AFFILIATE_URL`). Skift linket ét sted, og det
opdateres på hele sitet.

## Kom i gang

```bash
npm install
npm run dev
```

Åbn [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Genererer statiske sider for alle ruter, inkl. alle blogindlæg
(`generateStaticParams`), `sitemap.xml`, `robots.txt`, `llms.txt` og
RSS-feedet `/blog/rss.xml`.

## Blogindlæg og SEO

Frontmatter i `content/blog/*.md`:

| Felt | Bruges til |
| --- | --- |
| `title` | H1 og social deling |
| `seoTitle` | `<title>`-tag – kort og med søgeordet først (maks. ca. 50 tegn) |
| `description` | Meta description (ca. 140–158 tegn) |
| `date` / `updated` | Udgivet / sidst opdateret (`dateModified`, sitemap `lastmod`) |
| `keywords` | Meta keywords og relaterede artikler |
| `summary` | "Kort fortalt"-boks øverst i artiklen |
| `faq` | Synlig FAQ + `FAQPage`-schema |

Opdater `updated`, når du ændrer et indlæg væsentligt, og bump
`STATIC_PAGES_UPDATED` i `src/app/sitemap.ts`, når de faste sider ændres.

## Bing og IndexNow

- Bing Webmaster Tools: sæt `NEXT_PUBLIC_BING_SITE_VERIFICATION` til
  `msvalidate.01`-koden (eller importér sitet fra Google Search Console).
- Efter hver deploy: `npm run indexnow` sender alle URL'er i sitemappet til
  IndexNow (Bing, Yandex m.fl.), så nye og opdaterede sider bliver crawlet
  med det samme.

## Ting du bør udfylde før produktion

- `NEXT_PUBLIC_SITE_URL` – sæt til det endelige domæne (bruges i metadata,
  Open Graph og sitemap).
- `src/app/privatlivspolitik/page.tsx` – virksomhedsnavn og CVR-nummer
  (markeret med `[Virksomhedsnavn]` / `[CVR-nummer]`).
