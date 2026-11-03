import Link from "next/link";
import { SPOT_SOURCE, formatDanishDateTime } from "@/lib/elpriser";

/**
 * Standard transparency box shown wherever we display price data: when it was
 * updated, where it comes from, how it is calculated and what it includes.
 */
export default function DataSourceNote({
  fetchedAt,
  resolutionMinutes,
}: {
  fetchedAt?: string;
  resolutionMinutes?: number;
}) {
  return (
    <aside
      aria-label="Om datagrundlaget"
      className="rounded-2xl border border-border bg-surface p-5 text-sm text-foreground/75"
    >
      <p className="font-display font-bold text-brand-navy">Om tallene</p>
      <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-[auto_1fr]">
        <dt className="font-semibold text-brand-navy">Seneste opdatering</dt>
        <dd>
          {fetchedAt ? (
            <time dateTime={fetchedAt}>{formatDanishDateTime(fetchedAt)}</time>
          ) : (
            "Data kunne ikke hentes ved seneste opdatering"
          )}{" "}
          (siden opdateres automatisk højst hvert 15. minut)
        </dd>
        <dt className="font-semibold text-brand-navy">Datakilde</dt>
        <dd>
          <a href={SPOT_SOURCE.url} target="_blank" rel="noopener" className="underline hover:text-brand-blue">
            {SPOT_SOURCE.name}, datasættet {SPOT_SOURCE.dataset}
          </a>{" "}
          – den officielle day-ahead-pris fra elbørsen for DK1 og DK2.
        </dd>
        <dt className="font-semibold text-brand-navy">Beregning</dt>
        <dd>
          Prisen omregnes fra kr./MWh til øre/kWh.
          {resolutionMinutes && resolutionMinutes < 60
            ? ` Markedet afregnes i ${resolutionMinutes}-minutters perioder; vi viser gennemsnittet af periodernes priser for hver time.`
            : " Vi viser prisen for hver time."}
        </dd>
        <dt className="font-semibold text-brand-navy">Inkluderer</dt>
        <dd>
          Kun selve spotprisen (engrosprisen). Moms kan slås til og fra. Elselskabets tillæg og
          abonnement, nettarif, Energinets tariffer og elafgift er <strong>ikke</strong> inkluderet.
        </dd>
      </dl>
      <p className="mt-3">
        Læs hele metoden i{" "}
        <Link href="/saadan-beregner-vi-elpriser" className="underline hover:text-brand-blue">
          Sådan beregner vi elpriser
        </Link>
        .
      </p>
    </aside>
  );
}
