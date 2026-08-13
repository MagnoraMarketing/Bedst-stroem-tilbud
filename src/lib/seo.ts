import type { Metadata } from "next";
import { siteConfig } from "./constants";

/**
 * Next.js only applies the root layout's title template to `metadata.title`
 * — `openGraph.title` / `twitter.title` are shallowly overwritten (not
 * merged) as soon as a page defines its own `openGraph`, so without this
 * helper every sub-page's social preview silently falls back to the
 * homepage's title/description. This builds the full set explicitly.
 */
export function pageMetadata({
  title,
  description,
  path,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const socialTitle = `${title} | ${siteConfig.name}`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title: socialTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
    },
  };
}
