# Domain reference: yarn weight, hook, and needle sizing

Reviewed 2026-09-08 by a `domain-expert` subagent per
`COMPANY\STANDARDS.md`'s "Domain depth" guidance. This is the saved
findings summary; see `HANDOVER.md` for what was fixed as a result.

## What real sources say

**Craft Yarn Council (CYC) Standard Yarn Weight System** is the one
official body for the 0-7 categories, and also publishes its own
official hook/needle conversion chart
(craftyarncouncil.com/standards/hooks-and-needles) — a more authoritative
source than the community charts (CrochetCalc, Sheep & Stitch) this
project originally cited alone.

CYC hooks (mm → US): 2.25 B-1, 2.75 C-2, 3.25 D-3, 3.5 E-4, 3.75 F-5,
4.0 G-6, 4.5 7, 5.0 H-8, 5.5 I-9, 6.0 J-10, 6.5 K-10½, 8.0 L-11,
**9.0 M/N-13**, **10.0 N/P-15**, 11.5 P-16, 15.0 P/Q, 16.0 Q, 19.0 S,
25.0 T/U/X. (The 9mm/10mm dual letters are real — Boye and Susan Bates
label the same physical size differently.)

CYC needles (mm → US): 1.5 = 000, 1.75 = 00, 2.0 = 0, 2.25 = 1,
2.75 = 2, 3.25 = 3, 3.5 = 4, 3.75 = 5, 4.0/4.25 = 6, 4.5 = 7, 5.0 = 8,
5.25/5.5 = 9, 5.75/6.0 = 10, 6.5 = 10½, 8.0 = 11, 9.0 = 13, 10.0 = 15,
12.5/12.75 = 17, **15.0 = 19**, 19.0 = 35, 25.0 = 50.

**UK old sizes have no official body**, for either hooks or needles —
genuine cross-source disagreement exists, especially for hooks (checked
four independent charts: Sarah Maker, yarn.com, crafty-llama,
CrochetCalc — they conflict at 2.75, 3.5, 3.75, and 4.5mm). UK *needle*
sizes are much more consistent across sources (Vogue Knitting, Fabulous
Yarn, Sheep & Stitch all agree exactly), except at the very top end:
CYC says 15mm = US 19; Vogue and Fabulous Yarn both say 16mm = US 19.
No way to reconcile this into one number — genuine disagreement, not a
transcription error on either side.

**Regional yarn-weight names**: no official standard exists for mapping
US CYC categories onto UK/Australian ply and word names. LoveCrafts and
yarn.com broadly agree (4ply≈fingering, 8ply≈DK, 10ply≈Aran/worsted,
12ply≈bulky/chunky), but yarn.com explicitly flags that **US worsted
and UK Aran are not the same thickness** despite both sitting in CYC
category 4 — "you can lose two or three stitches over four inches
between them."

## Findings against this project's code (2026-09-08)

| # | Finding | File | Severity | Fixed? |
|---|---|---|---|---|
| 1 | CYC yarn-weight table (gauge/needle/hook figures) | `yarn-weights.ts` | N/A — confirmed accurate against CYC directly | No change needed |
| 2 | Category 0's crochet gauge is measured in double crochets specifically, not generic stitches | `yarn-weights.ts` | Real error, low stakes | ✅ Fixed |
| 3 | Category 4 (Aran/10ply) marked "standard" confidence when it's the single most contested equivalence in the table | `yarn-weights.ts` | Overclaimed confidence on the row most users rely on | ✅ Fixed (now "approximate") |
| 4 | Category 0's UK/AU naming marked "standard" when CYC #0 itself spans cobweb/lace/fingering/thread | `yarn-weights.ts` | Overclaimed confidence | ✅ Fixed (now "approximate") |
| 5 | Header cited CYC's "YDKWYDK" blog post for the UK/AU column; reviewer's direct fetch found no such mapping there | `yarn-weights.ts` | Unverifiable citation | ✅ Fixed (citation dropped, noted as unconfirmed) |
| 6 | 9.0mm and 10.0mm hooks labeled "M/13" and "N/15" — CYC's own chart says M/N-13 and N/P-15 (dual-brand labels) | `hook-sizes.ts` | Real error — a hook physically labeled "N" or "P" would mismatch | ✅ Fixed |
| 7 | Missing rows (2.5, 3.0, 7.0, 11.5, 16, 25mm) broke real lookups (e.g. a 3.0mm/UK-11 hook had no exact match) | `hook-sizes.ts` | Real functional gap | ✅ Fixed |
| 8 | UK 12 assigned to 2.75mm without note; cited source (CrochetCalc) actually places it at 2.5mm | `hook-sizes.ts` | Unsourced substitution | ✅ Fixed (moved to 2.5mm per source) |
| 9 | Missing US 000/00 needle rows, even though `yarn-weights.ts` recommends "US 000-1" for category 0 | `needle-sizes.ts` | Real functional gap, cross-file inconsistency | ✅ Fixed |
| 10 | 16.0mm labeled US 19; CYC's own chart says 15.0mm | `needle-sizes.ts` | Genuine cross-source disagreement | ✅ Fixed (now follows CYC, the official body) |

## Confidence and gaps (from the review)

- High confidence: the CYC yarn-weight table (two independent full
  restatements agreeing cell-for-cell), the CYC hooks-and-needles chart
  (fetched directly), and the UK needle column (four sources unanimous
  except the noted 15/16mm top-end split).
- Moderate confidence: the UK *hook* column. This is genuinely
  unstandardized — the fix here picked the most-corroborated value at
  each contested point, not "the right answer," because none exists.
- Not resolved: several UK-origin hook-size charts (Handy Little Me,
  Leonie Morgan, The Little Wool Company) publish as images/PDFs the
  reviewer couldn't read — the best remaining UK-specific sources for
  hook sizing, if someone wants to push this further.
- Needs a human eyeball: whether CYC's "YDKWYDK" blog post really lacks
  a UK/AU mapping (finding 5) — a table rendered as an image would defeat
  a text fetch, so this isn't certain, just unconfirmed.
