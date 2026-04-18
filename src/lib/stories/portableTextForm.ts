export type FormSegment =
  | { kind: "paragraph"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "blockquote"; text: string }
  | { kind: "bullets"; items: string[] };

/** Serialized inline image for the admin body field (round-trip with Sanity PT). */
export type StoryInlineImageState = {
  assetRef: string;
  alt: string;
  caption: string;
  _key?: string;
};


function key() {
  return `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
}

function span(text: string) {
  return {
    _type: "span" as const,
    _key: key(),
    text,
    marks: [] as string[],
  };
}

function block(
  style: "normal" | "h2" | "h3" | "blockquote",
  text: string,
  list?: { listItem: "bullet"; level: number },
) {
  const b: Record<string, unknown> = {
    _type: "block",
    _key: key(),
    style,
    children: [span(text)],
    markDefs: [],
  };
  if (list) {
    b.listItem = list.listItem;
    b.level = list.level;
  }
  return b;
}

export function formSegmentsToPortableText(segments: FormSegment[]): unknown[] {
  const out: unknown[] = [];
  for (const seg of segments) {
    if (seg.kind === "paragraph") {
      out.push(block("normal", seg.text));
    } else if (seg.kind === "h2") {
      out.push(block("h2", seg.text));
    } else if (seg.kind === "h3") {
      out.push(block("h3", seg.text));
    } else if (seg.kind === "blockquote") {
      out.push(block("blockquote", seg.text));
    } else if (seg.kind === "bullets") {
      for (const item of seg.items) {
        const t = item.trim();
        if (t) {
          out.push(
            block("normal", t, { listItem: "bullet", level: 1 }),
          );
        }
      }
    }
  }
  return out;
}

type PtBlock = {
  _type?: string;
  style?: string;
  listItem?: string;
  level?: number;
  children?: Array<{ _type?: string; text?: string }>;
};

function joinBlockText(b: PtBlock): string {
  if (!Array.isArray(b.children)) {
    return "";
  }
  return b.children
    .map((c) => (typeof c.text === "string" ? c.text : ""))
    .join("");
}

export function portableTextToFormSegments(body: unknown): FormSegment[] {
  if (!Array.isArray(body)) {
    return [{ kind: "paragraph", text: "" }];
  }
  const segments: FormSegment[] = [];
  let bulletBuffer: string[] = [];

  function flushBullets() {
    if (bulletBuffer.length) {
      segments.push({ kind: "bullets", items: [...bulletBuffer] });
      bulletBuffer = [];
    }
  }

  for (const raw of body) {
    if (!raw || typeof raw !== "object") {
      continue;
    }
    const node = raw as { _type?: string };
    if (node._type === "image") {
      flushBullets();
      continue;
    }
    if (node._type !== "block") {
      continue;
    }
    const b = raw as PtBlock;
    const text = joinBlockText(b).trimEnd();
    if (b.listItem === "bullet") {
      if (text) {
        bulletBuffer.push(text);
      }
      continue;
    }
    flushBullets();
    if (!text && b.style !== "normal") {
      continue;
    }
    const style = b.style ?? "normal";
    if (style === "h2" || style === "h3") {
      segments.push({ kind: style, text });
    } else if (style === "blockquote") {
      segments.push({ kind: "blockquote", text });
    } else {
      segments.push({ kind: "paragraph", text });
    }
  }
  flushBullets();
  if (segments.length === 0) {
    return [{ kind: "paragraph", text: "" }];
  }
  return segments;
}

type BodyRun =
  | { kind: "segments"; items: FormSegment[] }
  | { kind: "image"; node: unknown };

function readInlineImageNode(raw: unknown): StoryInlineImageState | null {
  if (!raw || typeof raw !== "object") {
    return null;
  }
  const n = raw as {
    _type?: string;
    asset?: { _ref?: string };
    alt?: string;
    caption?: string;
    _key?: string;
  };
  if (n._type !== "image") {
    return null;
  }
  const ref = n.asset?._ref;
  if (!ref) {
    return null;
  }
  return {
    assetRef: ref,
    alt: typeof n.alt === "string" ? n.alt : "",
    caption: typeof n.caption === "string" ? n.caption : "",
    _key: typeof n._key === "string" ? n._key : undefined,
  };
}

function portableTextToBodyRuns(body: unknown): BodyRun[] {
  const runs: BodyRun[] = [];
  if (!Array.isArray(body)) {
    return [{ kind: "segments", items: [{ kind: "paragraph", text: "" }] }];
  }

  let segmentBuffer: FormSegment[] = [];
  let bulletBuffer: string[] = [];

  function flushBullets() {
    if (bulletBuffer.length) {
      segmentBuffer.push({ kind: "bullets", items: [...bulletBuffer] });
      bulletBuffer = [];
    }
  }

  function flushSegmentsRun() {
    flushBullets();
    if (segmentBuffer.length) {
      runs.push({ kind: "segments", items: segmentBuffer });
      segmentBuffer = [];
    }
  }

  for (const raw of body) {
    if (!raw || typeof raw !== "object") {
      continue;
    }
    const node = raw as { _type?: string };
    if (node._type === "image") {
      flushSegmentsRun();
      runs.push({ kind: "image", node: raw });
      continue;
    }
    if (node._type !== "block") {
      continue;
    }
    const b = raw as PtBlock;
    const text = joinBlockText(b).trimEnd();
    if (b.listItem === "bullet") {
      if (text) {
        bulletBuffer.push(text);
      }
      continue;
    }
    flushBullets();
    if (!text && b.style !== "normal") {
      continue;
    }
    const style = b.style ?? "normal";
    if (style === "h2" || style === "h3") {
      segmentBuffer.push({ kind: style, text });
    } else if (style === "blockquote") {
      segmentBuffer.push({ kind: "blockquote", text });
    } else {
      segmentBuffer.push({ kind: "paragraph", text });
    }
  }
  flushSegmentsRun();
  if (runs.length === 0) {
    return [{ kind: "segments", items: [{ kind: "paragraph", text: "" }] }];
  }
  return runs;
}

export function formSegmentsToMarkdown(segments: FormSegment[]): string {
  const parts: string[] = [];
  for (const seg of segments) {
    if (seg.kind === "paragraph") {
      parts.push(seg.text.replace(/\s+$/, "") + "\n\n");
    } else if (seg.kind === "h2") {
      parts.push(`## ${seg.text.trim()}\n\n`);
    } else if (seg.kind === "h3") {
      parts.push(`### ${seg.text.trim()}\n\n`);
    } else if (seg.kind === "blockquote") {
      const lines = seg.text.split(/\n/);
      for (const line of lines) {
        parts.push(`> ${line}\n`);
      }
      parts.push("\n");
    } else if (seg.kind === "bullets") {
      for (const item of seg.items) {
        const t = item.trim();
        if (t) {
          parts.push(`- ${t}\n`);
        }
      }
      parts.push("\n");
    }
  }
  return parts.join("");
}

export function markdownToFormSegments(text: string): FormSegment[] {
  const t = text.trim();
  if (!t) {
    return [{ kind: "paragraph", text: "" }];
  }
  const chunks = t.split(/\n{2,}/);
  const segments: FormSegment[] = [];
  for (const chunk of chunks) {
    const c = chunk.trim();
    if (!c) {
      continue;
    }
    const lines = c.split(/\n/);
    const first = lines[0] ?? "";

    if (/^###\s/.test(first)) {
      const rest = first.replace(/^###\s+/, "").trim();
      const more =
        lines.length > 1 ? `\n${lines.slice(1).join("\n")}` : "";
      segments.push({ kind: "h3", text: (rest + more).trim() });
      continue;
    }
    if (/^##\s/.test(first)) {
      const rest = first.replace(/^##\s+/, "").trim();
      const more =
        lines.length > 1 ? `\n${lines.slice(1).join("\n")}` : "";
      segments.push({ kind: "h2", text: (rest + more).trim() });
      continue;
    }
    const nonempty = lines.filter((l) => l.trim());
    if (
      nonempty.length > 0 &&
      nonempty.every((l) => /^\s*>\s?/.test(l))
    ) {
      const body = lines
        .map((l) => l.replace(/^\s*>\s?/, ""))
        .join("\n")
        .trim();
      segments.push({ kind: "blockquote", text: body });
      continue;
    }
    if (
      nonempty.length > 0 &&
      nonempty.every((l) => /^\s*-\s+/.test(l))
    ) {
      const items = nonempty.map((l) =>
        l.replace(/^\s*-\s+/, "").trim(),
      );
      segments.push({ kind: "bullets", items });
      continue;
    }
    segments.push({ kind: "paragraph", text: lines.join("\n") });
  }
  return segments.length ? segments : [{ kind: "paragraph", text: "" }];
}

/**
 * One document string for the admin editor + image metadata for round-trip.
 */
export function portableTextToBodyMarkdown(body: unknown): {
  markdown: string;
  inlineImages: StoryInlineImageState[];
} {
  const runs = portableTextToBodyRuns(body);
  const inlineImages: StoryInlineImageState[] = [];
  const mdParts: string[] = [];

  for (const run of runs) {
    if (run.kind === "segments") {
      mdParts.push(formSegmentsToMarkdown(run.items));
      continue;
    }
    const si = readInlineImageNode(run.node);
    if (!si) {
      continue;
    }
    const idx = inlineImages.length;
    inlineImages.push(si);
    mdParts.push(`@ap-inline-image:${idx}\n\n`);
  }

  return { markdown: mdParts.join(""), inlineImages };
}

function portableImageFromState(si: StoryInlineImageState): Record<string, unknown> {
  return {
    _type: "image",
    _key: si._key ?? key(),
    asset: { _type: "reference", _ref: si.assetRef },
    alt: si.alt.trim() || undefined,
    caption: si.caption.trim() || undefined,
  };
}

/**
 * Build Portable Text from the unified markdown field and preserved image list.
 * Lines `@ap-inline-image:N` reference indices in `inlineImages`.
 */
export function parseStoryInlineImagesJson(
  raw: string,
): StoryInlineImageState[] | null {
  const trimmed = raw.trim();
  if (!trimmed) {
    return [];
  }
  try {
    const parsed = JSON.parse(trimmed) as unknown;
    if (!Array.isArray(parsed)) {
      return null;
    }
    const out: StoryInlineImageState[] = [];
    for (const row of parsed) {
      if (!row || typeof row !== "object") {
        continue;
      }
      const assetRef = (row as { assetRef?: string }).assetRef;
      if (typeof assetRef !== "string" || !assetRef) {
        continue;
      }
      out.push({
        assetRef,
        alt:
          typeof (row as { alt?: string }).alt === "string"
            ? (row as { alt: string }).alt
            : "",
        caption:
          typeof (row as { caption?: string }).caption === "string"
            ? (row as { caption: string }).caption
            : "",
        _key:
          typeof (row as { _key?: string })._key === "string"
            ? (row as { _key: string })._key
            : undefined,
      });
    }
    return out;
  } catch {
    return null;
  }
}

export function bodyMarkdownToPortableText(
  markdown: string,
  inlineImages: StoryInlineImageState[],
): unknown[] {
  const out: unknown[] = [];
  const referenced = new Set<number>();

  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  let buf: string[] = [];

  function flushTextBuffer() {
    const chunk = buf.join("\n").trim();
    buf = [];
    if (!chunk) {
      return;
    }
    out.push(...formSegmentsToPortableText(markdownToFormSegments(chunk)));
  }

  for (const line of lines) {
    const m = line.trim().match(/^@ap-inline-image:(\d+)$/);
    if (m) {
      flushTextBuffer();
      const idx = Number.parseInt(m[1] ?? "", 10);
      if (!Number.isNaN(idx) && inlineImages[idx]) {
        referenced.add(idx);
        out.push(portableImageFromState(inlineImages[idx]));
      }
      continue;
    }
    buf.push(line);
  }
  flushTextBuffer();

  for (let i = 0; i < inlineImages.length; i++) {
    if (!referenced.has(i)) {
      out.push(portableImageFromState(inlineImages[i]));
    }
  }

  return out;
}
