"use client";

import { useRef, useState, useTransition } from "react";
import { Plus, Trash2, Upload } from "lucide-react";
import type { StoredGalleryImage } from "@/lib/siteContent/galleryTypes";
import { Button } from "@/components/ui/Button";
import { saveGalleryDirect } from "./actions";

function newId() {
  return `g-${Date.now().toString(36)}`;
}

export function GalleryEditor({
  initialItems,
}: {
  initialItems: StoredGalleryImage[];
}) {
  const [items, setItems] = useState(initialItems);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [pending, startTransition] = useTransition();
  const fileRef = useRef<HTMLInputElement>(null);

  function update(id: string, patch: Partial<StoredGalleryImage>) {
    setItems((prev) => prev.map((img) => (img.id === id ? { ...img, ...patch } : img)));
  }

  function addItem() {
    setItems((prev) => [
      ...prev,
      {
        id: newId(),
        src: "/gallery/",
        alt: "",
        caption: "",
        active: true,
      },
    ]);
  }

  function remove(id: string) {
    setItems((prev) => prev.filter((img) => img.id !== id));
  }

  async function uploadFile(file: File) {
    setUploading(true);
    setMessage("");
    try {
      const fd = new FormData();
      fd.set("file", file);
      const res = await fetch("/api/admin/gallery-image", {
        method: "POST",
        body: fd,
      });
      const data = (await res.json()) as { src?: string; error?: string };
      const src = data.src;
      if (!res.ok || !src) {
        setMessage(data.error ?? "Upload failed.");
        return;
      }
      setItems((prev) => [
        ...prev,
        {
          id: newId(),
          src,
          alt: file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
          caption: "",
          active: true,
        },
      ]);
      setMessage("Image uploaded. Add alt text and save.");
    } catch {
      setMessage("Upload failed.");
    } finally {
      setUploading(false);
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
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="sr-only"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) {
              void uploadFile(f);
            }
            e.target.value = "";
          }}
        />
        <Button
          type="button"
          variant="secondary"
          className="gap-2"
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
        >
          <Upload className="size-4" aria-hidden />
          {uploading ? "Uploading…" : "Upload new photo"}
        </Button>
        <p className="text-sm text-on-surface-variant">
          Uploads go to <code className="text-xs">public/gallery/uploads/</code>.
          You can also type paths to existing files in <code className="text-xs">public/gallery/</code>.
        </p>
      </div>

      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="rounded-2xl bg-surface-container-high p-6 shadow-soft ring-1 ring-primary/5"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-on-surface">
                <input
                  type="checkbox"
                  checked={item.active}
                  onChange={(e) => update(item.id, { active: e.target.checked })}
                />
                Show in gallery
              </label>
              <button
                type="button"
                onClick={() => remove(item.id)}
                className="rounded-lg p-2 text-on-surface-variant transition hover:bg-surface-container-highest hover:text-red-600"
                aria-label="Remove image"
              >
                <Trash2 className="size-4" aria-hidden />
              </button>
            </div>
            <div className="grid gap-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-primary">
                Image path (e.g. /gallery/AJ.jpg)
                <input
                  value={item.src}
                  onChange={(e) => update(item.id, { src: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-primary/10 bg-white px-4 py-3 font-mono text-sm text-on-surface"
                />
              </label>
              <label className="block text-xs font-bold uppercase tracking-wider text-primary">
                Alt text
                <input
                  value={item.alt}
                  onChange={(e) => update(item.id, { alt: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-primary/10 bg-white px-4 py-3 text-base text-on-surface"
                />
              </label>
              <label className="block text-xs font-bold uppercase tracking-wider text-primary">
                Caption (optional)
                <input
                  value={item.caption ?? ""}
                  onChange={(e) => update(item.id, { caption: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-primary/10 bg-white px-4 py-3 text-base text-on-surface"
                />
              </label>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="button" variant="secondary" onClick={addItem} className="gap-2">
          <Plus className="size-4" aria-hidden />
          Add image row
        </Button>
        <Button type="button" onClick={save} disabled={pending}>
          {pending ? "Saving…" : "Save gallery"}
        </Button>
        {message ? (
          <p className="text-sm text-on-surface-variant" role="status">
            {message}
          </p>
        ) : null}
      </div>
    </div>
  );
}
