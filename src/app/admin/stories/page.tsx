import Link from "next/link";
import { Plus } from "lucide-react";
import { sanityReadClient } from "@/lib/sanity/client";
import { storiesAllAdminQuery } from "@/lib/sanity/queries";
import type { StoryAdminListItem } from "@/lib/sanity/types";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminStoriesListPage() {
  const client = sanityReadClient();
  let items: StoryAdminListItem[] = [];
  if (client) {
    items = await client.fetch<StoryAdminListItem[]>(storiesAllAdminQuery);
  }

  return (
    <div className="mx-auto max-w-screen-xl px-6 py-10 sm:px-10 lg:px-12">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl text-on-surface md:text-5xl">Stories</h1>
          <p className="mt-2 max-w-xl text-on-surface-variant">
            Create and manage public stories. Published stories appear on the site when
            they have a date set and the date is not in the future.
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
        <ul className="space-y-3">
          {items.map((s) => (
            <li key={s._id}>
              <Link
                href={`/admin/stories/${s._id}`}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-surface-container-high px-4 py-4 shadow-soft ring-1 ring-primary/5 transition hover:ring-primary/15"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-on-surface">
                    {s.title || "Untitled"}
                  </p>
                  <p className="truncate font-mono text-xs text-on-surface-variant">
                    {s.slug ? `/stories/${s.slug}` : "— no slug —"}
                  </p>
                  {s.tags?.length ? (
                    <p className="mt-1 text-xs text-on-surface-variant">
                      {s.tags.join(" · ")}
                    </p>
                  ) : null}
                </div>
                <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-primary">
                  {s.hasImage ? "Has image" : "No image"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
