<p align="center">
  <a href="https://nextjs.org/" target="blank"><img src="./next.js.png" width="360" alt="Next.js Logo" /></a>
</p>

# Requestor Next

Web client for the Requestor application — a Next.js 16 app built with TypeScript, Tailwind CSS v4, and TanStack Query.

## Requirements

- Node.js **24.16+** (see `.nvmrc`)

## Install

```bash
npm install
```

## Run (development)

```bash
npm run dev
```

Opens the app at [http://localhost:3000](http://localhost:3000) with Turbopack and HMR enabled.

## Build

```bash
npm run build
```

Produces a standalone production build (configured via `output: "standalone"` in `next.config.ts`).

## Start (production)

```bash
npm run start
```

Runs the production server at [http://localhost:3000](http://localhost:3000).

## Lint

```bash
npm run lint
```

## Available scripts

| Script            | What it does                          |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Start the Next.js dev server (Turbopack) |
| `npm run build`   | Produce a standalone production build |
| `npm run start`   | Serve the production build            |
| `npm run lint`    | Run ESLint across the project         |

## Project layout

```
src/
├── app/                      # Application code (App Router)
│   ├── (authenticated)/      # Route group for authenticated pages
│   │   ├── dashboard/        # /dashboard
│   │   ├── users/            # /users
│   │   ├── requests/         # /requests
│   │   ├── audit-logs/       # /audit-logs
│   │   └── layout.tsx        # Authenticated shell layout
│   ├── (home)/               # Route group for public home
│   │   └── page.tsx          # Index route
│   ├── login/                # /login
│   ├── _components/          # Shared UI, layout, providers
│   ├── _hooks/               # Reusable hooks
│   ├── _types/               # Shared types
│   ├── globals.css           # Tailwind v4 entry
│   ├── layout.tsx            # Root layout
│   └── providers.tsx         # App-wide providers
├── api/                      # API client (main, endpoints)
├── common/                   # Enums, constants, errors
├── hooks/                    # Shared hooks (e.g. use-mobile)
├── libs/                     # Wrappers: cookies, dayjs, nuqs, react-query
├── utils/                    # Generic helpers (cn, table, validation, etc.)
└── proxy.ts                  # API proxy configuration
```

The `@/` alias resolves to `src/` (configured in `tsconfig.json`).

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/) via `@tailwindcss/postcss`
- [TanStack Query](https://tanstack.com/query) for server state
- [TanStack Table](https://tanstack.com/table) for data tables
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) for forms/validation
- [shadcn/ui](https://ui.shadcn.com/) + [Base UI](https://base-ui.com/) primitives
- [Axios](https://axios-http.com/) for HTTP
- [Sonner](https://sonner.emilkowal.ski/) for toasts
- [Day.js](https://day.js.org/) for dates
- [nuqs](https://nuqs.dev/) for URL query string state management
- [lucide-react](https://lucide.dev/) for icons
- [next-themes](https://github.com/pacocoursey/next-themes) for theme switching

## Docker

```bash
docker build \
  --build-arg NEXT_PUBLIC_MAIN_API_BASE_URL=https://api.example.com \
  --build-arg NEXT_PUBLIC_REQUESTOR_API_BASE_URL=https://requestor-api.example.com \
  -t requestor-next .
docker run --rm -p 3000:3000 requestor-next
```

The image is based on `node:24-alpine`, runs as a non-root `nextjs` user, and exposes port `3000`.
