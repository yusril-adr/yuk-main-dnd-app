import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

import { protectedRoutes } from "@/generated/protected-routes";
import { LOCALE_COOKIE, routing } from "@/i18n/routing";

// Public pages: the default locale unprefixed, the others under /<locale>.
// With I18N_CONFIG.localeDetection the cookie and Accept-Language can
// redirect, e.g. "/" to "/id"
const handlePublicI18n = createMiddleware(routing);
// Signed-in area and /login: never prefixed; the locale comes from the
// NEXT_LOCALE cookie, then Accept-Language, then the default locale, and the
// request is rewritten internally to app/[locale]/... Detection stays on
// here even when public redirects are off: it only rewrites, and without it
// next-intl would ignore the cookie.
const handleUnprefixedI18n = createMiddleware({
  ...routing,
  localePrefix: "never",
  localeDetection: true,
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
