export class GaugeError extends Error {}

export type GaugeInput = {
  patternStitches: number;
  patternWidth: number;
  myStitches: number;
  myWidth: number;
  count: number;
};

export type GaugeResult = {
  adjustedCount: number;
  ratio: number;
  steps: string[];
};

function assertPositive(value: number, label: string): void {
  if (!Number.isFinite(value) || value <= 0) {
    throw new GaugeError(`${label} must be a positive number.`);
  }
}

/**
 * Rescales a stitch or row count from a pattern's stated gauge to your own
 * measured gauge. Works for either stitches or rows -- the math is
 * identical, only the swatch measurement's units need to match between the
 * pattern gauge and your gauge (inches vs inches, or cm vs cm; the absolute
 * unit cancels out of the ratio, so it doesn't need to be specified).
 */
export function adjustForGauge(input: GaugeInput): GaugeResult {
  assertPositive(input.patternStitches, "Pattern gauge stitch count");
  assertPositive(input.patternWidth, "Pattern gauge swatch width");
  assertPositive(input.myStitches, "Your gauge stitch count");
  assertPositive(input.myWidth, "Your gauge swatch width");
  if (!Number.isFinite(input.count) || input.count <= 0 || !Number.isInteger(input.count)) {
    throw new GaugeError("The count to adjust must be a positive whole number.");
  }

  const patternDensity = input.patternStitches / input.patternWidth;
  const myDensity = input.myStitches / input.myWidth;
  const ratio = myDensity / patternDensity;
  const adjustedExact = input.count * ratio;
  const adjustedCount = Math.round(adjustedExact);

  const steps = [
    `Pattern density: ${input.patternStitches} ÷ ${input.patternWidth} = ${round(patternDensity)} per unit`,
    `Your density: ${input.myStitches} ÷ ${input.myWidth} = ${round(myDensity)} per unit`,
    `Ratio (yours ÷ pattern's): ${round(myDensity)} ÷ ${round(patternDensity)} = ${round(ratio)}`,
    `Adjusted count: ${input.count} × ${round(ratio)} = ${round(adjustedExact)} → rounded to ${adjustedCount}`,
  ];

  return { adjustedCount, ratio, steps };
}

function round(n: number): number {
  return Math.round(n * 1000) / 1000;
}
