import { MetadataRoute } from "next";
import { sanityReadClient } from "@/lib/sanity/client";
import { storySlugsQuery } from "@/lib/sanity/queries";

const baseUrl = "https://angelpawshouston.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const routes = [
    "",
    "/about",
    "/what-is-pet-therapy",
    "/where-we-serve",
    "/get-involved",
    "/meet-the-board",
    "/members",
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
  if (!client) {
    return staticEntries;
  }

  try {
    const slugs = await client.fetch<string[]>(storySlugsQuery);
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
