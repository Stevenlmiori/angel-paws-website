export type StoryFeaturedImage = {
  asset?: { _ref?: string };
  alt?: string;
  url?: string;
};

export type StoryListItem = {
  _id: string;
  title: string;
  slug: string;
  publishedAt?: string;
  excerpt?: string;
  featuredImage?: StoryFeaturedImage | null;
  tags?: string[] | null;
};

export type StoryDetail = StoryListItem & {
  body?: unknown[] | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
};

export type StoryAdminListItem = {
  _id: string;
  title: string;
  slug: string | null;
  publishedAt?: string | null;
  excerpt?: string | null;
  tags?: string[] | null;
  featuredImage?: StoryFeaturedImage | null;
  publishState?: "draft" | "scheduled" | "published" | null;
  hasImage?: boolean;
};
