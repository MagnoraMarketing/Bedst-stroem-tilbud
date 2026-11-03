/**
 * Author profiles (E-E-A-T). Only add REAL people who actually write or
 * review content, with a verifiable bio and links. Never invent authors.
 *
 * When an entry exists, posts with `author: <slug>` in their frontmatter get:
 *  - a visible byline linking to /forfattere/<slug>
 *  - `Person` structured data as the BlogPosting author
 *  - a profile page listing the author's articles (included in the sitemap)
 *
 * Posts without a known author fall back to the editorial team
 * ("Redaktionen") with the Organization as author.
 */
export type Author = {
  slug: string;
  name: string;
  jobTitle: string;
  /** Short bio, 2–4 sentences, describing real, relevant experience. */
  bio: string;
  /** Areas of expertise shown on the profile and used as `knowsAbout`. */
  expertise: string[];
  /** Public profiles (LinkedIn etc.) used as `sameAs`. */
  sameAs?: string[];
  /** Optional path to a photo in /public. */
  image?: string;
};

export const authors: Author[] = [
  // Example – fill in with real data before enabling:
  // {
  //   slug: "fornavn-efternavn",
  //   name: "Fornavn Efternavn",
  //   jobTitle: "Redaktør",
  //   bio: "…",
  //   expertise: ["elpriser", "privatøkonomi"],
  //   sameAs: ["https://www.linkedin.com/in/…"],
  // },
];

export function getAuthor(slug?: string): Author | undefined {
  return slug ? authors.find((a) => a.slug === slug) : undefined;
}
