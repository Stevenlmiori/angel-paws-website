import Image from "next/image";
import { BookOpen } from "lucide-react";
import { PET_THERAPY_IMG } from "./media";

export function PetTherapyHero() {
  return (
    <section className="mx-auto mb-20 max-w-screen-xl px-6 pt-8 sm:px-10 md:mb-28 md:pt-10 lg:px-12">
      <div className="relative grid grid-cols-1 items-center gap-12 md:grid-cols-12">
        <div className="z-10 md:col-span-6">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-container px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-on-primary-container">
            <BookOpen className="size-4" strokeWidth={2} aria-hidden />
            What We Do
          </span>
          <h1 className="mb-10 max-w-3xl font-serif text-5xl leading-[1.08] tracking-tight text-on-surface md:text-6xl lg:text-7xl">
            What is{" "}
            <span className="italic text-primary">pet therapy</span>?
          </h1>
          <div className="sr-only" aria-hidden="true">
            Pet therapy, often called animal-assisted therapy, is the use of
            trained animals to support people emotionally and mentally. Therapy
            dogs visit hospitals, schools, and care facilities to spend time
            with people who may be dealing with stress, anxiety, illness, or
            loneliness.
          </div>
          <div className="max-w-xl space-y-6 text-xl leading-relaxed text-on-surface-variant">
            <p>
              Pet therapy, often called animal-assisted therapy, is the use of
              trained animals to support people emotionally and mentally.
            </p>
            <p className="font-medium text-on-surface">
              At its core, it&apos;s about connection.
            </p>
            <p>
              Our therapy dogs visit hospitals, schools, and care facilities to
              spend time with people who may be dealing with stress, anxiety,
              illness, or loneliness.
            </p>
            <p>
              Even a few minutes with a dog can help someone feel more at ease.
            </p>
          </div>
        </div>

        <div className="relative md:col-span-6">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl md:rounded-3xl">
            <Image
              src={PET_THERAPY_IMG.hero}
              alt="Therapy dog with a child during a comfort visit"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-2 max-w-[min(18rem,calc(100%-0.5rem))] rounded-2xl border border-primary/15 bg-surface-container/95 p-6 shadow-xl backdrop-blur-sm sm:-bottom-8 sm:-left-4 sm:max-w-xs sm:rounded-3xl sm:p-8">
            <p className="font-serif text-base italic leading-snug text-primary sm:text-lg">
              Connection without an agenda—just presence, patience, and a gentle
              spirit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
