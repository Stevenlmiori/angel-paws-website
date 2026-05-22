import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { expireObsoleteAdminPortalCookieNames } from "@/lib/memberPortal/adminCookie";
import { siteUnderConstruction } from "@/lib/siteFlags";

/** Paths that stay reachable while the public site is gated (assets + notice route). */
function constructionAllows(pathname: string): boolean {
  if (pathname === "/under-construction") return true;
  if (pathname.startsWith("/_next/")) return true;
  const assetPrefixes = ["/img/", "/brand/", "/stories-seed/"];
  if (assetPrefixes.some((p) => pathname.startsWith(p))) return true;
  const rootPublicFiles = new Set([
    "/favicon.ico",
    "/icon.svg",
    "/robots.txt",
    "/sitemap.xml",
    "/file.svg",
    "/window.svg",
    "/vercel.svg",
  ]);
  return rootPublicFiles.has(pathname);
}

/**
 * Clear **retired** admin cookie names only (e.g. `ap_admin_portal`). Never
 * touch the current session cookie name here, so Safari cannot lose a fresh login.
 *
 * Only run on **GET/HEAD** so POST responses are not given extra `Set-Cookie`.
 */
export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const gated = siteUnderConstruction();

  if (gated && pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Under construction" }, { status: 503 });
  }

  if (
    gated &&
    request.method !== "GET" &&
    request.method !== "HEAD"
  ) {
    return new NextResponse(null, { status: 503 });
  }

  if (
    gated &&
    (request.method === "GET" || request.method === "HEAD") &&
    !constructionAllows(pathname)
  ) {
    return NextResponse.rewrite(
      new URL("/under-construction", request.url),
    );
  }

  if (request.method !== "GET" && request.method !== "HEAD") {
    return NextResponse.next();
  }

  if (!pathname.startsWith("/admin")) {
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
  matcher: [
    /*
     * Skip proxy for Next static/image pipelines only (recommended).
     * All other paths (including `/api`, `_next/webpack-hmr`, public assets)
     * hit proxy so construction mode can rewrite or allow explicitly.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
