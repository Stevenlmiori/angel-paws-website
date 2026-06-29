import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Eye,
  Image as ImageIcon,
  Pencil,
  Plus,
} from "lucide-react";
import { sanityReadClient } from "@/lib/sanity/client";
import { safeSanityImageUrl } from "@/lib/sanity/image";
import { storiesAllAdminQuery } from "@/lib/sanity/queries";
import type { StoryAdminListItem } from "@/lib/sanity/types";
export const dynamic = "force-dynamic";
export const revalidate = 0;

function storyStatus(story: StoryAdminListItem) {
  if (story.publishState === "draft" || !story.publishedAt) {
    return {
      label: "Draft",
      className: "bg-tertiary-container text-on-tertiary-container",
    };
  }

  if (story.publishState === "scheduled") {
    return {
      label: "Scheduled",
      className: "bg-secondary-container text-on-secondary-container",
    };
  }

  return {
    label: "Published",
    className: "bg-primary-container text-on-primary-container",
  };
}

function formatStoryDate(value?: string | null) {
  if (!value) {
    return "No publish date";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Date needs review";
  }
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function AdminStoriesListPage() {
  const client = sanityReadClient();
  let items: StoryAdminListItem[] = [];
  if (client) {
    items = await client.fetch<StoryAdminListItem[]>(storiesAllAdminQuery);
  }

  return (
    <div className="mx-auto max-w-screen-xl px-6 py-10 sm:px-10 lg:px-12">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Stories admin
          </p>
          <h1 className="mt-2 font-serif text-4xl text-on-surface md:text-5xl">
            Blog editor
          </h1>
          <p className="mt-2 max-w-xl text-on-surface-variant">
            Create and manage public stories with images, publishing status, and
            quick edit controls.
          </p>
        </div>
        <Link
          href="/admin/stories/new"
          className="inline-flex items-center justify-center gap-2 rounded-[0.625rem] bg-gradient-to-br from-primary to-[#3468d9] px-8 py-3.5 text-sm font-semibold tracking-wide text-on-primary shadow-none transition duration-300 ease-out hover:shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary/35"
        >
          <Plus className="size-4" aria-hidden />
          New story
        </Link>
      </div>

      {!client ? (
        <p className="rounded-2xl bg-tertiary-container/50 px-4 py-3 text-sm text-on-tertiary-container">
          Sanity is not configured. Set{" "}
          <code className="font-mono text-xs">NEXT_PUBLIC_SANITY_PROJECT_ID</code> and
          related env vars (see <code className="font-mono text-xs">.env.example</code>
          ).
        </p>
      ) : items.length === 0 ? (
        <p className="text-on-surface-variant">No stories yet. Create your first one.</p>
      ) : (
        <ul className="grid gap-5 lg:grid-cols-2">
          {items.map((s) => {
            const status = storyStatus(s);
            const imageSrc = safeSanityImageUrl(s.featuredImage, (b) =>
              b.width(900).height(506),
            );

            return (
              <li key={s._id} className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-surface-container-high shadow-soft ring-1 ring-primary/5 transition hover:-translate-y-0.5 hover:ring-primary/20">
                  <div className="relative aspect-video bg-surface-container-low">
                    {imageSrc ? (
                      <Image
                        src={imageSrc}
                        alt={s.featuredImage?.alt ?? ""}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.02]"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary-container/45 to-secondary-container/60 text-on-surface-variant">
                        <div className="flex flex-col items-center gap-2 text-sm font-semibold">
                          <ImageIcon className="size-6" aria-hidden />
                          No featured image
                        </div>
                      </div>
                    )}
                    <span
                      className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${status.className}`}
                    >
                      {status.label}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex-1">
                      <h2 className="font-serif text-2xl font-semibold leading-snug text-on-surface">
                        {s.title || "Untitled story"}
                      </h2>
                      <p className="mt-2 truncate font-mono text-xs text-on-surface-variant">
                        {s.slug ? `/stories/${s.slug}` : "No story URL yet"}
                      </p>
                      {s.excerpt ? (
                        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-on-surface-variant">
                          {s.excerpt}
                        </p>
                      ) : null}
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-on-surface-variant">
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/55 px-3 py-1.5 font-semibold">
                        <Calendar className="size-3.5" aria-hidden />
                        {formatStoryDate(s.publishedAt)}
                      </span>
                      {s.tags?.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-white/55 px-3 py-1.5 font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                      {(s.tags?.length ?? 0) > 3 ? (
                        <span className="rounded-full bg-white/55 px-3 py-1.5 font-semibold">
                          +{(s.tags?.length ?? 0) - 3}
                        </span>
                      ) : null}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <Link
                        href={`/admin/stories/${s._id}`}
                        className="inline-flex items-center justify-center gap-2 rounded-[0.625rem] bg-gradient-to-br from-primary to-[#3468d9] px-4 py-2.5 text-sm font-semibold tracking-wide text-on-primary transition hover:shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary/35"
                      >
                        <Pencil className="size-4" aria-hidden />
                        Edit story
                      </Link>
                      {s.slug && status.label === "Published" ? (
                        <Link
                          href={`/stories/${s.slug}`}
                          className="inline-flex items-center justify-center gap-2 rounded-[0.625rem] bg-white/65 px-4 py-2.5 text-sm font-semibold tracking-wide text-on-surface transition hover:bg-white hover:shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary/35"
                        >
                          <Eye className="size-4" aria-hidden />
                          View
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
