export type StoredColoringPage = {
  id: string;
  slug: string;
  name: string;
  file: string;
  alt: string;
  active: boolean;
  orientation: "portrait" | "landscape";
};

/** Public / studio shape (active pages only). */
export type ColoringPage = {
  slug: string;
  name: string;
  file: string;
  orientation: "portrait" | "landscape";
  alt: string;
};

function isAllowedColoringSrc(src: string): boolean {
  if (/^data:image\/(?:jpeg|jpg|png|webp);base64,/i.test(src)) {
    return src.length <= 2_500_000;
  }

  if (src.startsWith("/coloring-pages/")) {
    return true;
  }

  try {
    const url = new URL(src);
    return url.protocol === "https:" && url.hostname === "cdn.sanity.io";
  } catch {
    return false;
  }
}

export function isStoredColoringPage(
  value: unknown,
): value is StoredColoringPage {
  if (!value || typeof value !== "object") {
    return false;
  }
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    v.id.length > 0 &&
    typeof v.slug === "string" &&
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v.slug) &&
    typeof v.name === "string" &&
    v.name.trim().length > 0 &&
    typeof v.file === "string" &&
    isAllowedColoringSrc(v.file) &&
    typeof v.alt === "string" &&
    typeof v.active === "boolean" &&
    (v.orientation === "portrait" || v.orientation === "landscape")
  );
}

export function parseStoredColoringPages(
  data: unknown,
): StoredColoringPage[] | null {
  if (!Array.isArray(data)) {
    return null;
  }
  if (data.length === 0) {
    return [];
  }
  const items = data.filter(isStoredColoringPage);
  if (items.length !== data.length) {
    return null;
  }
  const slugs = new Set<string>();
  for (const item of items) {
    if (slugs.has(item.slug)) {
      return null;
    }
    slugs.add(item.slug);
  }
  return items;
}

export function toPublicColoringPage(item: StoredColoringPage): ColoringPage {
  return {
    slug: item.slug,
    name: item.name,
    file: item.file,
    orientation: item.orientation,
    alt: item.alt.trim() || `${item.name} the therapy dog — printable coloring page`,
  };
}

export function slugifyColoringName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

export function uniqueColoringSlug(
  base: string,
  existing: StoredColoringPage[],
  exceptId?: string,
): string {
  const rooted = slugifyColoringName(base) || "coloring-page";
  let candidate = rooted;
  let n = 2;
  while (
    existing.some(
      (item) => item.slug === candidate && item.id !== exceptId,
    )
  ) {
    candidate = `${rooted}-${n}`;
    n += 1;
  }
  return candidate;
}
