"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Extra delay after the section enters view (ms), for light stagger. */
  delayMs?: number;
};

/** Wait until after the next paint so opacity/transform transitions have a “from” frame. */
function afterNextPaint(fn: () => void) {
  requestAnimationFrame(() => {
    requestAnimationFrame(fn);
  });
}

const motionEase = "cubic-bezier(0.22, 1, 0.36, 1)";

function motionStyle(
  visible: boolean,
  delayMs: number,
): CSSProperties {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translate3d(0,0,0)" : "translate3d(0,0.75rem,0)",
    transitionProperty: "opacity, transform",
    transitionDuration: "0.65s",
    transitionTimingFunction: motionEase,
    ...(visible && delayMs > 0 ? { transitionDelay: `${delayMs}ms` } : {}),
  };
}

export function Reveal({ children, className, delayMs = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  /** Avoid SSR + first paint at opacity:0 (invisible HTML / blank until JS). */
  const [motionEnabled, setMotionEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  const prefersReducedMotion =
    motionEnabled &&
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useLayoutEffect(() => {
    queueMicrotask(() => {
      setMotionEnabled(true);
    });
  }, []);

  useLayoutEffect(() => {
    if (!motionEnabled) return;
    if (prefersReducedMotion) return;

    const el = ref.current;
    if (!el) return;

    const vh = window.innerHeight;
    const rect = el.getBoundingClientRect();
    const mostlyOnScreen = rect.top < vh * 0.92 && rect.bottom > 0;

    const reveal = () => {
      if (el.isConnected) setVisible(true);
    };

    if (mostlyOnScreen) {
      afterNextPaint(reveal);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          afterNextPaint(reveal);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -4% 0px", threshold: 0 },
    );
    io.observe(el);

    return () => io.disconnect();
  }, [motionEnabled, prefersReducedMotion]);

  const style: CSSProperties | undefined =
    motionEnabled && !prefersReducedMotion
      ? motionStyle(visible, delayMs)
      : undefined;

  return (
    <div
      ref={ref}
      data-visible={visible ? "true" : "false"}
      className={cn(className)}
      style={style}
    >
      {children}
    </div>
  );
}
