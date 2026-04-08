import Image from "next/image";
import { ABOUT_IMG } from "./media";

export function AboutHero() {
  return (
    <section className="mx-auto mb-24 max-w-screen-2xl px-6 sm:px-10 md:mb-32 lg:px-12">
      <div className="relative grid grid-cols-1 items-center gap-12 md:grid-cols-12">
        <div className="z-10 md:col-span-6">
          <span className="mb-4 block text-sm font-bold uppercase tracking-[0.2em] text-primary">
            Our Heart
          </span>
          <h1 className="mb-8 font-serif text-5xl leading-[1.1] text-on-surface md:text-6xl lg:text-7xl">
            Who We Are
          </h1>
          <p className="max-w-xl text-xl leading-relaxed text-on-surface-variant">
            Angel Paws is more than a pet therapy organization; it is a living
            sanctuary of connection. Rooted in the belief that every heartbeat
            matters, we facilitate the profound healing that occurs when a
            gentle animal meets a human in need. Our ministry is a quiet
            revolution of comfort across Houston.
          </p>
        </div>
        <div className="relative md:col-span-6">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl md:rounded-3xl">
            <Image
              src={ABOUT_IMG.hero}
              alt="Golden retriever resting with an older adult in a sunlit room"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-10 -left-4 hidden max-w-sm rounded-2xl bg-primary p-10 shadow-xl lg:-bottom-12 lg:-left-12 lg:block lg:rounded-3xl">
            <p className="text-lg italic leading-relaxed text-on-primary">
              &ldquo;The presence of a dog can unlock a door to the soul that
              has been closed for years.&rdquo;
            </p>
            <div className="mt-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-on-primary/80">
              <span
                className="size-1.5 shrink-0 rounded-full bg-on-primary/50"
                aria-hidden
              />
              Founder&apos;s Reflection
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
