import Link from "next/link";
import { ReactNode } from "react";
import { ArrowRightIcon } from "./icons";

export function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-sky text-brand-blue">
        {icon}
      </div>
      <h3 className="mt-4 font-display font-bold text-brand-navy">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground/65">{description}</p>
    </div>
  );
}

export function LinkFeatureCard({
  icon,
  title,
  description,
  href,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-2xl border border-border bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-sky text-brand-blue">
        {icon}
      </div>
      <h3 className="mt-4 font-display font-bold text-brand-navy group-hover:text-brand-blue">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground/65">{description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue">
        Læs mere
        <ArrowRightIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

export function StepCard({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <div className="relative rounded-2xl border border-border bg-white p-6">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-navy font-display text-sm font-bold text-white">
        {number}
      </span>
      <h3 className="mt-4 font-display font-bold text-brand-navy">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground/65">{description}</p>
    </div>
  );
}

export function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 text-center">
      <p className="font-display text-3xl font-bold text-brand-blue">{value}</p>
      <p className="mt-1 text-sm text-foreground/65">{label}</p>
    </div>
  );
}
