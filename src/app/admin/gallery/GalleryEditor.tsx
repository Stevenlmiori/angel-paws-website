"use client";

import { useMemo, useRef, useState, useTransition } from "react";
import {
  ArrowDown,
  ArrowUp,
  Check,
  Eye,
  EyeOff,
  ImagePlus,
  Plus,
  Save,
  Trash2,
  UploadCloud,
} from "lucide-react";
import type { StoredGalleryImage } from "@/lib/siteContent/galleryTypes";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { GalleryImage } from "@/components/gallery/GalleryImage";
import { saveGalleryDirect } from "./actions";

function newId() {
  return `g-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function imageTitle(item: StoredGalleryImage) {
  return item.caption?.trim() || item.alt.trim() || "Untitled photo";
}

function canPreview(src: string) {
  const clean = src.trim();
  return (
    clean.length > 0 &&
    clean !== "/gallery/" &&
    (clean.startsWith("/") ||
      clean.startsWith("https://") ||
      clean.startsWith("data:image/"))
  );
}

function fileBaseName(file: File) {
  return file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not read image."));
    img.src = src;
  });
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () =>
      typeof reader.result === "string"
        ? resolve(reader.result)
        : reject(new Error("Could not read image."));
    reader.onerror = () => reject(new Error("Could not read image."));
    reader.readAsDataURL(file);
  });
}

async function compressedDataUrl(file: File): Promise<string> {
  const source = await readFileAsDataUrl(file);
  const img = await loadImage(source);
  const maxSide = 1800;
  const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
  const width = Math.max(1, Math.round(img.width * scale));
  const height = Math.max(1, Math.round(img.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Could not prepare image.");
  }
  ctx.drawImage(img, 0, 0, width, height);
  return canvas.toDataURL("image/jpeg", 0.82);
}

export function GalleryEditor({
  initialItems,
}: {
  initialItems: StoredGalleryImage[];
}) {
  const [items, setItems] = useState(initialItems);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [pending, startTransition] = useTransition();
  const fileRef = useRef<HTMLInputElement>(null);

  const activeCount = useMemo(
    () => items.filter((item) => item.active).length,
    [items],
  );
  const needsAltCount = useMemo(
    () => items.filter((item) => item.alt.trim().length === 0).length,
    [items],
  );

  function update(id: string, patch: Partial<StoredGalleryImage>) {
    setItems((prev) =>
      prev.map((img) => (img.id === id ? { ...img, ...patch } : img)),
    );
  }

  function addItem() {
    setItems((prev) => [
      {
        id: newId(),
        src: "/gallery/",
        alt: "",
        caption: "",
        active: true,
      },
      ...prev,
    ]);
    setMessage("Blank photo card added.");
  }

  function remove(id: string) {
    setItems((prev) => prev.filter((img) => img.id !== id));
    setMessage("Photo removed. Save to publish the change.");
  }

  function moveItem(id: string, direction: -1 | 1) {
    setItems((prev) => {
      const from = prev.findIndex((item) => item.id === id);
      const to = from + direction;
      if (from < 0 || to < 0 || to >= prev.length) {
        return prev;
      }
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  }

  async function uploadFiles(files: FileList | File[]) {
    const imageFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/"),
    );
    if (imageFiles.length === 0) {
      setMessage("Choose an image file to upload.");
      return;
    }

    setUploading(true);
    setMessage("");
    const uploaded: StoredGalleryImage[] = [];

    try {
      for (const file of imageFiles) {
        const fd = new FormData();
        fd.set("file", file);
        const res = await fetch("/api/admin/gallery-image", {
          method: "POST",
          body: fd,
        });
        const data = (await res.json()) as { src?: string; error?: string };
        const src = data.src;
        let nextSrc = src;
        if (!res.ok || !nextSrc) {
          nextSrc = await compressedDataUrl(file);
        }
        uploaded.push({
          id: newId(),
          src: nextSrc,
          alt: fileBaseName(file),
          caption: "",
          active: true,
        });
      }

      if (uploaded.length > 0) {
        setItems((prev) => [...uploaded, ...prev]);
        setMessage(
          uploaded.length === 1
            ? "Image added. Review alt text and save."
            : `${uploaded.length} images added. Review alt text and save.`,
        );
      }
    } catch {
      setMessage("Upload failed.");
    } finally {
      setUploading(false);
      setDragging(false);
    }
  }

  function save() {
    setMessage("");
    startTransition(async () => {
      const result = await saveGalleryDirect(JSON.stringify(items));
      setMessage(result.message);
    });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[20rem_1fr]">
      <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
        <div
          className={cn(
            "rounded-[1.5rem] bg-surface-container-low p-5 shadow-soft ring-1 ring-primary/5 transition",
            dragging && "bg-primary-container/50 ring-primary/20",
          )}
          onDragEnter={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragOver={(event) => event.preventDefault()}
          onDragLeave={(event) => {
            if (event.currentTarget.contains(event.relatedTarget as Node)) {
              return;
            }
            setDragging(false);
          }}
          onDrop={(event) => {
            event.preventDefault();
            void uploadFiles(event.dataTransfer.files);
          }}
        >
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            multiple
            className="sr-only"
            onChange={(event) => {
              const files = event.target.files;
              if (files) {
                void uploadFiles(files);
              }
              event.target.value = "";
            }}
          />
          <div className="flex size-12 items-center justify-center rounded-2xl bg-primary text-on-primary">
            <UploadCloud className="size-6" aria-hidden />
          </div>
          <h2 className="mt-5 font-serif text-2xl text-on-surface">
            Add photos
          </h2>
          <p className="mt-2 text-sm text-on-surface-variant">
            Drop images here or upload from your computer.
          </p>
          <Button
            type="button"
            className="mt-5 w-full gap-2"
            disabled={uploading}
            onClick={() => fileRef.current?.click()}
          >
            <ImagePlus className="size-4" aria-hidden />
            {uploading ? "Uploading..." : "Upload photos"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={addItem}
            className="mt-3 w-full gap-2 bg-white"
          >
            <Plus className="size-4" aria-hidden />
            Add by path
          </Button>
        </div>

        <div className="rounded-[1.5rem] bg-white p-5 shadow-soft ring-1 ring-primary/5">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            Gallery status
          </p>
          <dl className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-surface-container-low p-4">
              <dt className="text-xs font-semibold text-on-surface-variant">
                Total
              </dt>
              <dd className="mt-1 text-3xl font-bold text-on-surface">
                {items.length}
              </dd>
            </div>
            <div className="rounded-2xl bg-primary-container p-4">
              <dt className="text-xs font-semibold text-on-primary-container">
                Visible
              </dt>
              <dd className="mt-1 text-3xl font-bold text-on-primary-container">
                {activeCount}
              </dd>
            </div>
          </dl>
          {needsAltCount > 0 ? (
            <p className="mt-4 rounded-2xl bg-tertiary-container px-4 py-3 text-sm font-medium text-on-tertiary-container">
              {needsAltCount} photo{needsAltCount === 1 ? "" : "s"} need alt
              text before saving.
            </p>
          ) : (
            <p className="mt-4 flex items-center gap-2 rounded-2xl bg-surface-container-low px-4 py-3 text-sm font-medium text-on-surface-variant">
              <Check className="size-4 text-primary" aria-hidden />
              Metadata is ready.
            </p>
          )}
        </div>
      </aside>

      <section className="min-w-0">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl text-on-surface">
              Gallery photos
            </h2>
            <p className="mt-1 text-sm text-on-surface-variant">
              The first active photos lead the public gallery experience.
            </p>
          </div>
          <Button type="button" onClick={save} disabled={pending} className="gap-2">
            <Save className="size-4" aria-hidden />
            {pending ? "Saving..." : "Save gallery"}
          </Button>
          <p
            className="basis-full text-sm font-medium text-on-surface-variant"
            role="status"
          >
            {message || `${activeCount} visible photos ready for the public gallery.`}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="rounded-[1.5rem] bg-white p-10 text-center shadow-soft ring-1 ring-primary/5">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary-container text-on-primary-container">
              <ImagePlus className="size-7" aria-hidden />
            </div>
            <h3 className="mt-5 font-serif text-2xl text-on-surface">
              No photos yet
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-sm text-on-surface-variant">
              Upload a few ministry photos to start building the gallery.
            </p>
          </div>
        ) : (
          <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item, index) => {
              const title = imageTitle(item);
              const previewable = canPreview(item.src);

              return (
                <li key={item.id}>
                  <article
                    className={cn(
                      "group overflow-hidden rounded-[1.5rem] bg-white shadow-soft ring-1 ring-primary/5 transition hover:-translate-y-0.5 hover:shadow-lg hover:ring-primary/15",
                      !item.active && "opacity-75",
                    )}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-surface-container-high">
                      {previewable ? (
                        <GalleryImage
                          src={item.src}
                          alt={item.alt || ""}
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          priority={index === 0}
                          className={cn(
                            "object-cover transition duration-500 group-hover:scale-[1.03]",
                            !item.active && "grayscale",
                          )}
                        />
                      ) : (
                        <div className="flex h-full flex-col items-center justify-center gap-3 text-on-surface-variant">
                          <ImagePlus className="size-10" aria-hidden />
                          <span className="text-sm font-semibold">
                            Add an image path
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-3">
                        <span className="rounded-full bg-black/55 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
                          #{index + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => update(item.id, { active: !item.active })}
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold shadow-sm backdrop-blur-sm transition",
                            item.active
                              ? "bg-primary text-on-primary"
                              : "bg-white/90 text-on-surface",
                          )}
                        >
                          {item.active ? (
                            <Eye className="size-3.5" aria-hidden />
                          ) : (
                            <EyeOff className="size-3.5" aria-hidden />
                          )}
                          {item.active ? "Visible" : "Hidden"}
                        </button>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-4">
                        <p className="line-clamp-2 text-sm font-semibold text-white">
                          {title}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4 p-4">
                      <label className="block text-xs font-bold uppercase tracking-wider text-primary">
                        Image path
                        <input
                          value={item.src}
                          onChange={(event) =>
                            update(item.id, { src: event.target.value })
                          }
                          className="mt-2 w-full rounded-xl border border-primary/10 bg-surface-container-low px-3 py-2.5 font-mono text-xs text-on-surface outline-none transition focus:border-primary/35 focus:bg-white"
                        />
                      </label>
                      <label className="block text-xs font-bold uppercase tracking-wider text-primary">
                        Alt text
                        <input
                          value={item.alt}
                          onChange={(event) =>
                            update(item.id, { alt: event.target.value })
                          }
                          className="mt-2 w-full rounded-xl border border-primary/10 bg-surface-container-low px-3 py-2.5 text-sm text-on-surface outline-none transition focus:border-primary/35 focus:bg-white"
                        />
                      </label>
                      <label className="block text-xs font-bold uppercase tracking-wider text-primary">
                        Caption
                        <textarea
                          value={item.caption ?? ""}
                          onChange={(event) =>
                            update(item.id, { caption: event.target.value })
                          }
                          rows={2}
                          className="mt-2 w-full resize-none rounded-xl border border-primary/10 bg-surface-container-low px-3 py-2.5 text-sm text-on-surface outline-none transition focus:border-primary/35 focus:bg-white"
                        />
                      </label>

                      <div className="flex items-center justify-between gap-2 border-t border-primary/10 pt-3">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => moveItem(item.id, -1)}
                            disabled={index === 0}
                            className="rounded-lg p-2 text-on-surface-variant transition hover:bg-surface-container-low hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
                            aria-label="Move photo up"
                          >
                            <ArrowUp className="size-4" aria-hidden />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveItem(item.id, 1)}
                            disabled={index === items.length - 1}
                            className="rounded-lg p-2 text-on-surface-variant transition hover:bg-surface-container-low hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
                            aria-label="Move photo down"
                          >
                            <ArrowDown className="size-4" aria-hidden />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(item.id)}
                          className="rounded-lg p-2 text-on-surface-variant transition hover:bg-red-50 hover:text-red-600"
                          aria-label="Remove image"
                        >
                          <Trash2 className="size-4" aria-hidden />
                        </button>
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        )}

      </section>
    </div>
  );
}
