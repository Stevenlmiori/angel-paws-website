import Image from "next/image";
import { cn } from "@/lib/cn";

export function isEmbeddedGalleryImage(src: string) {
  return src.startsWith("data:image/");
}

export function GalleryImage({
  src,
  alt,
  className,
  sizes,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (isEmbeddedGalleryImage(src)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- Admin uploads can fall back to compressed embedded images.
      <img
        src={src}
        alt={alt}
        className={cn("absolute inset-0 h-full w-full object-cover", className)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      className={className}
    />
  );
}

export function GalleryLightboxImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  if (isEmbeddedGalleryImage(src)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- Admin uploads can fall back to compressed embedded images.
      <img src={src} alt={alt} className={className} />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={900}
      className={className}
    />
  );
}
