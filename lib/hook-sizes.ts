// Source: US labels are the Craft Yarn Council's own official hook chart
// (craftyarncouncil.com/standards/hooks-and-needles, verified directly by
// a domain-expert review 2026-09-08 -- see docs/domain-reference.md). UK
// old sizes have no official body and multiple community charts genuinely
// disagree (see docs/domain-reference.md); the UK column below uses the
// block every source checked agreed on (4.0-6.5mm and 8/9/10mm) plus a
// few well-corroborated outer values, left null elsewhere rather than
// guessing. Regular (non-steel/thread) hooks only.
//
// Corrected 2026-09-08 (previous version, sourced only from CrochetCalc,
// had two real errors the review caught): 9.0mm is US M/N-13, not M/13 --
// "M" and "N" are the same physical hook under two different brands'
// (Boye vs. Susan Bates) labeling conventions, and a hook actually
// labeled "N" exists at this size. Same issue at 10.0mm: US N/P-15, not
// N/15. Also added several mm rows that were missing entirely, which
// broke `findHookByUs`/`findHookByUk` for real, commonly-owned sizes
// (e.g. a 3.0mm or 11.5mm hook had no row to match at all).

export type HookSize = {
  mm: number;
  us: string | null;
  uk: string | null;
};

export const HOOK_SIZES: HookSize[] = [
  { mm: 2.0, us: null, uk: "14" },
  { mm: 2.25, us: "B/1", uk: "13" },
  { mm: 2.5, us: null, uk: "12" },
  { mm: 2.75, us: "C/2", uk: null },
  { mm: 3.0, us: null, uk: "11" },
  { mm: 3.25, us: "D/3", uk: "10" },
  { mm: 3.5, us: "E/4", uk: "9" },
  { mm: 3.75, us: "F/5", uk: null },
  { mm: 4.0, us: "G/6", uk: "8" },
  { mm: 4.5, us: "7", uk: "7" },
  { mm: 5.0, us: "H/8", uk: "6" },
  { mm: 5.5, us: "I/9", uk: "5" },
  { mm: 6.0, us: "J/10", uk: "4" },
  { mm: 6.5, us: "K/10.5", uk: "3" },
  { mm: 7.0, us: null, uk: "2" },
  { mm: 8.0, us: "L/11", uk: "0" },
  { mm: 9.0, us: "M/N-13", uk: "00" },
  { mm: 10.0, us: "N/P-15", uk: "000" },
  { mm: 11.5, us: "P-16", uk: null },
  { mm: 15.0, us: "P/Q", uk: null },
  { mm: 16.0, us: "Q", uk: null },
  { mm: 19.0, us: "S", uk: null },
  { mm: 25.0, us: "T/U/X", uk: null },
];

export type SizeMatch<T> = { size: T; exact: boolean };

export function findHookByMm(mm: number): SizeMatch<HookSize> {
  const exact = HOOK_SIZES.find((s) => s.mm === mm);
  if (exact) return { size: exact, exact: true };
  const nearest = HOOK_SIZES.reduce((best, s) =>
    Math.abs(s.mm - mm) < Math.abs(best.mm - mm) ? s : best
  );
  return { size: nearest, exact: false };
}

export function findHookByUs(us: string): HookSize | undefined {
  return HOOK_SIZES.find((s) => s.us === us.trim());
}

export function findHookByUk(uk: string): HookSize | undefined {
  return HOOK_SIZES.find((s) => s.uk === uk.trim());
}
