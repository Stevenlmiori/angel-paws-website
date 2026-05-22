import { MetadataRoute } from "next";
import { sanityReadClient } from "@/lib/sanity/client";
import { storySlugsQuery } from "@/lib/sanity/queries";
import { getLocalStorySlugs } from "@/lib/stories/localStories";
import { siteUnderConstruction } from "@/lib/siteFlags";

const baseUrl = "https://www.angelpawspettherapy.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (siteUnderConstruction()) {
    return [];
  }

  const lastModified = new Date();

  const routes = [
    "",
    "/about",
    "/what-is-pet-therapy",
    "/where-we-serve",
    "/meet-the-board",
    "/contact",
    "/donate",
    "/stories",
  ];

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : route === "/stories" ? 0.85 : 0.8,
  }));

  const client = sanityReadClient();
  let slugs = getLocalStorySlugs();
  if (!client) {
    return [
      ...staticEntries,
      ...slugs.map((slug) => ({
        url: `${baseUrl}/stories/${slug}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.65,
      })),
    ];
  }

  try {
    slugs = Array.from(
      new Set([...slugs, ...(await client.fetch<string[]>(storySlugsQuery))]),
    );
    const storyEntries: MetadataRoute.Sitemap = slugs.map((slug) => ({
      url: `${baseUrl}/stories/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    }));
    return [...staticEntries, ...storyEntries];
  } catch {
    return staticEntries;
  }
}
