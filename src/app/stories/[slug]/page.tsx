import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { sanityReadClient } from "@/lib/sanity/client";
import { safeSanityImageUrl } from "@/lib/sanity/image";
import { storyBySlugQuery } from "@/lib/sanity/queries";
import type { StoryDetail } from "@/lib/sanity/types";
import { DEFAULT_OG_IMAGE, pageMetadata } from "@/lib/seo";
import { isExcludedSeedStorySlug } from "@/lib/stories/excludedSeedStories";
import { getLocalStoryBySlug } from "@/lib/stories/localStories";
import { normalizeStoryPublishedAt } from "@/lib/stories/storyDateOverrides";
import { PortableBody } from "@/components/stories/PortableBody";
import { Section } from "@/components/ui/Section";

export const revalidate = 120;

type Props = { params: Promise<{ slug: string }> };

function formatStoryMonthYear(publishedAt?: string | null): string | null {
  if (!publishedAt) {
    return null;
  }
  const d = new Date(publishedAt);
  if (Number.isNaN(d.getTime())) {
    return null;
  }
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
  });
}

async function getPublishedStory(slug: string): Promise<StoryDetail | null> {
  const client = sanityReadClient();
  let sanityStory: StoryDetail | null = null;
  if (client) {
    try {
      sanityStory = await client.fetch<StoryDetail | null>(storyBySlugQuery, {
        slug,
      });
    } catch {
      sanityStory = null;
    }
  }

  const story = sanityStory ?? getLocalStoryBySlug(slug);
  return story ? normalizeStoryPublishedAt(story) : null;
}

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
  const story = await getPublishedStory(slug);
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
  const story = await getPublishedStory(slug);
  if (!story) {
    notFound();
  }

  const hero =
    story.featuredImage?.url ??
    safeSanityImageUrl(story.featuredImage, (b) => b.width(1600).height(900));

  const publishedLabel = formatStoryMonthYear(story.publishedAt);

  return (
    <article>
      <Section
        tone="inverse"
        className="!pt-28 md:!pt-36 !pb-14 md:!pb-20"
      >
        <div className="mx-auto max-w-screen-md px-6 sm:px-10 lg:px-12">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/stories"
              className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-on-surface-inverse-muted transition-colors hover:text-white"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" strokeWidth={2} aria-hidden />
              All stories
            </Link>
            {publishedLabel ? (
              <time
                dateTime={
                  typeof story.publishedAt === "string"
                    ? story.publishedAt
                    : undefined
                }
                className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-container"
              >
                {publishedLabel}
              </time>
            ) : null}
          </div>

          <h1 className="font-serif text-4xl font-bold leading-[1.15] tracking-tight text-white sm:text-5xl md:text-6xl">
            {story.title}
          </h1>

          {story.excerpt ? (
            <p className="mt-6 text-lg leading-relaxed text-on-surface-inverse-muted md:text-xl">
              {story.excerpt}
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
