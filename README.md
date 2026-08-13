# Billigste-Strømpris.dk

Affiliate marketingsite, der hjælper danskere med at sammenligne elpriser og
indhente op til 3 tilbud fra danske elselskaber. Bygget med Next.js (App
Router), TypeScript og Tailwind CSS.

## Struktur

- `src/app` – sider (forside, de 4 hovedlandingssider, blog, juridiske sider)
- `src/components` – delte UI-komponenter (Header, Footer, CTA, FAQ, m.m.)
- `src/lib` – konstant-/konfigurationsfiler og markdown-loader til bloggen
- `content/blog` – de 20 blogindlæg som markdown-filer med frontmatter

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
(`generateStaticParams`), `sitemap.xml` og `robots.txt`.

## Ting du bør udfylde før produktion

- `NEXT_PUBLIC_SITE_URL` – sæt til det endelige domæne (bruges i metadata,
  Open Graph og sitemap).
- `src/lib/constants.ts` – kontakt-e-mail.
- `src/app/privatlivspolitik/page.tsx` – virksomhedsnavn og CVR-nummer
  (markeret med `[Virksomhedsnavn]` / `[CVR-nummer]`).
