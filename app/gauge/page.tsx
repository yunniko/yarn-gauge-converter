import type { Metadata } from "next";
import Link from "next/link";
import { GaugeForm } from "@/app/_components/gauge-form";
import { JsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Gauge Calculator: Adjust Stitch Counts to Your Swatch",
  description:
    "Your gauge doesn't match the pattern's? Recalculate any stitch or row count to your actual gauge, with the full working shown.",
};

const FAQ = [
  {
    question: "Why does my gauge not matching the pattern matter?",
    answer:
      "A pattern's stitch counts assume its stated gauge. If your gauge is tighter or looser, using the pattern's numbers as-is produces a different finished size than intended — sometimes by a lot over a whole garment.",
  },
  {
    question: "Does it matter if I measure in inches or centimeters?",
    answer:
      "No — as long as your gauge swatch and the pattern's gauge are measured in the same unit, the ratio between them is what matters, not the absolute unit.",
  },
  {
    question: "Can I use this for rows as well as stitches?",
    answer:
      "Yes — enter your row gauge and the row count you're adjusting instead of stitches. The calculation is identical.",
  },
];

export default function Page() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />

      <nav className="mb-6 text-sm">
        <Link href="/" className="text-blue-600 hover:underline">
          ← All tools
        </Link>
      </nav>

      <h1 className="text-3xl font-semibold">Gauge Calculator</h1>
      <p className="mt-3 text-gray-600">
        If your gauge swatch doesn&rsquo;t match the pattern&rsquo;s, this
        rescales any stitch or row count from the pattern&rsquo;s gauge to
        yours, showing the full working.
      </p>

      <div className="mt-6">
        <GaugeForm />
      </div>

      <p className="mt-4 text-xs text-gray-500">
        This scales linearly from the pattern&rsquo;s numbers — it doesn&rsquo;t
        account for stitch-pattern repeats (you may need to round to the
        nearest multiple of the pattern&rsquo;s repeat) or shaping like
        increases/decreases, which don&rsquo;t scale the same way.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Frequently asked questions</h2>
        <dl className="mt-3 space-y-4">
          {FAQ.map((item) => (
            <div key={item.question}>
              <dt className="font-medium text-gray-900">{item.question}</dt>
              <dd className="mt-1 text-gray-600">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
