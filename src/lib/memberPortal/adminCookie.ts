/** Admin session cookie applies to all operator routes under `/admin`. */
export const ADMIN_SESSION_COOKIE_PATH = "/admin";

export function adminCookieBase() {
  return {
    path: ADMIN_SESSION_COOKIE_PATH,
    sameSite: "lax" as const,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };
}
