"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { HOME_SLIDES } from "./media";

const slides = HOME_SLIDES;

export function SlideShow() {
  const container = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useGSAP(
    () => {
      const elements = container.current?.querySelectorAll(".slide-item");
      if (!elements) return;

      const current = elements[index];
      const prevIndex = (index - 1 + slides.length) % slides.length;
      const prev = elements[prevIndex];

      // Fade out previous
      gsap.to(prev, { opacity: 0, duration: 1.5 });
      // Fade in current
      gsap.to(current, { opacity: 1, duration: 1.5 });
    },
    { dependencies: [index], scope: container },
  );

  // Auto-play
  useGSAP(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      ref={container}
      className="relative aspect-[16/9] w-full overflow-hidden rounded-[2rem] bg-stone-100 shadow-soft md:rounded-[3rem]"
    >
      {slides.map((slide, i) => (
        <div
          key={i}
          className={cn(
            "slide-item absolute inset-0",
            i === 0 ? "opacity-100" : "opacity-0",
          )}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="z-0 object-cover brightness-[0.92]"
            priority={i === 0}
          />
          {/* Darken lower third so light copy stays readable on any photo */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 top-[28%] z-[1] bg-gradient-to-t from-black/85 via-black/55 to-transparent"
            aria-hidden
          />
          <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center px-6 pb-6 pt-10 md:items-start md:px-10 md:pb-8 md:pt-14">
            <div className="w-full max-w-2xl text-center md:text-left">
              <h3 className="font-serif text-2xl font-bold tracking-tight text-white drop-shadow-md md:text-3xl lg:text-4xl">
                {slide.title}
              </h3>
              <p className="mt-1.5 font-sans text-sm leading-relaxed text-white/95 drop-shadow-sm md:mt-2 md:text-base">
                {slide.description}
              </p>
            </div>
            <div className="mt-5 flex gap-2 md:mt-6">
              {slides.map((_, dotIndex) => (
                <button
                  key={dotIndex}
                  type="button"
                  onClick={() => setIndex(dotIndex)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    index === dotIndex ? "w-8 bg-white" : "w-4 bg-white/45",
                  )}
                  aria-label={`Go to slide ${dotIndex + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
