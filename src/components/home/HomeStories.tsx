import Link from "next/link";
import { sanityReadClient } from "@/lib/sanity/client";
import { storiesForHomeQuery } from "@/lib/sanity/queries";
import type { StoryListItem } from "@/lib/sanity/types";
import { StoryCard } from "@/components/stories/StoryCard";
import { HeadingBlock } from "@/components/ui/HeadingBlock";

export async function HomeStories() {
  const client = sanityReadClient();
  const homeTag = (process.env.NEXT_PUBLIC_HOME_STORIES_TAG ?? "").trim();
  const tagParam = homeTag.toLowerCase();

  let items: StoryListItem[] = [];
  if (client) {
    items = await client.fetch<StoryListItem[]>(
      storiesForHomeQuery,
      { tag: tagParam } as Record<string, string>,
    );
  }

  if (!client || items.length === 0) {
    return null;
  }

  return (
    <section className="overflow-hidden bg-gradient-to-b from-surface via-white/80 to-surface py-24 md:py-32">
      <div className="mx-auto max-w-screen-xl px-6 sm:px-10 lg:px-12">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <HeadingBlock
            label="Stories"
            title="Recent moments"
            description="A few highlights from visits across Houston—schools, hospitals, and senior communities."
            className="max-w-2xl"
          />
          <Link
            href="/stories"
            className="shrink-0 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-on-primary transition hover:opacity-90"
          >
            View all
          </Link>
        </div>
        <ul className="grid gap-10 md:grid-cols-3">
          {items.map((s) => (
            <li key={s._id}>
              <StoryCard story={s} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
