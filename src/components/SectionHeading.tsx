export default function SectionHeading({
  eyebrow,
  title,
  lead,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-blue">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-2xl font-bold text-brand-navy sm:text-3xl">
        {title}
      </h2>
      {lead && <p className="mt-3 text-foreground/65">{lead}</p>}
    </div>
  );
}
