export type StoredGalleryImage = {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  active: boolean;
};

export function isStoredGalleryImage(value: unknown): value is StoredGalleryImage {
  if (!value || typeof value !== "object") {
    return false;
  }
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    v.id.length > 0 &&
    typeof v.src === "string" &&
    (v.src.startsWith("/gallery/") ||
      v.src.startsWith("/img/") ||
      v.src.startsWith("/img/debbie/")) &&
    typeof v.alt === "string" &&
    v.alt.trim().length > 0 &&
    (v.caption === undefined || typeof v.caption === "string") &&
    typeof v.active === "boolean"
  );
}

export function parseStoredGalleryImages(
  data: unknown,
): StoredGalleryImage[] | null {
  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }
  const items = data.filter(isStoredGalleryImage);
  return items.length > 0 ? items : null;
}
