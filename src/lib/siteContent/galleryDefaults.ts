import type { StoredGalleryImage } from "./galleryTypes";

function g(
  id: string,
  file: string,
  alt: string,
  caption?: string,
): StoredGalleryImage {
  return {
    id,
    src: `/gallery/${file}`,
    alt,
    caption,
    active: true,
  };
}

/** Seeded from Debbie’s “Other pics” folder — editable in `/admin/gallery`. */
export const DEFAULT_GALLERY_IMAGES: StoredGalleryImage[] = [
  g("sam-alex", "1 Sam - Alex.jpg", "Sam and Alex during a therapy visit"),
  g("aj", "AJ.jpg", "AJ, Angel Paws therapy dog"),
  g("boone-nursing", "Boone Nursing home.jpg", "Boone visiting a nursing home"),
  g("boys-girls-sam", "Boys & Girls & Sam.jpg", "Sam with children at Boys & Girls Club"),
  g("charlie-reading-2", "Charlie reading buddy 2.jpg", "Charlie as a reading buddy"),
  g("khaki", "Khaki.jpg", "Khaki, therapy dog"),
  g("kylo-2", "Kylo 2.jpg", "Kylo during a visit"),
  g("kylo-methodist", "Kylo Methodist employee.jpg", "Kylo comforting a Methodist employee"),
  g("kylo-sam-methodist", "Kylo Sam Methodist.jpg", "Kylo and Sam at Methodist"),
  g("kylo-school", "Kylo School.jpg", "Kylo at a school visit"),
  g("mda-benji-kylo", "MDA  Benji Kylo.jpg", "Benji and Kylo at MDA event"),
  g("nursing-boone", "Nursing home Boone.jpg", "Boone at a nursing home"),
  g("nursing-covey", "Nursing home covey 1.jpg", "Covey at assisted living"),
  g("ollie-nursing", "Ollie nursing home.jpg", "Ollie at a nursing home visit"),
  g("reading-sam", "Reading Sam.jpg", "Sam during a reading program"),
  g("redeemer", "Redeemer Church .jpeg", "Angel Paws at Redeemer Church"),
  g("sam-reading-school", "Sam Reading Buddy School.jpg", "Sam as a reading buddy at school"),
  g("sam-reading", "Sam Reading buddy.jpg", "Sam listening to a young reader"),
  g("sam-methodist", "Sam methodist 1.jpg", "Sam at Methodist"),
  g("sutherland-springs", "Sutherland Springs Church Shooting.jpg", "Angel Paws serving after Sutherland Springs tragedy"),
  g("charlie-reading", "charlie reading.jpg", "Charlie during a reading visit"),
  g("cross-1", "cross 1.jpg", "Faith-based ministry moment"),
  g("cross", "cross.jpg", "Faith-based ministry moment"),
  g("kerrville-group", "group Kerrville.jpg", "Angel Paws team in Kerrville flood response"),
  g("sam-methodist-2", "sam at methodist.jpg", "Sam at Methodist"),
];
