import { timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { getMemberPortalEnv } from "./env";
import { getAdminPortalEnv } from "./adminEnv";
import {
  ADMIN_PORTAL_COOKIE_NAME,
  verifyAdminSessionToken,
} from "./adminSession";

function safeEmailNormEqual(a: string, b: string): boolean {
  const x = Buffer.from(a, "utf8");
  const y = Buffer.from(b, "utf8");
  if (x.length !== y.length) {
    return false;
  }
  return timingSafeEqual(x, y);
}

export async function getAdminSession(): Promise<{ emailNorm: string } | null> {
  const adminEnv = getAdminPortalEnv();
  if (!adminEnv.ok) {
    return null;
  }
  const member = getMemberPortalEnv();
  if (!member.ok) {
    return null;
  }
  const jar = await cookies();
  const token = jar.get(ADMIN_PORTAL_COOKIE_NAME)?.value;
  if (typeof token !== "string") {
    return null;
  }
  const verified = verifyAdminSessionToken(token, member.value.cookieSecret);
  if (!verified) {
    return null;
  }
  if (!safeEmailNormEqual(verified.emailNorm, adminEnv.value.emailNorm)) {
    return null;
  }
  return { emailNorm: verified.emailNorm };
}
