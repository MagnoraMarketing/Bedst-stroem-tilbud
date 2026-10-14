import type { Metadata } from "next";
import { Inter, Lexend } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SavingsPopup from "@/components/SavingsPopup";
import SideWidget from "@/components/SideWidget";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { siteConfig } from "@/lib/constants";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} – Sammenlign elpriser og spar penge på strøm`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "billig strøm",
    "sammenlign elpriser",
    "spar penge på strøm",
    "bedst elselskab",
    "billigste elselskab",
    "elpriser time for time",
    "skift elselskab",
  ],
  authors: [{ name: siteConfig.name }],
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [
        { url: "/blog/rss.xml", title: `${siteConfig.name} – Blog` },
      ],
    },
  },
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "Energi og privatøkonomi",
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} – Sammenlign elpriser og spar penge på strøm`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} – Sammenlign elpriser og spar penge på strøm`,
    description: siteConfig.description,
  },
  // Allow large image previews and full-length snippets in Google (Search,
  // Discover) and Bing – both honour these directives.
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "VyA32DNWtav_JQZS28vcFTBY1enJBWnvLC6ndXBx9GY",
    // Bing Webmaster Tools: set NEXT_PUBLIC_BING_SITE_VERIFICATION to the
    // msvalidate.01 code from Bing to verify the site via meta tag.
    other: {
      "ahrefs-site-verification":
        "d2571a624e717dd082fd44f57f876da105fda2b13689e9959df2a467e2653744",
      ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION && {
        "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION,
      }),
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        logo: {
          "@type": "ImageObject",
          url: `${siteConfig.url}/icon.svg`,
        },
        areaServed: { "@type": "Country", name: "Danmark" },
        knowsAbout: [
          "elpriser",
          "billig strøm",
          "skift af elselskab",
          "spotpris",
          "strømbesparelse",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: { "@id": `${siteConfig.url}/#organization` },
        inLanguage: "da-DK",
      },
    ],
  };

  return (
    <html
      lang="da"
      className={`${inter.variable} ${lexend.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <GoogleAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <SavingsPopup />
        <SideWidget />
      </body>
    </html>
  );
}
