/**
 * Site-wide imagery — each URL/path is used in exactly one component.
 *
 * Unsplash originals (license: Unsplash):
 * - Dog / care: https://unsplash.com/photos/elderly-woman-laughing-with-a-dog-ufZ--LyaCVc
 * - Dog / care: https://unsplash.com/photos/elderly-man-and-dog-in-bed-JjADnv5CA2A
 * - Dog: https://unsplash.com/photos/brown-long-coated-dog-wearing-black-and-red-harness-l8I_wRlLu-M
 * - Person petting dog (Unsplash+ only): https://unsplash.com/photos/a-person-petting-a-dog-on-the-head-UWG9TciGwD4 — not hotlinked; use ministry photo where intended.
 * - Board: https://unsplash.com/photos/woman-on-focus-photography-SJvDxw0azqw … (six portrait links in MEETING / HANDOFF as needed)
 *
 * “Curated” rows are additional free Unsplash photos so every layout slot can stay unique
 * until ministry replacements exist.
 */
function unsplashPhoto(
  id: string,
  w: "1920" | "1600" | "1200" = "1920",
): string {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=82`;
}

export const SITE_IMAGES = {
  // --- User-provided dog (free on Unsplash) ---
  dogElderlyWomanLaughing: unsplashPhoto("photo-1765896387403-3e6e0e44d7cc"),
  dogElderlyManWithDogInBed: unsplashPhoto("photo-1765896387454-3c29c0473615"),
  dogHarnessPortrait: unsplashPhoto("photo-1588857925766-7f602c7f2e9c"),

  // --- User-provided board / portrait (free on Unsplash) ---
  portraitWomanFocus: unsplashPhoto("photo-1573497019940-1c28c88b4f3e"),
  portraitManBlackJacket: unsplashPhoto("photo-1629425733761-caae3b5f2e50"),
  portraitWomanSmilingClose: unsplashPhoto("photo-1494790108377-be9c29b29330"),
  portraitWomanRedHairStriped: unsplashPhoto("photo-1650091903034-5f3bb37c35d2"),
  portraitManSuitBrick: unsplashPhoto("photo-1627161684458-a62da52b51c3"),

  // --- Ministry + AI assets (local, each once) ---
  aiAboutHeroTeam: "/img/about-hero-therapy-team.png",
  aiAboutStorySeed: "/img/about-story-seed-of-hope.png",
  aiAboutStoryBayou: "/img/about-story-bayou-city.png",
  /** About “Looking Forward” — wide composition for 16:9 panels (AI placeholder). */
  aiAboutStoryForward: "/img/about-story-looking-forward-cocker.png",
  ministryPawHand: "/img/gave-me-your-paw.jpg",
  ministrySamCathedralHigh2: "/img/sam-cathedral-high-2.jpg",
  ministrySamWithChild2: "/img/sam-comforting-kid-2.jpg",
  /** Pet therapy page — ministry moment (local; unique slot) */
  ministrySamComfortingKid1: "/img/sam-comforting-kid-1.jpg",
  ministryHandlerHorizontal: "/img/angelpaws-dog-and-owner-nk_horizontal.jpg",

  // --- Extra Unsplash (free) — unique placeholders for section panels ---
  stockHospitalCorridor: unsplashPhoto("photo-1519494026892-80bbd2d6fd0d"),
  stockStudentsLibrary: unsplashPhoto("photo-1529390079861-591de354faf5"),
  stockSeniorHands: unsplashPhoto("photo-1511632765486-a01980e01a18"),
  stockCommunityPark: unsplashPhoto("photo-1529156069898-49953e39b3ac"),
  stockDogWindowLight: unsplashPhoto("photo-1543466835-00a7907e9de1"),
  stockVolunteerTeam: unsplashPhoto("photo-1523240795612-9a054b0db644"),
  stockCitySkylinePark: unsplashPhoto("photo-1506905925346-21bda4d32df4"),
  stockReadingChild: unsplashPhoto("photo-1517841905240-472988babdf9"),
  stockTherapyDogVisit: unsplashPhoto("photo-1601758228041-f3b2795255f1"),
  /** Pet therapy page — calm canine presence (Unsplash; unique slot) */
  stockPetTherapyGoldenCalm: unsplashPhoto("photo-1587300003388-93608cc28fef"),
  stockGoldenField: unsplashPhoto("photo-1633722715463-d30f4f325e24"),
  /** Board hero — dog in natural light (unique from home / About story slots) */
  stockBoardHeroDog: unsplashPhoto("photo-1566073771259-6a8506099945"),
} as const;

export type SiteImageKey = keyof typeof SITE_IMAGES;
