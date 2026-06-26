import type { StoryDetail, StoryListItem } from "@/lib/sanity/types";

const STORY_PUBLISHED_AT_OVERRIDES: Record<string, string> = {
  "klein-isd-superintendent-letter": "2026-06-15T12:00:00.000Z",
  "a-moment-of-comfort-hope-and-prayer": "2026-05-15T12:00:00.000Z",
  "a-calm-presence-in-kerrville": "2025-07-15T12:00:00.000Z",
  "kerrville-flood-tucker": "2025-07-15T12:00:00.000Z",
  "memory-care-ollie": "2018-06-15T12:00:00.000Z",
  "sutherland-springs": "2017-11-15T12:00:00.000Z",
};

export function normalizeStoryPublishedAt<T extends StoryDetail | StoryListItem>(
  story: T,
): T {
  const publishedAt = STORY_PUBLISHED_AT_OVERRIDES[story.slug];
  if (!publishedAt) {
    return story;
  }
  return { ...story, publishedAt };
}

export function normalizeStoryPublishedDates<T extends StoryListItem>(
  stories: T[],
): T[] {
  return stories.map(normalizeStoryPublishedAt).sort((a, b) => {
    const ad = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const bd = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return bd - ad;
  });
}
