"use client";

import { useMemo, useState } from "react";
import { findHookByMm } from "@/lib/hook-sizes";
import { findNeedleByMm } from "@/lib/needle-sizes";

type Size = { mm: number; us: string | null; uk: string | null };

// A function prop can't cross the server/client boundary (Next.js server
// components can't pass functions to client components), so this picks the
// right pure lib function itself from a plain string discriminant instead.
const FINDERS = { hook: findHookByMm, needle: findNeedleByMm } as const;

export function SizeConverterForm<T extends Size>({
  sizes,
  itemLabel,
  kind,
}: {
  sizes: T[];
  itemLabel: string;
  kind: keyof typeof FINDERS;
}) {
  const findByMm = FINDERS[kind] as (mm: number) => { size: T; exact: boolean };
  const [mmInput, setMmInput] = useState(String(sizes[Math.floor(sizes.length / 2)].mm));

  const outcome = useMemo(() => {
    const parsed = Number(mmInput);
    if (mmInput.trim() === "" || !Number.isFinite(parsed) || parsed <= 0) {
      return { error: "Enter a metric size in mm (e.g. 4 or 4.5).", match: null };
    }
    return { error: null, match: findByMm(parsed) };
  }, [mmInput, findByMm]);

  return (
    <div className="rounded-lg border border-gray-200 p-6">
      <div className="flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Metric size (mm)</span>
          <input
            className="w-32 rounded border border-gray-300 px-3 py-2"
            value={mmInput}
            onChange={(e) => setMmInput(e.target.value)}
            aria-label="Metric size in mm"
            inputMode="decimal"
          />
        </label>

        <span className="text-sm text-gray-500">or pick a {itemLabel} size:</span>
        <select
          className="rounded border border-gray-300 px-3 py-2"
          aria-label={`Pick a ${itemLabel} size`}
          value={outcome.match?.exact ? String(outcome.match.size.mm) : ""}
          onChange={(e) => setMmInput(e.target.value)}
        >
          <option value="" disabled>
            Choose...
          </option>
          {sizes.map((s) => (
            <option key={s.mm} value={s.mm}>
              {s.mm} mm{s.us ? ` — US ${s.us}` : ""}
              {s.uk ? ` — UK ${s.uk}` : ""}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6" data-testid="result">
        {outcome.error ? (
          <p className="text-red-600" role="alert">
            {outcome.error}
          </p>
        ) : (
          <div>
            {!outcome.match!.exact && (
              <p className="mb-2 text-sm text-amber-700">
                No exact standard size at that measurement — showing the nearest
                one ({outcome.match!.size.mm} mm).
              </p>
            )}
            <dl className="grid grid-cols-3 gap-4 text-center">
              <div className="rounded bg-gray-50 p-4">
                <dt className="text-xs uppercase text-gray-500">Metric</dt>
                <dd className="text-xl font-semibold">{outcome.match!.size.mm} mm</dd>
              </div>
              <div className="rounded bg-gray-50 p-4">
                <dt className="text-xs uppercase text-gray-500">US</dt>
                <dd className="text-xl font-semibold">{outcome.match!.size.us ?? "—"}</dd>
              </div>
              <div className="rounded bg-gray-50 p-4">
                <dt className="text-xs uppercase text-gray-500">UK / Canada</dt>
                <dd className="text-xl font-semibold">{outcome.match!.size.uk ?? "—"}</dd>
              </div>
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}
