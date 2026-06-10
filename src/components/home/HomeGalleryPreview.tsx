import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { loadActiveGalleryImages } from "@/lib/siteContent/galleryStore";

export async function HomeGalleryPreview() {
  const images = (await loadActiveGalleryImages()).slice(0, 6);
  if (images.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-screen-xl px-6 py-24 sm:px-10 md:py-32 lg:px-12">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-primary">
            Gallery
          </p>
          <h2 className="font-serif text-4xl text-on-surface md:text-5xl">
            Moments with our teams
          </h2>
        </div>
        <Link
          href="/photo-gallery"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          View full gallery
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {images.map((img) => (
          <li key={img.id} className="overflow-hidden rounded-2xl md:rounded-3xl">
            <Link
              href="/photo-gallery"
              className="group relative block aspect-[4/5] bg-surface-container-low shadow-soft"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
