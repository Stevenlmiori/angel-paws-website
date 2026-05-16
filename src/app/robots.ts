import { MetadataRoute } from "next";
import { siteUnderConstruction } from "@/lib/siteFlags";

export default function robots(): MetadataRoute.Robots {
  if (siteUnderConstruction()) {
    return {
      rules: {
        userAgent: "*",
        disallow: ["/"],
      },
    };
  }

  const siteIndexable = process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true";

  return {
    rules: {
      userAgent: "*",
      allow: siteIndexable ? "/" : [],
      disallow: ["/members/portal/", "/admin/", "/private/"],
    },
    sitemap: "https://www.angelpawspettherapy.com/sitemap.xml",
  };
}
