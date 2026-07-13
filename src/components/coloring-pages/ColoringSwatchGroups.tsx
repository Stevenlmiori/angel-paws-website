"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import type { ColoringSwatchGroup } from "@/lib/coloringPages/palette";
import { cn } from "@/lib/cn";

type SwatchGridProps = {
  groups: ColoringSwatchGroup[];
  activeColor: string;
  eraserActive: boolean;
  onPick: (hex: string) => void;
  /** Vertical labeled grids (desktop sidebar) vs swipeable strip (mobile dock). */
  layout?: "stack" | "strip";
};

function SwatchStrip({
  groups,
  activeColor,
  eraserActive,
  onPick,
}: Omit<SwatchGridProps, "layout">) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const swatches = groups.flatMap((group) => group.swatches);

  const updateScrollHints = () => {
    const el = scrollerRef.current;
    if (!el) {
      return;
    }
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(maxScroll > 4 && el.scrollLeft < maxScroll - 4);
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) {
      return;
    }
    updateScrollHints();
    const onScroll = () => updateScrollHints();
    el.addEventListener("scroll", onScroll, { passive: true });
    const observer = new ResizeObserver(updateScrollHints);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [swatches.length]);

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="-mx-1 overflow-x-auto overscroll-x-contain px-1 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex w-max items-center gap-2 pr-8">
          {swatches.map((swatch) => (
            <button
              key={swatch.hex}
              type="button"
              onClick={() => onPick(swatch.hex)}
              className={cn(
                "size-8 shrink-0 rounded-full transition hover:scale-105",
                activeColor === swatch.hex && !eraserActive
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-white"
                  : "ring-1 ring-stone-200/80",
              )}
              style={{ backgroundColor: swatch.hex }}
              aria-label={swatch.name}
              title={swatch.name}
            />
          ))}
        </div>
      </div>

      {canScrollLeft ? (
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-white to-transparent"
          aria-hidden
        />
      ) : null}

      {canScrollRight ? (
        <>
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white via-white/90 to-transparent"
            aria-hidden
          />
          <button
            type="button"
            className="absolute right-0 top-1/2 z-10 flex size-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-primary shadow-sm ring-1 ring-stone-200/80"
            aria-label="More colors"
            onClick={() => {
              const el = scrollerRef.current;
              if (!el) {
                return;
              }
              el.scrollBy({ left: Math.max(120, el.clientWidth * 0.6), behavior: "smooth" });
            }}
          >
            <ChevronRight className="size-4" strokeWidth={2.25} aria-hidden />
          </button>
        </>
      ) : null}
    </div>
  );
}

export function ColoringSwatchGroups({
  groups,
  activeColor,
  eraserActive,
  onPick,
  layout = "stack",
}: SwatchGridProps) {
  if (layout === "strip") {
    return (
      <SwatchStrip
        groups={groups}
        activeColor={activeColor}
        eraserActive={eraserActive}
        onPick={onPick}
      />
    );
  }

  return (
    <div className="space-y-3">
      {groups.map((group) => (
        <div key={group.label}>
          <p className="mb-1.5 text-[0.65rem] font-semibold uppercase tracking-wide text-on-surface-variant/80">
            {group.label}
          </p>
          <div className="grid grid-cols-4 gap-1.5">
            {group.swatches.map((swatch) => (
              <button
                key={swatch.hex}
                type="button"
                onClick={() => onPick(swatch.hex)}
                className={cn(
                  "aspect-square rounded-xl transition hover:scale-105",
                  activeColor === swatch.hex && !eraserActive
                    ? "ring-2 ring-primary ring-offset-2"
                    : "ring-1 ring-stone-200/80",
                )}
                style={{ backgroundColor: swatch.hex }}
                aria-label={swatch.name}
                title={swatch.name}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
