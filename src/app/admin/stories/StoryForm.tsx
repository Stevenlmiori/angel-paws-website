"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  deleteStory,
  saveStoryFromFormData,
  type StorySaveState,
} from "@/app/admin/stories/actions";
import {
  type FormSegment,
  portableTextToFormSegments,
} from "@/lib/stories/portableTextForm";
import { slugify } from "@/lib/stories/slugify";
import type { StoryDetail } from "@/lib/sanity/types";
import { urlForImage } from "@/lib/sanity/image";

const initialSave: StorySaveState = { ok: false, message: "" };

type SegmentKind = FormSegment["kind"];

function emptySegment(kind: SegmentKind = "paragraph"): FormSegment {
  if (kind === "bullets") {
    return { kind: "bullets", items: [""] };
  }
  return { kind, text: "" };
}

export function StoryForm({ story }: { story: StoryDetail | null }) {
  const router = useRouter();
  const isNew = !story?._id;
  const [title, setTitle] = useState(story?.title ?? "");
  const [slug, setSlug] = useState(story?.slug ?? "");
  const [slugManual, setSlugManual] = useState(Boolean(story?.slug));
  const [excerpt, setExcerpt] = useState(story?.excerpt ?? "");
  const [tags, setTags] = useState((story?.tags ?? []).join(", "));
  const [publishedAt, setPublishedAt] = useState(() => {
    if (!story?.publishedAt) {
      return "";
    }
    const d = new Date(story.publishedAt);
    if (Number.isNaN(d.getTime())) {
      return "";
    }
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  });
  const [seoTitle, setSeoTitle] = useState(story?.seoTitle ?? "");
  const [seoDescription, setSeoDescription] = useState(
    story?.seoDescription ?? "",
  );
  const [featuredAlt, setFeaturedAlt] = useState(story?.featuredImage?.alt ?? "");
  const [segments, setSegments] = useState<FormSegment[]>(() =>
    story?.body
      ? portableTextToFormSegments(story.body)
      : [emptySegment("paragraph")],
  );

  const [state, formAction, pending] = useActionState(
    saveStoryFromFormData,
    initialSave,
  );

  const effectiveSlug = slugManual ? slug : slugify(title);

  useEffect(() => {
    if (state.ok && state.id && isNew) {
      router.replace(`/admin/stories/${state.id}`);
    }
  }, [state, isNew, router]);

  const featuredPreview = useMemo(() => {
    const fi = story?.featuredImage;
    if (!fi?.asset?._ref) {
      return null;
    }
    return urlForImage(fi)?.width(640).height(400).url() ?? null;
  }, [story?.featuredImage]);

  const bodyJson = JSON.stringify(segments);

  function addSegment(kind: SegmentKind) {
    setSegments((prev) => [...prev, emptySegment(kind)]);
  }

  function removeSegment(i: number) {
    setSegments((prev) => prev.filter((_, j) => j !== i));
  }

  function updateBullet(i: number, bi: number, text: string) {
    setSegments((prev) => {
      const next = [...prev];
      const cur = next[i];
      if (!cur || cur.kind !== "bullets") {
        return prev;
      }
      const items = [...cur.items];
      items[bi] = text;
      next[i] = { kind: "bullets", items };
      return next;
    });
  }

  function addBulletRow(i: number) {
    setSegments((prev) => {
      const next = [...prev];
      const cur = next[i];
      if (!cur || cur.kind !== "bullets") {
        return prev;
      }
      next[i] = { kind: "bullets", items: [...cur.items, ""] };
      return next;
    });
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10 sm:px-10 lg:px-12">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            {isNew ? "New story" : "Edit story"}
          </p>
          <h1 className="mt-1 font-serif text-3xl text-on-surface md:text-4xl">
            {isNew ? "Create a story" : story?.title}
          </h1>
        </div>
        <Link
          href="/admin/stories"
          className="text-sm font-semibold text-primary underline underline-offset-4"
        >
          Back to list
        </Link>
      </div>

      <form action={formAction} className="space-y-8">
        {!isNew ? <input type="hidden" name="id" value={story!._id} /> : null}
        <input type="hidden" name="bodyJson" value={bodyJson} />

        {state.message ? (
          <p
            className={
              state.ok
                ? "rounded-2xl bg-primary-container/80 px-4 py-3 text-sm font-medium text-on-primary-container"
                : "rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-900"
            }
            role="status"
          >
            {state.message}
          </p>
        ) : null}

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-on-surface" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            name="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-2xl border border-primary/15 bg-white px-4 py-3 text-on-surface shadow-sm outline-none ring-primary/20 focus:ring-2"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-on-surface" htmlFor="slug">
            Slug (URL)
          </label>
          <input
            id="slug"
            name="slug"
            value={effectiveSlug}
            onFocus={() => {
              if (!slugManual) {
                setSlugManual(true);
                setSlug(slugify(title));
              }
            }}
            onChange={(e) => {
              setSlugManual(true);
              setSlug(slugify(e.target.value));
            }}
            className="w-full rounded-2xl border border-primary/15 bg-white px-4 py-3 font-mono text-sm text-on-surface shadow-sm outline-none ring-primary/20 focus:ring-2"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-on-surface" htmlFor="excerpt">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            rows={3}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full rounded-2xl border border-primary/15 bg-white px-4 py-3 text-on-surface shadow-sm outline-none ring-primary/20 focus:ring-2"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-on-surface" htmlFor="tags">
            Tags (comma-separated)
          </label>
          <input
            id="tags"
            name="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="visit, hospital, home-spotlight"
            className="w-full rounded-2xl border border-primary/15 bg-white px-4 py-3 text-on-surface shadow-sm outline-none ring-primary/20 focus:ring-2"
          />
        </div>

        <div className="space-y-2">
          <label
            className="block text-sm font-semibold text-on-surface"
            htmlFor="publishedAt"
          >
            Published at (optional until ready)
          </label>
          <input
            id="publishedAt"
            name="publishedAt"
            type="datetime-local"
            value={publishedAt}
            onChange={(e) => setPublishedAt(e.target.value)}
            className="w-full max-w-md rounded-2xl border border-primary/15 bg-white px-4 py-3 text-on-surface shadow-sm outline-none ring-primary/20 focus:ring-2"
          />
        </div>

        <div className="space-y-3 rounded-3xl bg-surface-container-high p-6 shadow-soft ring-1 ring-primary/5">
          <h2 className="font-serif text-xl text-on-surface">Featured image</h2>
          {featuredPreview ? (
            <div className="relative aspect-[16/10] w-full max-w-lg overflow-hidden rounded-2xl bg-surface-container-low">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featuredPreview}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          ) : null}
          <p className="text-sm text-on-surface-variant">
            {isNew
              ? "Upload a JPG or PNG. Alt text is required when uploading."
              : "Leave empty to keep the current image. Upload a new file to replace it."}
          </p>
          <input
            type="file"
            name="featuredImage"
            accept="image/jpeg,image/png,image/webp"
            className="text-sm text-on-surface-variant"
          />
          <div className="space-y-2">
            <label
              className="block text-sm font-semibold text-on-surface"
              htmlFor="featuredAlt"
            >
              Featured image alt text
            </label>
            <input
              id="featuredAlt"
              name="featuredAlt"
              value={featuredAlt}
              onChange={(e) => setFeaturedAlt(e.target.value)}
              className="w-full rounded-2xl border border-primary/15 bg-white px-4 py-3 text-on-surface shadow-sm outline-none ring-primary/20 focus:ring-2"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-on-surface" htmlFor="seoTitle">
            SEO title (optional)
          </label>
          <input
            id="seoTitle"
            name="seoTitle"
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
            className="w-full rounded-2xl border border-primary/15 bg-white px-4 py-3 text-on-surface shadow-sm outline-none ring-primary/20 focus:ring-2"
          />
        </div>

        <div className="space-y-2">
          <label
            className="block text-sm font-semibold text-on-surface"
            htmlFor="seoDescription"
          >
            SEO description (optional)
          </label>
          <textarea
            id="seoDescription"
            name="seoDescription"
            rows={2}
            value={seoDescription}
            onChange={(e) => setSeoDescription(e.target.value)}
            className="w-full rounded-2xl border border-primary/15 bg-white px-4 py-3 text-on-surface shadow-sm outline-none ring-primary/20 focus:ring-2"
          />
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-serif text-xl text-on-surface">Body</h2>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="secondary" onClick={() => addSegment("paragraph")}>
                <Plus className="size-4" aria-hidden />
                Paragraph
              </Button>
              <Button type="button" variant="secondary" onClick={() => addSegment("h2")}>
                Heading
              </Button>
              <Button type="button" variant="secondary" onClick={() => addSegment("blockquote")}>
                Quote
              </Button>
              <Button type="button" variant="secondary" onClick={() => addSegment("bullets")}>
                Bullets
              </Button>
            </div>
          </div>

          <ul className="space-y-4">
            {segments.map((seg, i) => (
              <li
                key={i}
                className="rounded-2xl border border-primary/10 bg-white p-4 shadow-sm"
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                    {seg.kind}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeSegment(i)}
                    className="rounded-lg p-2 text-on-surface-variant hover:bg-red-50 hover:text-red-800"
                    aria-label="Remove block"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
                {seg.kind === "bullets" ? (
                  <div className="space-y-2">
                    {seg.items.map((item, bi) => (
                      <input
                        key={bi}
                        value={item}
                        onChange={(e) => updateBullet(i, bi, e.target.value)}
                        className="w-full rounded-xl border border-primary/15 px-3 py-2 text-on-surface outline-none ring-primary/20 focus:ring-2"
                        placeholder="List item"
                      />
                    ))}
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => addBulletRow(i)}
                    >
                      Add bullet line
                    </Button>
                  </div>
                ) : (
                  <textarea
                    value={seg.text}
                    onChange={(e) => {
                      const v = e.target.value;
                      setSegments((prev) => {
                        const next = [...prev];
                        const cur = next[i];
                        if (!cur || cur.kind === "bullets") {
                          return prev;
                        }
                        next[i] = { ...cur, text: v } as FormSegment;
                        return next;
                      });
                    }}
                    rows={seg.kind === "paragraph" ? 5 : 3}
                    className="w-full rounded-xl border border-primary/15 px-3 py-2 text-on-surface outline-none ring-primary/20 focus:ring-2"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button type="submit" disabled={pending}>
            {pending ? "Saving…" : "Save story"}
          </Button>
        </div>
      </form>

      {!isNew ? (
        <form action={deleteStory} className="mt-12 border-t border-primary/10 pt-8">
          <input type="hidden" name="id" value={story!._id} />
          <Button type="submit" variant="secondary" className="text-red-800">
            Delete this story
          </Button>
        </form>
      ) : null}
    </div>
  );
}
