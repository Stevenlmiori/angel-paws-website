import Image from "next/image";
import { DONATE_IMG } from "./media";

export function DonateHero() {
  return (
    <section className="mx-auto mb-24 max-w-screen-xl px-6 sm:px-10 md:mb-32 lg:px-12">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="order-2 lg:order-1 lg:col-span-7">
          <span className="mb-6 inline-block rounded-full bg-primary-container px-4 py-1 text-xs font-bold uppercase tracking-widest text-on-primary-container">
            Support Our Mission
          </span>
          <h1 className="mb-8 font-serif text-5xl leading-[1.05] tracking-tight text-on-surface md:text-7xl lg:text-8xl">
            Healing Hearts, <br />
            <span className="italic text-primary">One Paw</span> at a Time.
          </h1>
          <p className="mb-10 max-w-xl text-xl leading-relaxed text-on-surface-variant">
            Your generosity allows us to provide certified therapy animals to
            hospitals, schools, and communities in need. Every dollar directly
            supports the care, training, and travel of our dedicated animal
            partners.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#donate-panel"
              className="rounded-full bg-primary px-8 py-4 text-sm font-bold uppercase tracking-widest text-on-primary shadow-lg shadow-primary/20 transition-transform hover:scale-[1.02]"
            >
              Donate Now
            </a>
            <a
              href="/get-involved"
              className="rounded-full bg-surface-container-high px-8 py-4 text-sm font-bold uppercase tracking-widest text-on-surface transition-colors hover:bg-surface-container-highest"
            >
              Learn More
            </a>
          </div>
        </div>
        <div className="relative order-1 lg:order-2 lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] bg-surface-container-low shadow-soft">
            <Image
              src={DONATE_IMG.hero}
              alt="Therapy dog with a child in a hospital setting"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-4 max-w-[200px] rounded-2xl bg-surface-container-highest p-6 shadow-xl sm:-bottom-8 sm:-right-8 sm:max-w-xs sm:p-8">
            <p className="mb-2 font-serif text-3xl text-primary sm:text-4xl">
              100%
            </p>
            <p className="text-xs font-bold uppercase leading-tight tracking-widest text-on-surface-variant">
              Of public donations fund direct animal care and training.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
