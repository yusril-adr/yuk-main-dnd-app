import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

import { protectedRoutes } from "@/generated/protected-routes";
import { LOCALE_COOKIE, routing } from "@/i18n/routing";

// Public pages: English unprefixed, Indonesian under /id (cookie and
// Accept-Language can redirect "/" to "/id")
const handlePublicI18n = createMiddleware(routing);
// Signed-in area and /login: never prefixed; the locale comes from the
// NEXT_LOCALE cookie, then Accept-Language, then English, and the request is
// rewritten internally to app/[locale]/...
const handleUnprefixedI18n = createMiddleware({
  ...routing,
  localePrefix: "never",
});

// "/id/dashboard" -> { locale: "id", path: "/dashboard" }
function splitLocale(pathname: string) {
  const [, first] = pathname.split("/");
  const locale = routing.locales.find((item) => item === first);
  if (!locale) return { locale: null, path: pathname };
  return { locale, path: pathname.slice(locale.length + 1) || "/" };
}

export function proxy(request: NextRequest) {
  const { search } = request.nextUrl;
  // Auth rules are checked on the path without its locale prefix
  const { locale, path } = splitLocale(request.nextUrl.pathname);
  const hasToken = request.cookies.get("access_token")?.value;
  const isLogin = path === "/login";
  const isProtected = protectedRoutes.some((r) => path.startsWith(r));

  if (isLogin && hasToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isProtected && !hasToken) {
    const from = encodeURIComponent(path + search);
    return NextResponse.redirect(new URL(`/login?from=${from}`, request.url));
  }

  if (isLogin || isProtected) {
    // These URLs have no locale prefix: drop it and remember the choice
    if (locale) {
      const response = NextResponse.redirect(
        new URL(path + search, request.url),
      );
      response.cookies.set(LOCALE_COOKIE.name, locale, {
        maxAge: LOCALE_COOKIE.maxAge,
        sameSite: "lax",
        path: "/",
      });
      return response;
    }
    return handleUnprefixedI18n(request);
  }

  return handlePublicI18n(request);
}

export const config = {
  matcher: [
    // Pages only: skip /api, Next internals, metadata images (opengraph,
    // twitter, /og share cards) and anything with a dot (static files,
    // sitemap.xml, robots.txt, favicon.ico)
    "/((?!api/|_next/|_vercel/|og/|.*opengraph-image|.*twitter-image|.*\\..*).*)",
    // Guildmate usernames may contain dots, optionally after a locale prefix
    "/([\\w-]+)?/guildmates/(.+)",
  ],
};
