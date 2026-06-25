import Image from "next/image";
import { DEBBIE_IMG } from "@/lib/debbieImages";
import { pageMetadata } from "@/lib/seo";
import {
  MCGOWN_ATTRIBUTION,
  MCGOWN_LETTER_BODY,
  MCGOWN_ROLE,
} from "@/lib/mcgownLetter";
import { HeadingBlock } from "@/components/ui/HeadingBlock";
import { Section } from "@/components/ui/Section";

export const metadata = pageMetadata({
  title: "Houston Therapy Dog Testimonials",
  description:
    "Read testimonials from Houston-area schools, churches, senior care communities, and leaders about Angel Paws Pet Therapy visits.",
  path: "/testimonials",
  keywords: [
    "Houston therapy dog testimonials",
    "school therapy dog testimonial Houston",
    "senior care therapy dog testimonial Houston",
  ],
});

const featured = [
  {
    image: DEBBIE_IMG.drMcGown,
    alt: "Letter of support from Dr. Jenny McGown, Klein ISD Superintendent",
    paragraphs: MCGOWN_LETTER_BODY.split("\n\n"),
    attribution: MCGOWN_ATTRIBUTION,
    role: MCGOWN_ROLE,
    isLetter: true as const,
  },
  {
    image: DEBBIE_IMG.christinaGooger,
    alt: "Christina Googer at Redeemer Church with Angel Paws",
    quote:
      "Angel Paws has been a crucial part of our Parent's Night Out ministry for the last 5 years. They have been on board with our vision from the start to provide a safe, fun environment for foster and adoptive children, and the calming, comforting presence of the dogs is a key component. One of our first lines of defense when a child becomes dysregulated or feels uncomfortable is to visit the Angel Paws room! Their human counterparts are absolutely wonderful as well. God truly did gift us with their enthusiastic partnership. We love Angel Paws!",
    attribution: "Christina Googer",
    role: "Redeemer Church",
    isLetter: false as const,
  },
  {
    image: DEBBIE_IMG.stacha,
    alt: "Adrai Stacha and the Hassler Reading Program",
    quote:
      "The Angel Paws Reading Program has been an incredible addition to Hassler! Watching students spend 15 minutes each week reading to a calm, friendly therapy dog is both heartwarming and inspiring. Students feel safe, supported, and accepted when reading to the Angel Paws dogs because the animals provide a completely judgment-free audience. For many participants, the Angel Paws dogs become trusted companions who help them feel valued, capable, and successful.",
    attribution: "Adrai Stacha",
    role: "Hassler Elementary",
    isLetter: false as const,
  },
  {
    image: DEBBIE_IMG.brookdale,
    alt: "Brookdale Champions Assisted Living visit",
    quote:
      "Angel Paws is a great organization. They are a delight to have. I love to watch my Residents' eyes light up when the Angel Paws group comes to visit. The dogs do remember us and we love having them over. Angel Paws also gives my Residents time to remember the wonderful times they had with their own fur babies and gives them a chance to reminisce and share those times with one another. Thank you so much Angel Paws for what you do and for sharing your love with everyone you meet, especially my Residents.",
    attribution: "Ihuoma J.",
    role: "Brookdale Champions Assisted Living",
    isLetter: false as const,
  },
] as const;

export default function TestimonialsPage() {
  return (
    <Section tone="mist" className="!pt-28 md:!pt-32">
      <div className="mx-auto max-w-screen-xl px-6 sm:px-10 lg:px-12">
        <HeadingBlock
          label="Testimonials"
          title="What partners are saying"
          as="h1"
          description="Schools, churches, care communities, and medical partners share how Angel Paws teams show up with calm, compassion, and care."
          className="mb-16 max-w-2xl"
        />
        <ul className="space-y-20 md:space-y-28">
          {featured.map((item, index) => (
            <li
              key={item.attribution}
              className={`grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14 ${
                index % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div className="lg:col-span-5">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-surface-container-low shadow-soft md:rounded-[2.5rem]">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="lg:col-span-7">
                {"isLetter" in item && item.isLetter ? (
                  <div className="space-y-5 text-lg leading-relaxed text-on-surface-variant">
                    {item.paragraphs.map((para) => (
                      <p key={para.slice(0, 32)}>{para}</p>
                    ))}
                  </div>
                ) : (
                  <blockquote className="font-serif text-2xl leading-relaxed text-on-surface md:text-3xl">
                    &ldquo;{"quote" in item ? item.quote : ""}&rdquo;
                  </blockquote>
                )}
                <footer className="mt-6">
                  <p className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-on-surface">
                    {item.attribution}
                  </p>
                  <p className="mt-1 text-on-surface-variant">{item.role}</p>
                </footer>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
