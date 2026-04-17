export const storyListProjection = `{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  featuredImage,
  tags
}`;

export const storyByIdAdminQuery = `*[_type == "story" && _id == $id][0]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  featuredImage,
  tags,
  body,
  seoTitle,
  seoDescription
}`;

export const storyBySlugQuery = `*[_type == "story" && slug.current == $slug && defined(publishedAt) && publishedAt <= now()][0]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  featuredImage,
  tags,
  body,
  seoTitle,
  seoDescription
}`;

export const storySlugsQuery = `*[_type == "story" && defined(slug.current) && defined(publishedAt) && publishedAt <= now()].slug.current`;

export const storiesPublishedQuery = `*[_type == "story" && defined(slug.current) && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc) ${storyListProjection}`;

/** `$tag` — pass `""` to ignore tag filter and take latest three. */
export const storiesForHomeQuery = `*[_type == "story" && defined(slug.current) && defined(publishedAt) && publishedAt <= now() && ($tag == "" || $tag in coalesce(tags, []))] | order(publishedAt desc) [0...3] ${storyListProjection}`;

/** Admin: all stories including future / missing dates */
export const storiesAllAdminQuery = `*[_type == "story"] | order(coalesce(publishedAt, _updatedAt) desc) {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  tags,
  "hasImage": defined(featuredImage.asset)
}`;
