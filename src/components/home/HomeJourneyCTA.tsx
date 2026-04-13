import Image from "next/image";
import { IMG } from "./media";

export function HomeJourneyCTA() {
  return (
    <section className="px-6 py-24 sm:px-10 md:py-32 lg:px-12">
      <div className="relative mx-auto min-h-[480px] max-w-screen-xl overflow-hidden rounded-[4rem] shadow-2xl md:min-h-[560px]">
        <div className="absolute inset-0 bg-primary" />
        <Image
          src={IMG.journeyInvite}
          alt="Sam comforting a child—Angel Paws therapy team"
          fill
          sizes="(max-width: 1536px) 100vw, 1536px"
          className="object-cover object-[center_30%] mix-blend-overlay opacity-30"
        />
        <div className="relative z-10 flex min-h-[480px] flex-col justify-center px-8 py-20 text-center text-on-primary md:min-h-[560px] md:px-12 md:py-32">
          <h2 className="mx-auto max-w-4xl font-serif text-5xl font-bold leading-tight md:text-7xl">
            Ready to Share the Love with Your Furry Friend?
          </h2>
          <p className="mx-auto mb-12 mt-8 max-w-2xl text-xl leading-relaxed opacity-90 md:text-2xl">
            We would love for you and your dog to join our growing therapy
            team family. You do not need special experience, just a gentle
            spirit and a heart to serve.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button
              type="button"
              className="rounded-full bg-white px-12 py-5 text-xl font-bold text-primary shadow-xl transition-transform hover:scale-105"
            >
              Become a Volunteer
            </button>
            <button
              type="button"
              className="rounded-full bg-white/15 px-12 py-5 text-xl font-bold text-on-primary backdrop-blur-sm transition-all hover:bg-white/25"
            >
              Partner With Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
