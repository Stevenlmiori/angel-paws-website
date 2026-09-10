/** Gallery items removed from public display (permission / privacy). */
export const EXCLUDED_GALLERY_IMAGE_IDS = [
  "hope-squad-lexie",
  "sam-alex",
  "kylo-2",
  "ollie-nursing",
  "redeemer",
  "sutherland-springs",
  "kerrville-group",
  "sam-methodist-2",
] as const;

export function isExcludedGalleryImage(
  item: { id: string; src: string },
): boolean {
  if ((EXCLUDED_GALLERY_IMAGE_IDS as readonly string[]).includes(item.id)) {
    return true;
  }
  return item.src.toLowerCase().includes("hope squard");
}
