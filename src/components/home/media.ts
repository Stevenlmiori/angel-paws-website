import { SITE_IMAGES } from "@/lib/siteImages";

/**
 * Homepage — each `SITE_IMAGES` key is used only here (see `src/lib/siteImages.ts`).
 */

export const IMG = {
  /** Must stay `gave-me-your-paw` — pairs with hero quote (“…gave me your paw.”). */
  heroDog: SITE_IMAGES.ministryPawHand,
  pillarHealthcare: SITE_IMAGES.dogHarnessPortrait,
  pillarSchools: SITE_IMAGES.ministrySamCathedralHigh2,
  pillarCareFacilities: SITE_IMAGES.ministrySamWithChild2,
  impactFeature: SITE_IMAGES.ministryHandlerHorizontal,
  journeyInvite: SITE_IMAGES.dogElderlyManWithDogInBed,
} as const;

export type HomeSlide = {
  src: string;
  alt: string;
  title: string;
  description: string;
};

export const HOME_SLIDES: readonly HomeSlide[] = [
  {
    src: SITE_IMAGES.aiAboutStorySeed,
    alt: "Therapy dog visiting with people in a warm care setting",
    title: "Unconditional Love",
    description:
      "A calm presence beside little ones—comfort that does not need words.",
  },
  {
    src: SITE_IMAGES.aiAboutStoryBayou,
    alt: "Therapy dog and handler outdoors in green space",
    title: "Gentle Companions",
    description:
      "Sharing steady, patient friendship in hospitals, schools, and care settings.",
  },
  {
    src: SITE_IMAGES.stockTherapyDogVisit,
    alt: "Therapy dog visiting with a person in a bright indoor setting",
    title: "Hope in Small Moments",
    description:
      "Sometimes the first step toward healing is a warm paw and a gentle hand.",
  },
] as const;
