import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { Redis } from "@upstash/redis";
import { DEFAULT_PORTAL_RESOURCES } from "./defaults";
import type { StoredPortalResource } from "./resourceTypes";
import {
  parsePortalResourcesJsonString,
  parseStoredPortalResources,
} from "./validatePortalResources";

const REDIS_KEY = "angel-paws:member-portal:resources:v1";
const REDIS_HEARTBEAT_KEY = "angel-paws:ops:redis-heartbeat:v1";
const LOCAL_RELATIVE = [".data", "member-portal-resources.json"] as const;

/** IDs from the pre-Debbie placeholder list that was seeded into Redis. */
const LEGACY_PLACEHOLDER_IDS = new Set([
  "how-to-become-involved",
  "policies",
  "forms-templates",
  "wellness",
  "incident",
  "roster",
]);

/**
 * True when Redis/file still holds only the old stub list (generic Drive/Forms
 * URLs). Those rows must not block the shipped eight-document defaults.
 */
export function isLegacyPlaceholderPortalList(
  items: StoredPortalResource[],
): boolean {
  if (items.length === 0) {
    return false;
  }
  return items.every((item) => LEGACY_PLACEHOLDER_IDS.has(item.id));
}

function cloneDefaults(): StoredPortalResource[] {
  return DEFAULT_PORTAL_RESOURCES.map((r) => ({ ...r }));
}

function getRedisCredentials(): { url: string; token: string } | null {
  const pairs: Array<[string | undefined, string | undefined]> = [
    [process.env.UPSTASH_REDIS_REST_URL, process.env.UPSTASH_REDIS_REST_TOKEN],
    // Vercel “KV” / Redis marketplace integration (Upstash under the hood)
    [process.env.KV_REST_API_URL, process.env.KV_REST_API_TOKEN],
    // Some Vercel storage wizards use a custom prefix; values must still be https REST URL + token.
    [process.env.STORAGE_URL, process.env.STORAGE_TOKEN],
  ];
  for (const [url, token] of pairs) {
    if (
      typeof url === "string" &&
      typeof token === "string" &&
      url.startsWith("https://") &&
      token.length > 8
    ) {
      return { url, token };
    }
  }
  return null;
}

function getRedis(): Redis | null {
  const cred = getRedisCredentials();
  if (!cred) {
    return null;
  }
  return new Redis({ url: cred.url, token: cred.token });
}

function localDataPath(): string {
  return path.join(/* turbopackIgnore: true */ process.cwd(), ...LOCAL_RELATIVE);
}

async function loadFromRedis(): Promise<StoredPortalResource[] | null> {
  const redis = getRedis();
  if (!redis) {
    return null;
  }
  const raw = await redis.get<string>(REDIS_KEY);
  if (raw == null || raw === "") {
    return null;
  }
  const parsed = parsePortalResourcesJsonString(raw);
  if (!parsed) {
    return null;
  }
  return parsed;
}

async function loadFromLocalFile(): Promise<StoredPortalResource[] | null> {
  if (process.env.NODE_ENV === "production") {
    return null;
  }
  try {
    const buf = await readFile(localDataPath(), "utf8");
    const data: unknown = JSON.parse(buf);
    const parsed = parseStoredPortalResources(data);
    if (!parsed) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export async function loadStoredPortalResources(): Promise<
  StoredPortalResource[]
> {
  const fromRedis = await loadFromRedis();
  if (fromRedis !== null) {
    if (isLegacyPlaceholderPortalList(fromRedis)) {
      const next = cloneDefaults();
      // Best-effort overwrite so Admin/public stop serving stubs after deploy.
      void persistPortalResources(next);
      return next;
    }
    return fromRedis;
  }
  const fromFile = await loadFromLocalFile();
  if (fromFile !== null) {
    if (isLegacyPlaceholderPortalList(fromFile)) {
      const next = cloneDefaults();
      void persistPortalResources(next);
      return next;
    }
    return fromFile;
  }
  return cloneDefaults();
}

export type PersistPortalResult =
  | { ok: true }
  | {
      ok: false;
      error:
        | "no_storage"
        | "redis_write_failed"
        | "file_write_failed"
        | "invalid_payload";
    };

export async function persistPortalResources(
  items: StoredPortalResource[],
): Promise<PersistPortalResult> {
  const redis = getRedis();
  const payload = JSON.stringify(items);

  if (redis) {
    try {
      await redis.set(REDIS_KEY, payload);
      return { ok: true };
    } catch {
      return { ok: false, error: "redis_write_failed" };
    }
  }

  if (process.env.NODE_ENV === "production") {
    return { ok: false, error: "no_storage" };
  }

  try {
    const dir = path.join(process.cwd(), ".data");
    await mkdir(dir, { recursive: true });
    await writeFile(localDataPath(), payload, "utf8");
    return { ok: true };
  } catch {
    return { ok: false, error: "file_write_failed" };
  }
}

export async function writeRedisHeartbeat(): Promise<
  { ok: true } | { ok: false; error: "no_storage" | "redis_write_failed" }
> {
  const redis = getRedis();
  if (!redis) {
    return { ok: false, error: "no_storage" };
  }

  try {
    await redis.set(
      REDIS_HEARTBEAT_KEY,
      JSON.stringify({ ts: new Date().toISOString(), source: "vercel-cron" }),
    );
    return { ok: true };
  } catch {
    return { ok: false, error: "redis_write_failed" };
  }
}
