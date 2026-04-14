import { createHmac, timingSafeEqual } from "node:crypto";

export const MEMBER_PORTAL_COOKIE_NAME = "ap_member_portal";

function signExpiry(expMs: number, secret: string): string {
  return createHmac("sha256", secret)
    .update(`member_portal|${expMs}`)
    .digest("base64url");
}

export function createSessionToken(expMs: number, secret: string): string {
  const sig = signExpiry(expMs, secret);
  const payload = JSON.stringify({ exp: expMs, sig });
  return Buffer.from(payload, "utf8").toString("base64url");
}

export function verifySessionToken(token: string, secret: string): boolean {
  try {
    const raw = Buffer.from(token, "base64url").toString("utf8");
    const parsed = JSON.parse(raw) as { exp?: unknown; sig?: unknown };
    if (typeof parsed.exp !== "number" || typeof parsed.sig !== "string") {
      return false;
    }
    if (!Number.isFinite(parsed.exp) || Date.now() > parsed.exp) {
      return false;
    }
    const expected = signExpiry(parsed.exp, secret);
    const a = Buffer.from(parsed.sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length) {
      return false;
    }
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function safePasswordEqual(input: string, expected: string): boolean {
  const a = Buffer.from(input, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length) {
    return false;
  }
  return timingSafeEqual(a, b);
}
