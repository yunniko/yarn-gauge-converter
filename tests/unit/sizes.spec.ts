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
