"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/cn";

// Register ScrollTrigger plugin (client-side only)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Extra delay after the section enters view (ms), for light stagger. */
  delayMs?: number;
};

export function Reveal({ children, className, delayMs = 0 }: RevealProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!container.current) return;

      // Force-hide immediately before animation starts to avoid flash
      gsap.set(container.current, { autoAlpha: 0, y: 40 });

      gsap.to(container.current, {
        autoAlpha: 1,
        y: 0,
        duration: 2.2,
        delay: delayMs / 1000,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 94%", // Wait until top of section is 94% down the page
          once: true,
          // immediateRender: false,
        },
      });
    },
    { scope: container },
  );

  return (
    <div ref={container} className={cn("gsap-reveal", className)}>
      {children}
    </div>
  );
}
