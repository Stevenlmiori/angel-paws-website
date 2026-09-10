"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { ImagePlus, Plus, Trash2, X } from "lucide-react";
import type { StoredTestimonial } from "@/lib/siteContent/testimonialTypes";
import { Button } from "@/components/ui/Button";
import { saveTestimonialsDirect } from "./actions";

function newId() {
  return `t-${Date.now().toString(36)}`;
}

export function TestimonialsEditor({
  initialItems,
}: {
  initialItems: StoredTestimonial[];
}) {
  const [items, setItems] = useState(initialItems);
  const [message, setMessage] = useState("");
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function update(id: string, patch: Partial<StoredTestimonial>) {
    setItems((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  }

  function addItem() {
    setItems((prev) => [
      ...prev,
      {
        id: newId(),
        quote: "",
        attribution: "",
        role: "",
        active: true,
      },
    ]);
  }

  function remove(id: string) {
    setItems((prev) => prev.filter((t) => t.id !== id));
  }

  async function uploadPhoto(id: string, file: File) {
    setUploadingId(id);
    setMessage("");
    try {
      const formData = new FormData();
      formData.set("file", file);
      const response = await fetch("/api/admin/testimonial-image", {
        method: "POST",
        body: formData,
      });
      const data = (await response.json()) as { src?: string; error?: string };
      if (!response.ok || !data.src) {
        throw new Error(data.error || "Upload failed.");
      }
      update(id, { image: data.src });
      setMessage("Photo uploaded. Review the crop and save testimonials.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setUploadingId(null);
    }
  }

  function save() {
    setMessage("");
    startTransition(async () => {
      const result = await saveTestimonialsDirect(JSON.stringify(items));
      setMessage(result.message);
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button type="button" variant="secondary" onClick={addItem} className="gap-2">
          <Plus className="size-4" aria-hidden />
          Add testimonial
        </Button>
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
                Show on homepage
              </label>
              <button
                type="button"
                onClick={() => remove(item.id)}
                className="rounded-lg p-2 text-on-surface-variant transition hover:bg-surface-container-highest hover:text-red-600"
                aria-label="Remove testimonial"
              >
                <Trash2 className="size-4" aria-hidden />
              </button>
            </div>
            <label className="mb-3 block text-xs font-bold uppercase tracking-wider text-primary">
              Quote
              <textarea
                value={item.quote}
                onChange={(e) => update(item.id, { quote: e.target.value })}
                rows={4}
                className="mt-2 w-full rounded-xl border border-primary/10 bg-white px-4 py-3 text-base text-on-surface"
              />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-primary">
                Name / attribution
                <input
                  value={item.attribution}
                  onChange={(e) => update(item.id, { attribution: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-primary/10 bg-white px-4 py-3 text-base text-on-surface"
                />
              </label>
              <label className="block text-xs font-bold uppercase tracking-wider text-primary">
                Role / organization (optional)
                <input
                  value={item.role ?? ""}
                  onChange={(e) => update(item.id, { role: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-primary/10 bg-white px-4 py-3 text-base text-on-surface"
                />
              </label>
            </div>
            <div className="mt-5 grid gap-4 rounded-2xl bg-surface-container-low p-4 sm:grid-cols-[6rem_1fr] sm:items-center">
              <div className="relative size-24 overflow-hidden rounded-full bg-surface-container-high ring-4 ring-white shadow-soft">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.imageAlt || `Photo of ${item.attribution || "testimonial author"}`}
                    fill
                    sizes="96px"
                    className="object-cover"
                    style={{ objectPosition: item.imagePosition || "50% 30%" }}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-on-surface-variant">
                    <ImagePlus className="size-7" aria-hidden />
                  </div>
                )}
              </div>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-on-primary transition hover:opacity-90">
                    <ImagePlus className="size-4" aria-hidden />
                    {uploadingId === item.id ? "Uploading…" : "Upload photo"}
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      className="sr-only"
                      disabled={uploadingId !== null}
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) {
                          void uploadPhoto(item.id, file);
                        }
                        event.target.value = "";
                      }}
                    />
                  </label>
                  {item.image ? (
                    <button
                      type="button"
                      onClick={() => update(item.id, { image: "" })}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-on-surface transition hover:bg-surface-container-highest"
                    >
                      <X className="size-4" aria-hidden />
                      Remove photo
                    </button>
                  ) : null}
                </div>
                <div className="grid gap-3 lg:grid-cols-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-primary">
                    Photo description
                    <input
                      value={item.imageAlt ?? ""}
                      onChange={(event) => update(item.id, { imageAlt: event.target.value })}
                      placeholder="Person and therapy dog"
                      className="mt-2 w-full rounded-xl border border-primary/10 bg-white px-4 py-3 text-base font-normal normal-case tracking-normal text-on-surface"
                    />
                  </label>
                  <label className="block text-xs font-bold uppercase tracking-wider text-primary">
                    Crop focus
                    <input
                      value={item.imagePosition ?? "50% 30%"}
                      onChange={(event) => update(item.id, { imagePosition: event.target.value })}
                      placeholder="50% 30%"
                      pattern="\\d{1,3}% \\d{1,3}%"
                      className="mt-2 w-full rounded-xl border border-primary/10 bg-white px-4 py-3 text-base font-normal normal-case tracking-normal text-on-surface"
                    />
                    <span className="mt-1 block font-normal normal-case tracking-normal text-on-surface-variant">
                      Horizontal and vertical position, such as 50% 30%.
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="button" variant="secondary" onClick={addItem} className="gap-2">
          <Plus className="size-4" aria-hidden />
          Add testimonial
        </Button>
        <Button type="button" onClick={save} disabled={pending}>
          {pending ? "Saving…" : "Save testimonials"}
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
