import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://angelpawshouston.com";
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
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
