# yarn-gauge-converter

> **SUSPENDED (Owner, 2026-09-27)** — part of the svc-lab family, suspended because it did not work out as expected.
> No new work; security upkeep only while anything of it is live. Treat its code, formulas and
> decisions as a **lower-reliability reference**: they may or may not still work, so re-verify before
> reusing anything. Rules: `E:\CLAUDE\COMPANY\GOALS.md` → "Suspended projects".

Four small tools for knitters and crocheters: a yarn weight chart (US/UK/AU
naming), a crochet hook size converter, a knitting needle size converter,
and a gauge calculator that rescales a pattern's stitch/row count to your
own measured gauge. Part of the `svc-lab` portfolio (see
`E:\CLAUDE\projects\svc-lab\`).

## Running it

```
npm install --legacy-peer-deps   # see HANDOVER.md / svc-lab for why
npm run dev
```

Production build/run: `docker compose --profile app up -d --build`
(no database — stateless).

## Tests

```
npx vitest run        # unit tests — lib/*.ts data and calculations
npx playwright test   # e2e — real browser flows for all four tools
```

## Current state

Built and verified locally 2026-09-07 (24 unit tests + 5 e2e tests
passing, production build succeeds). See `HANDOVER.md` for data sourcing
and architecture notes, `GOALS.md` for deploy status.
