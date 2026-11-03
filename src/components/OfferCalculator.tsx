"use client";

import { useId, useMemo, useState } from "react";
import { MOMS, PRICE_AREA_LABELS, type PriceArea } from "@/lib/elpriser";

type Offer = {
  name: string;
  type: "spot" | "fast";
  /** Spot products: elselskabets tillæg i øre/kWh inkl. moms. Fixed: kWh-pris i øre inkl. moms. */
  kwhOre: string;
  /** Abonnement kr./md. inkl. moms */
  subscription: string;
  /** Øvrige faste gebyrer kr./år (fx betalingsgebyr, papirfaktura) */
  fees: string;
  /** Introrabat i kr. det første år (engangsbeløb) */
  intro: string;
  bindingMonths: string;
  payment: "betalingsservice" | "kort" | "faktura" | "andet";
};

const emptyOffer = (name: string): Offer => ({
  name,
  type: "spot",
  kwhOre: "",
  subscription: "",
  fees: "",
  intro: "",
  bindingMonths: "0",
  payment: "betalingsservice",
});

const num = (v: string) => {
  const n = Number(v.replace(",", "."));
  return Number.isFinite(n) ? n : 0;
};

const kr = (v: number) =>
  `${Math.round(v).toLocaleString("da-DK")} kr.`;

export default function OfferCalculator({
  avgSpot,
}: {
  /** 30-day average spot price per area, kr./kWh excl. VAT (null when unavailable) */
  avgSpot: Record<PriceArea, number | null>;
}) {
  const id = useId();
  const [area, setArea] = useState<PriceArea>("DK1");
  const [usage, setUsage] = useState("4000");
  const live = avgSpot[area];
  const [spotOverride, setSpotOverride] = useState("");
  const [offers, setOffers] = useState<Offer[]>([emptyOffer("Tilbud A"), emptyOffer("Tilbud B")]);

  const spotInclMomsOre =
    spotOverride !== "" ? num(spotOverride) : live !== null ? live * (1 + MOMS) * 100 : 0;

  const results = useMemo(() => {
    const kwh = num(usage);
    return offers.map((o) => {
      const energyOre = o.type === "spot" ? spotInclMomsOre + num(o.kwhOre) : num(o.kwhOre);
      const energy = (energyOre / 100) * kwh;
      const fixed = num(o.subscription) * 12 + num(o.fees);
      const firstYear = energy + fixed - num(o.intro);
      const ongoing = energy + fixed;
      const filled = o.kwhOre !== "" || o.subscription !== "";
      return { offer: o, energy, fixed, firstYear, ongoing, filled };
    });
  }, [offers, usage, spotInclMomsOre]);

  const filled = results.filter((r) => r.filled);
  const cheapestOngoing = filled.length > 1 ? Math.min(...filled.map((r) => r.ongoing)) : null;

  const update = (i: number, patch: Partial<Offer>) =>
    setOffers((prev) => prev.map((o, j) => (j === i ? { ...o, ...patch } : o)));

  const input =
    "mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-brand-navy focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20";
  const lbl = "block text-xs font-semibold text-brand-navy";

  return (
    <div className="rounded-2xl border border-border bg-white p-5 sm:p-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor={`${id}-area`} className={lbl}>Prisområde</label>
          <select id={`${id}-area`} className={input} value={area} onChange={(e) => setArea(e.target.value as PriceArea)}>
            <option value="DK1">{PRICE_AREA_LABELS.DK1}</option>
            <option value="DK2">{PRICE_AREA_LABELS.DK2}</option>
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-usage`} className={lbl}>Årligt forbrug (kWh)</label>
          <input id={`${id}-usage`} inputMode="numeric" className={input} value={usage} onChange={(e) => setUsage(e.target.value)} />
          <p className="mt-1 text-[11px] text-foreground/55">Står på din elregning eller hos dit netselskab.</p>
        </div>
        <div>
          <label htmlFor={`${id}-spot`} className={lbl}>Spotpris, øre/kWh inkl. moms</label>
          <input
            id={`${id}-spot`}
            inputMode="decimal"
            className={input}
            placeholder={live !== null ? (live * (1 + MOMS) * 100).toFixed(1) : "Indtast selv"}
            value={spotOverride}
            onChange={(e) => setSpotOverride(e.target.value)}
          />
          <p className="mt-1 text-[11px] text-foreground/55">
            {live !== null
              ? "Forudfyldt med 30-dages gennemsnit fra Energinet. Du kan overskrive den."
              : "Live-data er ikke tilgængelig lige nu – indtast en spotpris."}
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {offers.map((o, i) => (
          <fieldset key={i} className="rounded-xl border border-border p-4">
            <legend className="px-1 font-display text-sm font-bold text-brand-navy">
              <input
                aria-label="Navn på tilbud"
                className="w-40 rounded border border-transparent px-1 hover:border-border focus:border-brand-blue focus:outline-none"
                value={o.name}
                onChange={(e) => update(i, { name: e.target.value })}
              />
            </legend>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label htmlFor={`${id}-${i}-type`} className={lbl}>Produkttype</label>
                <select id={`${id}-${i}-type`} className={input} value={o.type} onChange={(e) => update(i, { type: e.target.value as Offer["type"] })}>
                  <option value="spot">Variabel / spotpris + tillæg</option>
                  <option value="fast">Fastpris pr. kWh</option>
                </select>
              </div>
              <div>
                <label htmlFor={`${id}-${i}-kwh`} className={lbl}>
                  {o.type === "spot" ? "Spottillæg, øre/kWh" : "Fast kWh-pris, øre"}
                </label>
                <input id={`${id}-${i}-kwh`} inputMode="decimal" className={input} value={o.kwhOre} onChange={(e) => update(i, { kwhOre: e.target.value })} />
              </div>
              <div>
                <label htmlFor={`${id}-${i}-sub`} className={lbl}>Abonnement, kr./md.</label>
                <input id={`${id}-${i}-sub`} inputMode="decimal" className={input} value={o.subscription} onChange={(e) => update(i, { subscription: e.target.value })} />
              </div>
              <div>
                <label htmlFor={`${id}-${i}-fees`} className={lbl}>Andre gebyrer, kr./år</label>
                <input id={`${id}-${i}-fees`} inputMode="decimal" className={input} value={o.fees} onChange={(e) => update(i, { fees: e.target.value })} />
              </div>
              <div>
                <label htmlFor={`${id}-${i}-intro`} className={lbl}>Introrabat, kr. (1. år)</label>
                <input id={`${id}-${i}-intro`} inputMode="decimal" className={input} value={o.intro} onChange={(e) => update(i, { intro: e.target.value })} />
              </div>
              <div>
                <label htmlFor={`${id}-${i}-binding`} className={lbl}>Binding, måneder</label>
                <input id={`${id}-${i}-binding`} inputMode="numeric" className={input} value={o.bindingMonths} onChange={(e) => update(i, { bindingMonths: e.target.value })} />
              </div>
              <div>
                <label htmlFor={`${id}-${i}-pay`} className={lbl}>Betalingsform</label>
                <select id={`${id}-${i}-pay`} className={input} value={o.payment} onChange={(e) => update(i, { payment: e.target.value as Offer["payment"] })}>
                  <option value="betalingsservice">Betalingsservice</option>
                  <option value="kort">Kort</option>
                  <option value="faktura">Faktura</option>
                  <option value="andet">Andet</option>
                </select>
              </div>
            </div>
          </fieldset>
        ))}
      </div>

      {offers.length < 3 && (
        <button
          type="button"
          onClick={() => setOffers((prev) => [...prev, emptyOffer(`Tilbud ${String.fromCharCode(65 + prev.length)}`)])}
          className="mt-4 text-sm font-semibold text-brand-blue hover:underline"
        >
          + Tilføj et tilbud mere
        </button>
      )}

      <div className="mt-6 overflow-x-auto rounded-xl border border-border" aria-live="polite">
        <table className="w-full min-w-[520px] border-collapse text-sm">
          <thead>
            <tr className="bg-surface text-left text-brand-navy">
              <th scope="col" className="px-3 py-2 font-display">Tilbud</th>
              <th scope="col" className="px-3 py-2 text-right font-display">Strøm</th>
              <th scope="col" className="px-3 py-2 text-right font-display">Faste beløb</th>
              <th scope="col" className="px-3 py-2 text-right font-display">1. år</th>
              <th scope="col" className="px-3 py-2 text-right font-display">Efterfølgende år</th>
              <th scope="col" className="px-3 py-2 font-display">Binding · betaling</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {results.map((r, i) => (
              <tr key={i} className={cheapestOngoing !== null && r.filled && r.ongoing === cheapestOngoing ? "bg-success-light/60" : undefined}>
                <td className="px-3 py-2 font-semibold text-brand-navy">{r.offer.name}</td>
                <td className="px-3 py-2 text-right tabular-nums">{r.filled ? kr(r.energy) : "–"}</td>
                <td className="px-3 py-2 text-right tabular-nums">{r.filled ? kr(r.fixed) : "–"}</td>
                <td className="px-3 py-2 text-right tabular-nums">{r.filled ? kr(r.firstYear) : "–"}</td>
                <td className="px-3 py-2 text-right font-semibold tabular-nums text-brand-navy">
                  {r.filled ? kr(r.ongoing) : "–"}
                </td>
                <td className="px-3 py-2">
                  {num(r.offer.bindingMonths) > 0 ? `${num(r.offer.bindingMonths)} md.` : "Ingen"} · {r.offer.payment}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-foreground/60">
        Beregningen viser kun den del af elregningen, der afhænger af elselskabet: (spotpris + tillæg) × forbrug
        + abonnement × 12 + gebyrer, alt inkl. moms. Nettarif, Energinets tariffer og elafgift er ens uanset
        elselskab og er derfor udeladt. Spotprisen svinger – et historisk gennemsnit er ikke en garanti for
        fremtidige priser. Grøn række = lavest pris efter introperioden. Indtast tal fra elselskabernes egne
        prisblade; vi gemmer ikke dine tal.
      </p>
    </div>
  );
}
