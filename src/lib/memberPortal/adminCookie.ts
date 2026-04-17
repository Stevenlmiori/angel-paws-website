/** Must match `ADMIN_PORTAL_COOKIE_NAME` in `adminSession.ts` (avoid importing that file here: it pulls `node:crypto` into Edge middleware). */
const ADMIN_PORTAL_COOKIE_NAME = "ap_admin_portal";

/**
 * Admin session uses `path: "/"` so the browser reliably stores and sends it
 * after `Set-Cookie` on `/api/admin/login` (narrow paths like `/admin` can
 * fail to apply or match consistently on some redirects).
 */
export const ADMIN_SESSION_COOKIE_PATH = "/";

/** Paths we used before `path: "/"`; cleared once on successful login. */
export const LEGACY_ADMIN_PORTAL_COOKIE_PATHS = ["/admin", "/admin/member-portal"] as const;

/**
 * Very old sessions scoped only to the login URL path. Safe to clear on every
 * admin GET — that path never holds the current `path: "/"` session cookie.
 *
 * Do **not** clear `Path=/admin` on every request: that sends a second
 * `ap_admin_portal` cookie (empty) alongside `Path=/`, and Safari can send
 * duplicates so `cookies().get` reads the wrong value and sign-in fails.
 */
export const STALE_LOGIN_PAGE_ADMIN_COOKIE_PATH = "/admin/member-portal" as const;

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

/** Clear only the obsolete login-page-scoped cookie (middleware, every GET). */
export function expireStaleLoginPageAdminPortalCookie(
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
      path: STALE_LOGIN_PAGE_ADMIN_COOKIE_PATH,
    }),
  );
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
}
