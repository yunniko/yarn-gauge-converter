import { describe, expect, it } from "vitest";
import { adjustForGauge, GaugeError } from "@/lib/gauge";

describe("adjustForGauge", () => {
  it("returns the same count when gauges match exactly", () => {
    const { adjustedCount, ratio } = adjustForGauge({
      patternStitches: 20,
      patternWidth: 4,
      myStitches: 20,
      myWidth: 4,
      count: 100,
    });
    expect(ratio).toBe(1);
    expect(adjustedCount).toBe(100);
  });

  it("scales up the count when your gauge is tighter (more stitches per unit)", () => {
    // Pattern: 20 sts/4in (5/unit). Mine: 22 sts/4in (5.5/unit) -- tighter.
    const { adjustedCount } = adjustForGauge({
      patternStitches: 20,
      patternWidth: 4,
      myStitches: 22,
      myWidth: 4,
      count: 100,
    });
    expect(adjustedCount).toBe(110);
  });

  it("scales down the count when your gauge is looser", () => {
    const { adjustedCount } = adjustForGauge({
      patternStitches: 20,
      patternWidth: 4,
      myStitches: 18,
      myWidth: 4,
      count: 100,
    });
    expect(adjustedCount).toBe(90);
  });

  it("works when the two swatches were measured over different widths, same unit", () => {
    // Pattern: 20 sts over 4in (5/in). Mine: 30 sts over 5in (6/in) -- tighter.
    const { adjustedCount } = adjustForGauge({
      patternStitches: 20,
      patternWidth: 4,
      myStitches: 30,
      myWidth: 5,
      count: 50,
    });
    expect(adjustedCount).toBe(60);
  });

  it("rounds to the nearest whole stitch", () => {
    const { adjustedCount } = adjustForGauge({
      patternStitches: 20,
      patternWidth: 4,
      myStitches: 21,
      myWidth: 4,
      count: 33,
    });
    // ratio = 1.05, 33 * 1.05 = 34.65 -> 35
    expect(adjustedCount).toBe(35);
  });

  it("produces explanatory steps", () => {
    const { steps } = adjustForGauge({
      patternStitches: 20,
      patternWidth: 4,
      myStitches: 22,
      myWidth: 4,
      count: 100,
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it.each([
    { patternStitches: 0 },
    { patternWidth: 0 },
    { myStitches: -1 },
    { myWidth: 0 },
    { count: 0 },
    { count: 1.5 },
  ])("rejects invalid input %j", (overrides) => {
    expect(() =>
      adjustForGauge({
        patternStitches: 20,
        patternWidth: 4,
        myStitches: 20,
        myWidth: 4,
        count: 100,
        ...overrides,
      })
    ).toThrow(GaugeError);
  });
});
