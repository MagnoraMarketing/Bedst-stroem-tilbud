"use client";

import { useState } from "react";
import {
  MOMS,
  PRICE_AREA_LABELS,
  PRICE_AREAS,
  type DayPrices,
  type PriceArea,
  type SpotSnapshot,
} from "@/lib/elpriser";

const fmt = (krPerKwh: number, moms: boolean) =>
  (krPerKwh * (moms ? 1 + MOMS : 1) * 100).toLocaleString("da-DK", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

const label = (h: number) =>
  `${String(h).padStart(2, "0")}–${String((h + 1) % 24).padStart(2, "0")}`;

function DayTable({ day, moms, title }: { day: DayPrices; moms: boolean; title: string }) {
  const max = Math.max(...day.hours.map((h) => Math.max(h.price, 0)), 0.0001);
  const cheapest = new Set(
    [...day.hours].sort((a, b) => a.price - b.price).slice(0, 4).map((h) => h.hour)
  );

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-lg font-bold text-brand-navy">{title}</h3>
        <p className="text-sm text-foreground/60">
          Gns. <strong className="text-brand-navy">{fmt(day.average, moms)} øre</strong> ·
          Lavest {fmt(day.min.price, moms)} · Højest {fmt(day.max.price, moms)}
        </p>
      </div>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[420px] border-collapse text-sm">
          <caption className="sr-only">
            {title}: spotpris pr. time i øre/kWh {moms ? "inkl." : "ekskl."} moms
          </caption>
          <thead>
            <tr className="bg-surface text-left text-brand-navy">
              <th scope="col" className="px-3 py-2 font-display font-bold">Time</th>
              <th scope="col" className="px-3 py-2 font-display font-bold text-right">
                Øre/kWh
              </th>
              <th scope="col" className="w-1/2 px-3 py-2">
                <span className="sr-only">Niveau</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {day.hours.map((h, i) => {
              const isCheap = cheapest.has(h.hour);
              const isMax = h.hour === day.max.hour;
              return (
                <tr key={`${h.hour}-${i}`} className={isCheap ? "bg-success-light/60" : undefined}>
                  <td className="px-3 py-1.5 tabular-nums text-brand-navy">
                    {label(h.hourOfDay)}
                    {isCheap && (
                      <span className="ml-2 rounded-full bg-success/15 px-2 py-0.5 text-[11px] font-semibold text-success">
                        billig
                      </span>
                    )}
                    {isMax && (
                      <span className="ml-2 rounded-full bg-accent/30 px-2 py-0.5 text-[11px] font-semibold text-accent-foreground">
                        dyrest
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-1.5 text-right font-semibold tabular-nums text-brand-navy">
                    {fmt(h.price, moms)}
                  </td>
                  <td className="px-3 py-1.5">
                    <div className="h-2 w-full rounded-full bg-surface" aria-hidden="true">
                      <div
                        className={`h-2 rounded-full ${
                          isCheap ? "bg-success" : h.price >= day.average ? "bg-accent-dark" : "bg-brand-blue"
                        }`}
                        style={{ width: `${Math.max(2, (Math.max(h.price, 0) / max) * 100)}%` }}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function SpotPriceBoard({ snapshot }: { snapshot: SpotSnapshot }) {
  const [area, setArea] = useState<PriceArea>(snapshot.today.DK2 && !snapshot.today.DK1 ? "DK2" : "DK1");
  const [moms, setMoms] = useState(true);
  const [day, setDay] = useState<"today" | "tomorrow">("today");

  const hasTomorrow = Boolean(snapshot.tomorrow[area]);
  const current = day === "tomorrow" && hasTomorrow ? snapshot.tomorrow[area] : snapshot.today[area];

  const btn = (active: boolean) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
      active ? "bg-brand-navy text-white" : "bg-white text-brand-navy ring-1 ring-border hover:bg-surface"
    }`;

  return (
    <div className="rounded-2xl border border-border bg-white p-5 sm:p-8">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Vælg prisområde">
        {PRICE_AREAS.map((a) => (
          <button key={a} type="button" aria-pressed={area === a} className={btn(area === a)} onClick={() => setArea(a)}>
            {PRICE_AREA_LABELS[a]}
          </button>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <div className="flex gap-2" role="group" aria-label="Vælg dag">
          <button type="button" aria-pressed={day === "today"} className={btn(day === "today")} onClick={() => setDay("today")}>
            I dag
          </button>
          <button
            type="button"
            aria-pressed={day === "tomorrow"}
            disabled={!hasTomorrow}
            title={hasTomorrow ? undefined : "Morgendagens priser offentliggøres normalt omkring kl. 13"}
            className={`${btn(day === "tomorrow")} disabled:cursor-not-allowed disabled:opacity-50`}
            onClick={() => setDay("tomorrow")}
          >
            I morgen
          </button>
        </div>
        <label className="ml-auto flex cursor-pointer items-center gap-2 text-sm text-foreground/75">
          <input type="checkbox" checked={moms} onChange={(e) => setMoms(e.target.checked)} className="h-4 w-4 accent-brand-blue" />
          Vis inkl. 25 % moms
        </label>
      </div>

      <div className="mt-6">
        {current ? (
          <DayTable
            day={current}
            moms={moms}
            title={`${PRICE_AREA_LABELS[area]} – ${day === "tomorrow" && hasTomorrow ? "i morgen" : "i dag"}`}
          />
        ) : (
          <p className="text-sm text-foreground/70">Der er endnu ingen komplette priser for dette prisområde.</p>
        )}
      </div>
      {!hasTomorrow && (
        <p className="mt-3 text-xs text-foreground/55">
          Morgendagens spotpriser er ikke offentliggjort endnu – de kommer normalt omkring kl. 13.
        </p>
      )}
      <p className="mt-4 text-xs text-foreground/55">
        Viser kun selve spotprisen {moms ? "inkl." : "ekskl."} moms. Elselskabets tillæg, nettarif,
        Energinets tariffer og elafgift kommer oven i. Grøn markering = dagens 4 billigste timer.
      </p>
    </div>
  );
}
