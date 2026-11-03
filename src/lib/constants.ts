export const siteConfig = {
  name: "Billigelrengning.dk",
  shortName: "Billigelrengning",
  description:
    "Sammenlign elpriser og indhent op til 3 skarpe tilbud på strøm fra danske elselskaber – gratis og uforpligtende.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.billigelrengning.dk",
  locale: "da_DK",
};

// Company behind the site (dataansvarlig). The CVR number is read from the
// environment so it is only shown once it has been entered – never a
// placeholder. Set NEXT_PUBLIC_COMPANY_CVR in Vercel.
export const companyInfo = {
  name: "Magnora Marketing",
  url: "https://magnoramarketing.dk",
  cvr: process.env.NEXT_PUBLIC_COMPANY_CVR || "",
};

// Partner-ads.com affiliate tracking link – all primary CTAs on the site point here.
export const AFFILIATE_URL =
  "https://www.partner-ads.com/dk/klikbanner.php?partnerid=52168&bannerid=112206";

// Google Analytics (gtag.js) measurement ID.
export const GA_MEASUREMENT_ID = "G-FJE2YES4Q3";

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
    { label: "Redaktionel politik", href: "/redaktionel-politik" },
    { label: "Sådan beregner vi elpriser", href: "/saadan-beregner-vi-elpriser" },
    { label: "Sådan tjener vi penge", href: "/saadan-tjener-vi-penge" },
    { label: "Kilder", href: "/kilder" },
    { label: "Kontakt", href: "/kontakt" },
    { label: "Privatlivspolitik", href: "/privatlivspolitik" },
    { label: "Ansvarsfraskrivelse", href: "/ansvarsfraskrivelse" },
  ],
};
