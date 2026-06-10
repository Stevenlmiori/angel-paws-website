import { DEFAULT_TESTIMONIALS } from "./testimonialDefaults";
import {
  loadJsonFromLocalFile,
  loadJsonFromRedis,
  persistJson,
  type PersistJsonResult,
} from "./redisJsonStore";
import {
  parseStoredTestimonials,
  type StoredTestimonial,
} from "./testimonialTypes";

const REDIS_KEY = "angel-paws:site:testimonials:v1";
const LOCAL_RELATIVE = [".data", "site-testimonials.json"] as const;

export async function loadStoredTestimonials(): Promise<StoredTestimonial[]> {
  const fromRedis = await loadJsonFromRedis<unknown>(REDIS_KEY);
  if (fromRedis) {
    const parsed = parseStoredTestimonials(fromRedis);
    if (parsed) {
      return parsed;
    }
  }

  const fromFile = await loadJsonFromLocalFile(LOCAL_RELATIVE, parseStoredTestimonials);
  if (fromFile) {
    return fromFile;
  }

  return DEFAULT_TESTIMONIALS.map((t) => ({ ...t }));
}

export async function loadActiveTestimonials(): Promise<StoredTestimonial[]> {
  return (await loadStoredTestimonials()).filter((t) => t.active);
}

export async function persistTestimonials(
  items: StoredTestimonial[],
): Promise<PersistJsonResult> {
  return persistJson(REDIS_KEY, LOCAL_RELATIVE, items, (data): data is StoredTestimonial[] =>
    parseStoredTestimonials(data) !== null,
  );
}
