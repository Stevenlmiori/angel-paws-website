import {
  adminCredentialsMatch,
  getAdminPortalEnv,
  normalizeAdminEmail,
} from "@/lib/memberPortal/adminEnv";
import { createAdminSessionToken } from "@/lib/memberPortal/adminSession";
import { getMemberPortalEnv } from "@/lib/memberPortal/env";

export type AdminPortalLoginIssue =
  | "missing_fields"
  | "not_configured"
  | "bad_credentials";

export type AdminPortalLoginOk = { token: string; maxAgeSec: number };

/**
 * Validates operator credentials and builds a signed admin session token.
 * Used by the login route handler (document POST + redirect) so the session
 * cookie is set on a normal HTTP response, not only a Server Action payload.
 */
export function issueAdminPortalSession(
  email: string,
  password: string,
):
  | { ok: true; value: AdminPortalLoginOk }
  | { ok: false; issue: AdminPortalLoginIssue } {
  if (typeof email !== "string" || typeof password !== "string") {
    return { ok: false, issue: "missing_fields" };
  }
  if (!email.trim() || !password) {
    return { ok: false, issue: "missing_fields" };
  }

  const adminEnv = getAdminPortalEnv();
  if (!adminEnv.ok) {
    return { ok: false, issue: "not_configured" };
  }

  const member = getMemberPortalEnv();
  if (!member.ok) {
    return { ok: false, issue: "not_configured" };
  }

  if (!adminCredentialsMatch(email, password, adminEnv.value)) {
    return { ok: false, issue: "bad_credentials" };
  }

  const expMs = Date.now() + adminEnv.value.maxAgeSec * 1000;
  const token = createAdminSessionToken(
    expMs,
    normalizeAdminEmail(email),
    member.value.cookieSecret,
  );

  return {
    ok: true,
    value: { token, maxAgeSec: adminEnv.value.maxAgeSec },
  };
}
