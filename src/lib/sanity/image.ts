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

type ImageBuilder = NonNullable<ReturnType<typeof urlForImage>>;

/**
 * Build a final image URL without throwing. `@sanity/image-url` throws on `.url()`
 * when the asset ref is missing, empty, or malformed — common for inline PT images
 * or drafts — which would otherwise crash the Server Component (HTTP 500).
 */
export function safeSanityImageUrl(
  source: Parameters<typeof urlForImage>[0] | null | undefined,
  configure: (b: ImageBuilder) => ImageBuilder,
): string | null {
  try {
    const b = urlForImage(source as Parameters<typeof urlForImage>[0]);
    if (!b) {
      return null;
    }
    const u = configure(b).url();
    return typeof u === "string" && /^https?:\/\//.test(u) ? u : null;
  } catch {
    return null;
  }
}
