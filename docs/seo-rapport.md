# SEO-rapport og scorecard – Billigelrengning.dk

Dato: 3. november 2026 · Branch: `ccr-8eb89bc7-mava05`

Rapporten bygger på en gennemgang af hele kodebasen og en produktionsbuild
(`next build`). Den bygger **ikke** på live-data fra Google Search Console,
Ahrefs, PageSpeed Insights eller SERP-målinger, for udviklingsmiljøet havde ingen
netadgang til dem. De steder, hvor der står **[MÅLES]**, skal tallet hentes efter deploy.

---

## 1. Scorecard

Karaktererne er en faglig vurdering på en skala fra 1 til 10. De er ikke målte tal.

| Område | Før | Efter | Kommentar |
| --- | --- | --- | --- |
| Teknisk SEO | 7 | 8,5 | Siden havde allerede canonical, sitemap, robots, redirects til www, RSS, IndexNow og OG-billeder. Nu er der også noindex for tynde sider og kladder, 404 på ukendte slugs, ISR og security headers. |
| On-page SEO | 6,5 | 8 | Titler og beskrivelser for pengesiderne er skrevet om med fokus på søgeintention ("i dag og i morgen", DK1/DK2, beregner). |
| Indhold | 6 | 7,5 | Siden har 31 artikler. Før var der intet unikt dataværktøj, og nu er der live-priser og en beregner. |
| Keyword-dækning | 6 | 7 | Den mest værdifulde gruppe, "elpris i dag" / "elpriser time for time", har nu en side med reelt indhold. |
| Indeksering | [MÅLES] | [MÅLES] | Tjekkes i GSC under "Sider" efter deploy. |
| Performance | God (statisk) | God (statisk + ISR) | Alle sider er prerenderede. Live-data hentes på serveren, så der kommer ingen ekstra JS-requests. Kør PSI efter deploy. |
| Mobil | 8 | 8,5 | Testet i iPhone 13-viewport. Der er ingen horisontal scroll, og tabeller scroller inden for deres egen boks. |
| Structured data | 7 | 9 | Ny: Dataset, WebPage/AboutPage, Organization med publishingPrinciples, correctionsPolicy og ownershipFundingInfo, samt Person- og ProfilePage-understøttelse. |
| AI Search readiness | 7 | 8,5 | llms.txt, "Kort fortalt"-bokse, citerbare dagsopsummeringer med dato og prisområde og eksplicitte noter til AI-assistenter. |
| E-E-A-T / troværdighed | 4,5 | 7,5 | Fire nye sider om metode, redaktionel politik, finansiering og kilder. Der mangler stadig rigtige forfattere og virksomhedsoplysninger. |
| Konvertering og UX | 6 | 7,5 | Live-prisboks i hero, beregner og tydeligere annoncemarkering. Popups er mindre påtrængende. |

---

## 2. Audit – fund (prioriteret)

### Kritisk
| # | Fund | Status |
| --- | --- | --- |
| K1 | Siden "Elpriser time for time" viste et **illustrativt** prismønster og ingen rigtige priser. Det er en svag match til søgeintentionen for et af nichens største søgeord. | **Rettet:** Siden viser nu live DK1/DK2-spotpriser fra Energinet for i dag og i morgen, med inkl./ekskl. moms, de billigste timer, dagsgennemsnit og 30-dages gennemsnit. |
| K2 | Udokumenterede besparelsestal: "op til 2.400 kr." (forside og Spar på strøm), "over 2.000 kr." (popup og sidewidget), intervaller som "500-1.500 kr./år" og et opdigtet søjlediagram (100/78/55 %). | **Rettet:** Tallene er fjernet eller erstattet af gennemsigtige regneeksempler med forudsætninger. Hero-diagrammet er erstattet af live-spotpriser. |
| K3 | `/privatlivspolitik` indeholder stadig `[Virksomhedsnavn]` og `[CVR-nummer]`. | **Mangler – kræver ejerens data.** Det skader troværdigheden, og det er sandsynligvis et lovkrav. |

### Høj
| # | Fund | Status |
| --- | --- | --- |
| H1 | Der var ingen side om metode, kilder, redaktionel politik eller finansiering. | **Rettet:** `/saadan-beregner-vi-elpriser`, `/kilder`, `/redaktionel-politik` og `/saadan-tjener-vi-penge` er oprettet og linket fra footer, Om os og artikelbyline. |
| H2 | Sammenligningssiden havde ingen sammenligningsfunktion. | **Rettet:** Beregneren sammenligner op til 3 tilbud på spottillæg/kWh-pris, abonnement, gebyrer, introrabat, binding og betalingsform. Den viser pris for 1. år og efterfølgende år. |
| H3 | Ingen forfattere: alle artikler er skrevet af "redaktionen". | **Delvist:** Forfattersystemet (`src/lib/authors.ts`, `/forfattere/[slug]`, Person-schema og byline) er bygget, men det er **tomt med vilje**. Tilføj rigtige personer. Der er ikke opfundet nogen. |
| H4 | Kontaktsiden har ingen kontaktoplysninger (e-mail blev fjernet i et tidligere commit). | **Mangler – ejerens beslutning.** Anbefaling: en kontaktformular eller en e-mail plus virksomhedsnavn og CVR. |
| H5 | Affiliate-CTA'er i den kompakte banner, popup og sidewidget var ikke markeret som annonce. | **Rettet:** De har nu "Annonce · provision via findelpriser.dk". |

### Middel
| # | Fund | Status |
| --- | --- | --- |
| M1 | Ukendte blog-slugs blev renderet on demand. | **Rettet:** `dynamicParams = false` giver 404. |
| M2 | Der var ingen mekanisme mod indeksering af tynde eller ufærdige artikler. | **Rettet:** Frontmatter kan nu have `draft: true`, og indlæg under 400 ord får `noindex`. Begge dele holdes ude af sitemap, RSS og llms.txt. |
| M3 | Popup efter 10 sekunder og sidewidget efter 20 sekunder forstyrrede læsningen. | **Rettet:** Ændret til 30 og 60 sekunder (stadig kun én gang pr. session). |
| M4 | Der manglede security headers. | **Rettet:** nosniff, Referrer-Policy, X-Frame-Options og Permissions-Policy. |
| M5 | Organization-logoet er en SVG. Google anbefaler et rasterlogo på mindst 112×112 px. | Mangler. Tilføj `/logo.png` og opdatér `layout.tsx`. |
| M6 | `/billigste-elselskab` nævner ikke konkrete selskaber eller priser, fordi der ikke findes en verificerbar datakilde. | Se afsnit 6 om dataintegration. |

### Lav
| # | Fund | Status |
| --- | --- | --- |
| L1 | Meta keywords bruges, men de ignoreres af Google og Bing. | Ufarligt. Fjernes ikke. |
| L2 | `robots.ts` angiver `host` som URL. Det understøttes kun af Yandex. | Ufarligt. |
| L3 | `formatDetection` m.m. | OK. |

---

## 3. Keyword-strategi og mapping

Volumen er ikke målt [MÅLES i Ahrefs/GKP]. Søgeordene er grupperet efter søgeintention.

| Klynge | Primære søgeord | Intention | Side |
| --- | --- | --- | --- |
| Live-priser | elpris i dag, elpriser time for time, elpris i morgen, spotpris, elpris DK1/DK2 | Info/værktøj | `/elpriser-time-for-time` |
| Sammenligning | sammenlign elpriser, sammenlign elselskaber, elpris beregner | Kommerciel | `/sammenlign-elpriser` |
| Billigst | billigste elselskab, billig strøm, bedste elselskab | Kommerciel | `/billigste-elselskab`, `/blog/bedste-elselskab-2026` |
| Besparelse | spar på strøm, sænk elregning | Info | `/spar-paa-stroem` + blogklynge |
| Elregning | elregning forklaret, nettarif, elafgift | Info | Blog: elregning sat sammen, nettarif, læs din elregning |
| Produkttyper | fast eller variabel elpris, binde elprisen | Info/kommerciel | Blog |
| Livssituation | flytning elaftale, elbil opladning pris, varmepumpe | Info | Blog |

Kannibaliseringsrisiko: `/billigste-elselskab` mod `/blog/bedste-elselskab-2026` og
`/blog/billig-stroem-saadan-finder-du-det-billigste-elselskab`. Lad landingssiden
eje "billigste elselskab", og lad artiklerne linke dertil med eksakt ankertekst.

### Forslag til nye sider (kun med reelt indhold)
1. **Elpris i morgen** (`/elpris-i-morgen`): bygger på samme datakilde og har en egen søgeintention.
2. **Nettarif pr. netselskab**: kræver DatahubPricelist-integration (se afsnit 6).
3. **Elafgift [år]**: én side med en dateret kilde fra Skatteministeriet. Den opdateres ved hver ændring.
4. **Månedlig elprisstatistik** (fx `/elpriser/2026-11`): genereres automatisk ud fra historiske data og indekseres kun, når måneden er afsluttet. Det giver unikt dataindhold, som AI-søgemaskiner kan citere.

## 4. Konkurrentanalyse

Det var ikke muligt at hente SERP- eller Ahrefs-data fra udviklingsmiljøet.
Derfor gives her kun en kvalitativ ramme. **Verificér med Ahrefs (siden er verificeret dér).**

- **elpris.dk (Forsyningstilsynet)**: officiel og meget troværdig, men mindre fokus
  på brugervenlighed. Vi linker til den som kilde i stedet for at konkurrere på samme data.
- **Elselskabernes egne prissider**: stærke på brandsøgninger. Vi kan ikke slå dem dér,
  men vi kan godt på generiske søgeord ("billigste elselskab").
- **Affiliate- og sammenligningssider**: de konkurrerer typisk med tynde lister og
  udokumenterede besparelser. Vores differentiering er officielle live-data, en
  gennemsigtig metode og en beregner uden skjult rangering.

Næste skridt: Ahrefs → "Competing domains" for top 20 søgeord og content gap-analyse.

## 5. GEO/AEO (AI-søgning)

- `llms.txt` beskriver nu datakilde, enheder og forbehold, så AI-assistenter kan citere korrekt.
- Dagsopsummeringen på elpris-siden har en fast sætningsstruktur med tal, dato og
  prisområde, så den er let at citere.
- `Dataset`-schema på elpris-siden linker til Energinet som kilde.
- AI-crawlere (GPTBot, ClaudeBot, PerplexityBot, Google-Extended osv.) har allerede adgang i robots.txt.
- Artikler har allerede "Kort fortalt", FAQ og indholdsfortegnelse.

## 6. Elpriser og datakilder

| Data | Kilde | Status |
| --- | --- | --- |
| Spotpris DK1/DK2 time for time | Energi Data Service `DayAheadPrices` (gratis, uden nøgle) | **Implementeret** (`src/lib/elpriser.ts`, ISR hvert 15. min.) |
| Nettarif pr. netselskab | Energi Data Service `DatahubPricelist` | **Ikke implementeret.** Det kræver at mappe postnummer til netselskab og håndtere tidsdifferentierede tariffer. Det er realistisk som næste fase. |
| Elafgift og Energinets tariffer | Skatteministeriet / `DatahubPricelist` | Ikke implementeret. Satserne skal kodes med dato og kilde. |
| Elselskabernes spottillæg, abonnement og gebyrer | Ingen åben API | **Ikke implementeret.** Data må ikke opdigtes. Mulige løsninger: (a) aftale om datafeed fra findelpriser.dk/Partner-ads, (b) manuel kuratering med dato og kildelink pr. pris i en database (fx Vercel Postgres/Edge Config) med "verificeret dato", (c) dialog med Forsyningstilsynet om data fra elpris.dk. |

**Bemærk:** Udviklingsmiljøet kunne ikke kalde `api.energidataservice.dk`.
Feltnavnene (`TimeDK`, `PriceArea`, `DayAheadPriceDKK`) er tjekket mod dokumenterede
tredjepartsklienter, og parse-logikken er testet med simulerede API-svar, inklusive
15-minutters opløsning og fejl. **Tjek siden på preview-deployet.** Hvis API'et
fejler, viser siden en ærlig besked i stedet for tal.

## 7. Implementerede forbedringer

**Nye filer**
- `src/lib/elpriser.ts`: datalag til spotpriser (DK1/DK2, timegennemsnit, 30-dages gennemsnit, fejlhåndtering).
- `src/components/SpotPriceBoard.tsx`: interaktiv timetabel (prisområde, i dag/i morgen, moms).
- `src/components/OfferCalculator.tsx`: beregner til sammenligning af tilbud.
- `src/components/DataSourceNote.tsx`: boks om seneste opdatering, kilde, beregning og hvad prisen inkluderer.
- `src/components/TrustPage.tsx`: fælles layout og WebPage-schema for troværdighedssider.
- `src/lib/authors.ts` + `src/app/forfattere/[slug]`: forfatterprofiler med Person-schema.
- Sider: `/saadan-beregner-vi-elpriser`, `/redaktionel-politik`, `/saadan-tjener-vi-penge`, `/kilder`.

**Optimerede sider**
- `/elpriser-time-for-time`: live-data, ny title/description, Dataset-schema.
- `/sammenlign-elpriser`: beregner, kilder, nye FAQ, ærligt svar om manglende prisliste.
- `/`: live-prisboks i stedet for et opdigtet diagram og ærlig hero-tekst.
- `/spar-paa-stroem`: regneeksempler i stedet for udokumenterede tal.
- `/om-os`: links til metode, politik, finansiering og kilder.
- Blogartikler: byline med links til redaktionel politik og kilder, forfatterstøtte, noindex for tynde artikler, 404 på ukendte slugs.
- Footer, sitemap (nye sider og daglig lastmod for live-siden), llms.txt, RSS.

## 8. Testresultater

| Test | Resultat |
| --- | --- |
| `tsc --noEmit` | OK |
| `npm run lint` | OK, 0 fejl |
| `npm run build` | OK. 84 sider. `/`, `/elpriser-time-for-time` og `/sammenlign-elpriser` har ISR med 15 minutters revalidering. |
| HTTP-statuskoder (next start) | Alle nye og eksisterende sider giver 200. Ukendt blog- og forfatter-slug giver 404. sitemap.xml har 45 URL'er. |
| Spotpris-parser (simuleret API) | Korrekt: 15-minutters opløsning, 24 timer, min/max, morgendagen og 30-dages gennemsnit. Ved fejl returneres `null`, og siden viser en fallback. |
| Beregner (Playwright, iPhone 13) | Tjekket med håndregning: A = 3.800 + 348 = 4.148 kr. B = 4.188 kr., og 3.888 kr. med introrabat. Ingen JS-fejl og ingen horisontal scroll. |
| Lighthouse/PSI | [MÅLES] efter deploy. Kør på mobil og desktop for `/`, `/elpriser-time-for-time` og en artikel. |

**Sådan tester du selv efter deploy**
1. Åbn `/elpriser-time-for-time` og sammenlign 2–3 timepriser med energidataservice.dk.
2. Kør Rich Results Test på `/elpriser-time-for-time`, en artikel og `/kilder`.
3. GSC: indsend sitemap igen, og inspicér de nye URL'er. Kør `npm run indexnow`.
4. PageSpeed Insights på mobil og desktop.

## 9. Resterende problemer (kræver ejeren)

1. Virksomhedsnavn og CVR i privatlivspolitik og Om os (K3).
2. Kontaktmulighed (H4).
3. Rigtige forfattere med bio og LinkedIn i `src/lib/authors.ts` og `author:` i frontmatter (H3).
4. Rasterlogo (M5).
5. Datakilde til elselskabernes priser (afsnit 6).
6. Tjek af partner-ads' provisionsmodel, så teksten på `/saadan-tjener-vi-penge` er præcis.

## 10. 90-dages SEO-plan

**Dag 1–14**
- Deploy, tjek live-data, indsend sitemap, kør IndexNow og PSI-baseline.
- Udfyld virksomhedsdata, kontakt og forfattere (punkt 1–3 ovenfor).
- Lav GSC-baseline for klik og visninger pr. landingsside.

**Dag 15–45**
- Byg `/elpris-i-morgen` og månedsstatistik-sider ud fra samme datakilde.
- Integrér nettariffer (DatahubPricelist), så beregneren kan vise samlet kWh-pris inkl. tariffer og afgift for brugerens netselskab.
- Løs kannibalisering mellem "billigste elselskab"-siderne.
- Ahrefs: konkurrent- og content gap-analyse. Prioritér 5 nye artikler med dokumenterede kilder.

**Dag 46–90**
- Opdatér de 10 artikler med flest visninger i GSC: kildelinks, datoer og interne links til beregneren.
- Linkbuilding gennem dataindhold, fx månedlige prisanalyser til lokale medier og blogs.
- Tilføj eventuelt elselskabsdata, hvis en verificerbar kilde er på plads (afsnit 6).
- Mål konverteringer: CTA-klik pr. side (GA4-event på affiliate-links) og A/B-test af hero-CTA.

Der gives ingen garanti for placeringer. Målet er bedre dækning af søgeintentionen, mere troværdighed og citerbare data.
