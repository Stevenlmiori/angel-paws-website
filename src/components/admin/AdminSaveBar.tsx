"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  message?: string | null;
  children: ReactNode;
  className?: string;
};

/** Sticky bottom actions so Save stays reachable while scrolling long lists. */
export function AdminSaveBar({ message, children, className }: Props) {
  return (
    <div
      className={cn(
        "sticky bottom-0 z-30 -mx-4 mt-8 border-t border-black/5 bg-white/95 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8",
        className,
      )}
    >
      <div className="mx-auto flex max-w-screen-xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p
          className="min-h-[1.25rem] text-sm text-on-surface-variant"
          role="status"
          aria-live="polite"
        >
          {message || "\u00a0"}
        </p>
        <div className="flex flex-wrap items-center gap-2">{children}</div>
      </div>
    </div>
  );
}
