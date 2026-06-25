import type { Metadata } from "next";

export const SITE_URL = "https://www.angelpawspettherapy.com";
export const SITE_NAME = "Angel Paws Pet Therapy";

export const DEFAULT_KEYWORDS = [
  "Angel Paws Pet Therapy",
  "pet therapy Houston",
  "therapy dogs Houston",
  "therapy dog visits Houston",
  "therapy dog visits Greater Houston",
  "animal-assisted activities Houston",
  "hospital therapy dog visits",
  "school therapy dog visits",
  "senior living therapy dog visits",
  "faith-based pet therapy",
  "crisis response therapy dogs",
];

export const DEFAULT_OG_IMAGE = {
  url: "/img/angelpaws-dog-and-owner-nk_horizontal.jpg",
  width: 1200,
  height: 630,
  alt: "Angel Paws therapy dog team serving in Greater Houston",
};

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: typeof DEFAULT_OG_IMAGE;
};

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function pageMetadata({
  title,
  description,
  path,
  keywords = [],
  image = DEFAULT_OG_IMAGE,
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    keywords: [...DEFAULT_KEYWORDS, ...keywords],
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}
