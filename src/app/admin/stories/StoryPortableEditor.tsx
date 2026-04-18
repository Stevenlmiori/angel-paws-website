"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  EditorProvider,
  keyGenerator,
  PortableTextEditable,
  useEditor,
  type PortableTextBlock,
  type RenderAnnotationFunction,
  type RenderBlockFunction,
  type RenderDecoratorFunction,
  type RenderListItemFunction,
  type RenderStyleFunction,
} from "@portabletext/editor";
import { EventListenerPlugin } from "@portabletext/editor/plugins";
import { MarkdownShortcutsPlugin } from "@portabletext/plugin-markdown-shortcuts";
import { PasteLinkPlugin } from "@portabletext/plugin-paste-link";
import { TypographyPlugin } from "@portabletext/plugin-typography";
import {
  Bold,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  Quote,
  Redo2,
  Type,
  Undo2,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { storyBodyEditorSchema } from "@/lib/stories/storyBodyEditorSchema";
import { urlForImage } from "@/lib/sanity/image";

type Props = {
  storyKey: string;
  initialBody: PortableTextBlock[];
  onChangeJson: (json: string) => void;
};

function focusEditor(ed: ReturnType<typeof useEditor>) {
  if (!ed) {
    return;
  }
  ed.send({ type: "focus" });
}

function FormatToolbar() {
  const editor = useEditor();
  const [pickingImage, setPickingImage] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const run = useCallback(
    (fn: (e: NonNullable<typeof editor>) => void) => {
      if (!editor) {
        return;
      }
      fn(editor);
      focusEditor(editor);
    },
    [editor],
  );

  const onFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      e.target.value = "";
      if (!file || !editor) {
        return;
      }
      setPickingImage(true);
      try {
        const fd = new FormData();
        fd.set("file", file);
        const res = await fetch("/api/admin/story-image", {
          method: "POST",
          body: fd,
        });
        const data = (await res.json()) as { ref?: string; error?: string };
        if (!res.ok || !data.ref) {
          window.alert(data.error ?? "Could not upload the image.");
          return;
        }
        const alt =
          window.prompt(
            "Short description of the photo for blind visitors (recommended)",
          )?.trim() ?? "";
        editor.send({
          type: "insert.block",
          block: {
            _type: "image",
            _key: keyGenerator(),
            asset: { _type: "reference", _ref: data.ref },
            alt: alt || undefined,
          },
          placement: "after",
        });
        editor.send({ type: "focus" });
      } finally {
        setPickingImage(false);
      }
    },
    [editor],
  );

  if (!editor) {
    return null;
  }

  const btn =
    "inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-xl border border-primary/15 bg-white px-2.5 text-xs font-semibold text-on-surface shadow-sm transition hover:border-primary/30 hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-50 sm:px-3";

  return (
    <>
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        tabIndex={-1}
        aria-hidden
        onChange={onFileChange}
      />
      <div
        className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-primary/12 bg-surface-container-high/90 p-2 shadow-sm backdrop-blur-sm"
        role="toolbar"
        aria-label="Formatting"
      >
        <button
          type="button"
          className={btn}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() =>
            run((ed) =>
              ed.send({
                type: "history.undo",
              }),
            )
          }
          title="Undo"
        >
          <Undo2 className="size-4 shrink-0" aria-hidden />
          <span className="hidden sm:inline">Undo</span>
        </button>
        <button
          type="button"
          className={btn}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() =>
            run((ed) =>
              ed.send({
                type: "history.redo",
              }),
            )
          }
          title="Redo"
        >
          <Redo2 className="size-4 shrink-0" aria-hidden />
          <span className="hidden sm:inline">Redo</span>
        </button>
        <span className="mx-0.5 hidden h-6 w-px bg-primary/15 sm:block" aria-hidden />
        <button
          type="button"
          className={btn}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() =>
            run((ed) => ed.send({ type: "style.toggle", style: "normal" }))
          }
          title="Paragraph"
        >
          <Type className="size-4 shrink-0" aria-hidden />
          <span className="hidden lg:inline">Paragraph</span>
        </button>
        <button
          type="button"
          className={btn}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() =>
            run((ed) => ed.send({ type: "style.toggle", style: "h2" }))
          }
          title="Large heading"
        >
          <Heading2 className="size-4 shrink-0" aria-hidden />
          <span className="hidden lg:inline">Heading</span>
        </button>
        <button
          type="button"
          className={btn}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() =>
            run((ed) => ed.send({ type: "style.toggle", style: "h3" }))
          }
          title="Subheading"
        >
          <Heading3 className="size-4 shrink-0" aria-hidden />
          <span className="hidden lg:inline">Subheading</span>
        </button>
        <button
          type="button"
          className={btn}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() =>
            run((ed) =>
              ed.send({ type: "style.toggle", style: "blockquote" }),
            )
          }
          title="Quote"
        >
          <Quote className="size-4 shrink-0" aria-hidden />
          <span className="hidden lg:inline">Quote</span>
        </button>
        <span className="mx-0.5 hidden h-6 w-px bg-primary/15 sm:block" aria-hidden />
        <button
          type="button"
          className={btn}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() =>
            run((ed) =>
              ed.send({ type: "list item.toggle", listItem: "bullet" }),
            )
          }
          title="Bulleted list"
        >
          <List className="size-4 shrink-0" aria-hidden />
          <span className="hidden lg:inline">Bullets</span>
        </button>
        <button
          type="button"
          className={btn}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() =>
            run((ed) =>
              ed.send({ type: "list item.toggle", listItem: "number" }),
            )
          }
          title="Numbered list"
        >
          <ListOrdered className="size-4 shrink-0" aria-hidden />
          <span className="hidden lg:inline">Numbers</span>
        </button>
        <span className="mx-0.5 hidden h-6 w-px bg-primary/15 sm:block" aria-hidden />
        <button
          type="button"
          className={btn}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() =>
            run((ed) =>
              ed.send({ type: "decorator.toggle", decorator: "strong" }),
            )
          }
          title="Bold"
        >
          <Bold className="size-4 shrink-0" aria-hidden />
        </button>
        <button
          type="button"
          className={btn}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() =>
            run((ed) =>
              ed.send({ type: "decorator.toggle", decorator: "em" }),
            )
          }
          title="Italic"
        >
          <Italic className="size-4 shrink-0" aria-hidden />
        </button>
        <button
          type="button"
          className={btn}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            const href = window.prompt(
              "Paste or type a link (use https:// for external sites)",
            );
            if (!href?.trim()) {
              return;
            }
            run((ed) =>
              ed.send({
                type: "annotation.toggle",
                annotation: {
                  name: "link",
                  value: { href: href.trim() },
                },
              }),
            );
          }}
          title="Link"
        >
          <Link2 className="size-4 shrink-0" aria-hidden />
          <span className="hidden lg:inline">Link</span>
        </button>
        <span className="mx-0.5 hidden h-6 w-px bg-primary/15 sm:block" aria-hidden />
        <button
          type="button"
          className={`${btn} border-primary/25 bg-primary/10 text-primary`}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => fileRef.current?.click()}
          disabled={pickingImage}
          title="Add a photo in the story"
        >
          <ImagePlus className="size-4 shrink-0" aria-hidden />
          <span className="hidden sm:inline">
            {pickingImage ? "Uploading…" : "Photo"}
          </span>
        </button>
      </div>
    </>
  );
}

const renderStyle: RenderStyleFunction = (props) => {
  const name = props.schemaType.name;
  if (name === "h2") {
    return (
      <h2 className="mb-2 mt-4 font-serif text-2xl font-semibold text-on-surface first:mt-0">
        {props.children}
      </h2>
    );
  }
  if (name === "h3") {
    return (
      <h3 className="mb-2 mt-3 font-serif text-xl font-semibold text-on-surface first:mt-0">
        {props.children}
      </h3>
    );
  }
  if (name === "blockquote") {
    return (
      <blockquote className="my-3 border-l-4 border-primary/35 pl-4 font-serif text-lg italic leading-relaxed text-on-surface">
        {props.children}
      </blockquote>
    );
  }
  return (
    <p className="mb-3 text-base leading-relaxed text-on-surface last:mb-0">
      {props.children}
    </p>
  );
};

const renderDecorator: RenderDecoratorFunction = (props) => {
  if (props.value === "strong") {
    return <strong className="font-semibold">{props.children}</strong>;
  }
  if (props.value === "em") {
    return <em>{props.children}</em>;
  }
  return <>{props.children}</>;
};

const renderAnnotation: RenderAnnotationFunction = (props) => {
  if (props.schemaType.name === "link") {
    const v = props.value as unknown as { href?: string };
    const href = typeof v.href === "string" ? v.href : "#";
    const external = /^https?:\/\//i.test(href);
    return (
      <a
        href={href}
        className="font-semibold text-primary underline decoration-primary/35 underline-offset-[3px]"
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {props.children}
      </a>
    );
  }
  return <>{props.children}</>;
};

const renderListItem: RenderListItemFunction = (props) => (
  <li
    className={cn(
      "mb-1.5 text-base leading-relaxed text-on-surface",
      props.value === "number" ? "list-decimal" : "list-disc",
    )}
  >
    {props.children}
  </li>
);

const renderBlock: RenderBlockFunction = (props) => {
  const v = props.value as {
    _type?: string;
    asset?: { _ref?: string };
    alt?: string;
  };
  if (v._type === "image") {
    const src =
      v.asset?._ref != null
        ? urlForImage({
            _type: "image",
            asset: { _type: "reference", _ref: v.asset._ref },
            alt: typeof v.alt === "string" ? v.alt : "",
          })
            ?.width(720)
            .url()
        : null;
    return (
      <figure className="my-4 overflow-hidden rounded-2xl border border-primary/15 bg-surface-container-low shadow-sm">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element -- Sanity CDN preview in admin
          <img src={src} alt="" className="max-h-72 w-full object-cover" />
        ) : (
          <div className="flex min-h-[120px] items-center justify-center bg-surface-container p-4 text-sm text-on-surface-variant">
            Image
          </div>
        )}
        <figcaption className="border-t border-primary/10 px-3 py-2 text-xs text-on-surface-variant">
          In-story photo — same placement on the public story page.
        </figcaption>
      </figure>
    );
  }
  return (
    <div className="relative mb-1 min-h-[1.5rem] rounded-md px-0.5 py-0.5">
      {props.children}
    </div>
  );
};

export function StoryPortableEditor({
  storyKey,
  initialBody,
  onChangeJson,
}: Props) {
  const handleMutation = useCallback(
    (value: Array<PortableTextBlock> | undefined) => {
      onChangeJson(JSON.stringify(value ?? []));
    },
    [onChangeJson],
  );

  useEffect(() => {
    onChangeJson(JSON.stringify(initialBody));
  }, [storyKey, initialBody, onChangeJson]);

  return (
    <div className="space-y-3">
      <EditorProvider
        key={storyKey}
        initialConfig={{
          schemaDefinition: storyBodyEditorSchema,
          initialValue: initialBody,
        }}
      >
        <EventListenerPlugin
          on={(event) => {
            if (event.type === "mutation") {
              handleMutation(event.value);
            }
          }}
        />
        <MarkdownShortcutsPlugin
          defaultStyle={() => "normal"}
          headingStyle={({ props: p }) => {
            const level = p.level;
            if (level <= 1) {
              return "h2";
            }
            return "h3";
          }}
          blockquoteStyle={() => "blockquote"}
          boldDecorator={() => "strong"}
          italicDecorator={() => "em"}
          unorderedList={() => "bullet"}
          orderedList={() => "number"}
          linkObject={({ context, props: linkProps }) => ({
            _type: "link",
            _key: context.keyGenerator(),
            href: linkProps.href,
          })}
        />
        <PasteLinkPlugin
          link={({ context, value }) => ({
            _type: "link",
            _key: context.keyGenerator(),
            href: value.href,
          })}
        />
        <TypographyPlugin preset="default" />
        <FormatToolbar />
        <div className="rounded-2xl border border-primary/15 bg-white shadow-inner">
          <PortableTextEditable
            className="min-h-[22rem] px-4 py-4 text-base leading-relaxed text-on-surface outline-none sm:min-h-[26rem] sm:px-6 sm:py-6"
            spellCheck
            renderStyle={renderStyle}
            renderDecorator={renderDecorator}
            renderAnnotation={renderAnnotation}
            renderListItem={renderListItem}
            renderBlock={renderBlock}
          />
        </div>
      </EditorProvider>
    </div>
  );
}
