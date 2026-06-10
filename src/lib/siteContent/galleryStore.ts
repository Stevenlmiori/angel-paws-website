import { DEFAULT_GALLERY_IMAGES } from "./galleryDefaults";
import {
  loadJsonFromLocalFile,
  loadJsonFromRedis,
  persistJson,
  type PersistJsonResult,
} from "./redisJsonStore";
import {
  parseStoredGalleryImages,
  type StoredGalleryImage,
} from "./galleryTypes";

const REDIS_KEY = "angel-paws:site:gallery:v1";
const LOCAL_RELATIVE = [".data", "site-gallery.json"] as const;

export async function loadStoredGalleryImages(): Promise<StoredGalleryImage[]> {
  const fromRedis = await loadJsonFromRedis<unknown>(REDIS_KEY);
  if (fromRedis) {
    const parsed = parseStoredGalleryImages(fromRedis);
    if (parsed) {
      return parsed;
    }
  }

  const fromFile = await loadJsonFromLocalFile(
    LOCAL_RELATIVE,
    parseStoredGalleryImages,
  );
  if (fromFile) {
    return fromFile;
  }

  return DEFAULT_GALLERY_IMAGES.map((img) => ({ ...img }));
}

export async function loadActiveGalleryImages(): Promise<StoredGalleryImage[]> {
  return (await loadStoredGalleryImages()).filter((img) => img.active);
}

export async function persistGalleryImages(
  items: StoredGalleryImage[],
): Promise<PersistJsonResult> {
  return persistJson(REDIS_KEY, LOCAL_RELATIVE, items, (data): data is StoredGalleryImage[] =>
    parseStoredGalleryImages(data) !== null,
  );
}
