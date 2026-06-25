import { DEBBIE_IMG } from "@/lib/debbieImages";
import { SITE_IMAGES } from "@/lib/siteImages";

/**
 * Homepage — ministry photos from Debbie’s June 2026 package where noted.
 */

export const IMG = {
  /** Must stay `gave-me-your-paw` — pairs with hero quote (“…gave me your paw.”). */
  heroDog: SITE_IMAGES.ministryPawHand,
  pillarHealthcare: DEBBIE_IMG.samHospitals,
  pillarSchools: DEBBIE_IMG.ajSchools,
  pillarCareFacilities: DEBBIE_IMG.coveyAssistedLiving,
  impactFeature: DEBBIE_IMG.ajImpact,
  journeyInvite: "/gallery/Kylo School.jpg",
} as const;
