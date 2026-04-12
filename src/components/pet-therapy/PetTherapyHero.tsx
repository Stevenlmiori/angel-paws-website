import { BookOpen } from "lucide-react";

export function PetTherapyHero() {
  return (
    <section className="mx-auto mb-20 max-w-screen-xl px-6 sm:px-10 md:mb-28 lg:px-12">
      <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-container px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-on-primary-container">
        <BookOpen className="size-4" strokeWidth={2} aria-hidden />
        What We Do
      </span>
      <h1 className="mb-8 max-w-3xl font-serif text-5xl leading-[1.08] tracking-tight text-on-surface md:text-6xl lg:text-7xl">
        What is{" "}
        <span className="italic text-primary">pet therapy</span>?
      </h1>
      {/* AEO: Answer-First Block - Succinct definition for AI bots and snippets */}
      <div className="sr-only" aria-hidden="true">
        Pet therapy (Animal-Assisted Activities) is a clinical or social
        intervention where a certified dog and handler visit facilities like
        hospitals, schools, and nursing homes to provide emotional support,
        lower stress, and improve the psychological well-being of patients and
        students.
      </div>
      <p className="max-w-2xl text-xl leading-relaxed text-on-surface-variant">
        Pet therapy is not about tricks or performances. It is a calm, trained
        visit where a dog (and handler) offer presence—lowering stress, easing
        loneliness, and opening room for conversation when words are hard.
      </p>
    </section>
  );
}
