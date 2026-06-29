/**
 * Import repo-backed public stories into Sanity so the admin editor can manage
 * the same story set shown on the public site.
 *
 * Run: npx tsx ./scripts/import-local-stories-to-sanity.ts
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";
import { localStories } from "../src/lib/stories/localStories";

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

function contentTypeFor(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".png") {
    return "image/png";
  }
  if (ext === ".webp") {
    return "image/webp";
  }
  if (ext === ".gif") {
    return "image/gif";
  }
  return "image/jpeg";
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

  for (const story of localStories) {
    const existing = await client.fetch<string | null>(
      `*[_type == "story" && slug.current == $slug][0]._id`,
      { slug: story.slug },
    );
    if (existing) {
      console.log(`Exists, skipped: ${story.slug} (${existing})`);
      continue;
    }

    const imageUrl = story.featuredImage?.url;
    let featuredImage: Record<string, unknown> | undefined;
    if (imageUrl?.startsWith("/")) {
      const imagePath = path.join(process.cwd(), "public", imageUrl.slice(1));
      const asset = await client.assets.upload(
        "image",
        readFileSync(imagePath),
        {
          filename: path.basename(imagePath),
          contentType: contentTypeFor(imagePath),
        },
      );
      featuredImage = {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
        alt: story.featuredImage?.alt ?? story.title,
      };
    }

    await client.create({
      _id: `story-${story.slug}`,
      _type: "story",
      title: story.title,
      slug: { _type: "slug", current: story.slug },
      publishedAt: story.publishedAt,
      excerpt: story.excerpt,
      tags: story.tags,
      body: story.body,
      ...(featuredImage ? { featuredImage } : {}),
    });
    console.log(`Imported: ${story.slug}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
