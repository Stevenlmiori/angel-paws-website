import {
  type StoredPortalResource,
  isPortalIconId,
} from "./resourceTypes";

const MAX_ITEMS = 40;
const MAX_TITLE = 200;
const MAX_DESC = 600;
const MAX_HREF = 2048;
const MAX_ID = 80;

function isAllowedHref(href: string): boolean {
  const t = href.trim();
  if (t.length === 0 || t.length > MAX_HREF) {
    return false;
  }
  if (t.startsWith("/") && !t.startsWith("//")) {
    return true;
  }
  try {
    const u = new URL(t);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

export function parseStoredPortalResources(
  raw: unknown,
): StoredPortalResource[] | null {
  if (!Array.isArray(raw)) {
    return null;
  }
  if (raw.length > MAX_ITEMS) {
    return null;
  }
  const out: StoredPortalResource[] = [];
  const seenIds = new Set<string>();

  for (const row of raw) {
    if (!isPlainObject(row)) {
      return null;
    }
    const id = row.id;
    const title = row.title;
    const description = row.description;
    const href = row.href;
    const external = row.external;
    const iconId = row.iconId;

    if (typeof id !== "string" || id.length === 0 || id.length > MAX_ID) {
      return null;
    }
    if (seenIds.has(id)) {
      return null;
    }
    seenIds.add(id);

    if (typeof title !== "string" || title.length === 0 || title.length > MAX_TITLE) {
      return null;
    }
    if (typeof description !== "string" || description.length > MAX_DESC) {
      return null;
    }
    if (typeof href !== "string" || !isAllowedHref(href)) {
      return null;
    }
    if (typeof external !== "boolean") {
      return null;
    }
    if (typeof iconId !== "string" || !isPortalIconId(iconId)) {
      return null;
    }

    out.push({
      id,
      title: title.trim(),
      description: description.trim(),
      href: href.trim(),
      external,
      iconId,
    });
  }

  return out;
}

export function parsePortalResourcesJsonString(
  json: string,
): StoredPortalResource[] | null {
  try {
    const data: unknown = JSON.parse(json);
    return parseStoredPortalResources(data);
  } catch {
    return null;
  }
}
