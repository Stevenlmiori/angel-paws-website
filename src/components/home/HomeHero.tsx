import Image from "next/image";
import { ArrowRight, Heart, PawPrint } from "lucide-react";
import { IMG } from "./media";

export function HomeHero() {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden px-6 py-12 sm:px-10 lg:min-h-[90vh] lg:px-12">
      <div className="relative z-10 mx-auto grid w-full max-w-screen-xl grid-cols-1 items-center gap-12 py-12 lg:grid-cols-12">
        <div className="z-10 space-y-8 lg:col-span-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-container px-4 py-1.5 text-sm font-medium uppercase tracking-wide text-primary">
            <Heart
              className="size-[1.05rem] shrink-0 fill-primary stroke-primary"
              strokeWidth={0}
              aria-hidden
            />
            Faith-Based Ministry
          </div>
          <h1 className="font-serif text-5xl font-bold leading-[1.1] tracking-tighter text-on-background lg:text-7xl">
            Sharing Hope and{" "}
            <span className="italic text-primary">Comfort</span> through the
            Love of a Furry Friend.
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-on-surface-variant lg:text-xl">
            Angel Paws is a faith-based pet therapy ministry in the Houston
            area, sharing the love of Jesus through the steady comfort of
            therapy dogs.
          </p>
          <div className="flex flex-wrap gap-6 pt-4">
            <button
              type="button"
              className="flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-lg font-bold text-on-primary shadow-lg shadow-primary/20 transition-transform hover:scale-[1.02]"
            >
              Join Our Mission
              <ArrowRight className="size-6 shrink-0" strokeWidth={2.25} aria-hidden />
            </button>
            <button
              type="button"
              className="rounded-full bg-secondary-container px-8 py-4 text-lg font-bold text-on-secondary-container transition-transform hover:scale-[1.02]"
            >
              Donate Now
            </button>
          </div>
        </div>

        <div className="relative lg:col-span-6">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] shadow-2xl">
            <Image
              src={IMG.heroDog}
              alt="A child holds Sam’s paw—Angel Paws therapy dog"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
          <div className="absolute -bottom-10 -left-4 hidden max-w-xs rounded-3xl bg-surface-container/90 p-10 shadow-xl backdrop-blur-sm xl:block">
            <p className="font-serif text-2xl italic text-primary">
              &ldquo;When I needed a hand, you gave me your paw.&rdquo;
            </p>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute right-0 top-0 -z-10 text-primary opacity-[0.05]"
        aria-hidden
      >
        <PawPrint
          className="size-[min(40rem,90vw)]"
          strokeWidth={1}
          absoluteStrokeWidth
        />
      </div>
    </section>
  );
}
