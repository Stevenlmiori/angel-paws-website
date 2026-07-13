import { DEFAULT_COLORING_PAGES } from "./coloringPageDefaults";
import {
  parseStoredColoringPages,
  toPublicColoringPage,
  type ColoringPage,
  type StoredColoringPage,
} from "./coloringPageTypes";
import {
  loadJsonFromLocalFile,
  loadJsonFromRedis,
  persistJson,
  type PersistJsonResult,
} from "./redisJsonStore";

const REDIS_KEY = "angel-paws:site:coloring-pages:v1";
const LOCAL_RELATIVE = [".data", "site-coloring-pages.json"] as const;

export async function loadStoredColoringPages(): Promise<StoredColoringPage[]> {
  const fromRedis = await loadJsonFromRedis<unknown>(REDIS_KEY);
  if (fromRedis != null) {
    const parsed = parseStoredColoringPages(fromRedis);
    if (parsed !== null) {
      return parsed;
    }
  }

  const fromFile = await loadJsonFromLocalFile(
    LOCAL_RELATIVE,
    parseStoredColoringPages,
  );
  if (fromFile !== null) {
    return fromFile;
  }

  return DEFAULT_COLORING_PAGES.map((page) => ({ ...page }));
}

export async function loadActiveColoringPages(): Promise<ColoringPage[]> {
  return (await loadStoredColoringPages())
    .filter((page) => page.active)
    .map(toPublicColoringPage);
}

export async function getActiveColoringPageBySlug(
  slug: string,
): Promise<ColoringPage | null> {
  const pages = await loadActiveColoringPages();
  return pages.find((page) => page.slug === slug) ?? null;
}

export async function persistColoringPages(
  items: StoredColoringPage[],
): Promise<PersistJsonResult> {
  return persistJson(
    REDIS_KEY,
    LOCAL_RELATIVE,
    items,
    (data): data is StoredColoringPage[] =>
      Array.isArray(data) && parseStoredColoringPages(data) !== null,
  );
}
