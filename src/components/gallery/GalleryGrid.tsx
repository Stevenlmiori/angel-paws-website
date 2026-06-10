"use client";

import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";
import type { StoredGalleryImage } from "@/lib/siteContent/galleryTypes";

export function GalleryGrid({ images }: { images: StoredGalleryImage[] }) {
  const [lightbox, setLightbox] = useState<StoredGalleryImage | null>(null);

  if (images.length === 0) {
    return (
      <p className="text-on-surface-variant">
        Photos will appear here soon. Check back after our team adds gallery images.
      </p>
    );
  }

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
        {images.map((img) => (
          <li key={img.id}>
            <button
              type="button"
              onClick={() => setLightbox(img)}
              className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-surface-container-low shadow-soft ring-1 ring-primary/5 transition hover:ring-primary/20 md:rounded-3xl"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              {img.caption ? (
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-3 text-left text-xs font-medium text-white opacity-0 transition group-hover:opacity-100">
                  {img.caption}
                </span>
              ) : null}
            </button>
          </li>
        ))}
      </ul>

      {lightbox ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
            aria-label="Close"
            onClick={() => setLightbox(null)}
          >
            <X className="size-6" aria-hidden />
          </button>
          <div
            className="relative max-h-[85vh] max-w-4xl overflow-hidden rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.src}
              alt={lightbox.alt}
              width={1200}
              height={900}
              className="max-h-[85vh] w-auto object-contain"
            />
            {lightbox.caption ? (
              <p className="bg-black/60 px-6 py-4 text-center text-sm text-white/90">
                {lightbox.caption}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
