"use client";

import { useMemo, useState } from "react";
import { adjustForGauge, GaugeError } from "@/lib/gauge";

export function GaugeForm() {
  const [patternStitches, setPatternStitches] = useState("20");
  const [patternWidth, setPatternWidth] = useState("4");
  const [myStitches, setMyStitches] = useState("22");
  const [myWidth, setMyWidth] = useState("4");
  const [count, setCount] = useState("80");

  const outcome = useMemo(() => {
    try {
      const result = adjustForGauge({
        patternStitches: Number(patternStitches),
        patternWidth: Number(patternWidth),
        myStitches: Number(myStitches),
        myWidth: Number(myWidth),
        count: Number(count),
      });
      return { error: null as string | null, result };
    } catch (e) {
      return {
        error: e instanceof GaugeError ? e.message : "Couldn't compute that.",
        result: null,
      };
    }
  }, [patternStitches, patternWidth, myStitches, myWidth, count]);

  return (
    <div className="rounded-lg border border-gray-200 p-6">
      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        <fieldset className="space-y-2">
          <legend className="text-sm font-medium text-gray-700">Pattern&rsquo;s gauge</legend>
          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-600">Stitches</span>
            <input
              className="rounded border border-gray-300 px-3 py-2"
              value={patternStitches}
              onChange={(e) => setPatternStitches(e.target.value)}
              aria-label="Pattern gauge stitches"
              inputMode="decimal"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-600">Over this width (in or cm)</span>
            <input
              className="rounded border border-gray-300 px-3 py-2"
              value={patternWidth}
              onChange={(e) => setPatternWidth(e.target.value)}
              aria-label="Pattern gauge width"
              inputMode="decimal"
            />
          </label>
        </fieldset>

        <fieldset className="space-y-2">
          <legend className="text-sm font-medium text-gray-700">Your gauge</legend>
          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-600">Stitches</span>
            <input
              className="rounded border border-gray-300 px-3 py-2"
              value={myStitches}
              onChange={(e) => setMyStitches(e.target.value)}
              aria-label="Your gauge stitches"
              inputMode="decimal"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-600">
              Over the same width, same unit
            </span>
            <input
              className="rounded border border-gray-300 px-3 py-2"
              value={myWidth}
              onChange={(e) => setMyWidth(e.target.value)}
              aria-label="Your gauge width"
              inputMode="decimal"
            />
          </label>
        </fieldset>
      </div>

      <label className="mt-4 flex flex-col gap-1">
        <span className="text-sm text-gray-600">
          Stitch (or row) count the pattern tells you to use
        </span>
        <input
          className="w-40 rounded border border-gray-300 px-3 py-2"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          aria-label="Pattern count to adjust"
          inputMode="numeric"
        />
      </label>

      <div className="mt-6" data-testid="result">
        {outcome.error ? (
          <p className="text-red-600" role="alert">
            {outcome.error}
          </p>
        ) : (
          <>
            <p className="text-lg">
              Cast on / work{" "}
              <span className="font-semibold">{outcome.result!.adjustedCount}</span>{" "}
              instead of {count}.
            </p>
            <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm text-gray-700">
              {outcome.result!.steps.map((step, i) => (
                <li key={i} className="font-mono">
                  {step}
                </li>
              ))}
            </ol>
          </>
        )}
      </div>
    </div>
  );
}
