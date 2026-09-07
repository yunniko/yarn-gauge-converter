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
- [x] M2 — Deploy: git repo (`yunniko/yarn-gauge-converter`, public),
      pushed, cloned to VPS, `docker compose --profile app up` on port
      30050, `julai-new-vhost` ran clean in one shot (first real test of
      the Owner's fix — see `svc-lab/HANDOVER.md` D6 — vhost, log
      directory, and TLS cert all created correctly with no manual
      workaround needed), verified live over HTTPS at
      https://yarn.svc.julienika.cz — real browser check on `/gauge` and
      every other host container's uptime confirmed unaffected.
      ✔ 2026-09-07.
- [ ] M3 — Monetization once an ad/payment account exists (blocked on
      Owner, same as fraction-calculator).

**Progress log** (newest first):
- 2026-09-07 — M2 complete. Deployed to https://yarn.svc.julienika.cz.
  The fixed `julai-new-vhost` script worked end-to-end with no manual
  intervention — confirms the Owner's fix (D6) resolved both the
  certbot-args bug and the missing log-directory gap.
- 2026-09-07 — M1 complete, verified locally. Data sourcing documented
  in HANDOVER.md — every table cites where it came from and flags which
  parts are official-standard vs. best-effort community convention.
