import { Heart, Shield, Sparkles } from "lucide-react";

const blocks = [
  {
    Icon: Heart,
    title: "Why a dog?",
    body: "Dogs read the room. A gentle visit can soften a hospital hallway, a classroom, or a quiet room at home—often before anyone says a word.",
  },
  {
    Icon: Shield,
    title: "Safety first",
    body: "Therapy teams follow policies from the places we serve. Handlers watch their dog’s body language, pace, and rest—so every visit stays respectful and safe.",
  },
  {
    Icon: Sparkles,
    title: "Faith at the center",
    body: "Angel Paws serves as a ministry: we pray for people, love without agenda, and let a faithful dog carry some of the comfort Christ asks us to share.",
  },
] as const;

export function PetTherapySections() {
  return (
    <section className="rounded-[2.5rem] bg-surface-container-low py-20 md:rounded-[3rem] md:py-28">
      <div className="mx-auto max-w-screen-2xl px-6 sm:px-10 lg:px-12">
        <div className="grid gap-12 md:grid-cols-3 md:gap-10">
          {blocks.map(({ Icon, title, body }) => (
            <div
              key={title}
              className="rounded-3xl bg-surface-container-lowest p-8 shadow-soft ring-1 ring-on-surface/5"
            >
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-primary-container text-on-primary-container">
                <Icon className="size-6" strokeWidth={2} aria-hidden />
              </div>
              <h2 className="mb-3 font-serif text-2xl text-on-surface">{title}</h2>
              <p className="font-sans leading-relaxed text-on-surface-variant">
                {body}
              </p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-14 max-w-2xl text-center text-lg italic text-on-surface-variant">
          Details of training and certification paths can grow here as Angel Paws
          finalizes them—this page is meant to read like a conversation, not a
          manual.
        </p>
      </div>
    </section>
  );
}
