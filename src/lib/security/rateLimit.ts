import { createHash } from "node:crypto";
import { Redis } from "@upstash/redis";

type RateLimitOptions = {
  key: string;
  limit: number;
  windowSec: number;
};

type RateLimitResult = {
  ok: boolean;
  limit: number;
  remaining: number;
  retryAfterSec: number;
};

const memoryBuckets = new Map<string, { count: number; resetMs: number }>();

function getRedisCredentials(): { url: string; token: string } | null {
  const pairs = [
    [process.env.UPSTASH_REDIS_REST_URL, process.env.UPSTASH_REDIS_REST_TOKEN],
    [process.env.KV_REST_API_URL, process.env.KV_REST_API_TOKEN],
    [process.env.STORAGE_URL, process.env.STORAGE_TOKEN],
  ];
  for (const [url, token] of pairs) {
    if (
      typeof url === "string" &&
      url.startsWith("https://") &&
      typeof token === "string" &&
      token.length > 8
    ) {
      return { url, token };
    }
  }
  return null;
}

function getRedis(): Redis | null {
  const cred = getRedisCredentials();
  return cred ? new Redis({ url: cred.url, token: cred.token }) : null;
}

export function requestIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return (
    forwarded ||
    request.headers.get("x-real-ip")?.trim() ||
    request.headers.get("cf-connecting-ip")?.trim() ||
    "unknown"
  );
}

export function rateLimitKey(parts: string[]): string {
  return createHash("sha256").update(parts.join("|")).digest("base64url");
}

function memoryRateLimit({
  key,
  limit,
  windowSec,
}: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  const current = memoryBuckets.get(key);
  if (!current || current.resetMs <= now) {
    memoryBuckets.set(key, { count: 1, resetMs: now + windowSec * 1000 });
    return { ok: true, limit, remaining: limit - 1, retryAfterSec: 0 };
  }

  current.count += 1;
  const retryAfterSec = Math.max(1, Math.ceil((current.resetMs - now) / 1000));
  return {
    ok: current.count <= limit,
    limit,
    remaining: Math.max(0, limit - current.count),
    retryAfterSec: current.count <= limit ? 0 : retryAfterSec,
  };
}

export async function checkRateLimit(
  options: RateLimitOptions,
): Promise<RateLimitResult> {
  const redis = getRedis();
  if (!redis) {
    return memoryRateLimit(options);
  }

  const bucket = Math.floor(Date.now() / (options.windowSec * 1000));
  const redisKey = `angel-paws:rate:${options.key}:${bucket}`;
  try {
    const count = await redis.incr(redisKey);
    if (count === 1) {
      await redis.expire(redisKey, options.windowSec);
    }
    const retryAfterSec =
      count <= options.limit
        ? 0
        : Math.max(
            1,
            options.windowSec -
              Math.floor((Date.now() / 1000) % options.windowSec),
          );
    return {
      ok: count <= options.limit,
      limit: options.limit,
      remaining: Math.max(0, options.limit - count),
      retryAfterSec,
    };
  } catch {
    return memoryRateLimit(options);
  }
}

export function applyRateLimitHeaders(
  headers: Headers,
  result: RateLimitResult,
) {
  headers.set("X-RateLimit-Limit", String(result.limit));
  headers.set("X-RateLimit-Remaining", String(result.remaining));
  if (!result.ok) {
    headers.set("Retry-After", String(result.retryAfterSec));
  }
}
