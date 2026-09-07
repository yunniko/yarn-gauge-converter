// Source: cross-checked against CrochetCalc's hook size converter and two
// independent worked examples (US H-8 = UK 6 = 5.0mm; US J-10 = UK 4 = 6.0mm)
// that both matched this table (retrieved 2026-09-07). Regular (non-steel/
// thread) hooks only.

export type HookSize = {
  mm: number;
  us: string | null;
  uk: string | null;
};

export const HOOK_SIZES: HookSize[] = [
  { mm: 2.0, us: null, uk: "14" },
  { mm: 2.25, us: "B/1", uk: "13" },
  { mm: 2.75, us: "C/2", uk: "12" },
  { mm: 3.25, us: "D/3", uk: "10" },
  { mm: 3.5, us: "E/4", uk: "9" },
  { mm: 3.75, us: "F/5", uk: null },
  { mm: 4.0, us: "G/6", uk: "8" },
  { mm: 4.5, us: "7", uk: "7" },
  { mm: 5.0, us: "H/8", uk: "6" },
  { mm: 5.5, us: "I/9", uk: "5" },
  { mm: 6.0, us: "J/10", uk: "4" },
  { mm: 6.5, us: "K/10.5", uk: "3" },
  { mm: 8.0, us: "L/11", uk: "0" },
  { mm: 9.0, us: "M/13", uk: "00" },
  { mm: 10.0, us: "N/15", uk: "000" },
  { mm: 15.0, us: "P/Q", uk: null },
  { mm: 19.0, us: "S", uk: null },
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
