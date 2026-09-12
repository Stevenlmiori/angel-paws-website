import { MetadataRoute } from "next";
import { siteIndexable, siteUnderConstruction } from "@/lib/siteFlags";

export default function robots(): MetadataRoute.Robots {
  if (siteUnderConstruction() || !siteIndexable()) {
    return {
      rules: {
        userAgent: "*",
        disallow: ["/"],
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/members/portal", "/admin", "/api/", "/private"],
    },
    sitemap: "https://www.angelpawspettherapy.com/sitemap.xml",
  };
}
