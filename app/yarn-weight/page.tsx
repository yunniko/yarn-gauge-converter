import type { Metadata } from "next";
import Link from "next/link";
import { YARN_WEIGHTS } from "@/lib/yarn-weights";

export const metadata: Metadata = {
  title: "Yarn Weight Chart: US, UK & Australian Names Compared",
  description:
    "The Craft Yarn Council's official 0-7 yarn weight categories, with gauge, hook, and needle recommendations, and their common UK/Australian equivalents.",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <nav className="mb-6 text-sm">
        <Link href="/" className="text-blue-600 hover:underline">
          ← All tools
        </Link>
      </nav>

      <h1 className="text-3xl font-semibold">Yarn Weight Chart</h1>
      <p className="mt-3 text-gray-600">
        The Craft Yarn Council&rsquo;s Standard Yarn Weight System defines 8
        categories (0 Lace through 7 Jumbo) with an official gauge and
        hook/needle range for each. The UK/Australian column is{" "}
        <strong>not</strong> part of that official standard — there&rsquo;s no
        single body that maps US names onto UK/AU ply and word names, so
        treat it as a common approximation, not an exact equivalence. Always
        check a specific yarn&rsquo;s own gauge on its label when it matters.
      </p>

      <div className="mt-6 space-y-6">
        {YARN_WEIGHTS.map((w) => (
          <div key={w.category} className="rounded-lg border border-gray-200 p-5">
            <div className="flex items-baseline justify-between gap-2">
              <h2 className="text-lg font-semibold">
                #{w.category} — {w.usName}
              </h2>
              {w.confidence === "approximate" && (
                <span className="text-xs text-amber-700">
                  UK/AU name approximate
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-gray-600">
              Also called: {w.otherUsNames}
            </p>
            <p className="text-sm text-gray-600">UK / Australian: {w.ukAu}</p>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-sm sm:grid-cols-4">
              <div>
                <dt className="text-gray-500">Knit gauge (4in)</dt>
                <dd>{w.knitGauge}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Crochet gauge (4in)</dt>
                <dd>{w.crochetGauge}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Needles</dt>
                <dd>
                  US {w.needleUs} ({w.needleMm} mm)
                </dd>
              </div>
              <div>
                <dt className="text-gray-500">Hooks</dt>
                <dd>
                  {w.hookUs} ({w.hookMm} mm)
                </dd>
              </div>
            </dl>
          </div>
        ))}
      </div>

      <p className="mt-8 text-xs text-gray-500">
        Category numbers, US names, and gauge/hook/needle figures: Craft Yarn
        Council Standard Yarn Weight System. UK/Australian names: a synthesis
        of several independent guides, cross-checked for the most commonly
        repeated equivalences.
      </p>
    </main>
  );
}
