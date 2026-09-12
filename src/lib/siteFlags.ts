/**
 * When true on the server/build (set in Vercel production), proxy rewrites
 * nearly all routes to `/under-construction`. Omit or `false` locally for normal dev.
 *
 * Must stay `NEXT_PUBLIC_*` so proxy + layouts agree at runtime on Vercel.
 */
export function siteUnderConstruction(): boolean {
  return process.env.NEXT_PUBLIC_UNDER_CONSTRUCTION === "true";
}

/**
 * Public search indexing. Default **on** after launch (robots allow, sitemap filled,
 * no X-Robots-Tag noindex). Set `NEXT_PUBLIC_SITE_INDEXABLE=false` to pause indexing
 * without taking the site offline. Under-construction mode always disables indexing.
 */
export function siteIndexable(): boolean {
  if (siteUnderConstruction()) {
    return false;
  }
  return process.env.NEXT_PUBLIC_SITE_INDEXABLE !== "false";
}
