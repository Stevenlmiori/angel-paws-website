/**
 * Remove fictional demo stories seeded for early development.
 *
 * Run: npm run delete:seed-stories
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";
import { EXCLUDED_SEED_STORY_SLUGS } from "../src/lib/stories/excludedSeedStories";

function parseEnvLocal(filePath: string): Record<string, string> {
  const out: Record<string, string> = {};
  let raw: string;
  try {
    raw = readFileSync(filePath, "utf8");
  } catch {
    return out;
  }
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }
    const eq = line.indexOf("=");
    if (eq <= 0) {
      continue;
    }
    const key = line.slice(0, eq).trim();
    if (!key || /\s/.test(key)) {
      continue;
    }
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

const envFile = path.join(process.cwd(), ".env.local");
const fromFile = parseEnvLocal(envFile);

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  fromFile.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  fromFile.NEXT_PUBLIC_SANITY_DATASET ||
  "production";
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ||
  fromFile.NEXT_PUBLIC_SANITY_API_VERSION ||
  "2024-01-01";
const token =
  process.env.SANITY_API_WRITE_TOKEN || fromFile.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

async function deleteSlug(slug: string) {
  const id = await client.fetch<string | null>(
    `*[_type == "story" && slug.current == $slug][0]._id`,
    { slug },
  );
  if (!id) {
    console.log("Not found (already deleted):", slug);
    return;
  }
  await client.delete(id);
  console.log("Deleted:", slug);
}

async function main() {
  for (const slug of EXCLUDED_SEED_STORY_SLUGS) {
    await deleteSlug(slug);
  }
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
