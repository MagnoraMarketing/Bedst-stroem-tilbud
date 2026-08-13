import Link from "next/link";
import { footerNav, siteConfig } from "@/lib/constants";
import Container from "./Container";
import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-border bg-surface">
      <Container className="py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-foreground/70">
              {siteConfig.description} Vi guider danskere gennem elmarkedet og
              hjælper dig videre til op til 3 skarpe tilbud fra danske
              elselskaber – helt gratis.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-brand-navy">
              Guides
            </h3>
            <ul className="mt-4 space-y-2">
              {footerNav.guides.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-foreground/70 hover:text-brand-blue"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-brand-navy">
              Om os
            </h3>
            <ul className="mt-4 space-y-2">
              {footerNav.about.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-foreground/70 hover:text-brand-blue"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-xs leading-relaxed text-foreground/50">
            {siteConfig.name} er en uafhængig markedsføringsside, der hjælper
            danskere videre til elprissammenligning og tilbudsindhentning via
            vores samarbejdspartner findelpriser.dk. Vi modtager provision, når
            du indgår en aftale via et link på siden – det koster ikke ekstra
            for dig, og vi er ikke selv et elselskab. Se{" "}
            <Link href="/ansvarsfraskrivelse" className="underline hover:text-brand-blue">
              ansvarsfraskrivelsen
            </Link>{" "}
            for flere detaljer.
          </p>
          <p className="mt-4 text-xs text-foreground/50">
            © {year} {siteConfig.name}. Alle rettigheder forbeholdes.
          </p>
        </div>
      </Container>
    </footer>
  );
}
