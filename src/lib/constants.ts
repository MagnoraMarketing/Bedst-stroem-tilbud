export const siteConfig = {
  name: "Billigste-Strømpris.dk",
  shortName: "Billigste-Strømpris",
  description:
    "Sammenlign elpriser og indhent op til 3 skarpe tilbud på strøm fra danske elselskaber – gratis og uforpligtende.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://billigste-stroempris.dk",
  locale: "da_DK",
  email: "kontakt@billigste-stroempris.dk",
};

// Partner-ads.com affiliate tracking link – all primary CTAs on the site point here.
export const AFFILIATE_URL =
  "https://www.partner-ads.com/dk/klikbanner.php?partnerid=52168&bannerid=112206";

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const mainNav: NavItem[] = [
  {
    label: "Sammenlign elpriser",
    href: "/sammenlign-elpriser",
    description: "Sammenlign elselskaber og elpriser side om side",
  },
  {
    label: "Elpriser time for time",
    href: "/elpriser-time-for-time",
    description: "Se spotprisen på strøm time for time",
  },
  {
    label: "Spar på strøm",
    href: "/spar-paa-stroem",
    description: "Se hvor meget du kan spare på din elregning",
  },
  {
    label: "Billigste elselskab",
    href: "/billigste-elselskab",
    description: "Find det billigste elselskab lige nu",
  },
  {
    label: "Blog",
    href: "/blog",
    description: "Nyheder og gode råd om elpriser og strømbesparelser",
  },
];

export const footerNav = {
  guides: [
    { label: "Sammenlign elpriser", href: "/sammenlign-elpriser" },
    { label: "Elpriser time for time", href: "/elpriser-time-for-time" },
    { label: "Spar på strøm", href: "/spar-paa-stroem" },
    { label: "Billigste elselskab", href: "/billigste-elselskab" },
    { label: "Blog", href: "/blog" },
  ],
  about: [
    { label: "Om os", href: "/om-os" },
    { label: "Kontakt", href: "/kontakt" },
    { label: "Privatlivspolitik", href: "/privatlivspolitik" },
    { label: "Ansvarsfraskrivelse", href: "/ansvarsfraskrivelse" },
  ],
};
