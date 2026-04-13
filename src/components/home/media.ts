/**
 * Homepage photography — ministry images in `public/img` (Debbie / Angel Paws).
 */

export const IMG = {
  /** Home hero — hand and paw moment with Sam */
  heroDog: "/img/gave-me-your-paw.jpg",
  /** What we do — large tile (hospitals & healthcare) */
  pillarHealthcare: "/img/sam-comforting-kid-1.jpg",
  /** What we do — care facilities tile */
  pillarCareFacilities: "/img/sam-comforting-kid-2.jpg",
  /** Impact section */
  impactFeature: "/img/gave-me-your-paw.jpg",
  /** Bottom volunteer CTA (softened with overlay) */
  journeyInvite: "/img/sam-comforting-kid-2.jpg",
} as const;

export type HomeSlide = {
  src: string;
  alt: string;
  title: string;
  description: string;
};

/** Homepage carousel — same three ministry photos, distinct captions */
export const HOME_SLIDES: readonly HomeSlide[] = [
  {
    src: "/img/sam-comforting-kid-1.jpg",
    alt: "Sam, a Golden Retriever therapy dog, resting gently beside a child",
    title: "Unconditional Love",
    description:
      "A calm presence beside little ones—comfort that does not need words.",
  },
  {
    src: "/img/sam-comforting-kid-2.jpg",
    alt: "Sam comforting a child who is leaning in for a hug",
    title: "Gentle Companions",
    description:
      "Sharing steady, patient friendship in hospitals, schools, and care settings.",
  },
  {
    src: "/img/gave-me-your-paw.jpg",
    alt: "A child holds Sam’s paw—trust in a simple touch",
    title: "Hope in Small Moments",
    description:
      "Sometimes the first step toward healing is a warm paw and a gentle hand.",
  },
] as const;
