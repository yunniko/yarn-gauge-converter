import { describe, expect, it } from "vitest";
import { findHookByMm, findHookByUk, findHookByUs, HOOK_SIZES } from "@/lib/hook-sizes";
import { findNeedleByMm, findNeedleByUk, findNeedleByUs, NEEDLE_SIZES } from "@/lib/needle-sizes";
import { findYarnWeightByCategory, YARN_WEIGHTS } from "@/lib/yarn-weights";

describe("hook sizes", () => {
  it("finds an exact mm match", () => {
    const { size, exact } = findHookByMm(5.0);
    expect(exact).toBe(true);
    expect(size.us).toBe("H/8");
    expect(size.uk).toBe("6");
  });

  it("cross-checks a known conversion: US J/10 = UK 4 = 6.0mm", () => {
    const size = findHookByUs("J/10");
    expect(size?.mm).toBe(6.0);
    expect(size?.uk).toBe("4");
  });

  it("finds the nearest size for an off-chart mm value", () => {
    const { size, exact } = findHookByMm(5.1);
    expect(exact).toBe(false);
    expect(size.mm).toBe(5.0);
  });

  it("finds by UK size, distinguishing 0 / 00 / 000", () => {
    expect(findHookByUk("0")?.mm).toBe(8.0);
    expect(findHookByUk("00")?.mm).toBe(9.0);
    expect(findHookByUk("000")?.mm).toBe(10.0);
  });

  it("has every table row internally consistent (mm ascending)", () => {
    for (let i = 1; i < HOOK_SIZES.length; i++) {
      expect(HOOK_SIZES[i].mm).toBeGreaterThan(HOOK_SIZES[i - 1].mm);
    }
  });

  it("uses the CYC-corrected dual-brand US labels at 9mm and 10mm", () => {
    // A domain-expert review (2026-09-08) found the previous single-letter
    // labels (M/13, N/15) were wrong per the Craft Yarn Council's own
    // chart - M and N are the same physical size under different brands'
    // (Boye vs. Susan Bates) conventions, and both letters are real.
    expect(findHookByMm(9.0).size.us).toBe("M/N-13");
    expect(findHookByMm(10.0).size.us).toBe("N/P-15");
  });

  it("resolves previously-missing common sizes (2.5, 3.0, 7.0, 11.5, 16, 25mm)", () => {
    // These mm values had no row at all before the 2026-09-08 review,
    // so a lookup for e.g. a real UK-11 (3.0mm) or UK-2 (7.0mm) hook
    // silently fell back to an inexact nearest match.
    expect(findHookByMm(2.5).exact).toBe(true);
    expect(findHookByUk("11")?.mm).toBe(3.0);
    expect(findHookByUk("2")?.mm).toBe(7.0);
    expect(findHookByUs("P-16")?.mm).toBe(11.5);
    expect(findHookByUs("Q")?.mm).toBe(16.0);
    expect(findHookByUs("T/U/X")?.mm).toBe(25.0);
  });
});

describe("needle sizes", () => {
  it("finds an exact mm match", () => {
    const { size, exact } = findNeedleByMm(4.0);
    expect(exact).toBe(true);
    expect(size.us).toBe("6");
    expect(size.uk).toBe("8");
  });

  it("distinguishes UK 0 / 00 / 000", () => {
    expect(findNeedleByUk("0")?.mm).toBe(8.0);
    expect(findNeedleByUk("00")?.mm).toBe(9.0);
    expect(findNeedleByUk("000")?.mm).toBe(10.0);
  });

  it("finds by US size", () => {
    expect(findNeedleByUs("10.5")?.uk).toBe("3");
  });

  it("has every table row internally consistent (mm ascending)", () => {
    for (let i = 1; i < NEEDLE_SIZES.length; i++) {
      expect(NEEDLE_SIZES[i].mm).toBeGreaterThan(NEEDLE_SIZES[i - 1].mm);
    }
  });

  it("resolves US 000/00 needles, matching yarn-weights.ts's own Lace recommendation", () => {
    // These rows were missing entirely before the 2026-09-08 review, even
    // though lib/yarn-weights.ts recommends "US 000-1" for category 0.
    expect(findNeedleByUs("000")?.mm).toBe(1.5);
    expect(findNeedleByUs("00")?.mm).toBe(1.75);
  });

  it("follows the Craft Yarn Council's own chart at the top end (15mm = US 19)", () => {
    // A domain-expert review found this file previously said 16mm = US 19,
    // following a different (non-CYC) source; CYC's own chart says 15mm.
    expect(findNeedleByUs("19")?.mm).toBe(15.0);
  });
});

describe("yarn weights", () => {
  it("has exactly the 8 CYC categories, 0 through 7", () => {
    expect(YARN_WEIGHTS.map((w) => w.category)).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
  });

  it("finds a category by number", () => {
    const dk = findYarnWeightByCategory(3);
    expect(dk?.usName).toBe("Light");
    expect(dk?.ukAu).toContain("DK");
  });

  it("returns undefined for an out-of-range category", () => {
    expect(findYarnWeightByCategory(9)).toBeUndefined();
  });
});
