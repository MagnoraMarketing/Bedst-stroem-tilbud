import CtaButton from "./CtaButton";
import { CheckIcon } from "./icons";

type Props = {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  compact?: boolean;
  className?: string;
};

const defaultPoints = ["100% gratis", "Uforpligtende", "Svar inden for få minutter"];

export default function CtaBanner({
  title = "Få op til 3 skarpe tilbud på strøm",
  subtitle = "Sammenlign priser fra danske elselskaber og find den elaftale, der passer til dit forbrug.",
  buttonText = "Hent mine gratis tilbud",
  compact = false,
  className = "",
}: Props) {
  if (compact) {
    return (
      <div
        className={`flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-border bg-brand-sky px-6 py-5 ${className}`}
      >
        <div>
          <p className="font-display font-bold text-brand-navy">{title}</p>
          <p className="text-sm text-foreground/70">{subtitle}</p>
        </div>
        <CtaButton size="md" className="shrink-0">
          {buttonText}
        </CtaButton>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-navy via-brand-navy to-brand-blue px-6 py-10 sm:px-12 sm:py-14 text-center ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-brand-blue-light/30 blur-3xl"
      />
      <div className="relative">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">{title}</h2>
        <p className="mx-auto mt-3 max-w-xl text-white/80">{subtitle}</p>
        <div className="mt-7 flex justify-center">
          <CtaButton size="lg">{buttonText}</CtaButton>
        </div>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/85">
          {defaultPoints.map((point) => (
            <li key={point} className="flex items-center gap-1.5">
              <CheckIcon className="w-4 h-4 text-accent" />
              {point}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-xs text-white/50">
          Annonce – vi samarbejder med findelpriser.dk og modtager provision, hvis du
          indgår en aftale via linket. Det koster ikke ekstra for dig.
        </p>
      </div>
    </div>
  );
}
