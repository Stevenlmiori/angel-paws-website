import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { expireLegacyAdminPortalCookiePaths } from "@/lib/memberPortal/adminCookie";

/**
 * Expire path-scoped admin cookies from older deployments so they cannot shadow
 * the current `path: "/"` session cookie.
 *
 * Only run on **GET/HEAD** so POST responses (e.g. Server Actions) are not
 * given extra `Set-Cookie` lines that can interfere with login.
 */
export function middleware(request: NextRequest) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return NextResponse.next();
  }

  const res = NextResponse.next();
  const secure = request.nextUrl.protocol === "https:";
  expireLegacyAdminPortalCookiePaths(
    (name, value, options) => res.cookies.set(name, value, options),
    secure,
  );
  return res;
}

export const config = {
  matcher: ["/admin/:path*"],
};
