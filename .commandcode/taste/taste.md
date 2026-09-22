- Prefers following idiomatic, documented best practices over quick fixes or blunt workarounds — asks "what's the best practice?" and values granular, framework-recommended approaches (e.g., `<Suspense>` over `force-dynamic`). Actively catches inconsistencies when a plan contradicts the established best practice. Confidence: 0.7
- Questions redundant operations in config/build files (e.g., duplicate `npm ci` in a Dockerfile) — expects each step to have clear justification and will call out unnecessary work rather than accepting it silently. Confidence: 0.7
- Prefers Dockerfile Node.js version to match `.nvmrc` — expects version alignment between local development (nvm) and container builds. Confidence: 0.8
- Values cross-project consistency — when an adjacent/sibling project already establishes a convention (e.g., README format, documentation style), prefers mirroring that convention rather than inventing a new one from scratch. Confidence: 0.6
- Prefers eliminating unnecessary state and addressing root causes over suppressing lint warnings — when faced with a lint violation, chooses to restructure code to make the warning irrelevant (e.g., removing a redundant `mounted` hydration gate) rather than disabling the rule, even when the lint-suppression approach is idiomatic and widely accepted. Confidence: 0.6

- Prefers build-time code generation (a Node script wired into the `dev`/`build` scripts, committing the generated file) over runtime filesystem detection for derived config lists — keeps generated artifacts in sync automatically at dev/build time. Confidence: 0.6
- Prefers single explicit npm script commands (inlining a codegen step into `dev`/`build` with `&&`) over npm lifecycle hooks (`predev`/`prebuild`) — values explicitness and one-place clarity over implicit automatic hooks. Confidence: 0.7

- Comfortable using dummy/placeholder data for prototyping when real data isn't available yet — both at the UI layer (e.g., hardcoded XP/GP stats) and at the API layer (stubbing a pagination function's return with dummy items derived from an existing enum, e.g., `PermissionEnum`) — rather than blocking on backend data. Confidence: 0.6
- When a suggested fix doesn't take effect (e.g., "the UI won't change"), prefers the agent to actively search and verify the real codebase — grep for token/variable definitions, read the actual files — to find the root cause rather than restating the explanation or guessing. Confidence: 0.6
- Treats `docs/db.dbml` (plus the repo's module structure) as the source of truth for domain resources/enums — when populating a domain enum (e.g., permissions), derives the member list from the DBML schema tables rather than inventing it from UI labels alone. Confidence: 0.6
- Generates Supabase SQL migrations by faithfully translating `docs/db.dbml` table definitions to PostgreSQL (e.g., `[default: gen_random_uuid()]` → `default gen_random_uuid()`, `[unique]` → named unique constraints, `Ref:` relationships → FKs) — treats the DBML as the schema of record for tables themselves, not just enums. Confidence: 0.6
- Prefers idempotent Supabase seed inserts (e.g., `on conflict (module, action) do nothing`) so seed files can be re-run safely without producing duplicate rows. Confidence: 0.6
- Prefers PostgreSQL database functions (plpgsql) for data-access logic — when asking for "db functions," expects actual SQL/stored functions generated against the schema (e.g., `get_permissions`) rather than app/API-layer query wrappers. Confidence: 0.7
- Prefers calling Supabase RPC directly from the Next.js app rather than routing data access through a separate backend API — when the choice came up, opted for direct `supabase.rpc(...)` calls over axios→backend. Confidence: 0.6
- Prefers the domain term `users` over `profiles` for the user entity — renamed the DBML table to `users` and keeps the `RELATIONSHIPS` section (and derived resources/enums) consistently referencing `users`. Confidence: 0.8
- Organizes API clients under `src/api/{namespace}/` (e.g., `requestor`, `main`) with a consistent per-resource module pattern (path constants, types, fetch functions); new modules should mirror an existing module's structure and return shape (e.g., `main/permissions` mirrors `requestor`) rather than inventing a new layout. Confidence: 0.6
- Nests API feature modules under `src/api/{namespace}/modules/{feature}/` (e.g., `src/api/main/modules/permissions/index.ts`) rather than directly under the namespace folder. Confidence: 0.6
- Prefers filter, sort_by/order, and pagination (page/per_page) to be genuinely implemented in API modules — including on dummy/stub data — rather than accepting the params but ignoring them (e.g., asked to "also handle sort by and pagination", then "sort by and filter", on the permissions module whose dummy stub previously ignored them). Confidence: 0.7
- Keeps the axios-based API envelope (e.g., `AxiosResponse<TRequestorApiPaginationResponse<T>>`) as a stable contract/abstraction layer deliberately, even when the actual transport is Supabase RPC — so downstream hooks/tables reading `response.data.data.items`/`meta` never change and migrating to a real REST API later only swaps the function body (dummy → RPC → REST). Confidence: 0.8

# Auth

See [auth/taste.md](auth/taste.md)

# Hooks

See [hooks/taste.md](hooks/taste.md)

# Next.js

See [nextjs/taste.md](nextjs/taste.md)

# Style

See [style/taste.md](style/taste.md)
 than creating a new data-fetching layer or re-implementing the API call. Confidence: 0.6
- Refers to routes by approximate/shorthand paths (e.g., `/dashboard/iam/permission` for `/dashboard/master/iam/permissions`, `/dashboard/requestors` for `/dashboard/requestor`) and expects the agent to resolve them against the sidebar nav config rather than taking the path literally. Confidence: 0.5

# Auth

See [auth/taste.md](auth/taste.md)

# Hooks

See [hooks/taste.md](hooks/taste.md)

# Next.js

See [nextjs/taste.md](nextjs/taste.md)

# Style

See [style/taste.md](style/taste.md)
