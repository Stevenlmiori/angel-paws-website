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
                  alt="AJ, Angel Paws therapy dog with handler"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            <p className="mt-6 text-center font-serif text-lg italic leading-relaxed text-on-surface-inverse-muted md:text-left">
              &ldquo;Be completely humble and gentle; be patient, bearing with one
              another in love.&rdquo;
              <cite className="mt-2 block text-sm not-italic text-primary-container">
                Ephesians 4:2
              </cite>
            </p>
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
