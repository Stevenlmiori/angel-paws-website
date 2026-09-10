"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { StoredTestimonial } from "@/lib/siteContent/testimonialTypes";

type Props = {
  testimonials: StoredTestimonial[];
  intervalMs?: number;
};

export function TestimonialsCarousel({
  testimonials,
  intervalMs = 18000,
}: Props) {
  const items = testimonials.filter((t) => t.active && t.quote.trim());
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const currentQuote = items[index]?.quote ?? "";

  const advance = useCallback(() => {
    if (items.length <= 1) {
      return;
    }
    setIndex((i) => (i + 1) % items.length);
  }, [items.length]);

  const previous = useCallback(() => {
    if (items.length <= 1) {
      return;
    }
    setIndex((i) => (i - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (items.length <= 1 || paused) {
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      return;
    }
    const wordCount = currentQuote.trim().split(/\s+/).filter(Boolean).length;
    const readingTimeMs = Math.min(45000, Math.max(intervalMs, wordCount * 300 + 4000));
    const id = window.setInterval(advance, readingTimeMs);
    return () => window.clearInterval(id);
  }, [advance, currentQuote, intervalMs, items.length, paused]);

  if (items.length === 0) {
    return null;
  }

  const current = items[index]!;

  return (
    <div
      className="group relative mx-auto max-w-5xl px-10 sm:px-20 md:px-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {items.length > 1 ? (
        <>
          <button
            type="button"
            onClick={previous}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full border border-stone-200/80 bg-white/90 p-2 text-stone-500 shadow-sm backdrop-blur-sm opacity-100 transition-all duration-300 hover:border-primary/40 hover:bg-white hover:text-primary hover:shadow-md focus-visible:opacity-100 sm:left-2 sm:p-3 sm:opacity-0 sm:group-hover:opacity-100 md:left-4"
          >
            <ChevronLeft className="size-5 sm:size-6" strokeWidth={2} aria-hidden />
          </button>
          <button
            type="button"
            onClick={advance}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full border border-stone-200/80 bg-white/90 p-2 text-stone-500 shadow-sm backdrop-blur-sm opacity-100 transition-all duration-300 hover:border-primary/40 hover:bg-white hover:text-primary hover:shadow-md focus-visible:opacity-100 sm:right-2 sm:p-3 sm:opacity-0 sm:group-hover:opacity-100 md:right-4"
          >
            <ChevronRight className="size-5 sm:size-6" strokeWidth={2} aria-hidden />
          </button>
        </>
      ) : null}

      <div key={current.id} className="mx-auto max-w-3xl transition-opacity duration-700" aria-live="polite">
        <span
          className="mb-6 block text-center font-serif text-5xl leading-none text-primary/30"
          aria-hidden
        >
          &ldquo;
        </span>
        <blockquote className="text-center font-serif text-xl leading-relaxed text-on-surface sm:text-2xl md:text-3xl md:leading-snug">
          {current.quote}
        </blockquote>
        <footer className="mt-8 flex flex-col items-center text-center">
          {current.image ? (
            <div className="relative mb-4 size-20 overflow-hidden rounded-full bg-surface-container-high shadow-soft ring-4 ring-white md:size-24">
              <Image
                src={current.image}
                alt={current.imageAlt || `Photo of ${current.attribution}`}
                fill
                sizes="96px"
                className="object-cover"
                style={{ objectPosition: current.imagePosition || "50% 30%" }}
              />
            </div>
          ) : null}
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
