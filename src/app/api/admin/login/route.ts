import { NextResponse } from "next/server";
import { adminCookieBase } from "@/lib/memberPortal/adminCookie";
import { issueAdminPortalSession } from "@/lib/memberPortal/issueAdminPortalSession";
import { ADMIN_PORTAL_COOKIE_NAME } from "@/lib/memberPortal/adminSession";
import {
  applyRateLimitHeaders,
  checkRateLimit,
  rateLimitKey,
  requestIp,
} from "@/lib/security/rateLimit";

function sameOriginOk(request: Request): boolean {
  const host = new URL(request.url).host;
  const origin = request.headers.get("origin");
  if (!origin) {
    return true;
  }
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function loginUrl(request: Request, query: string): URL {
  const u = new URL("/admin/member-portal/login", request.url);
  u.search = query;
  return u;
}

function rateLimitedRedirect(request: Request, retryAfterSec: number) {
  const res = NextResponse.redirect(loginUrl(request, "error=rate"), 303);
  res.headers.set("Retry-After", String(retryAfterSec));
  return res;
}

function isHttpsRequest(request: Request): boolean {
  const raw = request.headers.get("x-forwarded-proto");
  if (raw) {
    return raw.split(",")[0]?.trim() === "https";
  }
  return new URL(request.url).protocol === "https:";
}

export async function POST(request: Request) {
  if (!sameOriginOk(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const ip = requestIp(request);
  const ipLimit = await checkRateLimit({
    key: rateLimitKey(["admin-login-ip", ip]),
    limit: 40,
    windowSec: 15 * 60,
  });
  if (!ipLimit.ok) {
    return rateLimitedRedirect(request, ipLimit.retryAfterSec);
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.redirect(loginUrl(request, "error=fields"), 303);
  }

  const email = formData.get("email");
  const password = formData.get("password");
  const emailKey =
    typeof email === "string" && email.trim()
      ? email.trim().toLowerCase()
      : "blank";
  const credentialLimit = await checkRateLimit({
    key: rateLimitKey(["admin-login-credential", ip, emailKey]),
    limit: 8,
    windowSec: 15 * 60,
  });
  if (!credentialLimit.ok) {
    return rateLimitedRedirect(request, credentialLimit.retryAfterSec);
  }

  const result = issueAdminPortalSession(
    typeof email === "string" ? email : "",
    typeof password === "string" ? password : "",
  );

  if (!result.ok) {
    const q =
      result.issue === "bad_credentials"
        ? "error=invalid"
        : result.issue === "missing_fields"
          ? "error=fields"
          : "error=config";
    return NextResponse.redirect(loginUrl(request, q), 303);
  }

  const secure = isHttpsRequest(request);
  const res = NextResponse.redirect(new URL("/admin", request.url), 303);
  /**
   * Only one `Set-Cookie` on success. Safari was observed failing to keep the
   * session when this response also cleared legacy paths (multiple Set-Cookie
   * lines). Stale `/admin/member-portal` cookies are still cleared on the next
   * admin GET by proxy.
   */
  res.cookies.set(ADMIN_PORTAL_COOKIE_NAME, result.value.token, {
    ...adminCookieBase({ secure }),
    maxAge: result.value.maxAgeSec,
  });
  applyRateLimitHeaders(res.headers, credentialLimit);
  return res;
}

export function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Use the admin sign-in form." },
    { status: 405, headers: { Allow: "POST" } },
  );
}
