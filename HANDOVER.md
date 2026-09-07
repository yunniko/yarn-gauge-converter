# Handover — yarn-gauge-converter

Read this before touching the project. Goal in `GOALS.md` (G-001).
Parent initiative: `E:\CLAUDE\projects\svc-lab\`. Company-wide standards
in `E:\CLAUDE\COMPANY\`.

## Current state

M1 done and verified locally 2026-09-07: 24 Vitest unit tests, 5
Playwright e2e tests (real Chromium browser), ESLint clean, `npm run
build` succeeds with every route statically prerendered. Not yet
deployed (M2).

## How things fit together

- `lib/yarn-weights.ts`, `lib/hook-sizes.ts`, `lib/needle-sizes.ts` —
  static reference data tables, each with a source citation comment at
  the top. `lib/gauge.ts` — the one real calculation (pure function,
  unit-tested).
- `app/_components/size-converter.tsx` — shared client component for
  both hook and needle converters, parameterized by a `kind: "hook" |
  "needle"` discriminant (see D1 for why it's not a function prop).
- `app/_components/gauge-form.tsx` — the gauge calculator's interactive
  form.
- `app/yarn-weight/page.tsx` — fully static (server component), no
  interactivity needed for an 8-row reference table.

## Decision record

**D1 — `SizeConverterForm` takes a `kind: "hook" | "needle"` string, not
a function prop.** First draft passed `findHookByMm`/`findNeedleByMm`
directly as a prop from the server-component pages into the client
component. Next.js's build failed: *"Functions cannot be passed directly
to Client Components"* — the server/client boundary can't serialize a
function reference. Fixed by having the client component import both
finder functions itself and select by a plain string discriminant
instead. Caught by `npm run build` (not caught by `next dev` locally
during interactive testing, nor by TypeScript/ESLint) — reinforces
always running a real production build before calling a change verified,
not just the dev server.

**D2 — Data accuracy sourced from real references, not memory, with
confidence levels marked.** Per VALUES.md Honesty and STANDARDS.md's
"every factual claim carries a source": the CYC 0-7 category/gauge/
hook/needle figures come directly from the Craft Yarn Council's own
Standard Yarn Weight System page (the one official body for this). The
UK/Australian name column has no equivalent official source — no single
body maps US names onto UK/AU ply/word names — so it's synthesized from
several independent guides and marked `confidence: "approximate"` on
the categories where sources disagreed most (Fine/#2, Bulky/#5, Super
Bulky/#6, Jumbo/#7), with an explicit on-page disclaimer. The hook and
needle mm/US/UK tables were cross-checked against two independently
stated worked examples (US H-8 = UK 6 = 5.0mm; US J-10 = UK 4 = 6.0mm)
that both matched — not just taken from a single source on faith.

**D3 — UK sizes stored as strings, not numbers.** UK hook/needle sizing
includes "0", "00", "000" as genuinely distinct sizes (larger number of
zeros = larger physical size, going the opposite direction from the
positive numbers). Storing these as JS numbers would collapse all three
to `0`. Caught before it became a bug (not discovered via a failing
test) — worth remembering if this data model is ever "simplified."

**D4 — Gauge calculator asks for stitches-over-a-width rather than
stitches-per-inch directly.** The ratio between pattern gauge and your
gauge is unit-independent (inches vs cm cancels out of the ratio), so
asking "stitches over what width" instead of forcing a unit choice
avoids a whole class of unit-mismatch bugs and matches how gauge is
usually written on a pattern ("20 sts = 4in") rather than requiring the
user to do that division themselves first.

**D5 — Deliberately did not build a yarn-yardage/substitution
calculator for this service.** It was in the original plan (see
`svc-lab/GOALS.md`'s backlog idea #2 framing) but cut to keep M1 to a
single day — the four shipped tools are independently useful and
complete; substitution math (accounting for both yardage and weight
simultaneously) is a distinct enough feature to be its own follow-up
rather than something rushed into today's build. Left as an open item
below rather than a backlog idea, since it belongs to this project if
picked up.

## Next steps and open questions

- Deploy (M2) via the now-fixed `julai-new-vhost` script (see
  `svc-lab/HANDOVER.md` D6) — this deploy is also that fix's first real
  test.
- Consider adding a yarn substitution/yardage calculator (D5) as a
  follow-up if this service's traffic justifies more investment.
- Monetization not yet live — blocked on the Owner (see
  `svc-lab/HANDOVER.md`'s Owner action list).
