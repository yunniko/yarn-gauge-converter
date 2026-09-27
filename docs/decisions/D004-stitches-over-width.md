# D004 · Gauge calculator asks for stitches over a width, not stitches per inch
Date: 2026-09-07 · Goal: G-001 · Status: active
Context: The pattern/your-gauge ratio is unit-independent and patterns are written "20 sts = 4 in".
Decision: No unit choice; the ratio cancels units out.
Rejected: forcing a unit.
Consequence: —
Evidence: `lib/gauge.ts`.
