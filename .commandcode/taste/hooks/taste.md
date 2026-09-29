# Hooks

- Decomposes auth logic into small, focused hooks (e.g., separate `use-auth-context` and `use-auth-me`) rather than a single monolithic hook. Confidence: 0.5
- Expects React ref mutations to happen inside `useEffect`, not during render — follows `react-hooks/refs` ESLint rule strictly and will flag violations for proper fix (e.g., syncing a ref to track latest state for stale-closure avoidance). Confidence: 0.7
- Prefers creating a new dedicated data-fetching hook for filter dropdowns rather than reusing an existing hook from another module's `_hooks` folder — explicitly instructed "don't reuse hooks from" another feature module when building a role filter dropdown, valuing module independence and avoiding cross-module coupling through shared hooks. Confidence: 0.8
