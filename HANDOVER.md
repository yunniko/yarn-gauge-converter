# Handover — yarn-gauge-converter
Last verified: 2026-09-12 at a52117c

svc-lab service #2. Goal: `GOALS.md` G-001. Shared conventions: `E:\CLAUDE\projects\svc-lab\`;
charter: `E:\CLAUDE\COMPANY\`.

## Current state

- **Live** at https://yarn.svc.julienika.cz (deployed 2026-09-07, port 30050; HTTP 200 re-checked
  2026-09-12). This deploy was the first clean end-to-end run of the Owner-fixed
  `julai-new-vhost` script.
- Four tools, no database: hook converter, needle converter, gauge calculator, yarn-weight
  reference (CYC categories 0–7).
- Verification on 2026-09-12: `npm run test:unit` 28/28. e2e (5 specs) last green 2026-09-08.
- Domain-expert review done 2026-09-08 (D006). Git tree clean.

## How things fit together

- `lib/yarn-weights.ts`, `lib/hook-sizes.ts`, `lib/needle-sizes.ts`: reference tables with source
  comments and confidence markers. `lib/gauge.ts`: the one calculation.
- `app/_components/size-converter.tsx` shared by hook and needle pages via a `kind` string
  (D001); `gauge-form.tsx`; `app/yarn-weight/page.tsx` is fully static.

## Rules in force

- UK sizes are strings (D003). Reference numbers change only against a real source (D002, D006).
- Run `npm run build` before calling a change verified; it catches server/client boundary bugs
  the dev server doesn't (D001).
- `npm ci --legacy-peer-deps`.

## Next steps and open questions

- Optional yarn substitution/yardage calculator (D005).
- AdSense per-domain approval unconfirmed (portfolio-wide).

## Deploy log

| Date | Commit | What changed | Verified how |
|---|---|---|---|
| 2026-09-07 | — | First deploy (port 30050); vhost script ran clean | Real browser computation on `/gauge`; sibling containers' uptime unchanged |
| 2026-09-08 | a52117c | Domain-review fixes (D006) | Suite re-run; routes 200 |

## Decisions

`docs/decisions/README.md` (D001–D006).
