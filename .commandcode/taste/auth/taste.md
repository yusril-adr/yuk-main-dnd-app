# Auth

- Prefers cookies over localStorage for auth token storage, to support SSR and SEO for future public-facing authenticated pages. Confidence: 0.7
- Prefers a single storage mechanism for auth tokens (e.g., localStorage or cookie) rather than maintaining two parallel stores that must be kept in sync — avoids over-engineering when one source of truth suffices. Confidence: 0.7
- Uses Indonesian user-facing labels for auth actions (e.g., "Masuk" for Login, "Daftar" for Register). Confidence: 0.7
- Prefers modeling permissions as `resource:action` string keys (e.g., `EVENTS_READ = "events:read"`) — one enum member per resource+action combo matching the DBML `(resource, action)` unique pair, rather than separate resource-only or action-only enums. Confidence: 0.8
- Organizes IAM (identity & access management) admin pages under the `/dashboard/master/iam/` nested route (Master → IAM), with plural resource segments (e.g., `/dashboard/master/iam/permissions`). Confidence: 0.7
