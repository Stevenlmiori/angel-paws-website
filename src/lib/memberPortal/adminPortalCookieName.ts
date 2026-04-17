/**
 * Admin session cookie name (Edge-safe module — no `node:crypto`).
 * Renamed from `ap_admin_portal` so browsers can drop stale / duplicate cookies
 * that were breaking Safari sign-in.
 */
export const ADMIN_PORTAL_COOKIE_NAME = "ap_admin_site_session";

/** Previous name — cleared by middleware so old values cannot shadow the new cookie. */
export const LEGACY_ADMIN_PORTAL_COOKIE_NAMES = ["ap_admin_portal"] as const;
