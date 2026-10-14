// Submits every URL in the live sitemap to IndexNow, which notifies Bing (and
// Yandex, Seznam, Naver …) about new and updated pages within minutes instead
// of waiting for the next crawl. Run after a deploy:
//
//   npm run indexnow
//
// Optionally pass specific URLs to submit only those:
//   npm run indexnow -- https://www.billigelrengning.dk/blog/some-post

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.billigelrengning.dk";
// Must match the key file in public/<key>.txt.
const KEY = "efea147562fc05517838f1480b91db97";

async function sitemapUrls() {
  const res = await fetch(`${SITE_URL}/sitemap.xml`);
  if (!res.ok) throw new Error(`Could not fetch sitemap: ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((match) => match[1])
    .filter((url) => !url.includes("/opengraph-image"));
}

const urls = process.argv.slice(2).length > 0 ? process.argv.slice(2) : await sitemapUrls();
const { host } = new URL(SITE_URL);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host,
    key: KEY,
    keyLocation: `${SITE_URL}/${KEY}.txt`,
    urlList: urls,
  }),
});

console.log(`IndexNow: submitted ${urls.length} URLs → HTTP ${res.status}`);
if (!res.ok && res.status !== 202) {
  console.error(await res.text());
  process.exit(1);
}
