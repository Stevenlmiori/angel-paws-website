import {
  DEE_TURK_TESTIMONIAL,
  DEFAULT_TESTIMONIALS,
  PREVIOUS_DEE_TURK_TESTIMONIAL,
} from "./testimonialDefaults";
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

function applyEditorialUpdates(items: StoredTestimonial[]): StoredTestimonial[] {
  const defaultsById = new Map(DEFAULT_TESTIMONIALS.map((item) => [item.id, item]));
  return items
    .filter(
      (item) =>
        item.id !== "dr-mcgown" &&
        !/jenny\s+mcgown/i.test(item.attribution),
    )
    .map((item) => {
      const fallback = defaultsById.get(item.id);
      if (!fallback) {
        return item;
      }
      return {
        ...item,
        quote:
          item.id === "schultz-elementary" &&
          item.quote === PREVIOUS_DEE_TURK_TESTIMONIAL
            ? DEE_TURK_TESTIMONIAL
            : item.quote,
        image: item.image === undefined ? fallback.image : item.image,
        imageAlt: item.imageAlt === undefined ? fallback.imageAlt : item.imageAlt,
        imagePosition:
          item.imagePosition === undefined
            ? fallback.imagePosition
            : item.imagePosition,
      };
    });
}

export async function loadStoredTestimonials(): Promise<StoredTestimonial[]> {
  const fromRedis = await loadJsonFromRedis<unknown>(REDIS_KEY);
  if (fromRedis) {
    const parsed = parseStoredTestimonials(fromRedis);
    if (parsed) {
      return applyEditorialUpdates(parsed);
    }
  }

  const fromFile = await loadJsonFromLocalFile(LOCAL_RELATIVE, parseStoredTestimonials);
  if (fromFile) {
    return applyEditorialUpdates(fromFile);
  }

  return applyEditorialUpdates(DEFAULT_TESTIMONIALS.map((t) => ({ ...t })));
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
