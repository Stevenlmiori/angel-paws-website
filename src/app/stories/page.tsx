import type { Metadata } from "next";
import { sanityReadClient } from "@/lib/sanity/client";
import { storiesPublishedQuery } from "@/lib/sanity/queries";
import type { StoryListItem } from "@/lib/sanity/types";
import { withoutExcludedSeedStories } from "@/lib/stories/excludedSeedStories";
import { normalizeStoryPublishedDates } from "@/lib/stories/storyDateOverrides";
import {
  getLocalPublishedStories,
  mergePublishedStories,
} from "@/lib/stories/localStories";
import { pageMetadata } from "@/lib/seo";
import { StoryCard } from "@/components/stories/StoryCard";
import { HeadingBlock } from "@/components/ui/HeadingBlock";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = pageMetadata({
  title: "Therapy Dog Stories from Houston & Greater Houston",
  description:
    "Read field notes and stories from Angel Paws therapy dog visits with schools, hospitals, senior communities, churches, and community partners across Greater Houston.",
  path: "/stories",
  keywords: [
    "Houston therapy dog stories",
    "pet therapy stories Houston",
    "Angel Paws visits",
  ],
});

export const revalidate = 120;

export default async function StoriesIndexPage() {
  const client = sanityReadClient();
  let allPublished: StoryListItem[] = [];
  if (client) {
    allPublished = await client.fetch<StoryListItem[]>(storiesPublishedQuery);
  }
  allPublished = withoutExcludedSeedStories(
    normalizeStoryPublishedDates(
      mergePublishedStories(getLocalPublishedStories(), allPublished),
    ),
  );

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

        {allPublished.length === 0 ? (
          <p className="text-on-surface-variant">
            No published stories yet. Check back soon.
          </p>
        ) : (
          <ul className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {allPublished.map((s) => (
              <li key={s._id}>
                <StoryCard story={s} compact />
              </li>
            ))}
          </ul>
        )}
      </div>
    </Section>
  );
}
