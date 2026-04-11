import type { MetadataRoute } from "next";

function siteIndexable(): boolean {
  return process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true";
}

/** Block crawlers until launch; set `NEXT_PUBLIC_SITE_INDEXABLE=true` when ready. */
export default function robots(): MetadataRoute.Robots {
  if (siteIndexable()) {
    return {
      rules: [{ userAgent: "*", allow: "/" }],
    };
  }
  return {
    rules: [{ userAgent: "*", disallow: "/" }],
  };
}
