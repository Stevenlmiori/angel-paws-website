import type { StoryDetail, StoryListItem } from "@/lib/sanity/types";

export const localStories: StoryDetail[] = [];

export function getLocalStoryBySlug(slug: string): StoryDetail | null {
  return localStories.find((story) => story.slug === slug) ?? null;
}

export function getLocalStorySlugs(): string[] {
  return localStories.map((story) => story.slug);
}

export function getLocalPublishedStories(tag?: string): StoryListItem[] {
  const tagNorm = tag?.trim().toLowerCase() ?? "";
  return localStories
    .filter((story) => {
      if (!tagNorm) {
        return true;
      }
      return (story.tags ?? []).map((x) => x.toLowerCase()).includes(tagNorm);
    })
    .map((story) => ({
      _id: story._id,
      title: story.title,
      slug: story.slug,
      publishedAt: story.publishedAt,
      excerpt: story.excerpt,
      featuredImage: story.featuredImage,
      tags: story.tags,
    }))
    .sort((a, b) => {
      const ad = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const bd = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return bd - ad;
    });
}

export function mergePublishedStories(
  localItems: StoryListItem[],
  sanityItems: StoryListItem[],
): StoryListItem[] {
  const seen = new Set<string>();
  return [...localItems, ...sanityItems]
    .filter((story) => {
      if (seen.has(story.slug)) {
        return false;
      }
      seen.add(story.slug);
      return true;
    })
    .sort((a, b) => {
      const ad = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const bd = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return bd - ad;
    });
}
