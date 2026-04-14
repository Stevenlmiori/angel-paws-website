import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteIndexable = process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true";

  return {
    rules: {
      userAgent: "*",
      allow: siteIndexable ? "/" : [],
      disallow: ["/members/portal/", "/admin/", "/private/"],
    },
    sitemap: "https://angelpawshouston.com/sitemap.xml",
  };
}
