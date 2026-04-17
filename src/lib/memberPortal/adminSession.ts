import { createHmac, timingSafeEqual } from "node:crypto";

export { ADMIN_PORTAL_COOKIE_NAME } from "./adminPortalCookieName";

function adminSign(expMs: number, emailNorm: string, secret: string): string {
  return createHmac("sha256", secret)
    .update(`ap_admin|${emailNorm}|${expMs}`)
    .digest("base64url");
}

export function createAdminSessionToken(
  expMs: number,
  emailNorm: string,
  secret: string,
): string {
  const sig = adminSign(expMs, emailNorm, secret);
  const payload = JSON.stringify({ exp: expMs, em: emailNorm, sig });
  return Buffer.from(payload, "utf8").toString("base64url");
}

export function verifyAdminSessionToken(
  token: string,
  secret: string,
): { emailNorm: string } | null {
  try {
    const raw = Buffer.from(token, "base64url").toString("utf8");
    const parsed = JSON.parse(raw) as {
      exp?: unknown;
      em?: unknown;
      sig?: unknown;
    };
    if (
      typeof parsed.exp !== "number" ||
      typeof parsed.em !== "string" ||
      typeof parsed.sig !== "string"
    ) {
      return null;
    }
    if (!Number.isFinite(parsed.exp) || Date.now() > parsed.exp) {
      return null;
    }
    const emailNorm = parsed.em;
    const expected = adminSign(parsed.exp, emailNorm, secret);
    const a = Buffer.from(parsed.sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length) {
      return null;
    }
    if (!timingSafeEqual(a, b)) {
      return null;
    }
    return { emailNorm };
  } catch {
    return null;
  }
}
