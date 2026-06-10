"use client";

import { useState, useTransition } from "react";
import { Plus, Trash2 } from "lucide-react";
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

  function save() {
    setMessage("");
    startTransition(async () => {
      const result = await saveTestimonialsDirect(JSON.stringify(items));
      setMessage(result.message);
    });
  }

  return (
    <div className="space-y-6">
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
