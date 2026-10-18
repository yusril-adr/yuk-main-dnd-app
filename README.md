# YukMainDnD

Web app for the YukMainDnD tabletop RPG guild. Visitors can browse quests and guildmates. Signed-in members get a player dashboard, and masters manage stories, users and roles. It is a Next.js 16 client for the YukMainDnD API.

## Route protection

`src/proxy.ts` (the Next 16 proxy, formerly middleware) redirects signed-out visitors from protected routes to `/login?from=...`, and redirects signed-in visitors away from `/login`. Signed-in means an `access_token` cookie is present. The protected route list is generated from the top-level folders in `src/app/(authenticated)/` by `scripts/generate-protected-routes.mjs` into `src/generated/protected-routes.ts` (git-ignored). `dev` and `build` run the script first.

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack) with [React 19](https://react.dev/) and [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/) via `@tailwindcss/postcss`
- [shadcn/ui](https://ui.shadcn.com/) on [Base UI](https://base-ui.com/) primitives, [lucide-react](https://lucide.dev/) icons, [next-themes](https://github.com/pacocoursey/next-themes)
- [TanStack Query](https://tanstack.com/query) for server state, [TanStack Table](https://tanstack.com/table) for data tables
- [Axios](https://axios-http.com/) for HTTP
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) for forms and validation
- [nuqs](https://nuqs.dev/) for URL query state
- [Day.js](https://day.js.org/) for dates
- [Tiptap](https://tiptap.dev/) for rich text, with DOMPurify and marked
- [Sonner](https://sonner.emilkowal.ski/) toasts, Embla carousel, dotLottie animations, react-if
- SVGs import as React components via `@svgr/webpack` (configured for Turbopack and webpack in `next.config.ts`)

## Requirements

- Node.js **24.16** (see `.nvmrc`)
- A running YukMainDnD API

## Setup

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

### Environment variables

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_MAIN_API_BASE_URL` | Base URL of the YukMainDnD API. |
| `NEXT_PUBLIC_SITE_URL` | Public URL of this site, used for canonical URLs, the sitemap and share images (`metadataBase`). Defaults to `http://localhost:3000`. |
| `NEXT_PUBLIC_NEXT_IS_USING_THEME_TOGGLER` | Set to `true` to show the light/dark theme toggle (login, switch role and dashboard sidebar). |

`.env.example` currently lists the theme flag as `NEXT_IS_USING_THEME_TOGGLER`, but the code reads `NEXT_PUBLIC_NEXT_IS_USING_THEME_TOGGLER`. Use the `NEXT_PUBLIC_` name.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Generate protected routes, then start the dev server (Turbopack) |
| `npm run build` | Generate protected routes, then build for production |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project layout

```
src/
├── app/                                  # App Router
│   ├── (public)/                         # Public pages
│   │   ├── _components/ _hooks/ ...      # Home page's own pieces
│   │   └── <section>/[<param>]/
│   │       ├── page.tsx                  # Server page (metadata)
│   │       ├── page-client.tsx           # Client UI
│   │       ├── _components/              # Colocated, used only by this page
│   │       ├── _hooks/                   # Query hooks for this page
│   │       ├── _types/
│   │       ├── _constants/
│   │       └── _utils/
│   ├── (authenticated)/                  # Signed-in pages; top-level folders are protected
│   │   └── <section>/<page>/             # Same colocated folders as above
│   ├── login/
│   ├── _components/
│   │   ├── ui/                           # shadcn primitives, shared everywhere
│   │   └── <shared-component>/           # App shell pieces (layout, data table, rich text)
│   ├── _hooks/ _types/ _constants/       # App-wide hooks, types, constants
│   ├── layout.tsx  providers.tsx  globals.css
│   ├── opengraph-image.tsx  twitter-image.tsx
│   └── sitemap.ts  robots.ts
├── api/main/                             # API client
│   ├── _libs/                            # Axios instance, server fetch
│   ├── _const/  errors/  types/          # Paths, error classes, shared response types
│   └── modules/<module>/
│       ├── index.ts                      # Request functions
│       ├── types/                        # Payload and response types
│       └── enums/  consts/
├── assets/<group>/                       # Imported assets (SVG logos, OG card fonts/images)
├── common/                               # constants (config, query keys), enums, errors
├── generated/                            # Build-time output (protected routes)
├── hooks/                                # Shared hooks
├── libs/<lib>/                           # Wrappers: cookies, dayjs, nuqs, react-query, tiptap
├── types/                                # Global type declarations
├── utils/                                # Shared helpers
└── proxy.ts                              # Route protection
public/                                   # Static files (images, lotties, favicon)
scripts/                                  # Build scripts
docs/                                     # Color palette and font notes
```

Conventions:

- Each page keeps its own components, hooks, types, constants and utils in its `_` folders. Don't import components from another page or section.
- Only `app/_components/ui/` primitives, `src/utils/`, `src/libs/` and API modules are shared across pages.
- The `@/` alias resolves to `src/` (see `tsconfig.json`).

## Docker

```bash
docker build \
  --build-arg NEXT_PUBLIC_MAIN_API_BASE_URL=https://api.example.com \
  -t yuk-main-dnd-app .
docker run --rm -p 3000:3000 yuk-main-dnd-app
```

The image is a two-stage build on `node:24-alpine`. It runs `next start` as a non-root `nextjs` user on port `3000`. `NEXT_PUBLIC_*` values are baked in at build time. The Dockerfile only takes `NEXT_PUBLIC_MAIN_API_BASE_URL` as a build arg.

## License

BSD 3-Clause. See [LICENSE.md](./LICENSE.md).

Built by [Yonaka](https://yusril-adr.github.io).
