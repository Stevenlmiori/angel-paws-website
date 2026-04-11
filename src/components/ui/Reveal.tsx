"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Extra delay after the section enters view (ms), for light stagger. */
  delayMs?: number;
};

const easing = "cubic-bezier(0.22, 1, 0.36, 1)";
const duration = 650;

export function Reveal({ children, className, delayMs = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let cancelled = false;
    const playbackRef = { current: undefined as Animation | undefined };

    const run = () => {
      if (cancelled || !el.isConnected) return;
      playbackRef.current?.cancel();
      playbackRef.current = el.animate(
        [
          { opacity: 0, transform: "translateY(12px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        {
          duration,
          delay: delayMs,
          easing,
          fill: "both",
        },
      );
    };

    const vh = window.innerHeight;
    const rect = el.getBoundingClientRect();
    const mostlyOnScreen = rect.top < vh * 0.95 && rect.bottom > 0;

    if (mostlyOnScreen) {
      run();
      return () => {
        cancelled = true;
        playbackRef.current?.cancel();
      };
    }

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting && !cancelled) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px 12% 0px" },
    );
    io.observe(el);

    return () => {
      cancelled = true;
      io.disconnect();
      playbackRef.current?.cancel();
    };
  }, [delayMs]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
