# Handover — yarn-gauge-converter

Read this before touching the project. Goal in `GOALS.md` (G-001).
Parent initiative: `E:\CLAUDE\projects\svc-lab\`. Company-wide standards
in `E:\CLAUDE\COMPANY\`.

## Current state

**Live at https://yarn.svc.julienika.cz** (deployed 2026-09-07). M1 and
M2 both done and verified: 24 Vitest unit tests, 5 Playwright e2e tests,
ESLint, and `npm run build` all pass locally; in production, verified a
real browser computation on `/gauge` and confirmed every other container
on the shared VPS kept its prior uptime. This deploy also served as the
first real test of the Owner's `julai-new-vhost` fix (see
`svc-lab/HANDOVER.md` D6) — it ran clean end-to-end with no manual
certbot workaround needed, confirming the fix worked.

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
the categories where sources disagreed most, with an explicit on-page
disclaimer. (Correction, 2026-09-08: this entry originally said the
hook/needle tables were "cross-checked" against two worked examples
[US H-8 = UK 6 = 5.0mm; US J-10 = UK 4 = 6.0mm] — a domain-expert review
pointed out both examples sit inside the one mm range every source
already agrees on [4.0-6.5mm], so they couldn't have caught the real
errors that existed elsewhere in the table. See D6 for what a proper
review against the Craft Yarn Council's own hook/needle chart actually
found and fixed.)

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

**D6 — Domain-expert review (2026-09-08) found and fixed real data
errors, not just presentation issues.** Per `COMPANY\STANDARDS.md`'s
"Domain depth" guidance, a `domain-expert` subagent reviewed all three
reference tables against the Craft Yarn Council's own official
hooks-and-needles chart (a more authoritative source than the community
charts D2 originally cited alone) and against real UK-sizing
cross-source comparisons. Full findings in `docs/domain-reference.md`.
The CYC yarn-weight table itself checked out accurate. Fixed:
- **Real hook-label errors**: 9mm and 10mm were labeled "M/13" and
  "N/15" — CYC's own chart gives dual-brand labels "M/N-13" and
  "N/P-15" (Boye vs. Susan Bates name the same physical size
  differently). A hook actually stamped "N" or "P" wouldn't have
  matched the old single-letter labels.
- **Missing rows that broke real lookups**: `hook-sizes.ts` had no row
  at 2.5, 3.0, 7.0, 11.5, 16, or 25mm; `needle-sizes.ts` had no US 000/00
  rows even though `yarn-weights.ts` recommends exactly those sizes for
  category 0. Both fixed.
- **A genuine cross-source disagreement at the needle table's top end**
  (15mm vs 16mm for US 19) — resolved in favor of CYC, the one official
  body, rather than the community chart this file followed before.
- **Two overclaimed confidence markers**: category 4 (Aran/10ply) was
  marked `"standard"` despite being, per the review, "the single most
  contested equivalence in the whole table" (US worsted and UK Aran
  measurably differ in gauge); category 0's UK/AU naming was also marked
  `"standard"` despite CYC's own category 0 spanning cobweb through
  10-count thread. Both changed to `"approximate"`.
- **A citation that couldn't be verified**: this file's header credited
  CYC's own "YDKWYDK" blog post as a UK/AU-mapping source; a direct
  fetch during the review found no such mapping on that page. Dropped
  as a citation pending re-confirmation.
- **A real data error**: category 0's crochet gauge (32-42 sts/4in) is
  specifically measured in double crochets per CYC — the only row
  measured that way — and the field didn't say so.

## Next steps and open questions

- Consider adding a yarn substitution/yardage calculator (D5) as a
  follow-up if this service's traffic justifies more investment.
- Monetization not yet live — blocked on the Owner (see
  `svc-lab/HANDOVER.md`'s Owner action list).
