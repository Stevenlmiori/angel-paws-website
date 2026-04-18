import { defineSchema, type PortableTextBlock } from "@portabletext/editor";

/**
 * Portable Text schema aligned with `sanity/schemaTypes/story.ts` body field.
 */
export const storyBodyEditorSchema = defineSchema({
  decorators: [
    { name: "strong", title: "Bold" },
    { name: "em", title: "Italic" },
  ],
  styles: [
    { name: "normal", title: "Paragraph" },
    { name: "h2", title: "Heading" },
    { name: "h3", title: "Subheading" },
    { name: "blockquote", title: "Quote" },
  ],
  lists: [
    { name: "bullet", title: "Bullet list" },
    { name: "number", title: "Numbered list" },
  ],
  annotations: [
    {
      name: "link",
      title: "Link",
      fields: [{ name: "href", type: "string" }],
    },
  ],
  blockObjects: [
    {
      name: "image",
      title: "Image",
      fields: [
        { name: "alt", type: "string" },
        { name: "caption", type: "string" },
      ],
    },
  ],
  inlineObjects: [],
});

function emptyParagraph(): PortableTextBlock {
  const bKey = `b_${Math.random().toString(36).slice(2)}_${Date.now().toString(36)}`;
  const sKey = `s_${Math.random().toString(36).slice(2)}_${Date.now().toString(36)}`;
  return {
    _type: "block",
    _key: bKey,
    style: "normal",
    children: [
      {
        _type: "span",
        _key: sKey,
        text: "",
        marks: [],
      },
    ],
    markDefs: [],
  };
}

/** Safe initial value for new stories or invalid payloads. */
export function normalizeStoryBodyInitial(body: unknown): PortableTextBlock[] {
  if (!Array.isArray(body) || body.length === 0) {
    return [emptyParagraph()];
  }
  try {
    const clone = JSON.parse(JSON.stringify(body)) as PortableTextBlock[];
    if (!Array.isArray(clone) || clone.length === 0) {
      return [emptyParagraph()];
    }
    return clone;
  } catch {
    return [emptyParagraph()];
  }
}

export function parseStoryBodyPortableTextJson(raw: string): unknown[] | null {
  const trimmed = raw.trim();
  if (!trimmed) {
    return [];
  }
  try {
    const parsed = JSON.parse(trimmed) as unknown;
    if (!Array.isArray(parsed)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}
