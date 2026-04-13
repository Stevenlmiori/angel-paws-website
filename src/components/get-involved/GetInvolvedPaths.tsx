import type { LucideIcon } from "lucide-react";
import { ClipboardList, GraduationCap, HeartHandshake, Sparkles } from "lucide-react";

const paths: { Icon: LucideIcon; title: string; text: string }[] = [
  {
    Icon: HeartHandshake,
    title: "Become a Therapy Team",
    text: "If you have a dog with the right temperament, you may be able to serve together. Our teams go through training and evaluation before visiting facilities. Once approved, you’ll be part of something that makes a real difference in people’s lives.",
  },
  {
    Icon: ClipboardList,
    title: "Serve Without a Dog",
    text: "Not everyone has a dog, but there are still ways to help. From assisting with coordination to supporting visits and events, your time matters.",
  },
  {
    Icon: GraduationCap,
    title: "Support the Work",
    text: "Every visit takes preparation, training, and coordination. Your support helps make more visits possible and allows us to reach more people in our community.",
  },
];

const steps = [
  {
    n: "01",
    title: "Intro conversation",
    body: "Tell us your story and your dog’s temperament. We’ll help you understand time commitments and heart posture.",
  },
  {
    n: "02",
    title: "Orientation",
    body: "Learn our faith foundation, safeguarding expectations, and how we partner with each facility.",
  },
  {
    n: "03",
    title: "Skills & evaluation",
    body: "Handlers and dogs complete practical training aligned with industry standards and our ministry culture.",
  },
  {
    n: "04",
    title: "Serve",
    body: "Join a team, receive mentoring, and begin scheduled visits with ongoing support from Angel Paws.",
  },
];

export function GetInvolvedPaths() {
  return (
    <>
      <section className="mx-auto max-w-screen-xl px-6 sm:px-10 lg:px-12">
        <div className="mb-16 text-center md:mb-20">
          <span className="mb-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-primary">
            <Sparkles className="size-4" aria-hidden />
            Ways to serve
          </span>
          <h2 className="font-serif text-4xl text-on-surface md:text-5xl">
            Many gifts, one mission
          </h2>
        </div>
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {paths.map(({ Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl bg-surface-container-low p-10 shadow-soft transition-colors hover:bg-surface-container-lowest"
            >
              <Icon className="mb-6 size-10 text-primary" strokeWidth={1.5} />
              <h3 className="mb-4 font-serif text-2xl text-on-surface">
                {title}
              </h3>
              <p className="leading-relaxed text-on-surface-variant">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-screen-xl px-6 sm:px-10 md:mt-32 lg:px-12">
        <div className="rounded-[2.5rem] bg-surface-container-low px-8 py-16 md:rounded-[3rem] md:px-12 md:py-20">
          <h2 className="mb-4 text-center font-serif text-3xl text-on-surface md:text-4xl">
            Path to membership
          </h2>
          <p className="mx-auto mb-14 max-w-2xl text-center text-lg text-on-surface-variant">
            A simple sequence—we never rush the heart or the dog. Timelines vary
            by team and season.
          </p>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {steps.map((s) => (
              <div key={s.n} className="relative pl-4">
                <span className="mb-3 block font-serif text-3xl text-primary/80">
                  {s.n}
                </span>
                <h3 className="mb-2 font-serif text-xl text-on-surface">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-on-surface-variant">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
