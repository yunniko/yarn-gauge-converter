<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# yarn-gauge-converter — project conventions

Read `HANDOVER.md` first: current state, decision record, next steps. Goal
in `GOALS.md` (G-001). Parent initiative in `E:\CLAUDE\projects\svc-lab\`;
company-wide standards in `E:\CLAUDE\COMPANY\`.

- Stack: Next.js App Router, TypeScript, Tailwind. No database, no auth,
  no accounts.
- Reference data (`lib/yarn-weights.ts`, `lib/hook-sizes.ts`,
  `lib/needle-sizes.ts`) is sourced and cited in comments at the top of
  each file, with a confidence marker where sources disagree — see
  HANDOVER D2. Don't change a number without re-checking it against a
  real source; this is a public-facing reference tool, and wrong
  conversions actively hurt someone's project.
- UK hook/needle sizes are stored as strings, never numbers — "0", "00",
  "000" are three distinct sizes (see HANDOVER D3).
- A function can't be passed as a prop from a server component to a
  client component (`app/_components/size-converter.tsx` takes a `kind`
  string instead — see HANDOVER D1). `npm run build` catches this;
  `next dev` and `eslint` don't — always run a real build before calling
  a change verified.
- `npm install`/`npm ci` need `--legacy-peer-deps` (a live npm/arborist
  bug, not specific to this project — see `svc-lab/HANDOVER.md`).
- Two test layers: `npx vitest run` (unit — data tables and
  `lib/gauge.ts`) and `npx playwright test` (e2e — real browser flows
  for all four tools). Both must pass before calling a change done.
- Live at https://yarn.svc.julienika.cz — see
  `E:\CLAUDE\COMPANY\INFRASTRUCTURE_DEPLOY.md` for the redeploy command.
