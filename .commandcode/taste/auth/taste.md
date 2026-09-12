# Auth

- Prefers cookies over localStorage for auth token storage, to support SSR and SEO for future public-facing authenticated pages. Confidence: 0.7
- Prefers a single storage mechanism for auth tokens (e.g., localStorage or cookie) rather than maintaining two parallel stores that must be kept in sync — avoids over-engineering when one source of truth suffices. Confidence: 0.7
