import type { StoredTestimonial } from "./testimonialTypes";

/** Full letter from Adria Stacha, counselor at Hassler Elementary. */
export const ADRIA_STACHA_TESTIMONIAL = `The Angel Paws Reading Program has been an incredible addition to Hassler! Watching students spend 15 minutes each week reading to a calm, friendly therapy dog is both heartwarming and inspiring. While the program certainly strengthens reading skills and builds self-esteem and confidence in young readers, its impact extends far beyond academics.

Students feel safe, supported, and accepted when reading to the Angel Paws dogs because the animals provide a completely judgment-free audience. This environment helps reduce anxiety and fear of making mistakes, especially for struggling or reluctant readers. Many students who are typically hesitant to read aloud become more willing to take risks, practice fluency, and engage positively with books when reading alongside a therapy dog.

Another meaningful benefit is the positive effect the program has on students' motivation and overall attitude toward school. Students genuinely look forward to their reading sessions each week, which increases enthusiasm for literacy, encourages consistent participation, and even supports improved school attendance. For many participants, the Angel Paws dogs become trusted companions who help them feel valued, capable, and successful.

Angel Paws is much more than a reading intervention — it is a powerful support for the whole child. The positive impact on students' confidence, emotional well-being, and love of learning is evident each week in our Angel Paws participants. We are incredibly grateful for the dedicated Angel Paws volunteers and their amazing therapy dogs who make this meaningful experience possible for our students.`;

/** Full letter from Dee Turk, counselor at Schultz Elementary. */
export const DEE_TURK_TESTIMONIAL = `As a school counselor at Schultz Elementary in Klein ISD, I have had the privilege of witnessing firsthand the incredible impact the Angel Paws Reading Program has had on our students. We were honored to be the first elementary school in Klein ISD to implement a reading program that pairs struggling readers with therapy dogs, and it has become one of the most meaningful and transformative programs on our campus.

While we certainly celebrate the measurable academic gains our students make in decoding and fluency, the true magic of this program reaches far beyond literacy. Many students walk into their weekly sessions carrying self-doubt but leave with renewed confidence and a sense of pride in themselves. Our four-legged reading partners offer a calm nonjudgmental space where students feel accepted exactly as they are. They don't mind if a child reads slowly, needs extra time to sound out a difficult word, or makes a mistake along the way. Instead, they provide unwavering patience, unconditional love, and quiet encouragement that helps students take risks without fear of embarrassment or failure.

The Angel Paws Reading Program reminds us that meaningful learning happens when students feel safe, connected, and encouraged. The bond formed between a child and a dog creates an environment where growth happens naturally while also building self-esteem, perseverance, and sense of belonging.

We are deeply grateful to the Angel Paws volunteers and their incredible therapy dogs for the gift they bring to our campus. Their time, dedication, and compassionate hearts have made a lasting difference in the lives of our students as well as our staff. The impact of this program extends well beyond the pages of a book—it helps children discover confidence in themselves, one story at a time.

Forever Blessed by Angel Paws,`;

export const DEFAULT_TESTIMONIALS: StoredTestimonial[] = [
  {
    id: "redeemer-church",
    quote:
      "Angel Paws has been a crucial part of our Parent's Night Out ministry for the last 5 years. They have been on board with our vision from the start to provide a safe, fun environment for foster and adoptive children, and the calming, comforting presence of the dogs is a key component. One of our first lines of defense when a child becomes dysregulated or feels uncomfortable is to visit the Angel Paws room! Their human counterparts are absolutely wonderful as well. God truly did gift us with their enthusiastic partnership. We love Angel Paws!",
    attribution: "Christina Googer",
    role: "Redeemer Church",
    image: "/img/testimonials/christina-googer.jpg",
    imageAlt: "Christina Googer with Angel Paws therapy dogs at Redeemer Church",
    imagePosition: "35% 22%",
    active: true,
  },
  {
    id: "hassler-reading",
    quote: ADRIA_STACHA_TESTIMONIAL,
    attribution: "Adria Stacha",
    role: "Counselor, Hassler Elementary",
    image: "/img/testimonials/adria-stacha-lexie-sam.jpg",
    imageAlt: "Adria Stacha with Lexie and Sam, Angel Paws therapy dogs",
    imagePosition: "50% 42%",
    active: true,
  },
  {
    id: "brookdale-champions",
    quote:
      "Angel Paws is a great organization. They are a delight to have. I love to watch my Residents' eyes light up when the Angel Paws group comes to visit. The dogs do remember us and we love having them over. Angel Paws also gives my Residents time to remember the wonderful times they had with their own fur babies and gives them a chance to reminisce and share those times with one another. This in turn brings joy and laughter for all.",
    attribution: "Ihuoma J.",
    role: "Brookdale Champions Assisted Living",
    image: "/img/testimonials/ihuoma-brookdale.jpg",
    imageAlt: "Ihuoma J. with an Angel Paws therapy dog at Brookdale Champions",
    imagePosition: "58% 24%",
    active: true,
  },
  {
    id: "schultz-elementary",
    quote: DEE_TURK_TESTIMONIAL,
    attribution: "Dee Turk",
    role: "School Counselor, Schultz Elementary (Klein ISD)",
    image: "/img/testimonials/dee-turk-september-2026.jpg",
    imageAlt: "Dee Turk with Angel Paws therapy dogs at Schultz Elementary",
    imagePosition: "55% 20%",
    active: true,
  },
];
