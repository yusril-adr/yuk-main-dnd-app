# Hooks

- Decomposes auth logic into small, focused hooks (e.g., separate `use-auth-context` and `use-auth-me`) rather than a single monolithic hook. Confidence: 0.5
- Expects React ref mutations to happen inside `useEffect`, not during render — follows `react-hooks/refs` ESLint rule strictly and will flag violations for proper fix (e.g., syncing a ref to track latest state for stale-closure avoidance). Confidence: 0.7
