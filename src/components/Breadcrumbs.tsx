import Link from "next/link";
import { siteConfig } from "@/lib/constants";
import JsonLd, { breadcrumbJsonLd } from "./JsonLd";

export type Crumb = { name: string; href: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Forside", href: "/" }, ...items];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(
          all.map((item) => ({
            name: item.name,
            url: `${siteConfig.url}${item.href}`,
          }))
        )}
      />
      <nav aria-label="Brødkrumme" className="text-sm text-foreground/60">
        <ol className="flex flex-wrap items-center gap-1.5">
          {all.map((item, index) => (
            <li key={item.href} className="flex items-center gap-1.5">
              {index > 0 && <span aria-hidden="true">/</span>}
              {index === all.length - 1 ? (
                <span className="text-foreground/80">{item.name}</span>
              ) : (
                <Link href={item.href} className="hover:text-brand-blue">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
