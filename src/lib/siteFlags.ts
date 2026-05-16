/**
 * When true on the server/build (set in Vercel production), middleware rewrites
 * nearly all routes to `/under-construction`. Omit or `false` locally for normal dev.
 *
 * Must stay `NEXT_PUBLIC_*` so middleware + layouts agree at runtime on Vercel.
 */
export function siteUnderConstruction(): boolean {
  return process.env.NEXT_PUBLIC_UNDER_CONSTRUCTION === "true";
}
