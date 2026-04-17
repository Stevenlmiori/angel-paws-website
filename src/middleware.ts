import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { expireObsoleteAdminPortalCookieNames } from "@/lib/memberPortal/adminCookie";

/**
 * Clear **retired** admin cookie names only (e.g. `ap_admin_portal`). Never
 * touch the current session cookie name here, so Safari cannot lose a fresh login.
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
  expireObsoleteAdminPortalCookieNames(
    (name, value, options) => res.cookies.set(name, value, options),
    secure,
  );
  return res;
}

export const config = {
  /** Include exact `/admin` — some matchers only hit nested paths. */
  matcher: ["/admin", "/admin/:path*"],
};
