import { ReactNode } from "react";
import Container from "./Container";
import Breadcrumbs, { Crumb } from "./Breadcrumbs";

export default function PageHero({
  eyebrow,
  title,
  lead,
  breadcrumb,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  breadcrumb: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-border bg-gradient-to-b from-brand-sky to-white">
      <Container className="py-10 sm:py-14">
        <Breadcrumbs items={breadcrumb} />
        <div className="mt-4 max-w-3xl">
          {eyebrow && (
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-blue">
              {eyebrow}
            </p>
          )}
          <h1 className="font-display text-3xl font-bold text-brand-navy sm:text-4xl">
            {title}
          </h1>
          {lead && (
            <p className="mt-4 text-lg text-foreground/70">{lead}</p>
          )}
        </div>
        {children}
      </Container>
    </section>
  );
}
