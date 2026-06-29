import { MetadataRoute } from "next";
import { sanityReadClient } from "@/lib/sanity/client";
import { storySlugsQuery } from "@/lib/sanity/queries";
import { isExcludedSeedStorySlug } from "@/lib/stories/excludedSeedStories";
import { getLocalStorySlugs } from "@/lib/stories/localStories";
import { siteUnderConstruction } from "@/lib/siteFlags";

const baseUrl = "https://www.angelpawspettherapy.com";

const routePriority = new Map<string, number>([
  ["", 1],
  ["/contact", 0.95],
  ["/where-we-serve", 0.95],
  ["/what-is-pet-therapy", 0.9],
  ["/donate", 0.9],
  ["/stories", 0.85],
  ["/photo-gallery", 0.8],
  ["/testimonials", 0.8],
  ["/about", 0.8],
  ["/get-involved", 0.75],
  ["/meet-the-board", 0.7],
]);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (
    siteUnderConstruction() ||
    process.env.NEXT_PUBLIC_SITE_INDEXABLE !== "true"
  ) {
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
    "/photo-gallery",
    "/testimonials",
    "/get-involved",
  ];

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: "monthly",
    priority: routePriority.get(route) ?? 0.7,
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
    ).filter((slug) => !isExcludedSeedStorySlug(slug));
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
