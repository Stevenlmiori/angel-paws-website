import type { Metadata } from "next";
import Link from "next/link";
import { sanityReadClient } from "@/lib/sanity/client";
import { storiesPublishedQuery } from "@/lib/sanity/queries";
import type { StoryListItem } from "@/lib/sanity/types";
import { StoryCard } from "@/components/stories/StoryCard";
import { HeadingBlock } from "@/components/ui/HeadingBlock";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Stories",
  description:
    "Field notes and moments from Angel Paws therapy dog visits across Houston.",
};

export const revalidate = 120;

export default async function StoriesIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const client = sanityReadClient();
  let allPublished: StoryListItem[] = [];
  if (client) {
    allPublished = await client.fetch<StoryListItem[]>(storiesPublishedQuery);
  }

  const tagNorm = tag?.trim().toLowerCase() ?? "";
  const stories = tagNorm
    ? allPublished.filter((s) =>
        (s.tags ?? []).map((x) => x.toLowerCase()).includes(tagNorm),
      )
    : allPublished;

  const allTags = Array.from(
    new Set(allPublished.flatMap((s) => s.tags ?? []).filter(Boolean)),
  ).sort();

  return (
    <Section tone="mist" className="!pt-28 md:!pt-32">
      <div className="mx-auto max-w-screen-xl px-6 sm:px-10 lg:px-12">
        <HeadingBlock
          label="Stories"
          title="Moments from the field"
          as="h1"
          description="Short visits, lasting impressions—hospitals, schools, senior communities, and everywhere Angel Paws is invited."
          className="mb-16"
        />

        {allTags.length > 0 ? (
          <div className="mb-12 flex flex-wrap gap-2">
            <FilterChip href="/stories" active={!tagNorm}>
              All
            </FilterChip>
            {allTags.map((t) => (
              <FilterChip
              key={t}
              href={`/stories?tag=${encodeURIComponent(t)}`}
              active={tagNorm === t.toLowerCase()}
            >
                {t}
              </FilterChip>
            ))}
          </div>
        ) : null}

        {!client ? (
          <p className="text-on-surface-variant">
            Stories are not configured yet (missing Sanity environment variables).
          </p>
        ) : stories.length === 0 ? (
          <p className="text-on-surface-variant">No published stories yet. Check back soon.</p>
        ) : (
          <ul className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {stories.map((s) => (
              <li key={s._id}>
                <StoryCard story={s} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </Section>
  );
}

function FilterChip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={
        active
          ? "rounded-full bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wider text-on-primary"
          : "rounded-full bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-wider text-on-surface-variant ring-1 ring-primary/10 transition hover:bg-primary-container/60"
      }
    >
      {children}
    </Link>
  );
}
