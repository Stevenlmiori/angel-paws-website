"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { ImagePlus, Plus, Trash2, X } from "lucide-react";
import type { StoredTestimonial } from "@/lib/siteContent/testimonialTypes";
import { AdminSaveBar } from "@/components/admin/AdminSaveBar";
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
    <div>
      <div className="mb-4 flex justify-end">
        <Button
          type="button"
          variant="secondary"
          onClick={addItem}
          className="gap-2 px-4 py-2.5"
        >
          <Plus className="size-4" aria-hidden />
          Add testimonial
        </Button>
      </div>

      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="rounded-xl border border-black/[0.06] bg-white p-5 shadow-sm"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <label className="flex items-center gap-2 text-sm font-medium text-on-surface">
                <input
                  type="checkbox"
                  checked={item.active}
                  onChange={(e) => update(item.id, { active: e.target.checked })}
                  className="size-4 rounded border-primary/30 text-primary"
                />
                Show on homepage
              </label>
              <button
                type="button"
                onClick={() => remove(item.id)}
                className="rounded-lg p-2 text-on-surface-variant transition hover:bg-red-50 hover:text-red-700"
                aria-label="Remove testimonial"
              >
                <Trash2 className="size-4" aria-hidden />
              </button>
            </div>
            <label className="mb-3 block text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
              Quote
              <textarea
                value={item.quote}
                onChange={(e) => update(item.id, { quote: e.target.value })}
                rows={4}
                className="mt-2 w-full rounded-xl border border-black/10 bg-[#fafafa] px-4 py-3 text-base font-normal normal-case tracking-normal text-on-surface"
              />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
                Name
                <input
                  value={item.attribution}
                  onChange={(e) => update(item.id, { attribution: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-black/10 bg-[#fafafa] px-4 py-3 text-base font-normal normal-case tracking-normal text-on-surface"
                />
              </label>
              <label className="block text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
                Role / organization
                <input
                  value={item.role ?? ""}
                  onChange={(e) => update(item.id, { role: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-black/10 bg-[#fafafa] px-4 py-3 text-base font-normal normal-case tracking-normal text-on-surface"
                />
              </label>
            </div>
            <div className="mt-5 grid gap-4 rounded-xl bg-[#f7f8fa] p-4 sm:grid-cols-[5rem_1fr] sm:items-start">
              <div className="relative size-20 overflow-hidden rounded-full bg-white ring-2 ring-white shadow-sm">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.imageAlt || `Photo of ${item.attribution || "testimonial author"}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                    style={{ objectPosition: item.imagePosition || "50% 30%" }}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-on-surface-variant">
                    <ImagePlus className="size-6" aria-hidden />
                  </div>
                )}
              </div>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-on-primary transition hover:opacity-90">
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
                      className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-on-surface-variant hover:bg-white"
                    >
                      <X className="size-4" aria-hidden />
                      Remove photo
                    </button>
                  ) : null}
                </div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
                  Photo description
                  <input
                    value={item.imageAlt ?? ""}
                    onChange={(event) => update(item.id, { imageAlt: event.target.value })}
                    placeholder="Person and therapy dog"
                    className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-base font-normal normal-case tracking-normal text-on-surface"
                  />
                </label>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <AdminSaveBar message={message}>
        <Button type="button" onClick={save} disabled={pending}>
          {pending ? "Saving…" : "Save testimonials"}
        </Button>
      </AdminSaveBar>
    </div>
  );
}
