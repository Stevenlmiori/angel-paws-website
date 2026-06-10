"use client";

import { useCallback, useEffect, useState } from "react";
import type { StoredTestimonial } from "@/lib/siteContent/testimonialTypes";

type Props = {
  testimonials: StoredTestimonial[];
  intervalMs?: number;
};

export function TestimonialsCarousel({
  testimonials,
  intervalMs = 8000,
}: Props) {
  const items = testimonials.filter((t) => t.active && t.quote.trim());
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const advance = useCallback(() => {
    if (items.length <= 1) {
      return;
    }
    setIndex((i) => (i + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (items.length <= 1 || paused) {
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      return;
    }
    const id = window.setInterval(advance, intervalMs);
    return () => window.clearInterval(id);
  }, [advance, intervalMs, items.length, paused]);

  if (items.length === 0) {
    return null;
  }

  const current = items[index]!;

  return (
    <div
      className="relative mx-auto max-w-3xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div key={current.id} className="transition-opacity duration-700" aria-live="polite">
        <span
          className="mb-6 block text-center font-serif text-5xl leading-none text-primary/30"
          aria-hidden
        >
          &ldquo;
        </span>
        <blockquote className="text-center font-serif text-2xl leading-relaxed text-on-surface md:text-3xl md:leading-snug">
          {current.quote}
        </blockquote>
        <footer className="mt-8 text-center">
          <p className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-on-surface">
            {current.attribution}
          </p>
          {current.role ? (
            <p className="mt-1 text-sm text-on-surface-variant">{current.role}</p>
          ) : null}
        </footer>
      </div>

      {items.length > 1 ? (
        <div className="mt-10 flex items-center justify-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Show testimonial ${i + 1} of ${items.length}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index
                  ? "w-8 bg-primary"
                  : "w-2 bg-primary/25 hover:bg-primary/40"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
