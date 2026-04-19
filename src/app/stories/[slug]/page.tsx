import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityReadClient } from "@/lib/sanity/client";
import { safeSanityImageUrl } from "@/lib/sanity/image";
import { storyBySlugQuery } from "@/lib/sanity/queries";
import type { StoryDetail } from "@/lib/sanity/types";
import { PortableBody } from "@/components/stories/PortableBody";
import { Section } from "@/components/ui/Section";

export const revalidate = 120;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const client = sanityReadClient();
  if (!client) {
    return { title: "Story" };
  }
  const story = await client.fetch<StoryDetail | null>(storyBySlugQuery, { slug });
  if (!story) {
    return { title: "Story" };
  }
  const title = story.seoTitle?.trim() || story.title;
  const desc = story.seoDescription?.trim() || story.excerpt?.trim() || undefined;
  return {
    title,
    description: desc,
    openGraph: { title, description: desc },
  };
}

export default async function StoryDetailPage({ params }: Props) {
  const { slug } = await params;
  const client = sanityReadClient();
  if (!client) {
    notFound();
  }
  const story = await client.fetch<StoryDetail | null>(storyBySlugQuery, { slug });
  if (!story) {
    notFound();
  }

  const hero = safeSanityImageUrl(story.featuredImage, (b) =>
    b.width(1600).height(900),
  );

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
      <Section tone="default" className="!pt-28 md:!pt-32">
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
                typeof story.publishedAt === "string" ? story.publishedAt : undefined
              }
              className="mb-3 block text-xs font-bold uppercase tracking-widest text-primary"
            >
              {publishedLabel}
            </time>
          ) : null}
          <h1 className="font-serif text-4xl font-semibold leading-tight text-on-surface md:text-5xl lg:text-6xl">
            {story.title}
          </h1>
          {story.tags?.length ? (
            <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-secondary">
              {story.tags.join(" · ")}
            </p>
          ) : null}
        </div>
      </Section>

      {hero ? (
        <div className="mx-auto max-w-screen-lg px-6 sm:px-10 lg:px-12">
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

      <Section tone="warm" className="!pt-16 md:!pt-20">
        <div className="mx-auto max-w-screen-md px-6 sm:px-10 lg:px-12">
          <PortableBody value={story.body ?? undefined} />
        </div>
      </Section>
    </article>
  );
}
