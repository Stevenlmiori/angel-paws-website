"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/memberPortal/getAdminSession";
import { sanityWriteClient } from "@/lib/sanity/client";
import {
  formSegmentsToPortableText,
  type FormSegment,
} from "@/lib/stories/portableTextForm";
import { slugify } from "@/lib/stories/slugify";

export type StorySaveState = { ok: boolean; message: string; id?: string };

function parseTags(raw: string): string[] {
  return raw
    .split(/[,]+/)
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);
}

function parseSegments(raw: string): FormSegment[] | null {
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return null;
    }
    const out: FormSegment[] = [];
    for (const row of parsed) {
      if (!row || typeof row !== "object") {
        continue;
      }
      const k = (row as { kind?: string }).kind;
      if (k === "paragraph" && typeof (row as { text?: string }).text === "string") {
        out.push({ kind: "paragraph", text: (row as { text: string }).text });
      } else if (k === "h2" && typeof (row as { text?: string }).text === "string") {
        out.push({ kind: "h2", text: (row as { text: string }).text });
      } else if (k === "h3" && typeof (row as { text?: string }).text === "string") {
        out.push({ kind: "h3", text: (row as { text: string }).text });
      } else if (
        k === "blockquote" &&
        typeof (row as { text?: string }).text === "string"
      ) {
        out.push({ kind: "blockquote", text: (row as { text: string }).text });
      } else if (k === "bullets" && Array.isArray((row as { items?: unknown }).items)) {
        const items = (row as { items: unknown[] }).items
          .map((x) => (typeof x === "string" ? x : ""))
          .filter(Boolean);
        out.push({ kind: "bullets", items });
      }
    }
    return out.length ? out : [{ kind: "paragraph", text: "" }];
  } catch {
    return null;
  }
}

export async function saveStoryFromFormData(
  _prev: StorySaveState,
  formData: FormData,
): Promise<StorySaveState> {
  const session = await getAdminSession();
  if (!session) {
    return { ok: false, message: "Not signed in." };
  }

  const client = sanityWriteClient();
  if (!client) {
    return {
      ok: false,
      message:
        "Sanity write client is not configured. Add NEXT_PUBLIC_SANITY_* and SANITY_API_WRITE_TOKEN.",
    };
  }

  const idRaw = formData.get("id");
  const id = typeof idRaw === "string" && idRaw.length > 0 ? idRaw : undefined;

  const title = String(formData.get("title") ?? "").trim();
  if (!title) {
    return { ok: false, message: "Title is required." };
  }

  let slug = String(formData.get("slug") ?? "").trim();
  if (!slug) {
    slug = slugify(title);
  } else {
    slug = slugify(slug);
  }
  if (!slug) {
    return { ok: false, message: "Could not derive a valid slug." };
  }

  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const tags = parseTags(String(formData.get("tags") ?? ""));
  const seoTitle = String(formData.get("seoTitle") ?? "").trim();
  const seoDescription = String(formData.get("seoDescription") ?? "").trim();
  const publishedAtRaw = String(formData.get("publishedAt") ?? "").trim();
  const publishedAt = publishedAtRaw || undefined;

  const featuredAlt = String(formData.get("featuredAlt") ?? "").trim();
  const segments = parseSegments(String(formData.get("bodyJson") ?? "[]"));
  if (!segments) {
    return { ok: false, message: "Body data was invalid." };
  }
  const body = formSegmentsToPortableText(segments);

  const file = formData.get("featuredImage");
  let featuredPatch: Record<string, unknown> | null = null;
  if (file instanceof File && file.size > 0) {
    if (!featuredAlt) {
      return {
        ok: false,
        message: "Add alt text for the featured image (accessibility).",
      };
    }
    const buf = Buffer.from(await file.arrayBuffer());
    const asset = await client.assets.upload("image", buf, {
      filename: file.name || "featured.jpg",
      contentType: file.type || "image/jpeg",
    });
    featuredPatch = {
      featuredImage: {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
        alt: featuredAlt,
      },
    };
  }

  const fields: Record<string, unknown> = {
    title,
    slug: { _type: "slug", current: slug },
    excerpt: excerpt || undefined,
    tags: tags.length ? tags : undefined,
    body,
    seoTitle: seoTitle || undefined,
    seoDescription: seoDescription || undefined,
  };

  if (publishedAt) {
    fields.publishedAt = publishedAt;
  }

  try {
    if (id) {
      const patch: Record<string, unknown> = { ...fields };
      if (featuredPatch) {
        Object.assign(patch, featuredPatch);
      }
      await client.patch(id).set(patch).commit();
      revalidatePath("/stories");
      revalidatePath(`/stories/${slug}`);
      revalidatePath("/");
      return { ok: true, message: "Story saved.", id };
    }

    const created = await client.create({
      _type: "story",
      ...fields,
      ...(featuredPatch ?? {}),
    });
    revalidatePath("/stories");
    revalidatePath(`/stories/${slug}`);
    revalidatePath("/");
    return { ok: true, message: "Story created.", id: created._id };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Save failed.";
    return { ok: false, message: msg };
  }
}

export async function deleteStory(formData: FormData): Promise<void> {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("Not signed in.");
  }
  const client = sanityWriteClient();
  if (!client) {
    throw new Error("Sanity is not configured for writes.");
  }
  const id = String(formData.get("id") ?? "");
  if (!id) {
    throw new Error("Missing story id.");
  }
  try {
    await client.delete(id);
    revalidatePath("/stories");
    revalidatePath("/");
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Delete failed.";
    throw new Error(msg);
  }
  redirect("/admin/stories");
}
