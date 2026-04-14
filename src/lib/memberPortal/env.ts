const DEFAULT_MAX_AGE_SEC = 60 * 60 * 24 * 7; // 7 days

export type MemberPortalEnv = {
  password: string;
  cookieSecret: string;
  maxAgeSec: number;
};

function readMaxAgeSec(): number {
  const raw = process.env.MEMBER_PORTAL_SESSION_MAX_AGE_SECONDS;
  if (!raw) {
    return DEFAULT_MAX_AGE_SEC;
  }
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n) || n < 60 || n > 60 * 60 * 24 * 90) {
    return DEFAULT_MAX_AGE_SEC;
  }
  return n;
}

export function getMemberPortalEnv():
  | { ok: true; value: MemberPortalEnv }
  | { ok: false; reason: "missing_password" | "missing_cookie_secret" } {
  const password = process.env.MEMBER_PORTAL_PASSWORD ?? "";
  const cookieSecret = process.env.MEMBER_PORTAL_COOKIE_SECRET ?? "";

  if (!password) {
    return { ok: false, reason: "missing_password" };
  }
  if (!cookieSecret || cookieSecret.length < 16) {
    return { ok: false, reason: "missing_cookie_secret" };
  }

  return {
    ok: true,
    value: {
      password,
      cookieSecret,
      maxAgeSec: readMaxAgeSec(),
    },
  };
}
