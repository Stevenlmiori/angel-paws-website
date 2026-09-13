import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Eye,
  Image as ImageIcon,
  Pencil,
  Plus,
} from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { sanityReadClient } from "@/lib/sanity/client";
import { safeSanityImageUrl } from "@/lib/sanity/image";
import { storiesAllAdminQuery } from "@/lib/sanity/queries";
import type { StoryAdminListItem } from "@/lib/sanity/types";
import { isExcludedSeedStorySlug } from "@/lib/stories/excludedSeedStories";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function storyStatus(story: StoryAdminListItem) {
  if (story.publishState === "draft" || !story.publishedAt) {
    return {
      label: "Draft",
      className: "bg-amber-100 text-amber-900",
    };
  }

  if (story.publishState === "scheduled") {
    return {
      label: "Scheduled",
      className: "bg-sky-100 text-sky-900",
    };
  }

  return {
    label: "Published",
    className: "bg-emerald-100 text-emerald-900",
  };
}

function formatStoryDate(value?: string | null) {
  if (!value) {
    return "No date";
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
    items = items.filter(
      (item) => !item.slug || !isExcludedSeedStorySlug(item.slug),
    );
  }

  return (
    <div className="mx-auto w-full max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
      <AdminPageHeader
        title="Stories"
        description="Create and edit public stories. Drafts stay private until you publish."
        actions={
          <Link
            href="/admin/stories/new"
            className="inline-flex items-center justify-center gap-2 rounded-[0.625rem] bg-gradient-to-br from-primary to-primary-strong px-5 py-2.5 text-sm font-semibold text-on-primary transition hover:shadow-soft"
          >
            <Plus className="size-4" aria-hidden />
            New story
          </Link>
        }
      />

      {!client ? (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
          Stories are not connected yet. Ask Steven to check the Sanity settings.
        </p>
      ) : items.length === 0 ? (
        <p className="text-sm text-on-surface-variant">
          No stories yet. Create your first one.
        </p>
      ) : (
        <ul className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-sm">
          {items.map((s, index) => {
            const status = storyStatus(s);
            const imageSrc = safeSanityImageUrl(s.featuredImage, (b) =>
              b.width(240).height(160),
            );

            return (
              <li
                key={s._id}
                className={
                  index > 0 ? "border-t border-black/[0.06]" : undefined
                }
              >
                <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-5 sm:px-5">
                  <div className="relative h-20 w-full shrink-0 overflow-hidden rounded-xl bg-surface-container-low sm:h-16 sm:w-24">
                    {imageSrc ? (
                      <Image
                        src={imageSrc}
                        alt={s.featuredImage?.alt ?? ""}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-on-surface-variant">
                        <ImageIcon className="size-5" aria-hidden />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="truncate font-medium text-on-surface">
                        {s.title || "Untitled story"}
                      </h2>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${status.className}`}
                      >
                        {status.label}
                      </span>
                    </div>
                    <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-on-surface-variant">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="size-3.5" aria-hidden />
                        {formatStoryDate(s.publishedAt)}
                      </span>
                      {s.slug ? <span>/stories/{s.slug}</span> : null}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-wrap gap-2">
                    <Link
                      href={`/admin/stories/${s._id}`}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-on-primary"
                    >
                      <Pencil className="size-3.5" aria-hidden />
                      Edit
                    </Link>
                    {s.slug && status.label === "Published" ? (
                      <Link
                        href={`/stories/${s.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-on-surface-variant hover:bg-black/[0.04]"
                      >
                        <Eye className="size-3.5" aria-hidden />
                        View
                      </Link>
                    ) : null}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
