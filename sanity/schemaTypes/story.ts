/**
 * Reference schema for the `story` document type in Sanity.
 * Add this type in your Sanity project (Manage → API → or Studio schema) if you use Studio;
 * the site and seed script work as long as documents match this shape.
 */
export const storySchemaDescription = {
  name: "story",
  type: "document",
  fields: [
    { name: "title", type: "string", title: "Title" },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "title", maxLength: 96 },
    },
    { name: "publishedAt", type: "datetime", title: "Published at" },
    { name: "excerpt", type: "text", title: "Excerpt", rows: 3 },
    {
      name: "featuredImage",
      type: "image",
      title: "Featured image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    },
    {
      name: "tags",
      type: "array",
      title: "Tags",
      of: [{ type: "string" }],
    },
    {
      name: "body",
      type: "array",
      title: "Body",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [{ name: "href", type: "url", title: "URL" }],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "Alt" },
            { name: "caption", type: "string", title: "Caption" },
          ],
        },
      ],
    },
    { name: "seoTitle", type: "string", title: "SEO title" },
    { name: "seoDescription", type: "text", title: "SEO description", rows: 3 },
  ],
} as const;
