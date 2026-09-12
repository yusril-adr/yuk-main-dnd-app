# Style

- Prefers single-responsibility utilities — each module should do one thing (e.g., separate `AccessToken` for localStorage and `HasTokenCookie` for cookies), with callers importing and calling both independently rather than one utility mixing concerns. Confidence: 0.8
- Prefers explanatory comments above non-obvious patterns or workarounds (e.g., `next-themes` hydration guard, SSR safety checks, `useRef` for stale-closure avoidance) so other developers understand the "why" without having to reverse-engineer the fix. Confidence: 0.9
- Prefers the project's UI component primitives (e.g., `<Button variant="ghost" size="icon-sm">`) over raw utility classes like `btn btn-ghost btn-square btn-sm` — uses the design system's props API rather than ad-hoc class composition. Confidence: 0.7
- Treats shadcn/ui generated components (under `_components/ui/`) as immutable — do not edit them to fix warnings or runtime issues. Instead, suppress the issue or work around it at the call site. This is a deliberate exception to the general preference for root-cause fixes; generated design-system code should remain untouched. Confidence: 0.9
