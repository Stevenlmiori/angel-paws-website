import Image from "next/image";
import { PawPrint } from "lucide-react";
import { CONTACT_IMG } from "./media";

export function ContactHero() {
  return (
    <section className="mx-auto mb-24 max-w-screen-xl px-6 sm:px-10 md:mb-32 lg:px-12">
      <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <div className="z-10 lg:col-span-7">
          <span className="mb-6 inline-block rounded-full bg-primary-container px-4 py-1 text-xs font-bold uppercase tracking-widest text-on-primary-container">
            Reach Out
          </span>
          <h1 className="mb-8 font-serif text-5xl leading-[1.1] tracking-tight text-on-surface md:text-7xl lg:text-8xl">
            We Are Here
            <br />
            <span className="italic text-primary">to Listen.</span>
          </h1>
          <p className="max-w-xl text-xl leading-relaxed text-on-surface-variant">
            Whether you are looking to bring a therapy pet to your facility,
            interested in volunteering, or simply want to share a story, our
            doors are always open.
          </p>
        </div>
        <div className="relative lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] bg-surface-container-low">
            <Image
              src={CONTACT_IMG.hero}
              alt="Students in a library setting (placeholder imagery for outreach)"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -left-4 hidden max-w-xs rounded-2xl bg-surface-container-highest p-8 shadow-xl lg:-bottom-12 lg:-left-12 lg:block">
            <div className="mb-4 flex items-center gap-4">
              <PawPrint className="size-6 text-primary" strokeWidth={2} />
              <span className="text-xs font-bold uppercase tracking-tight text-on-surface-variant">
                Active Presence
              </span>
            </div>
            <p className="text-sm italic text-on-surface">
              &ldquo;A calm dog can turn a hard moment into a safe one.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
