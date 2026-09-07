# Goals — yarn-gauge-converter

Owner writes goals here; The Company plans, executes, and logs against them.
Statuses: `DRAFT` · `ACTIVE` · `BLOCKED` · `DONE`.
Parent initiative: `E:\CLAUDE\projects\svc-lab\` (same milestone-gate waiver
and standing deploy pre-approval apply here). Template/numbering
conventions in `E:\CLAUDE\COMPANY\GOALS.md`.

## Active goals

### G-001 · Yarn/gauge conversion toolkit — ACTIVE
- **What:** Four tools at `yarn.svc.julienika.cz`: a yarn weight chart
  (`/yarn-weight`), a crochet hook size converter (`/hook-size`), a
  knitting needle size converter (`/needle-size`), and a gauge calculator
  (`/gauge`). No database, no accounts.
- **Why:** svc-lab idea #2 — genuine cross-promotion angle with the
  existing `crochet-simulator` project's audience (see
  `svc-lab/GOALS.md`'s backlog), and craft-specific unit conversion is a
  real, narrow, low-competition search niche generic converter sites
  don't cover well.
- **Acceptance criteria:** All four tools compute/display correctly
  (unit-tested), a real browser flow verified (e2e-tested), live and
  reachable over HTTPS, sitemap/robots.txt present, all reference data
  sourced and cited (not fabricated).
- **Constraints:** No database, no accounts, no paid dependencies. Data
  accuracy matters more than coverage — a wrong hook-size conversion is
  actively harmful to someone's project, worse than not having the tool.

**Milestones:**
- [x] M1 — Build: sourced real conversion data (Craft Yarn Council
      Standard Yarn Weight System for the 0-7 categories/gauge/hook/
      needle figures; cross-checked hook and needle mm/US/UK tables
      against multiple independent sources plus two known worked
      examples), 4 tool pages, 24 Vitest unit tests, 5 Playwright e2e
      tests. All verified locally (`npm run build`, `npx vitest run`,
      `npx playwright test`, `npx eslint .` all clean). ✔ 2026-09-07.
- [ ] M2 — Deploy: git repo, push, clone to VPS, docker compose up,
      `julai-new-vhost` (first real test of the fixed script — see
      `svc-lab/HANDOVER.md` D6), verify live over HTTPS, confirm no other
      site on the host was affected.
- [ ] M3 — Monetization once an ad/payment account exists (blocked on
      Owner, same as fraction-calculator).

**Progress log** (newest first):
- 2026-09-07 — M1 complete, verified locally. Data sourcing documented
  in HANDOVER.md — every table cites where it came from and flags which
  parts are official-standard vs. best-effort community convention.
