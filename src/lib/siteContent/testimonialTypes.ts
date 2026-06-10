export type StoredTestimonial = {
  id: string;
  quote: string;
  attribution: string;
  role?: string;
  active: boolean;
};

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
