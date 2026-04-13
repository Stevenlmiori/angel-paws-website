import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { IMG } from "./media";

export function HomeImpact() {
  return (
    <section className="overflow-hidden bg-white py-24 md:py-32">
      <div className="mx-auto max-w-screen-xl px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="relative">
            <div
              className="absolute -left-12 -top-12 -z-10 h-48 w-48 rounded-full bg-primary/10 blur-3xl"
              aria-hidden
            />
            <div className="-rotate-2 overflow-hidden rounded-[3rem] bg-background shadow-2xl">
              <div className="relative h-[420px] w-full sm:h-[520px] lg:h-[600px]">
                <Image
                  src={IMG.impactFeature}
                  alt="A child holds Sam’s paw during a therapy visit"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <p className="text-sm font-bold uppercase tracking-widest text-primary">
              Why it matters
            </p>
            <h2 className="font-serif text-5xl font-bold leading-tight md:text-6xl">
              A short visit can go a long way.
            </h2>
            <div className="space-y-6 text-xl leading-relaxed text-on-surface-variant">
              <p>
                Time with a therapy dog has been shown to lower stress, ease
                anxiety, and help people feel more at peace. But beyond the
                research, you can see it happen in real time.
              </p>
              <p>
                A patient smiles for the first time that day.
                <br />
                A student who was anxious starts to settle.
                <br />
                A family in a difficult moment feels just a little more steady.
              </p>
              <p className="font-medium text-on-surface">
                It&apos;s simple. And it matters.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 pt-6">
              <div>
                <p className="text-4xl font-bold text-primary">150+</p>
                <p className="text-sm font-semibold uppercase tracking-wider text-secondary">
                  Active Teams
                </p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary">Houston</p>
                <p className="text-sm font-semibold uppercase tracking-wider text-secondary">
                  Area Served
                </p>
              </div>
            </div>
            <button
              type="button"
              className="group flex items-center gap-4 text-xl font-bold text-primary transition-opacity hover:opacity-70"
            >
              Read Our Stories
              <ArrowRight
                className="size-7 shrink-0 transition-transform group-hover:translate-x-2"
                strokeWidth={2.25}
                aria-hidden
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
