import assert from "node:assert/strict";
import test from "node:test";
import { DEFAULT_PORTAL_RESOURCES } from "./defaults";
import { loadStoredPortalResources, persistPortalResources } from "./resourcesStore";

test("saved portal edits and deletions survive Redis deserialization", async (t) => {
  const previousUrl = process.env.UPSTASH_REDIS_REST_URL;
  const previousToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  process.env.UPSTASH_REDIS_REST_URL = "https://portal-redis.test";
  process.env.UPSTASH_REDIS_REST_TOKEN = "test-token-only";
  let stored: string | null = null;

  t.after(() => {
    if (previousUrl === undefined) delete process.env.UPSTASH_REDIS_REST_URL;
    else process.env.UPSTASH_REDIS_REST_URL = previousUrl;
    if (previousToken === undefined) delete process.env.UPSTASH_REDIS_REST_TOKEN;
    else process.env.UPSTASH_REDIS_REST_TOKEN = previousToken;
  });

  // Model the Redis REST wire response, allowing the real SDK to deserialize it.
  t.mock.method(globalThis, "fetch", async (_input: unknown, init: RequestInit) => {
    const body = JSON.parse(String(init.body));
    const pipeline = Array.isArray(body[0]);
    const responses = (pipeline ? body : [body]).map((command: string[]) => {
      if (command[0].toLowerCase() === "set") {
        stored = command[2];
        return { result: "OK" };
      }
      assert.equal(command[0].toLowerCase(), "get");
      return { result: stored };
    });
    return new Response(JSON.stringify(pipeline ? responses : responses[0]), {
      headers: { "Content-Type": "application/json" },
    });
  });

  assert.deepEqual(await loadStoredPortalResources(), DEFAULT_PORTAL_RESOURCES);
  const edited = DEFAULT_PORTAL_RESOURCES.slice(0, 6).map((item, index) => ({
    ...item,
    title: index === 0 ? "Updated wellness form" : item.title,
  }));
  assert.deepEqual(await persistPortalResources(edited), { ok: true });
  assert.deepEqual(await loadStoredPortalResources(), edited);
  assert.deepEqual(await persistPortalResources([]), { ok: true });
  assert.deepEqual(await loadStoredPortalResources(), []);
});
