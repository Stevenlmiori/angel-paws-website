import Image from "next/image";
import { SERVE_IMG } from "./media";

export function WhereWeServeHero() {
  return (
    <section className="mx-auto mb-20 max-w-screen-xl px-6 sm:px-10 md:mb-24 lg:px-12">
      <div className="relative grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div className="z-10">
          <span className="mb-4 inline-block rounded-full bg-secondary-container px-4 py-1 text-xs font-bold uppercase tracking-widest text-on-secondary-container">
            Our Presence
          </span>
          <h1 className="mb-8 font-serif text-5xl leading-tight tracking-tight text-on-surface md:text-6xl lg:text-7xl">
            A Presence in <br />
            <span className="font-normal italic text-primary">Every Corner.</span>
          </h1>
          <p className="mb-8 max-w-lg text-xl leading-relaxed text-on-surface-variant">
            Our therapy teams bring quiet comfort and joyful connection to
            diverse settings throughout our community, from critical care units
            to elementary classrooms.
          </p>
        </div>
        <div className="relative">
          <div className="relative aspect-[4/5] rotate-2 overflow-hidden rounded-[2rem] shadow-2xl transition-transform duration-700 hover:rotate-0">
            <Image
              src={SERVE_IMG.hero}
              alt="Therapy dog in a sunlit hospital corridor"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 max-w-xs rounded-2xl bg-surface-container-highest p-8 shadow-xl backdrop-blur-sm lg:-bottom-6 lg:-left-6 lg:rounded-3xl">
            <p className="font-serif text-lg italic text-primary">
              &ldquo;The paws that heal are found wherever they are needed
              most.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
