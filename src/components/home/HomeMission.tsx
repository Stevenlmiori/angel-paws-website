"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MISSION_SEGMENTS = [
  "Our mission is to share ",
  " through the unconditional love our pets give ",
  "to those whom God places in our path.",
] as const;

export function HomeMission() {
  const root = useRef<HTMLElement>(null);
  const underline = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const segs = el.querySelectorAll<HTMLElement>(".mission-seg");
      const jesus = el.querySelector<HTMLElement>(".mission-jesus");
      const label = el.querySelector<HTMLElement>(".mission-kicker");
      const line = underline.current;

      if (reduced) {
        gsap.set([label, segs, jesus, line].filter(Boolean), {
          opacity: 1,
          y: 0,
          scale: 1,
          scaleX: 1,
          filter: "none",
        });
        return;
      }

      gsap.set(label, { opacity: 0, y: 14 });
      gsap.set(segs, { opacity: 0, y: 32, filter: "blur(10px)" });
      gsap.set(jesus, { opacity: 0, y: 28, filter: "blur(10px)" });
      if (line) gsap.set(line, { scaleX: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.to(label, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: "power2.out",
      })
        .to(
          segs,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.05,
            stagger: 0.11,
          },
          "-=0.35",
        )
        .to(
          jesus,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
          },
          "-=0.72",
        );

      if (line) {
        tl.to(
          line,
          {
            scaleX: 1,
            duration: 0.9,
            ease: "power2.inOut",
          },
          "-=0.55",
        );
      }
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="bg-surface-container-low py-24 md:py-32"
    >
      <div className="mx-auto max-w-4xl space-y-8 px-6 text-center sm:px-10 lg:px-12">
        <p className="mission-kicker font-sans text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-on-surface-variant">
          Mission
        </p>
        <h2 className="font-serif text-3xl font-bold leading-[1.35] text-on-surface sm:text-4xl lg:text-5xl lg:leading-[1.28]">
          <span className="sr-only">&ldquo;</span>
          <span className="mission-seg inline">{MISSION_SEGMENTS[0]}</span>
          <span className="mission-jesus relative inline-block px-0.5 align-baseline">
            <span className="relative z-10 font-serif italic text-primary">
              Jesus
            </span>
            <span
              ref={underline}
              className="pointer-events-none absolute bottom-1 left-1/2 z-0 h-[0.35rem] w-[min(100%,5.25rem)] -translate-x-1/2 origin-center rounded-full bg-primary-container/90 sm:bottom-1.5 sm:h-2"
              aria-hidden
            />
          </span>
          <span className="mission-seg inline">{MISSION_SEGMENTS[1]}</span>
          <span className="mission-seg inline">{MISSION_SEGMENTS[2]}</span>
          <span className="sr-only">&rdquo;</span>
        </h2>
      </div>
    </section>
  );
}
