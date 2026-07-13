/**
 * Replace the featured image on "A Calm Presence in Kerrville" in Sanity.
 *
 * Run: npx tsx ./scripts/update-kerrville-story-image.ts
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

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

async function main() {
  const fromFile = parseEnvLocal(path.join(process.cwd(), ".env.local"));
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
    throw new Error(
      "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN.",
    );
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  });

  const storyId = await client.fetch<string | null>(
    `*[_type == "story" && slug.current == $slug][0]._id`,
    { slug: "a-calm-presence-in-kerrville" },
  );

  if (!storyId) {
    throw new Error('Story "a-calm-presence-in-kerrville" not found in Sanity.');
  }

  const imagePath = path.join(
    process.cwd(),
    "public/img/stories/kerrville-group.jpg",
  );
  const buffer = readFileSync(imagePath);
  const asset = await client.assets.upload("image", buffer, {
    filename: "kerrville-group.jpg",
    contentType: "image/jpeg",
  });

  await client
    .patch(storyId)
    .set({
      featuredImage: {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
        alt: "Angel Paws therapy dog teams with first responders during Kerrville flood relief",
      },
    })
    .commit();

  console.log(`Updated ${storyId} featured image -> ${asset._id}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
