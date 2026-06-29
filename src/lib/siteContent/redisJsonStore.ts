import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { Redis } from "@upstash/redis";

function getRedisCredentials(): { url: string; token: string } | null {
  const pairs: Array<[string | undefined, string | undefined]> = [
    [process.env.UPSTASH_REDIS_REST_URL, process.env.UPSTASH_REDIS_REST_TOKEN],
    [process.env.KV_REST_API_URL, process.env.KV_REST_API_TOKEN],
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

export type PersistJsonResult =
  | { ok: true }
  | {
      ok: false;
      error:
        | "no_storage"
        | "redis_write_failed"
        | "file_write_failed"
        | "invalid_payload";
    };

export async function loadJsonFromRedis<T>(key: string): Promise<T | null> {
  const redis = getRedis();
  if (!redis) {
    return null;
  }
  const raw = await redis.get<unknown>(key);
  if (raw == null || raw === "") {
    return null;
  }
  if (typeof raw !== "string") {
    return raw as T;
  }
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function loadJsonFromLocalFile<T>(
  relativePath: readonly string[],
  parse: (data: unknown) => T | null,
): Promise<T | null> {
  if (process.env.NODE_ENV === "production") {
    return null;
  }
  try {
    const buf = await readFile(
      path.join(process.cwd(), ...relativePath),
      "utf8",
    );
    const data: unknown = JSON.parse(buf);
    return parse(data);
  } catch {
    return null;
  }
}

export async function persistJson<T>(
  key: string,
  relativePath: readonly string[],
  value: T,
  validate: (data: unknown) => data is T,
): Promise<PersistJsonResult> {
  if (!validate(value)) {
    return { ok: false, error: "invalid_payload" };
  }

  const payload = JSON.stringify(value);
  const redis = getRedis();

  if (redis) {
    try {
      await redis.set(key, value);
      return { ok: true };
    } catch {
      return { ok: false, error: "redis_write_failed" };
    }
  }

  if (process.env.NODE_ENV === "production") {
    return { ok: false, error: "no_storage" };
  }

  try {
    const dir = path.join(process.cwd(), relativePath[0]!);
    await mkdir(dir, { recursive: true });
    await writeFile(
      path.join(process.cwd(), ...relativePath),
      payload,
      "utf8",
    );
    return { ok: true };
  } catch {
    return { ok: false, error: "file_write_failed" };
  }
}
