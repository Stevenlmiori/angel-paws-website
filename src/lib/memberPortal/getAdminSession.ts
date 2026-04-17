import { timingSafeEqual } from "node:crypto";
import { cookies, headers } from "next/headers";
import { getMemberPortalEnv } from "./env";
import { getAdminPortalEnv } from "./adminEnv";
import {
  ADMIN_PORTAL_COOKIE_NAME,
  verifyAdminSessionToken,
} from "./adminSession";

/** Safari can send `name=` and `name=<token>` in one header; parsers may keep only one. */
function adminPortalTokensFromCookieHeader(
  cookieHeader: string | null,
  cookieName: string,
): string[] {
  if (!cookieHeader) {
    return [];
  }
  const out: string[] = [];
  const prefix = `${cookieName}=`;
  for (const part of cookieHeader.split(";")) {
    const segment = part.trim();
    if (!segment.startsWith(prefix)) {
      continue;
    }
    const raw = segment.slice(prefix.length);
    if (!raw) {
      continue;
    }
    try {
      out.push(decodeURIComponent(raw));
    } catch {
      out.push(raw);
    }
  }
  return out;
}

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
  const headerList = await headers();
  const fromJar = jar.get(ADMIN_PORTAL_COOKIE_NAME)?.value;
  const rawCookieHeader =
    headerList.get("cookie") ?? headerList.get("Cookie");
  const fromWire = adminPortalTokensFromCookieHeader(
    rawCookieHeader,
    ADMIN_PORTAL_COOKIE_NAME,
  );

  const candidates: string[] = [];
  const seen = new Set<string>();
  const push = (v: string | undefined) => {
    if (typeof v !== "string") {
      return;
    }
    const t = v.trim();
    if (!t || seen.has(t)) {
      return;
    }
    seen.add(t);
    candidates.push(t);
  };
  push(fromJar);
  for (const v of fromWire) {
    push(v);
  }
  candidates.sort((a, b) => b.length - a.length);

  for (const token of candidates) {
    const verified = verifyAdminSessionToken(token, member.value.cookieSecret);
    if (!verified) {
      continue;
    }
    if (!safeEmailNormEqual(verified.emailNorm, adminEnv.value.emailNorm)) {
      continue;
    }
    return { emailNorm: verified.emailNorm };
  }
  return null;
}
