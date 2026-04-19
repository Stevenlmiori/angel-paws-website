/**
 * Harden Portable Text from Sanity / the admin editor before @portabletext/react.
 * Invalid spans (non-string `text`) or markDefs without `_key` can break the toolkit
 * or produce unstable trees and crash the server render.
 */
export function normalizePortableTextForPublic(
  value: unknown[] | null | undefined,
): unknown[] | undefined {
  if (!Array.isArray(value) || value.length === 0) {
    return value ?? undefined;
  }

  return value.map((block, blockIndex) => {
    if (!block || typeof block !== "object") {
      return null;
    }
    const b = block as Record<string, unknown>;
    const t = b._type;

    if (t === "block") {
      const children = Array.isArray(b.children)
        ? b.children
            .map((child, childIndex) => normalizeChild(child, blockIndex, childIndex))
            .filter((c): c is NonNullable<typeof c> => c != null)
        : [];

      const markDefs = Array.isArray(b.markDefs)
        ? b.markDefs
            .map((md, mdIndex) => normalizeMarkDef(md, blockIndex, mdIndex))
            .filter((md): md is Record<string, unknown> => md != null)
        : [];

      return {
        ...b,
        children,
        markDefs,
      };
    }

    if (t === "image") {
      return {
        ...b,
        _key:
          typeof b._key === "string"
            ? b._key
            : `image-${blockIndex}-${String(b.asset ?? "")}`,
      };
    }

    return block;
  }).filter((b): b is NonNullable<typeof b> => b != null);
}

function normalizeChild(
  child: unknown,
  blockIndex: number,
  childIndex: number,
): Record<string, unknown> | null {
  if (!child || typeof child !== "object") {
    return null;
  }
  const c = child as Record<string, unknown>;
  if (c._type !== "span") {
    return c;
  }
  const marks = Array.isArray(c.marks)
    ? c.marks.filter((m): m is string => typeof m === "string")
    : [];
  return {
    ...c,
    _key:
      typeof c._key === "string"
        ? c._key
        : `span-${blockIndex}-${childIndex}`,
    text: typeof c.text === "string" ? c.text : "",
    marks,
  };
}

function normalizeMarkDef(
  md: unknown,
  blockIndex: number,
  mdIndex: number,
): Record<string, unknown> | null {
  if (!md || typeof md !== "object") {
    return null;
  }
  const d = md as Record<string, unknown>;
  return {
    ...d,
    _key:
      typeof d._key === "string"
        ? d._key
        : `markdef-${blockIndex}-${mdIndex}`,
  };
}
