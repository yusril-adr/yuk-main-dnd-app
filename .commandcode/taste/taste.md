- Prefers following idiomatic, documented best practices over quick fixes or blunt workarounds — asks "what's the best practice?" and values granular, framework-recommended approaches (e.g., `<Suspense>` over `force-dynamic`). Actively catches inconsistencies when a plan contradicts the established best practice. Confidence: 0.7
- Questions redundant operations in config/build files (e.g., duplicate `npm ci` in a Dockerfile) — expects each step to have clear justification and will call out unnecessary work rather than accepting it silently. Confidence: 0.7
- Prefers Dockerfile Node.js version to match `.nvmrc` — expects version alignment between local development (nvm) and container builds. Confidence: 0.8
- Values cross-project consistency — when an adjacent/sibling project already establishes a convention (e.g., README format, documentation style), prefers mirroring that convention rather than inventing a new one from scratch. Confidence: 0.6
- Prefers eliminating unnecessary state and addressing root causes over suppressing lint warnings — when faced with a lint violation, chooses to restructure code to make the warning irrelevant (e.g., removing a redundant `mounted` hydration gate) rather than disabling the rule, even when the lint-suppression approach is idiomatic and widely accepted. Confidence: 0.6

- Prefers build-time code generation (a Node script wired into the `dev`/`build` scripts, committing the generated file) over runtime filesystem detection for derived config lists — keeps generated artifacts in sync automatically at dev/build time. Confidence: 0.6
- Prefers single explicit npm script commands (inlining a codegen step into `dev`/`build` with `&&`) over npm lifecycle hooks (`predev`/`prebuild`) — values explicitness and one-place clarity over implicit automatic hooks. Confidence: 0.7

- Comfortable using dummy/placeholder data for prototyping when real data isn't available yet (e.g., hardcoded XP/GP stats), rather than blocking on backend data. Confidence: 0.5

# Auth
See [auth/taste.md](auth/taste.md)

# Hooks
See [hooks/taste.md](hooks/taste.md)

# Next.js
See [nextjs/taste.md](nextjs/taste.md)

# Style
See [style/taste.md](style/taste.md)
