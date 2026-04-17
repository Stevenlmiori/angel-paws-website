import { NextResponse } from "next/server";
import {
  adminCookieBase,
  expireLegacyAdminPortalCookiePaths,
} from "@/lib/memberPortal/adminCookie";
import { issueAdminPortalSession } from "@/lib/memberPortal/issueAdminPortalSession";
import { ADMIN_PORTAL_COOKIE_NAME } from "@/lib/memberPortal/adminSession";

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

export async function POST(request: Request) {
  if (!sameOriginOk(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.redirect(loginUrl(request, "error=fields"), 303);
  }

  const email = formData.get("email");
  const password = formData.get("password");
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

  const secure = new URL(request.url).protocol === "https:";
  const res = NextResponse.redirect(new URL("/admin", request.url), 303);
  expireLegacyAdminPortalCookiePaths(
    (name, value, options) => res.cookies.set(name, value, options),
    secure,
  );
  res.cookies.set(ADMIN_PORTAL_COOKIE_NAME, result.value.token, {
    ...adminCookieBase({ secure }),
    maxAge: result.value.maxAgeSec,
  });
  return res;
}

export function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Use the admin sign-in form." },
    { status: 405, headers: { Allow: "POST" } },
  );
}
