import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityReadClient } from "@/lib/sanity/client";
import { safeSanityImageUrl } from "@/lib/sanity/image";
import { storyBySlugQuery } from "@/lib/sanity/queries";
import type { StoryDetail } from "@/lib/sanity/types";
import { DEFAULT_OG_IMAGE, pageMetadata } from "@/lib/seo";
import { isExcludedSeedStorySlug } from "@/lib/stories/excludedSeedStories";
import { getLocalStoryBySlug } from "@/lib/stories/localStories";
import { PortableBody } from "@/components/stories/PortableBody";
import { Section } from "@/components/ui/Section";

export const revalidate = 120;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (isExcludedSeedStorySlug(slug)) {
    return pageMetadata({
      title: "Therapy Dog Story",
      description:
        "A story from Angel Paws Pet Therapy visits across Greater Houston.",
      path: `/stories/${slug}`,
    });
  }
  const localStory = getLocalStoryBySlug(slug);
  if (localStory) {
    const title = localStory.seoTitle?.trim() || localStory.title;
    const desc =
      localStory.seoDescription?.trim() ||
      localStory.excerpt?.trim() ||
      "A story from Angel Paws Pet Therapy visits across Greater Houston.";
    return pageMetadata({
      title,
      description: desc,
      path: `/stories/${slug}`,
      image: localStory.featuredImage?.url
        ? {
            url: localStory.featuredImage.url,
            width: 1200,
            height: 630,
            alt: localStory.featuredImage.alt ?? title,
          }
        : DEFAULT_OG_IMAGE,
      keywords: ["Angel Paws story", "Houston therapy dog visit story"],
    });
  }
  const client = sanityReadClient();
  if (!client) {
    return pageMetadata({
      title: "Therapy Dog Story",
      description:
        "A story from Angel Paws Pet Therapy visits across Greater Houston.",
      path: `/stories/${slug}`,
    });
  }
  const story = await client.fetch<StoryDetail | null>(storyBySlugQuery, {
    slug,
  });
  if (!story) {
    return pageMetadata({
      title: "Therapy Dog Story",
      description:
        "A story from Angel Paws Pet Therapy visits across Greater Houston.",
      path: `/stories/${slug}`,
    });
  }
  const title = story.seoTitle?.trim() || story.title;
  const desc =
    story.seoDescription?.trim() ||
    story.excerpt?.trim() ||
    "A story from Angel Paws Pet Therapy visits across Greater Houston.";
  const imageUrl =
    story.featuredImage?.url ??
    safeSanityImageUrl(story.featuredImage, (b) => b.width(1200).height(630));
  return pageMetadata({
    title,
    description: desc,
    path: `/stories/${slug}`,
    image: imageUrl
      ? {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: story.featuredImage?.alt ?? title,
        }
      : DEFAULT_OG_IMAGE,
    keywords: ["Angel Paws story", "Houston therapy dog visit story"],
  });
}

export default async function StoryDetailPage({ params }: Props) {
  const { slug } = await params;
  if (isExcludedSeedStorySlug(slug)) {
    notFound();
  }
  const localStory = getLocalStoryBySlug(slug);
  const client = sanityReadClient();
  if (!client && !localStory) {
    notFound();
  }
  const story =
    localStory ??
    (await client!.fetch<StoryDetail | null>(storyBySlugQuery, { slug }));
  if (!story) {
    notFound();
  }

  const hero =
    story.featuredImage?.url ??
    safeSanityImageUrl(story.featuredImage, (b) => b.width(1600).height(900));

  const publishedLabel = (() => {
    if (!story.publishedAt) {
      return null;
    }
    const d = new Date(story.publishedAt);
    if (Number.isNaN(d.getTime())) {
      return null;
    }
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  })();

  return (
    <article>
      <Section
        tone="inverse"
        className="!pt-28 md:!pt-32 !pb-8 md:!pb-10"
      >
        <div className="mx-auto max-w-screen-md px-6 sm:px-10 lg:px-12">
          <Link
            href="/stories"
            className="mb-8 inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            ← All stories
          </Link>
          {publishedLabel ? (
            <time
              dateTime={
                typeof story.publishedAt === "string"
                  ? story.publishedAt
                  : undefined
              }
              className="mb-3 block text-xs font-bold uppercase tracking-widest text-primary"
            >
              {publishedLabel}
            </time>
          ) : null}
          <h1 className="font-serif text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
            {story.title}
          </h1>
          {story.tags?.length ? (
            <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-on-surface-inverse-muted">
              {story.tags.join(" · ")}
            </p>
          ) : null}
        </div>
      </Section>

      {hero ? (
        <div className="mx-auto mt-8 max-w-screen-lg px-6 sm:px-10 md:mt-12 lg:px-12">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[2.5rem] bg-surface-container-low shadow-soft">
            <Image
              src={hero}
              alt={story.featuredImage?.alt ?? "Story image"}
              fill
              priority
              unoptimized
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        </div>
      ) : null}

      <Section tone="warm" className="!pt-10 !pb-16 md:!pt-14 md:!pb-20">
        <div className="mx-auto max-w-screen-md px-6 sm:px-10 lg:px-12 [&_.prose-story>p:last-child]:mb-0">
          <PortableBody value={story.body ?? undefined} />
        </div>
      </Section>
    </article>
  );
}
