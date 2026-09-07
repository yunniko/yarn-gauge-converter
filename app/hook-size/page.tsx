import type { Metadata } from "next";
import Link from "next/link";
import { SizeConverterForm } from "@/app/_components/size-converter";
import { HOOK_SIZES } from "@/lib/hook-sizes";

export const metadata: Metadata = {
  title: "Crochet Hook Size Conversion Chart (US, UK, Metric)",
  description:
    "Convert crochet hook sizes between metric (mm), US letter/number, and UK/Canadian sizing — enter any size to see all three.",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <nav className="mb-6 text-sm">
        <Link href="/" className="text-blue-600 hover:underline">
          ← All tools
        </Link>
      </nav>

      <h1 className="text-3xl font-semibold">Crochet Hook Size Converter</h1>
      <p className="mt-3 text-gray-600">
        US, UK, and metric hook sizes are three independent labeling systems
        for the same measurement — metric millimeters is the one universal
        reference. Enter a size in any system to see its equivalents.
      </p>

      <div className="mt-6">
        <SizeConverterForm sizes={HOOK_SIZES} itemLabel="hook" kind="hook" />
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Full conversion table</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-300 text-left">
                <th className="py-2 pr-4">Metric</th>
                <th className="py-2 pr-4">US</th>
                <th className="py-2 pr-4">UK / Canada</th>
              </tr>
            </thead>
            <tbody>
              {HOOK_SIZES.map((s) => (
                <tr key={s.mm} className="border-b border-gray-100">
                  <td className="py-2 pr-4">{s.mm} mm</td>
                  <td className="py-2 pr-4">{s.us ?? "—"}</td>
                  <td className="py-2 pr-4">{s.uk ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
