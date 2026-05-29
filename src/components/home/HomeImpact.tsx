import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IMG } from "./media";

export function HomeImpact() {
  return (
    <section className="section-tone-inverse overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-screen-xl px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="relative">
            <div
              className="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-primary/20 blur-3xl"
              aria-hidden
            />
            <div className="relative -rotate-2 overflow-hidden rounded-[3rem] bg-surface-container-low shadow-2xl ring-1 ring-white/10">
              <div className="relative h-[420px] w-full sm:h-[520px] lg:h-[600px]">
                <Image
                  src={IMG.impactFeature}
                  alt="Angel Paws therapy dog with handler, ready for visits"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <p className="text-sm font-bold uppercase tracking-widest text-primary-container">
              Why it matters
            </p>
            <h2 className="font-serif text-5xl font-bold leading-tight md:text-6xl">
              A short visit can go a long way.
            </h2>
            <div className="space-y-6 text-xl leading-relaxed text-on-surface-inverse-muted">
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
              <p className="font-medium text-on-surface-inverse">
                It&apos;s simple. And it matters.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 pt-6">
              <div>
                <p className="text-4xl font-bold text-primary-container">1,000+</p>
                <p className="text-sm font-semibold uppercase tracking-wider text-on-surface-inverse-muted">
                  People Visited
                </p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary-container">Houston</p>
                <p className="text-sm font-semibold uppercase tracking-wider text-on-surface-inverse-muted">
                  Area Served
                </p>
              </div>
            </div>
            <Link
              href="/stories"
              className="group inline-flex items-center gap-4 text-xl font-bold text-primary-container underline-offset-4 transition-opacity hover:opacity-80 hover:underline"
            >
              Read Our Stories
              <ArrowRight
                className="size-7 shrink-0 transition-transform group-hover:translate-x-2"
                strokeWidth={2.25}
                aria-hidden
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
