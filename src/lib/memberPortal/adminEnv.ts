import { timingSafeEqual } from "node:crypto";
import { getMemberPortalEnv } from "./env";
import { safePasswordEqual } from "./session";

const DEFAULT_ADMIN_MAX_AGE_SEC = 60 * 60 * 24 * 14; // 14 days

function readAdminMaxAgeSec(): number {
  const raw = process.env.MEMBER_PORTAL_ADMIN_SESSION_MAX_AGE_SECONDS;
  if (!raw) {
    return DEFAULT_ADMIN_MAX_AGE_SEC;
  }
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n) || n < 300 || n > 60 * 60 * 24 * 60) {
    return DEFAULT_ADMIN_MAX_AGE_SEC;
  }
  return n;
}

export function normalizeAdminEmail(email: string): string {
  return email.trim().toLowerCase();
}

function safeEmailEqual(inputNorm: string, expectedNorm: string): boolean {
  const a = Buffer.from(inputNorm, "utf8");
  const b = Buffer.from(expectedNorm, "utf8");
  if (a.length !== b.length) {
    return false;
  }
  return timingSafeEqual(a, b);
}

export type AdminPortalEnv = {
  emailNorm: string;
  password: string;
  maxAgeSec: number;
};

export function getAdminPortalEnv():
  | { ok: true; value: AdminPortalEnv }
  | {
      ok: false;
      reason:
        | "missing_member_portal"
        | "missing_admin_email"
        | "missing_admin_password";
    } {
  const member = getMemberPortalEnv();
  if (!member.ok) {
    return { ok: false, reason: "missing_member_portal" };
  }

  const email = process.env.MEMBER_PORTAL_ADMIN_EMAIL ?? "";
  const password = process.env.MEMBER_PORTAL_ADMIN_PASSWORD ?? "";

  if (!email.trim()) {
    return { ok: false, reason: "missing_admin_email" };
  }
  if (!password) {
    return { ok: false, reason: "missing_admin_password" };
  }

  return {
    ok: true,
    value: {
      emailNorm: normalizeAdminEmail(email),
      password,
      maxAgeSec: readAdminMaxAgeSec(),
    },
  };
}

export function adminCredentialsMatch(
  emailInput: string,
  passwordInput: string,
  env: AdminPortalEnv,
): boolean {
  const emailNorm = normalizeAdminEmail(emailInput);
  if (!safeEmailEqual(emailNorm, env.emailNorm)) {
    return false;
  }
  return safePasswordEqual(passwordInput, env.password);
}
