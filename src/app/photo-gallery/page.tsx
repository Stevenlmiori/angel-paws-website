import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { HeadingBlock } from "@/components/ui/HeadingBlock";
import { Section } from "@/components/ui/Section";
import { loadActiveGalleryImages } from "@/lib/siteContent/galleryStore";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description:
    "Photos from Angel Paws Pet Therapy visits—schools, hospitals, assisted living, and community events across Greater Houston.",
};

export const dynamic = "force-dynamic";

export default async function PhotoGalleryPage() {
  const images = await loadActiveGalleryImages();

  return (
    <Section tone="mist" className="!pt-28 md:!pt-32">
      <div className="mx-auto max-w-screen-xl px-6 sm:px-10 lg:px-12">
        <HeadingBlock
          label="Gallery"
          title="Photo gallery"
          as="h1"
          description="A glimpse of the calm, joy, and connection our therapy dog teams bring to the places we are invited."
          className="mb-16 max-w-2xl"
        />
        <GalleryGrid images={images} />
      </div>
    </Section>
  );
}
