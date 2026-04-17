import imageUrlBuilder from "@sanity/image-url";
import { getSanityPublicConfig } from "@/lib/sanity/env";

export function urlForImage(source: Parameters<ReturnType<typeof imageUrlBuilder>["image"]>[0]) {
  const cfg = getSanityPublicConfig();
  if (!cfg) {
    return null;
  }
  return imageUrlBuilder({
    projectId: cfg.projectId,
    dataset: cfg.dataset,
  })
    .image(source)
    .auto("format")
    .quality(85);
}
