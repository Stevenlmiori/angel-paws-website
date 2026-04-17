export type FormSegment =
  | { kind: "paragraph"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "blockquote"; text: string }
  | { kind: "bullets"; items: string[] };

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
