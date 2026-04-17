import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/** Must match `ADMIN_PORTAL_COOKIE_NAME` in `src/lib/memberPortal/adminSession.ts`. */
const ADMIN_PORTAL_COOKIE_NAME = "ap_admin_portal";

/**
 * Expire any admin session cookie still scoped to the **old** path
 * (`/admin/member-portal`). Those cookies were sent on the login URL but not on
 * `/admin`, which caused: login → redirect `/admin` → no cookie → redirect login
 * (Safari: “too many redirects”).
 */
export function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const secure = request.nextUrl.protocol === "https:";
  res.cookies.set({
    name: ADMIN_PORTAL_COOKIE_NAME,
    value: "",
    maxAge: 0,
    path: "/admin/member-portal",
    httpOnly: true,
    sameSite: "lax",
    secure,
  });
  return res;
}

export const config = {
  matcher: ["/admin/:path*"],
};
