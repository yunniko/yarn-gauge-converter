import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Yarn & Gauge Tools for Knitters and Crocheters",
  description:
    "Free tools for yarn weight, hook size, needle size, and gauge conversion — US, UK, and metric, with sources and full working shown.",
};

const TOOLS = [
  {
    href: "/yarn-weight",
    title: "Yarn weight chart",
    description: "US categories 0-7 with UK/Australian equivalents, gauge, and hook/needle recommendations.",
  },
  {
    href: "/hook-size",
    title: "Crochet hook size converter",
    description: "Metric, US letter/number, and UK/Canadian hook sizes.",
  },
  {
    href: "/needle-size",
    title: "Knitting needle size converter",
    description: "Metric, US, and UK/Canadian needle sizes — US and UK run in opposite directions.",
  },
  {
    href: "/gauge",
    title: "Gauge calculator",
    description: "Rescale a pattern's stitch or row count to your own measured gauge, with the steps shown.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-semibold">Yarn &amp; Gauge Tools</h1>
      <p className="mt-3 text-gray-600">
        Free conversion tools for knitters and crocheters — yarn weight, hook
        size, needle size, and gauge, in US, UK, and metric.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {TOOLS.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="rounded-lg border border-gray-200 p-5 hover:border-gray-400"
          >
            <h2 className="font-semibold text-blue-700">{tool.title}</h2>
            <p className="mt-1 text-sm text-gray-600">{tool.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
