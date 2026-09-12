import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { protectedRoutes } from "@/generated/protected-routes";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasToken = request.cookies.get("access_token")?.value;

  if (pathname === "/login" && hasToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (protectedRoutes.some((r) => pathname.startsWith(r)) && !hasToken) {
    const from = encodeURIComponent(
      request.nextUrl.pathname + request.nextUrl.search,
    );
    return NextResponse.redirect(new URL(`/login?from=${from}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
};
