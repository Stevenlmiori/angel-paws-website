"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import {
  deleteStory,
  saveStoryFromFormData,
  type StorySaveState,
} from "@/app/admin/stories/actions";
import {
  portableTextToBodyMarkdown,
  type StoryInlineImageState,
} from "@/lib/stories/portableTextForm";
import { slugify } from "@/lib/stories/slugify";
import type { StoryDetail } from "@/lib/sanity/types";
import { urlForImage } from "@/lib/sanity/image";

const initialSave: StorySaveState = { ok: false, message: "" };

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

  const bodySeed = useMemo(() => {
    if (!story?.body) {
      return { markdown: "", inlineImages: [] as StoryInlineImageState[] };
    }
    return portableTextToBodyMarkdown(story.body);
  }, [story?.body]);

  const [bodyMarkdown, setBodyMarkdown] = useState(bodySeed.markdown);

  useEffect(() => {
    setBodyMarkdown(bodySeed.markdown);
  }, [story?._id, bodySeed.markdown]);

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

  const bodyImagesJson = JSON.stringify(bodySeed.inlineImages);

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
        <input type="hidden" name="bodyImagesJson" value={bodyImagesJson} />

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

        <div className="space-y-3">
          <div>
            <h2 className="font-serif text-xl text-on-surface">Body</h2>
            <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
              Write the full story in one field. Use a blank line between paragraphs.{" "}
              <span className="font-medium text-on-surface">
                Headings:
              </span>{" "}
              start a line with <code className="rounded bg-primary/10 px-1 py-0.5 font-mono text-xs">## </code> or{" "}
              <code className="rounded bg-primary/10 px-1 py-0.5 font-mono text-xs">### </code>
              . <span className="font-medium text-on-surface">Quote:</span> prefix lines with{" "}
              <code className="rounded bg-primary/10 px-1 py-0.5 font-mono text-xs">&gt; </code>
              . <span className="font-medium text-on-surface">Bullets:</span> lines starting with{" "}
              <code className="rounded bg-primary/10 px-1 py-0.5 font-mono text-xs">- </code>
              .
              {bodySeed.inlineImages.length > 0 ? (
                <>
                  {" "}
                  This story includes inline images; placeholder lines like{" "}
                  <code className="rounded bg-primary/10 px-1 py-0.5 font-mono text-xs">
                    @ap-inline-image:0
                  </code>{" "}
                  mark where each photo appears—keep those lines if you want images to stay in place.
                </>
              ) : null}
            </p>
          </div>
          <textarea
            id="bodyMarkdown"
            name="bodyMarkdown"
            rows={24}
            value={bodyMarkdown}
            onChange={(e) => setBodyMarkdown(e.target.value)}
            className="min-h-[28rem] w-full rounded-2xl border border-primary/15 bg-white px-4 py-4 font-mono text-sm leading-relaxed text-on-surface shadow-sm outline-none ring-primary/20 focus:ring-2"
            spellCheck
          />
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
