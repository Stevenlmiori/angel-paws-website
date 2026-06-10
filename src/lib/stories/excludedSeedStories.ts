/** Fictional demo stories from early seeding — never show on the public site. */
export const EXCLUDED_SEED_STORY_SLUGS = [
  "a-quiet-morning-on-seven-north",
  "second-period-softened",
  "sunday-letters-and-lemonade",
] as const;

export function isExcludedSeedStorySlug(slug: string): boolean {
  return (EXCLUDED_SEED_STORY_SLUGS as readonly string[]).includes(slug);
}

export function withoutExcludedSeedStories<T extends { slug: string }>(
  items: T[],
): T[] {
  return items.filter((item) => !isExcludedSeedStorySlug(item.slug));
}
