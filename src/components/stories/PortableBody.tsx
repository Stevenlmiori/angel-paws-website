import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { urlForImage } from "@/lib/sanity/image";
import { normalizePortableTextForPublic } from "@/lib/stories/normalizePortableTextForPublic";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const alt =
        typeof value?.alt === "string" && value.alt
          ? value.alt
          : "Story image";
      const builder = urlForImage(value);
      if (!builder) {
        return null;
      }
      const src = builder.width(1200).url();
      if (!src || !/^https?:\/\//.test(src)) {
        return null;
      }
      return (
        <figure className="my-10 overflow-hidden rounded-[2rem] bg-surface-container-low shadow-soft">
          <div className="relative aspect-[16/10] w-full">
            <Image
              src={src}
              alt={alt}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </div>
          {typeof value?.caption === "string" && value.caption ? (
            <figcaption className="px-6 py-4 text-sm text-on-surface-variant">
              {value.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
  block: {
    normal: ({ children }) => (
      <p className="mb-6 text-lg leading-relaxed text-on-surface-variant">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-12 font-serif text-3xl font-semibold text-on-surface first:mt-0 md:text-4xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-10 font-serif text-2xl font-semibold text-on-surface md:text-3xl">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-4 border-primary/40 pl-6 font-serif text-xl italic leading-relaxed text-on-surface md:text-2xl">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-8 list-disc space-y-2 pl-6 text-lg text-on-surface-variant">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-8 list-decimal space-y-2 pl-6 text-lg text-on-surface-variant">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-on-surface">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      const external = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          className="font-semibold text-primary underline underline-offset-4"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
  },
};

type PortableBodyProps = {
  value: unknown[] | null | undefined;
};

export function PortableBody({ value }: PortableBodyProps) {
  if (!value || !Array.isArray(value) || value.length === 0) {
    return null;
  }
  const safe = normalizePortableTextForPublic(value);
  if (!safe?.length) {
    return null;
  }
  return (
    <div className="prose-story max-w-none">
      <PortableText value={safe as never} components={components} />
    </div>
  );
}
