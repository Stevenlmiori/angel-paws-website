import {
  ADMIN_PORTAL_COOKIE_NAME,
  LEGACY_ADMIN_PORTAL_COOKIE_NAMES,
} from "@/lib/memberPortal/adminPortalCookieName";

/**
 * Admin session uses `path: "/"` so the browser reliably stores and sends it
 * after `Set-Cookie` on `/api/admin/login` (narrow paths like `/admin` can
 * fail to apply or match consistently on some redirects).
 */
export const ADMIN_SESSION_COOKIE_PATH = "/";

/** Paths we used before `path: "/"`; cleared on login success and logout. */
export const LEGACY_ADMIN_PORTAL_COOKIE_PATHS = ["/admin", "/admin/member-portal"] as const;

/** Paths where retired cookie names may still exist (middleware / logout). */
const LEGACY_COOKIE_NAME_PATHS = ["/", "/admin", "/admin/member-portal"] as const;

/** Optional e.g. `angelpawshouston.com` so `www` and apex share one session cookie. */
export function adminSessionCookieDomain(): string | undefined {
  const d = process.env.ADMIN_SESSION_COOKIE_DOMAIN?.trim();
  return d || undefined;
}

export function adminCookieBase(overrides?: { secure?: boolean }) {
  const domain = adminSessionCookieDomain();
  return {
    path: ADMIN_SESSION_COOKIE_PATH,
    sameSite: "lax" as const,
    httpOnly: true,
    secure: overrides?.secure ?? process.env.NODE_ENV === "production",
    ...(domain ? { domain } : {}),
  };
}

type CookieOpts = {
  path: string;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax";
  secure: boolean;
  domain?: string;
};

type CookieSetter = (name: string, value: string, options: CookieOpts) => void;

function withDomain<T extends Omit<CookieOpts, "domain">>(base: T): T & { domain?: string } {
  const domain = adminSessionCookieDomain();
  return domain ? { ...base, domain } : base;
}

/** Strip retired cookie names (`ap_admin_portal`, etc.) so they cannot shadow the current session. */
export function expireObsoleteAdminPortalCookieNames(
  setCookie: CookieSetter,
  secure: boolean,
) {
  for (const legacyName of LEGACY_ADMIN_PORTAL_COOKIE_NAMES) {
    for (const path of LEGACY_COOKIE_NAME_PATHS) {
      setCookie(
        legacyName,
        "",
        withDomain({
          maxAge: 0,
          httpOnly: true,
          sameSite: "lax",
          secure,
          path,
        }),
      );
    }
  }
}

/** Remove path-scoped copies of the admin cookie (older deployments). */
export function expireLegacyAdminPortalCookiePaths(
  setCookie: CookieSetter,
  secure: boolean,
) {
  for (const path of LEGACY_ADMIN_PORTAL_COOKIE_PATHS) {
    setCookie(
      ADMIN_PORTAL_COOKIE_NAME,
      "",
      withDomain({
        maxAge: 0,
        httpOnly: true,
        sameSite: "lax",
        secure,
        path,
      }),
    );
  }
}

/** Clear the admin session everywhere this app may have set it. */
export function expireAllAdminPortalCookiePaths(
  setCookie: CookieSetter,
  secure: boolean,
) {
  setCookie(
    ADMIN_PORTAL_COOKIE_NAME,
    "",
    withDomain({
      maxAge: 0,
      httpOnly: true,
      sameSite: "lax",
      secure,
      path: "/",
    }),
  );
  for (const path of LEGACY_ADMIN_PORTAL_COOKIE_PATHS) {
    setCookie(
      ADMIN_PORTAL_COOKIE_NAME,
      "",
      withDomain({
        maxAge: 0,
        httpOnly: true,
        sameSite: "lax",
        secure,
        path,
      }),
    );
  }
  for (const legacyName of LEGACY_ADMIN_PORTAL_COOKIE_NAMES) {
    for (const path of LEGACY_COOKIE_NAME_PATHS) {
      setCookie(
        legacyName,
        "",
        withDomain({
          maxAge: 0,
          httpOnly: true,
          sameSite: "lax",
          secure,
          path,
        }),
      );
    }
  }
}
