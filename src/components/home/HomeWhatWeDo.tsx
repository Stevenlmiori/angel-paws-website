import Image from "next/image";
import { BookOpen, Building2, School, UsersRound } from "lucide-react";
import { IMG } from "./media";

export function HomeWhatWeDo() {
  return (
    <section className="mx-auto max-w-screen-xl px-6 py-24 sm:px-10 md:py-32 lg:px-12">
      <div className="mb-16 space-y-4 md:mb-20">
        <p className="text-sm font-bold uppercase tracking-widest text-secondary">
          Service Pillars
        </p>
        <h2 className="font-serif text-5xl font-bold text-on-surface">
          What We Do
        </h2>
      </div>

      <div className="grid h-auto grid-cols-1 gap-8 md:grid-cols-12 md:h-[700px]">
        <div className="group relative min-h-[320px] overflow-hidden rounded-[2.5rem] bg-surface-container-high transition-all duration-500 hover:shadow-xl md:col-span-8 md:h-full">
          <Image
            src={IMG.pillarHealthcare}
            alt="Sam, a Golden Retriever therapy dog, beside a child in a comforting visit"
            fill
            sizes="(max-width: 768px) 100vw, 66vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/92 via-primary/35 to-primary/10" />
          <div className="absolute right-8 top-8 flex size-12 items-center justify-center rounded-2xl bg-white/15 text-on-primary backdrop-blur-sm md:right-10 md:top-10">
            <Building2 className="size-6" strokeWidth={1.75} aria-hidden />
          </div>
          <div className="absolute bottom-12 left-8 max-w-md text-on-primary sm:left-12">
            <h3 className="mb-4 font-serif text-4xl font-bold">
              Hospitals &amp; Healthcare
            </h3>
            <p className="text-lg opacity-90">
              Providing emotional solace and lowering stress levels for
              patients and dedicated healthcare workers alike.
            </p>
          </div>
        </div>

        <div className="grid grid-rows-2 gap-8 md:col-span-4 md:min-h-0">
          <div className="group relative min-h-[240px] overflow-hidden rounded-[2.5rem] bg-secondary-container md:min-h-0">
            <div className="relative z-10 flex h-full min-h-[240px] flex-col justify-between p-10 md:min-h-0">
              <School
                className="size-10 text-on-secondary-container"
                strokeWidth={1.75}
                aria-hidden
              />
              <div>
                <h3 className="mb-2 font-serif text-2xl font-bold text-on-secondary-container">
                  Schools &amp; Literacy
                </h3>
                <p className="text-on-secondary-container opacity-80">
                  Supporting student well-being and helping children gain
                  confidence in reading.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute bottom-0 right-0 opacity-10">
              <BookOpen
                className="translate-x-10 translate-y-10 text-on-secondary-container"
                size={160}
                strokeWidth={1}
                aria-hidden
              />
            </div>
          </div>

          <div className="group relative min-h-[280px] overflow-hidden rounded-[2.5rem] bg-surface-container-highest md:min-h-0">
            <Image
              src={IMG.pillarCareFacilities}
              alt="Sam comforting a child during an Angel Paws visit"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-highest via-surface-container-highest/85 to-transparent" />
            <div className="relative z-10 flex min-h-[280px] flex-col justify-between p-10 md:min-h-full">
              <UsersRound
                className="size-10 text-primary"
                strokeWidth={1.75}
                aria-hidden
              />
              <div>
                <h3 className="mb-2 font-serif text-2xl font-bold text-on-surface">
                  Care Facilities
                </h3>
                <p className="text-on-surface-variant">
                  Bringing joy and companionship to seniors in assisted living
                  and memory care centers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
