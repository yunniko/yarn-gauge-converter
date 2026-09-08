// Source: cross-checked against Sheep & Stitch's knitting needle conversion
// chart and the Craft Yarn Council's own official hooks-and-needles chart
// (craftyarncouncil.com/standards/hooks-and-needles, verified directly by
// a domain-expert review 2026-09-08 -- see docs/domain-reference.md). US
// and UK sizing run in opposite directions (US counts up with size, UK
// counts down), which is the single most common source of confusion this
// table exists to resolve.
//
// Corrected 2026-09-08: added the 1.5mm/1.75mm rows (US 000/00) that were
// missing entirely -- yarn-weights.ts recommends US 000-1 needles for
// category 0 (Lace), but this table started at US 0, so a lookup for the
// needle size that category's own recommendation names would fail. Also
// fixed a genuine cross-source disagreement at the top end: this file
// previously said 16.0mm = US 19 (following Vogue Knitting/Fabulous
// Yarn); CYC's own chart says 15.0mm = US 19 instead. Sources disagree
// here and there's no way to reconcile it into one number, so this now
// follows CYC (the one official standards body) rather than splitting
// the difference or keeping two rows that would both claim "19".

export type NeedleSize = {
  mm: number;
  us: string | null;
  uk: string | null;
};

export const NEEDLE_SIZES: NeedleSize[] = [
  { mm: 1.5, us: "000", uk: null },
  { mm: 1.75, us: "00", uk: null },
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
  { mm: 15.0, us: "19", uk: null },
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
