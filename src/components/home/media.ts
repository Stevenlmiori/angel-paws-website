import { SITE_IMAGES } from "@/lib/siteImages";

/**
 * Homepage — each `SITE_IMAGES` key is used only here (see `src/lib/siteImages.ts`).
 */

export const IMG = {
  /** Must stay `gave-me-your-paw` — pairs with hero quote (“…gave me your paw.”). */
  heroDog: SITE_IMAGES.ministryPawHand,
  pillarHealthcare: SITE_IMAGES.dogElderlyManWithDogInBed,
  pillarSchools: SITE_IMAGES.ministrySamCathedralHigh2,
  pillarCareFacilities: SITE_IMAGES.ministrySamWithChild2,
  impactFeature: SITE_IMAGES.ministryHandlerHorizontal,
  journeyInvite: SITE_IMAGES.dogElderlyManWithDogInBed,
} as const;
