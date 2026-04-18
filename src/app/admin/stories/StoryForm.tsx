"use client";

import { useActionState, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  deleteStory,
  saveStoryFromFormData,
  type StorySaveState,
} from "@/app/admin/stories/actions";
import { StoryPortableEditor } from "@/app/admin/stories/StoryPortableEditor";
import {
  normalizeStoryBodyInitial,
} from "@/lib/stories/storyBodyEditorSchema";
import { slugify } from "@/lib/stories/slugify";
import type { StoryDetail } from "@/lib/sanity/types";
import { urlForImage } from "@/lib/sanity/image";
import { cn } from "@/lib/cn";

const initialSave: StorySaveState = { ok: false, message: "" };

const fieldClass =
  "w-full rounded-2xl border border-primary/15 bg-white px-4 py-3 text-on-surface shadow-sm outline-none transition ring-primary/20 focus:ring-2";

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

  const initialBody = useMemo(
    () => normalizeStoryBodyInitial(story?.body),
    [story?.body],
  );

  const [bodyJson, setBodyJson] = useState(() =>
    JSON.stringify(initialBody),
  );

  useEffect(() => {
    setBodyJson(JSON.stringify(initialBody));
  }, [story?._id, initialBody]);

  const onBodyJsonChange = useCallback((json: string) => {
    setBodyJson(json);
  }, []);

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

  return (
    <div className="mx-auto max-w-4xl px-6 py-10 sm:px-10 lg:px-12">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-primary/10 pb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            {isNew ? "New story" : "Edit story"}
          </p>
          <h1 className="mt-2 font-serif text-3xl text-on-surface md:text-4xl">
            {isNew ? "Create a story" : story?.title}
          </h1>
          <p className="mt-2 max-w-xl text-sm text-on-surface-variant">
            Write in the visual editor below. Use the toolbar for headings, lists,
            bold, links, and photos—just like a word processor.
          </p>
        </div>
        <Link
          href="/admin/stories"
          className="text-sm font-semibold text-primary underline underline-offset-4"
        >
          Back to list
        </Link>
      </div>

      <form action={formAction} className="space-y-10">
        {!isNew ? <input type="hidden" name="id" value={story!._id} /> : null}
        <textarea
          name="bodyPortableTextJson"
          value={bodyJson}
          readOnly
          tabIndex={-1}
          aria-hidden
          className="sr-only"
          rows={1}
        />

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

        <section className="space-y-4">
          <h2 className="font-serif text-xl text-on-surface">Basics</h2>
          <div className="grid gap-6 sm:grid-cols-1">
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
                className={fieldClass}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-on-surface" htmlFor="slug">
                Slug (web address)
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
                className={cn(fieldClass, "font-mono text-sm")}
              />
              <p className="text-xs text-on-surface-variant">
                Appears as <span className="font-mono text-on-surface">/stories/your-slug</span>
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-on-surface" htmlFor="excerpt">
                Short excerpt
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                rows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className={fieldClass}
                placeholder="One or two sentences for story cards and previews."
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
                className={fieldClass}
              />
            </div>

            <div className="space-y-2">
              <label
                className="block text-sm font-semibold text-on-surface"
                htmlFor="publishedAt"
              >
                Published date (optional)
              </label>
              <input
                id="publishedAt"
                name="publishedAt"
                type="datetime-local"
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
                className={cn(fieldClass, "max-w-md")}
              />
            </div>
          </div>
        </section>

        <section className="space-y-4 rounded-3xl bg-surface-container-high p-6 shadow-soft ring-1 ring-primary/5 sm:p-8">
          <div>
            <h2 className="font-serif text-xl text-on-surface">Featured image</h2>
            <p className="mt-1 text-sm text-on-surface-variant">
              This is the image at the top of the story and in story listings.
            </p>
          </div>
          {featuredPreview ? (
            <div className="relative aspect-[16/10] w-full max-w-xl overflow-hidden rounded-2xl bg-surface-container-low ring-1 ring-primary/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featuredPreview}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          ) : null}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-primary/25 bg-white px-5 py-3 text-sm font-semibold text-primary shadow-sm transition hover:border-primary/40 hover:bg-primary/5">
              <ImagePlus className="size-5 shrink-0" aria-hidden />
              <span>Choose featured photo</span>
              <input
                type="file"
                name="featuredImage"
                accept="image/jpeg,image/png,image/webp"
                className="sr-only"
              />
            </label>
            <p className="max-w-md text-sm text-on-surface-variant sm:pt-1">
              {isNew
                ? "JPG, PNG, or WebP. Alt text is required when you add a new image."
                : "Leave empty to keep the current image. Pick a new file to replace it."}
            </p>
          </div>
          <div className="space-y-2">
            <label
              className="block text-sm font-semibold text-on-surface"
              htmlFor="featuredAlt"
            >
              Alt text (describe the photo for blind visitors)
            </label>
            <input
              id="featuredAlt"
              name="featuredAlt"
              value={featuredAlt}
              onChange={(e) => setFeaturedAlt(e.target.value)}
              className={fieldClass}
              placeholder="e.g. Golden retriever visiting with residents at a sunlit table"
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-xl text-on-surface">Search (optional)</h2>
          <div className="grid gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-on-surface" htmlFor="seoTitle">
                SEO title
              </label>
              <input
                id="seoTitle"
                name="seoTitle"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                className={fieldClass}
              />
            </div>

            <div className="space-y-2">
              <label
                className="block text-sm font-semibold text-on-surface"
                htmlFor="seoDescription"
              >
                SEO description
              </label>
              <textarea
                id="seoDescription"
                name="seoDescription"
                rows={2}
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                className={fieldClass}
              />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="font-serif text-xl text-on-surface">Story content</h2>
            <p className="mt-1 text-sm text-on-surface-variant">
              Type directly in the box. Select text to make it bold, add a link, or
              use the toolbar for headings and lists. You can also type markdown
              shortcuts (e.g. <span className="font-mono text-xs">##</span> for a
              heading).
            </p>
          </div>
          <StoryPortableEditor
            storyKey={story?._id ?? "new"}
            initialBody={initialBody}
            onChangeJson={onBodyJsonChange}
          />
        </section>

        <div className="flex flex-wrap gap-3 pt-2">
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
