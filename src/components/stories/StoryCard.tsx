import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { urlForImage } from "@/lib/sanity/image";
import type { StoryListItem } from "@/lib/sanity/types";

export function StoryCard({ story }: { story: StoryListItem }) {
  const img = story.featuredImage;
  const src =
    img?.asset?._ref && urlForImage(img)
      ? urlForImage(img)!.width(800).height(520).url()
      : null;

  return (
    <Link
      href={`/stories/${story.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[2.5rem] bg-surface-container-high shadow-soft ring-1 ring-primary/5 transition hover:ring-primary/15"
    >
      <div className="relative aspect-[16/10] w-full bg-surface-container-low">
        {src ? (
          <Image
            src={src}
            alt={img?.alt ?? ""}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full min-h-[200px] items-center justify-center bg-gradient-to-br from-primary-container/40 to-secondary-container/50 font-serif text-lg italic text-on-surface-variant">
            Angel Paws
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-8">
        {story.publishedAt ? (
          <time
            dateTime={story.publishedAt}
            className="mb-2 text-xs font-bold uppercase tracking-widest text-primary"
          >
            {new Date(story.publishedAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        ) : null}
        <h2 className="font-serif text-2xl font-semibold leading-snug text-on-surface group-hover:text-primary md:text-3xl">
          {story.title}
        </h2>
        {story.excerpt ? (
          <p className="mt-3 line-clamp-3 flex-1 text-on-surface-variant">
            {story.excerpt}
          </p>
        ) : null}
        {story.tags?.length ? (
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-secondary">
            {story.tags.join(" · ")}
          </p>
        ) : null}
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
          Read story
          <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
