/**
 * One-time seed: three fictional demo stories + featured images.
 *
 * Prerequisites:
 * - `.env.local` with NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN
 * - Images at public/stories-seed/hospital-feature.png, school-feature.png, senior-feature.png
 *
 * Run from repo root (reads `.env.local` with a simple parser — avoids dotenv regex
 * issues on long tokens / special characters):
 *   npm run seed:stories
 */
import { readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";
import {
  formSegmentsToPortableText,
  type FormSegment,
} from "../src/lib/stories/portableTextForm";

/** First `=` splits key from value; supports values containing `=`. */
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
  console.error(
    `Checked process.env and ${envFile} (each line should be KEY=value, one per line).`,
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

async function uploadFeatured(filename: string, alt: string) {
  const fp = path.join(process.cwd(), "public", "stories-seed", filename);
  const buf = await readFile(fp);
  const asset = await client.assets.upload("image", buf, {
    filename,
    contentType: "image/png",
  });
  return {
    _type: "image" as const,
    asset: { _type: "reference" as const, _ref: asset._id },
    alt,
  };
}

async function deleteSlugIfExists(slug: string) {
  const id = await client.fetch<string | null>(
    `*[_type == "story" && slug.current == $slug][0]._id`,
    { slug },
  );
  if (id) {
    await client.delete(id);
  }
}

type SeedDef = {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  publishedAt: string;
  imageFile: string;
  imageAlt: string;
  segments: FormSegment[];
};

const seeds: SeedDef[] = [
  {
    slug: "a-quiet-morning-on-seven-north",
    title: "A quiet morning on Seven North",
    excerpt:
      "Sometimes the best visit is the one that doesn’t try too hard—just steady paws, a hallway smile, and a few minutes that feel a little lighter.",
    tags: ["visit", "hospital"],
    publishedAt: "2025-11-12T15:00:00.000Z",
    imageFile: "hospital-feature.png",
    imageAlt:
      "Therapy golden retriever sitting calmly beside a volunteer in a bright hospital corridor.",
    segments: [
      {
        kind: "paragraph",
        text: "The elevator doors opened on a floor that already smelled like citrus cleaner and fresh linens. Bailey’s tail gave one slow wag—she seemed to know this wasn’t a place for bouncing.",
      },
      { kind: "h2", text: "Small rooms, big feelings" },
      {
        kind: "paragraph",
        text: "We checked in at the nurses’ station and waited while someone found the right moment. That’s a big part of the work: not rushing kindness.",
      },
      {
        kind: "blockquote",
        text: "“She hasn’t wanted to talk much today,” a family member said. “But she lit up when she saw the dog.”",
      },
      { kind: "h2", text: "What we brought" },
      {
        kind: "bullets",
        items: [
          "A few minutes of quiet company",
          "A soft brush if someone wanted to pet with their fingers only",
          "A thank-you to the staff who make room for visits",
        ],
      },
      {
        kind: "paragraph",
        text: "We didn’t solve anything monumental. We didn’t need to. We left behind a hallway that felt a little less sharp at the edges—and that’s enough for a Tuesday.",
      },
    ],
  },
  {
    slug: "second-period-softened",
    title: "Second period, softened",
    excerpt:
      "Middle school hallways are loud on purpose. Our job that day was to offer one pocket of calm before exams.",
    tags: ["visit", "school", "home-spotlight"],
    publishedAt: "2025-12-03T16:30:00.000Z",
    imageFile: "school-feature.png",
    imageAlt:
      "Therapy dog resting on a school library rug with students studying softly in the background.",
    segments: [
      {
        kind: "paragraph",
        text: "The counselor met us at the side entrance with a laminated schedule and a grin. “You’re officially the most popular guest this week,” she said. Bailey answered with perfect professionalism: one polite sniff, then “work face.”",
      },
      { kind: "h2", text: "Why the library, not the cafeteria" },
      {
        kind: "paragraph",
        text: "Exams were coming. The team wanted a space where kids could opt in without an audience. A corner near the graphic novels became ours for an hour.",
      },
      { kind: "h2", text: "What surprised us" },
      {
        kind: "paragraph",
        text: "The students who hung back at first were often the ones who stayed longest—reading a page out loud to the dog, or practicing a breathing exercise with a hand on soft fur.",
      },
      {
        kind: "blockquote",
        text: "“I didn’t think I’d come over,” one student said. “But she looked… chill. Like it was okay to be chill too.”",
      },
      { kind: "h2", text: "Before we left" },
      {
        kind: "bullets",
        items: [
          "We thanked the librarian for the water bowl real estate",
          "We wiped paws and packed up on time—schools run on minutes, not moods",
          "We waved at three kids who mouthed “thank you” from the doorway",
        ],
      },
      {
        kind: "paragraph",
        text: "If you’ve ever been fourteen and stressed, you know how big a single calm hour can feel. Bailey earned her nap that afternoon.",
      },
    ],
  },
  {
    slug: "sunday-letters-and-lemonade",
    title: "Sunday letters and lemonade",
    excerpt:
      "In the activity room, someone was writing letters they’d never send. Bailey settled in like she’d been invited on purpose—because she had.",
    tags: ["visit", "senior-care"],
    publishedAt: "2026-01-18T18:00:00.000Z",
    imageFile: "senior-feature.png",
    imageAlt:
      "Senior hands resting near a therapy dog on a sunlit activity table with lemonade softly out of focus.",
    segments: [
      {
        kind: "paragraph",
        text: "Sunday visits have a different texture: less hurry, more folding chairs. We signed in at the front desk and walked past a bulletin board covered in spring crafts.",
      },
      { kind: "h2", text: "The table with the good light" },
      {
        kind: "paragraph",
        text: "A staff member rolled over a cart with paper, envelopes, and pens. “Letter writing hour,” she explained. “Some folks write to family. Some write to themselves. The dog helps either way.”",
      },
      { kind: "h2", text: "Bailey’s job description" },
      {
        kind: "bullets",
        items: [
          "Stay low enough for wheelchair armrests",
          "Be patient with trembling hands",
          "Let silence be part of the visit",
        ],
      },
      {
        kind: "paragraph",
        text: "One resident read Bailey an entire paragraph about a garden she used to keep. Bailey didn’t interrupt once. If you’ve never been listened to like that, it’s hard to describe how healing it is.",
      },
      {
        kind: "blockquote",
        text: "“She remembers my dog from forty years ago,” someone told a nurse. “Same eyes, I swear.”",
      },
      {
        kind: "paragraph",
        text: "We packed up when the activity cart turned into snack time. Bailey got a polite drink of water and a round of soft applause—senior style, sincere, unhurried.",
      },
    ],
  },
];

async function main() {
  for (const s of seeds) {
    await deleteSlugIfExists(s.slug);
    const featuredImage = await uploadFeatured(s.imageFile, s.imageAlt);
    const body = formSegmentsToPortableText(s.segments);
    await client.create({
      _type: "story",
      title: s.title,
      slug: { _type: "slug", current: s.slug },
      publishedAt: s.publishedAt,
      excerpt: s.excerpt,
      tags: s.tags,
      featuredImage,
      body,
    });
    console.log("Seeded:", s.slug);
  }
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
