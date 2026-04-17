import { cookies, headers } from "next/headers";
import { getAdminPortalEnv } from "@/lib/memberPortal/adminEnv";
import { getMemberPortalEnv } from "@/lib/memberPortal/env";
import { getAdminSession } from "@/lib/memberPortal/getAdminSession";
import { ADMIN_PORTAL_COOKIE_NAME } from "@/lib/memberPortal/adminSession";

export type LoginDebugSnapshot = {
  at: string;
  host: string | null;
  forwardedHost: string | null;
  forwardedProto: string | null;
  userAgent: string | null;
  cookieHeaderLength: number;
  apAdminPortalSegmentsInCookieHeader: number;
  jarApAdminTokenLength: number;
  sessionOk: boolean;
  memberPortalEnvOk: boolean;
  adminPortalEnvOk: boolean;
  vercelGitSha: string | null;
};

/**
 * Non-secret request/env snapshot for troubleshooting admin login.
 * Call only behind `ADMIN_LOGIN_DEBUG_KEY` (see `/api/admin/login-debug`).
 */
export async function buildLoginDebugSnapshot(): Promise<LoginDebugSnapshot> {
  const h = await headers();
  const jar = await cookies();
  const cookieHeader = h.get("cookie") ?? h.get("Cookie") ?? "";
  const jarTok = jar.get(ADMIN_PORTAL_COOKIE_NAME)?.value;

  let apAdminPortalSegmentsInCookieHeader = 0;
  const prefix = `${ADMIN_PORTAL_COOKIE_NAME}=`;
  for (const part of cookieHeader.split(";")) {
    if (part.trim().startsWith(prefix)) {
      apAdminPortalSegmentsInCookieHeader += 1;
    }
  }

  const session = await getAdminSession();
  const member = getMemberPortalEnv();
  const admin = getAdminPortalEnv();

  return {
    at: new Date().toISOString(),
    host: h.get("host"),
    forwardedHost: h.get("x-forwarded-host"),
    forwardedProto: h.get("x-forwarded-proto"),
    userAgent: h.get("user-agent"),
    cookieHeaderLength: cookieHeader.length,
    apAdminPortalSegmentsInCookieHeader,
    jarApAdminTokenLength: typeof jarTok === "string" ? jarTok.length : 0,
    sessionOk: session !== null,
    memberPortalEnvOk: member.ok,
    adminPortalEnvOk: admin.ok,
    vercelGitSha: process.env.VERCEL_GIT_COMMIT_SHA ?? null,
  };
}
