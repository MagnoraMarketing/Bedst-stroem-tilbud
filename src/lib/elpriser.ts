/**
 * Live day-ahead spot prices for DK1 (Vestdanmark) and DK2 (Østdanmark).
 *
 * Source: Energi Data Service (Energinet), dataset "DayAheadPrices".
 * https://www.energidataservice.dk/tso-electricity/DayAheadPrices
 *
 * The API is public and needs no API key. Since 1 October 2025 the Nordic
 * day-ahead market settles in 15-minute periods; we show the hourly average
 * (the arithmetic mean of the four quarters), which is what most consumers
 * relate to as "elpriser time for time". The raw resolution is preserved in
 * `resolutionMinutes` so the page can state it honestly.
 *
 * Prices from the API are DKK per MWh, excluding VAT, tariffs and taxes.
 * We convert to kr. per kWh (÷ 1000). Nothing here is cached outside Next's
 * fetch cache, and nothing is ever invented: if the API fails, the caller gets
 * `null` and must render an "unavailable" state.
 */

export const PRICE_AREAS = ["DK1", "DK2"] as const;
export type PriceArea = (typeof PRICE_AREAS)[number];

export const PRICE_AREA_LABELS: Record<PriceArea, string> = {
  DK1: "Vestdanmark (DK1)",
  DK2: "Østdanmark (DK2)",
};

export const SPOT_SOURCE = {
  name: "Energi Data Service (Energinet)",
  dataset: "DayAheadPrices",
  url: "https://www.energidataservice.dk/tso-electricity/DayAheadPrices",
  apiUrl: "https://api.energidataservice.dk/dataset/DayAheadPrices",
  license: "Energinets vilkår for Energi Data Service (fri brug med kildeangivelse)",
};

/** Danish VAT on electricity. */
export const MOMS = 0.25;

/** Revalidation window for spot price pages and fetches (seconds). */
export const SPOT_REVALIDATE_SECONDS = 900;

export type HourPrice = {
  /** Local Danish hour start, e.g. "2026-11-03T17:00" */
  hour: string;
  /** Hour of day 0–23 in Danish time */
  hourOfDay: number;
  /** Spot price, kr./kWh excl. VAT */
  price: number;
  /** Number of market periods averaged into this hour (4 for 15-min). */
  periods: number;
};

export type DayPrices = {
  /** Date in Danish time, "YYYY-MM-DD" */
  date: string;
  area: PriceArea;
  hours: HourPrice[];
  average: number;
  min: HourPrice;
  max: HourPrice;
};

export type SpotSnapshot = {
  fetchedAt: string;
  resolutionMinutes: number;
  today: Record<PriceArea, DayPrices | null>;
  tomorrow: Record<PriceArea, DayPrices | null>;
  /** Average over the last available 30 days per area (kr./kWh excl. VAT). */
  avg30d: Record<PriceArea, { average: number; days: number } | null>;
};

type ApiRecord = {
  TimeDK?: string;
  TimeUTC?: string;
  PriceArea?: string;
  DayAheadPriceDKK?: number | null;
  DayAheadPriceEUR?: number | null;
};

/** "YYYY-MM-DD" for a Date in Europe/Copenhagen. */
export function danishDate(d: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Copenhagen",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

function addDays(date: string, days: number): string {
  const d = new Date(`${date}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

function summarise(date: string, area: PriceArea, hours: HourPrice[]): DayPrices | null {
  // A day is only shown when it is complete (23–25 hours around DST shifts).
  if (hours.length < 23) return null;
  const sorted = [...hours].sort((a, b) => a.hour.localeCompare(b.hour));
  const average = sorted.reduce((s, h) => s + h.price, 0) / sorted.length;
  const min = sorted.reduce((m, h) => (h.price < m.price ? h : m), sorted[0]);
  const max = sorted.reduce((m, h) => (h.price > m.price ? h : m), sorted[0]);
  return { date, area, hours: sorted, average, min, max };
}

async function fetchRecords(start: string, end: string): Promise<ApiRecord[]> {
  const params = new URLSearchParams({
    start,
    end,
    filter: JSON.stringify({ PriceArea: [...PRICE_AREAS] }),
    sort: "TimeDK asc",
    columns: "TimeDK,PriceArea,DayAheadPriceDKK,DayAheadPriceEUR",
    limit: "10000",
  });
  const res = await fetch(`${SPOT_SOURCE.apiUrl}?${params}`, {
    next: { revalidate: SPOT_REVALIDATE_SECONDS },
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Energi Data Service svarede ${res.status}`);
  const json = (await res.json()) as { records?: ApiRecord[] };
  return json.records ?? [];
}

/**
 * Fetches today, tomorrow (when published, normally ~13:00) and a 30-day
 * history for DK1 and DK2. Returns null when the source is unreachable.
 */
export async function getSpotSnapshot(now = new Date()): Promise<SpotSnapshot | null> {
  const today = danishDate(now);
  const tomorrow = addDays(today, 1);
  const start = addDays(today, -30);
  const end = addDays(today, 2);

  let records: ApiRecord[];
  try {
    records = await fetchRecords(start, end);
  } catch (error) {
    console.error("[elpriser] Kunne ikke hente spotpriser:", error);
    return null;
  }
  if (records.length === 0) return null;

  // Group quarter-hours into hours per area.
  const buckets = new Map<string, { sum: number; n: number }>();
  let minStepMinutes = 60;
  const lastTime: Partial<Record<string, number>> = {};

  for (const r of records) {
    const area = r.PriceArea as PriceArea;
    if (!r.TimeDK || !PRICE_AREAS.includes(area)) continue;
    const dkk = r.DayAheadPriceDKK;
    if (typeof dkk !== "number" || Number.isNaN(dkk)) continue;

    const t = Date.parse(`${r.TimeDK}Z`);
    const prev = lastTime[area];
    if (prev !== undefined && t > prev) {
      minStepMinutes = Math.min(minStepMinutes, (t - prev) / 60000);
    }
    lastTime[area] = t;

    const hourKey = `${area}|${r.TimeDK.slice(0, 13)}:00`;
    const b = buckets.get(hourKey) ?? { sum: 0, n: 0 };
    b.sum += dkk / 1000; // DKK/MWh → kr./kWh
    b.n += 1;
    buckets.set(hourKey, b);
  }

  const byAreaDay = new Map<string, HourPrice[]>();
  for (const [key, { sum, n }] of buckets) {
    const [area, hour] = key.split("|");
    const date = hour.slice(0, 10);
    const list = byAreaDay.get(`${area}|${date}`) ?? [];
    list.push({ hour, hourOfDay: Number(hour.slice(11, 13)), price: sum / n, periods: n });
    byAreaDay.set(`${area}|${date}`, list);
  }

  const day = (area: PriceArea, date: string) =>
    summarise(date, area, byAreaDay.get(`${area}|${date}`) ?? []);

  const avg30d = (area: PriceArea) => {
    const days: DayPrices[] = [];
    for (let i = 1; i <= 30; i++) {
      const d = day(area, addDays(today, -i));
      if (d) days.push(d);
    }
    if (days.length === 0) return null;
    return {
      average: days.reduce((s, d) => s + d.average, 0) / days.length,
      days: days.length,
    };
  };

  const snapshot: SpotSnapshot = {
    fetchedAt: now.toISOString(),
    resolutionMinutes: minStepMinutes,
    today: { DK1: day("DK1", today), DK2: day("DK2", today) },
    tomorrow: { DK1: day("DK1", tomorrow), DK2: day("DK2", tomorrow) },
    avg30d: { DK1: avg30d("DK1"), DK2: avg30d("DK2") },
  };

  if (!snapshot.today.DK1 && !snapshot.today.DK2) return null;
  return snapshot;
}

/** Formats kr./kWh as Danish øre, e.g. 0.8234 → "82,3 øre". */
export function formatOre(krPerKwh: number, withMoms = false): string {
  const v = krPerKwh * (withMoms ? 1 + MOMS : 1) * 100;
  return `${v.toLocaleString("da-DK", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} øre`;
}

/** Formats kr./kWh, e.g. 0.8234 → "0,82 kr." */
export function formatKr(krPerKwh: number, withMoms = false): string {
  const v = krPerKwh * (withMoms ? 1 + MOMS : 1);
  return `${v.toLocaleString("da-DK", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} kr.`;
}

export function formatDanishDate(date: string): string {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("da-DK", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function formatDanishDateTime(iso: string): string {
  return new Date(iso).toLocaleString("da-DK", {
    timeZone: "Europe/Copenhagen",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function hourLabel(h: HourPrice): string {
  const start = String(h.hourOfDay).padStart(2, "0");
  const end = String((h.hourOfDay + 1) % 24).padStart(2, "0");
  return `${start}–${end}`;
}
