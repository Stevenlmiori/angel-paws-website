import {
  isExcludedGalleryImage,
} from "./excludedGalleryImages";
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
import { sanityReadClient, sanityWriteClient } from "@/lib/sanity/client";

const REDIS_KEY = "angel-paws:site:gallery:v2";
const LOCAL_RELATIVE = [".data", "site-gallery.json"] as const;
const SANITY_DOCUMENT_ID = "site-gallery-settings";

async function loadGalleryFromSanity(): Promise<StoredGalleryImage[] | null> {
  const client = sanityReadClient();
  if (!client) return null;

  try {
    const data = await client.fetch<unknown>(
      `*[_id == $id][0].items`,
      { id: SANITY_DOCUMENT_ID },
    );
    return parseStoredGalleryImages(data);
  } catch {
    return null;
  }
}

async function persistGalleryToSanity(
  items: StoredGalleryImage[],
): Promise<boolean> {
  const client = sanityWriteClient();
  if (!client) return false;

  try {
    await client.createOrReplace({
      _id: SANITY_DOCUMENT_ID,
      _type: "siteGallerySettings",
      items: items.map((item) => ({ ...item, _key: item.id })),
    });
    return true;
  } catch {
    return false;
  }
}

export async function loadStoredGalleryImages(): Promise<StoredGalleryImage[]> {
  const fromSanity = await loadGalleryFromSanity();
  if (fromSanity) {
    return fromSanity;
  }

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
  return (await loadStoredGalleryImages()).filter(
    (img) => img.active && !isExcludedGalleryImage(img),
  );
}

export async function persistGalleryImages(
  items: StoredGalleryImage[],
): Promise<PersistJsonResult> {
  if (await persistGalleryToSanity(items)) {
    return { ok: true };
  }

  return persistJson(REDIS_KEY, LOCAL_RELATIVE, items, (data): data is StoredGalleryImage[] =>
    parseStoredGalleryImages(data) !== null,
  );
}
