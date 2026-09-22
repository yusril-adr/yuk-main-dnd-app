# Auth

- Prefers cookies over localStorage for auth token storage, to support SSR and SEO for future public-facing authenticated pages. Confidence: 0.7
- Prefers a single storage mechanism for auth tokens (e.g., localStorage or cookie) rather than maintaining two parallel stores that must be kept in sync — avoids over-engineering when one source of truth suffices. Confidence: 0.7
- Uses Indonesian user-facing labels for auth actions (e.g., "Masuk" for Login, "Daftar" for Register). Confidence: 0.7
- Prefers modeling permissions as `resource:action` string keys (e.g., `EVENTS_READ = "events:read"`) — one enum member per resource+action combo matching the DBML `(resource, action)` unique pair, rather than separate resource-only or action-only enums. Confidence: 0.8
- Organizes IAM (identity & access management) admin pages under the `/dashboard/master/iam/` nested route (Master → IAM), with plural resource segments (e.g., `/dashboard/master/iam/permissions`). Confidence: 0.7
- Prefers keeping the app-level `users` table decoupled from Supabase Auth initially (plain `gen_random_uuid()` PK, no FK to `auth.users`) — defers coupling to Auth until Supabase Auth is actually wired up. Confidence: 0.6
- Prefers generating SQL seed data from the canonical TypeScript enum (e.g., `PermissionEnum` in `src/common/enums/permission.ts`) as the single source of truth, so seeded permission rows stay in lockstep with the app's enum rather than being hand-maintained separately. Confidence: 0.6
