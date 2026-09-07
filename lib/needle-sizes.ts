// Source: cross-checked against Sheep & Stitch's knitting needle conversion
// chart and the Craft Yarn Council's needle recommendations by yarn weight
// (retrieved 2026-09-07). US and UK sizing run in opposite directions (US
// counts up with size, UK counts down), which is the single most common
// source of confusion this table exists to resolve.

export type NeedleSize = {
  mm: number;
  us: string | null;
  uk: string | null;
};

export const NEEDLE_SIZES: NeedleSize[] = [
  { mm: 2.0, us: "0", uk: "14" },
  { mm: 2.25, us: "1", uk: "13" },
  { mm: 2.5, us: "1.5", uk: null },
  { mm: 2.75, us: "2", uk: "12" },
  { mm: 3.0, us: "2.5", uk: "11" },
  { mm: 3.25, us: "3", uk: "10" },
  { mm: 3.5, us: "4", uk: null },
  { mm: 3.75, us: "5", uk: "9" },
  { mm: 4.0, us: "6", uk: "8" },
  { mm: 4.5, us: "7", uk: "7" },
  { mm: 5.0, us: "8", uk: "6" },
  { mm: 5.5, us: "9", uk: "5" },
  { mm: 6.0, us: "10", uk: "4" },
  { mm: 6.5, us: "10.5", uk: "3" },
  { mm: 7.0, us: null, uk: "2" },
  { mm: 7.5, us: null, uk: "1" },
  { mm: 8.0, us: "11", uk: "0" },
  { mm: 9.0, us: "13", uk: "00" },
  { mm: 10.0, us: "15", uk: "000" },
  { mm: 12.75, us: "17", uk: null },
  { mm: 16.0, us: "19", uk: null },
  { mm: 19.0, us: "35", uk: null },
  { mm: 20.0, us: "36", uk: null },
  { mm: 25.0, us: "50", uk: null },
];

export type SizeMatch<T> = { size: T; exact: boolean };

export function findNeedleByMm(mm: number): SizeMatch<NeedleSize> {
  const exact = NEEDLE_SIZES.find((s) => s.mm === mm);
  if (exact) return { size: exact, exact: true };
  const nearest = NEEDLE_SIZES.reduce((best, s) =>
    Math.abs(s.mm - mm) < Math.abs(best.mm - mm) ? s : best
  );
  return { size: nearest, exact: false };
}

export function findNeedleByUs(us: string): NeedleSize | undefined {
  return NEEDLE_SIZES.find((s) => s.us === us.trim());
}

export function findNeedleByUk(uk: string): NeedleSize | undefined {
  return NEEDLE_SIZES.find((s) => s.uk === uk.trim());
}
