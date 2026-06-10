import {
  MCGOWN_ATTRIBUTION,
  MCGOWN_LETTER_EXCERPT,
  MCGOWN_ROLE,
} from "@/lib/mcgownLetter";
import type { StoredTestimonial } from "./testimonialTypes";

export const DEFAULT_TESTIMONIALS: StoredTestimonial[] = [
  {
    id: "redeemer-church",
    quote:
      "Angel Paws has been a crucial part of our Parent's Night Out ministry for the last 5 years. They have been on board with our vision from the start to provide a safe, fun environment for foster and adoptive children, and the calming, comforting presence of the dogs is a key component. One of our first lines of defense when a child becomes dysregulated or feels uncomfortable is to visit the Angel Paws room! Their human counterparts are absolutely wonderful as well. God truly did gift us with their enthusiastic partnership. We love Angel Paws!",
    attribution: "Christina Googer",
    role: "Redeemer Church",
    active: true,
  },
  {
    id: "hassler-reading",
    quote:
      "The Angel Paws Reading Program has been an incredible addition to Hassler! Watching students spend 15 minutes each week reading to a calm, friendly therapy dog is both heartwarming and inspiring. While the program certainly strengthens reading skills and builds self-esteem and confidence in young readers, its impact extends far beyond academics. Students feel safe, supported, and accepted when reading to the Angel Paws dogs because the animals provide a completely judgment-free audience.",
    attribution: "Adrai Stacha",
    role: "Hassler Elementary",
    active: true,
  },
  {
    id: "brookdale-champions",
    quote:
      "Angel Paws is a great organization. They are a delight to have. I love to watch my Residents' eyes light up when the Angel Paws group comes to visit. The dogs do remember us and we love having them over. Angel Paws also gives my Residents time to remember the wonderful times they had with their own fur babies and gives them a chance to reminisce and share those times with one another. This in turn brings joy and laughter for all.",
    attribution: "Ihuoma J.",
    role: "Brookdale Champions Assisted Living",
    active: true,
  },
  {
    id: "dr-mcgown",
    quote: MCGOWN_LETTER_EXCERPT,
    attribution: MCGOWN_ATTRIBUTION,
    role: MCGOWN_ROLE,
    active: true,
  },
];
