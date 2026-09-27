# D003 · UK hook/needle sizes stored as strings
Date: 2026-09-07 · Goal: G-001 · Status: active
Context: "0", "00", "000" are distinct sizes; numbers would collapse them.
Decision: Strings, never numbers.
Rejected: numeric storage.
Consequence: Don't "simplify" the data model.
Evidence: `lib/hook-sizes.ts`.
