"use client";

import Image from "next/image";
import { useState } from "react";
import { Download, Palette, Printer, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { openColoringPagePrintWindow } from "@/lib/coloringPages/print";
import type { ColoringPage } from "@/lib/siteContent/coloringPages";

type Props = {
  pages: ColoringPage[];
};

export function ColoringPagesGrid({ pages }: Props) {
  const [active, setActive] = useState<ColoringPage | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {pages.map((page) => (
          <button
            key={page.slug}
            type="button"
            onClick={() => setActive(page)}
            className="group rounded-[2rem] bg-white p-5 text-left shadow-soft ring-1 ring-primary/5 transition hover:-translate-y-0.5 hover:ring-primary/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <div
              className={cn(
                "relative mb-5 overflow-hidden rounded-2xl bg-white",
                page.orientation === "landscape"
                  ? "aspect-[11/8.5]"
                  : "aspect-[8.5/11]",
              )}
            >
              <Image
                src={page.file}
                alt={page.alt}
                fill
                unoptimized
                className="object-contain transition duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-serif text-2xl text-on-surface">{page.name}</p>
                <p className="mt-1 text-sm text-on-surface-variant">
                  Tap to preview &amp; print
                </p>
              </div>
              <span className="flex size-11 items-center justify-center rounded-full bg-primary-container text-primary">
                <Palette className="size-5" strokeWidth={1.75} aria-hidden />
              </span>
            </div>
          </button>
        ))}
      </div>

      {active ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-stone-900/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="coloring-preview-title"
          onClick={() => setActive(null)}
        >
          <div
            className="relative max-h-[92vh] w-full max-w-3xl overflow-auto rounded-[2rem] bg-white p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              className="absolute right-4 top-4 rounded-full p-2 text-stone-500 transition hover:bg-stone-100 hover:text-stone-900"
              aria-label="Close preview"
            >
              <X className="size-5" aria-hidden />
            </button>

            <p
              id="coloring-preview-title"
              className="mb-2 font-serif text-3xl text-on-surface"
            >
              {active.name}
            </p>
            <p className="mb-6 text-sm text-on-surface-variant">
              Letter-size page with print margins — ready for crayons, colored
              pencils, or markers. If your browser still shows two pages, turn
              off &ldquo;Print headers and footers&rdquo; in the print dialog.
            </p>

            <div
              className={cn(
                "relative mx-auto mb-8 overflow-hidden rounded-2xl bg-white",
                active.orientation === "landscape"
                  ? "aspect-[11/8.5] max-w-2xl"
                  : "aspect-[8.5/11] max-w-md",
              )}
            >
              <Image
                src={active.file}
                alt={active.alt}
                fill
                unoptimized
                className="object-contain"
                sizes="768px"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={active.file}
                download
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-on-primary transition hover:opacity-90"
              >
                <Download className="size-4" aria-hidden />
                Download JPG
              </a>
              <button
                type="button"
                onClick={() => openColoringPagePrintWindow(active)}
                className="inline-flex items-center gap-2 rounded-full bg-surface-container-high px-5 py-3 text-sm font-semibold text-on-surface transition hover:bg-surface-container-highest"
              >
                <Printer className="size-4" aria-hidden />
                Print
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
