import { ChevronDownIcon } from "./icons";

export type FaqItem = {
  question: string;
  answer: string;
};

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-border rounded-2xl border border-border bg-white">
      {items.map((item) => (
        <details key={item.question} className="group p-5 sm:p-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display font-semibold text-brand-navy">
            {item.question}
            <ChevronDownIcon className="w-5 h-5 shrink-0 text-brand-blue transition-transform group-open:rotate-180" />
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-foreground/70">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
