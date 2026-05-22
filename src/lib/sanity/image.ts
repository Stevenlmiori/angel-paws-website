import { createImageUrlBuilder } from "@sanity/image-url";
import { getSanityPublicConfig } from "@/lib/sanity/env";

type SanityImageSource = Parameters<
  ReturnType<typeof createImageUrlBuilder>["image"]
>[0];

export function urlForImage(source: SanityImageSource) {
  const cfg = getSanityPublicConfig();
  if (!cfg) {
    return null;
  }
  return createImageUrlBuilder({
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
  source: SanityImageSource | null | undefined,
  configure: (b: ImageBuilder) => ImageBuilder,
): string | null {
  try {
    const b = urlForImage(source as SanityImageSource);
    if (!b) {
      return null;
    }
    const u = configure(b).url();
    return typeof u === "string" && /^https?:\/\//.test(u) ? u : null;
  } catch {
    return null;
  }
}
