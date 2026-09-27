# D001 · `SizeConverterForm` takes `kind: "hook" | "needle"`, not a function prop
Date: 2026-09-07 · Goal: G-001 · Status: active
Context: `npm run build` failed: functions can't cross the server/client component boundary; `next dev`, tsc and eslint didn't catch it.
Decision: The client component imports both finders and switches on a string.
Rejected: passing `findHookByMm` as a prop.
Consequence: Always run a real production build before calling a change verified.
Evidence: `app/_components/size-converter.tsx`.
