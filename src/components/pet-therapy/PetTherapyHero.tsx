import { BookOpen } from "lucide-react";

export function PetTherapyHero() {
  return (
    <section className="mx-auto mb-20 max-w-screen-xl px-6 sm:px-10 md:mb-28 lg:px-12">
      <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-container px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-on-primary-container">
        <BookOpen className="size-4" strokeWidth={2} aria-hidden />
        What We Do
      </span>
      <h1 className="mb-10 max-w-3xl font-serif text-5xl leading-[1.08] tracking-tight text-on-surface md:text-6xl lg:text-7xl">
        What is{" "}
        <span className="italic text-primary">pet therapy</span>?
      </h1>
      <div className="sr-only" aria-hidden="true">
        Pet therapy, often called animal-assisted therapy, is the use of trained
        animals to support people emotionally and mentally. Therapy dogs visit
        hospitals, schools, and care facilities to spend time with people who may
        be dealing with stress, anxiety, illness, or loneliness.
      </div>
      <div className="max-w-2xl space-y-6 text-xl leading-relaxed text-on-surface-variant">
        <p>
          Pet therapy, often called animal-assisted therapy, is the use of
          trained animals to support people emotionally and mentally.
        </p>
        <p className="font-medium text-on-surface">At its core, it&apos;s about connection.</p>
        <p>
          Our therapy dogs visit hospitals, schools, and care facilities to spend
          time with people who may be dealing with stress, anxiety, illness, or
          loneliness.
        </p>
        <p>
          Even a few minutes with a dog can help someone feel more at ease.
        </p>
      </div>
    </section>
  );
}
