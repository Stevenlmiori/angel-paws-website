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
  g("aj", "AJ.jpg", "AJ, Angel Paws therapy dog"),
  g("boone-nursing", "Boone Nursing home.jpg", "Boone visiting a nursing home"),
  g("boys-girls-sam", "boys-girls-sam.jpg", "Sam with children at Boys & Girls Club"),
  g("charlie-reading-2", "Charlie reading buddy 2.jpg", "Charlie as a reading buddy"),
  g("khaki", "Khaki.jpg", "Khaki, therapy dog"),
  g("kylo-methodist", "Kylo Methodist employee.jpg", "Kylo comforting a Methodist employee"),
  g("kylo-sam-methodist", "Kylo Sam Methodist.jpg", "Kylo and Sam at Methodist"),
  g("kylo-school", "Kylo School.jpg", "Kylo at a school visit"),
  g("mda-benji-kylo", "MDA  Benji Kylo.jpg", "Benji and Kylo at MDA event"),
  g("nursing-boone", "Nursing home Boone.jpg", "Boone at a nursing home"),
  g("nursing-covey", "Nursing home covey 1.jpg", "Covey at assisted living"),
  g("reading-sam", "Reading Sam.jpg", "Sam during a reading program"),
  g("sam-reading-school", "Sam Reading Buddy School.jpg", "Sam as a reading buddy at school"),
  g("sam-reading", "Sam Reading buddy.jpg", "Sam listening to a young reader"),
  g("sam-methodist", "Sam methodist 1.jpg", "Sam at Methodist"),
  g("charlie-reading", "charlie reading.jpg", "Charlie during a reading visit"),
  g("cross-1", "cross 1.jpg", "Faith-based ministry moment"),
  g("cross", "cross.jpg", "Faith-based ministry moment"),
  g(
    "september-golden-stuffed-dog",
    "september-2026/golden-with-stuffed-dog.jpg",
    "Golden retriever holding a stuffed dog during an Angel Paws visit",
  ),
  g(
    "september-lone-star-team",
    "september-2026/lone-star-college-team.jpg",
    "Angel Paws teams and Lone Star College Houston North staff",
  ),
  g(
    "september-child-therapy-dog",
    "september-2026/child-with-therapy-dog.jpg",
    "Child sharing a quiet moment with a golden retriever therapy dog",
  ),
  g(
    "september-lone-star-volunteers",
    "september-2026/lone-star-college-volunteers.jpg",
    "Angel Paws volunteers and therapy dogs at Lone Star College Houston North",
  ),
  g(
    "september-greeting-man",
    "september-2026/therapy-dog-greeting-man.jpg",
    "Therapy dog greeting a man during a community visit",
  ),
  g(
    "september-subsea7",
    "september-2026/dogs-at-subsea7.jpg",
    "Four Angel Paws therapy dogs during a workplace visit",
  ),
  g(
    "september-holiday-event",
    "september-2026/holiday-community-event.jpg",
    "Angel Paws therapy dogs at a holiday community event",
  ),
  g(
    "september-cat-visit",
    "september-2026/cat-therapy-visit.jpg",
    "Therapy cat being gently handled during a visit",
  ),
  g(
    "september-dog-greeting",
    "september-2026/therapy-dog-greeting.jpg",
    "Therapy dog greeting a visitor with a paw",
  ),
  g(
    "september-hospital-note",
    "september-2026/hospital-canine-note.jpg",
    "Hospital patient sharing a handwritten note about a canine visit",
  ),
  g(
    "september-reading-classroom",
    "september-2026/reading-buddies-classroom.jpg",
    "Students reading with Angel Paws therapy dogs in a classroom",
  ),
];
