import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { expireStaleLoginPageAdminPortalCookie } from "@/lib/memberPortal/adminCookie";

/**
 * Expire the **login-page-only** admin cookie from older deployments
 * (`Path=/admin/member-portal`). That cookie was not sent on `/admin`, which
 * caused redirect loops in Safari.
 *
 * We intentionally do **not** clear `Path=/admin` here on every request — doing
 * so added an empty `ap_admin_portal` alongside the real `Path=/` session and
 * broke `cookies().get` in some browsers.
 *
 * Only run on **GET/HEAD** so POST responses are not given extra `Set-Cookie`.
 */
export function middleware(request: NextRequest) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return NextResponse.next();
  }

  const res = NextResponse.next();
  res.headers.set(
    "Cache-Control",
    "private, no-store, must-revalidate, max-age=0",
  );
  res.headers.set("Vary", "Cookie");
  const secure = request.nextUrl.protocol === "https:";
  expireStaleLoginPageAdminPortalCookie(
    (name, value, options) => res.cookies.set(name, value, options),
    secure,
  );
  return res;
}

export const config = {
  /** Include exact `/admin` — some matchers only hit nested paths. */
  matcher: ["/admin", "/admin/:path*"],
};
