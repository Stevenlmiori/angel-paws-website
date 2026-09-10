export type StoredTestimonial = {
  id: string;
  quote: string;
  attribution: string;
  role?: string;
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
  active: boolean;
};

function isAllowedTestimonialImage(src: string): boolean {
  if (src === "") {
    return true;
  }
  if (src.startsWith("/img/")) {
    return true;
  }
  try {
    const url = new URL(src);
    return url.protocol === "https:" && url.hostname === "cdn.sanity.io";
  } catch {
    return false;
  }
}

function isImagePosition(value: string): boolean {
  if (value === "") {
    return true;
  }
  const match = value.match(/^(\d{1,3})%\s+(\d{1,3})%$/);
  if (!match) {
    return false;
  }
  return Number(match[1]) <= 100 && Number(match[2]) <= 100;
}

export function isStoredTestimonial(value: unknown): value is StoredTestimonial {
  if (!value || typeof value !== "object") {
    return false;
  }
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    v.id.length > 0 &&
    typeof v.quote === "string" &&
    v.quote.trim().length > 0 &&
    typeof v.attribution === "string" &&
    v.attribution.trim().length > 0 &&
    (v.role === undefined || typeof v.role === "string") &&
    (v.image === undefined ||
      (typeof v.image === "string" && isAllowedTestimonialImage(v.image))) &&
    (v.imageAlt === undefined || typeof v.imageAlt === "string") &&
    (v.imagePosition === undefined ||
      (typeof v.imagePosition === "string" && isImagePosition(v.imagePosition))) &&
    typeof v.active === "boolean"
  );
}

export function parseStoredTestimonials(data: unknown): StoredTestimonial[] | null {
  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }
  const items = data.filter(isStoredTestimonial);
  return items.length > 0 ? items : null;
}
