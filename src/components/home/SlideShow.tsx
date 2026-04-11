"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef, useState } from "react";
import { cn } from "@/lib/cn";

const slides = [
  {
    src: "/slideshow/dog-1.png",
    alt: "Friendly Golden Retriever therapy dog in a hospital setting",
    title: "Unconditional Love",
    description: "Bringing comfort to hospitals and hospice care.",
  },
  {
    src: "/slideshow/dog-2.png",
    alt: "Therapy dog in a library reading with a child",
    title: "Furry Listeners",
    description: "Helping children gain confidence in reading programs.",
  },
  {
    src: "/slideshow/dog-3.png",
    alt: "Therapy dog visiting an elderly resident in a retirement home",
    title: "Gentle Companions",
    description: "Sharing joy and companionship in local retirement homes.",
  },
];

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
            "slide-item absolute inset-0 flex flex-col items-center justify-end p-8 text-white md:p-12",
            i === 0 ? "opacity-100" : "opacity-0",
          )}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover brightness-75"
            priority={i === 0}
          />
          <div className="relative z-10 w-full max-w-2xl text-center md:text-left">
            <h3 className="font-serif text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              {slide.title}
            </h3>
            <p className="mt-2 font-sans text-lg text-stone-100 md:text-xl">
              {slide.description}
            </p>
          </div>
          {/* Progress dots */}
          <div className="relative z-10 mt-8 flex gap-2">
            {slides.map((_, dotIndex) => (
              <button
                key={dotIndex}
                onClick={() => setIndex(dotIndex)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  index === dotIndex ? "w-8 bg-white" : "w-4 bg-white/40",
                )}
                aria-label={`Go to slide ${dotIndex + 1}`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
