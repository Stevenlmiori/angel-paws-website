import Image from "next/image";
import { BOARD_IMG } from "./media";

export function MeetTheBoardHero() {
  return (
    <header className="mx-auto mb-20 max-w-screen-xl px-6 sm:px-10 md:mb-24 lg:px-12">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
            The Heart of Our Mission
          </span>
          <h1 className="mb-8 font-serif text-5xl leading-tight text-on-surface md:text-6xl lg:text-7xl">
            Guided by compassion, led by{" "}
            <span className="italic text-primary">connection.</span>
          </h1>
          <p className="max-w-lg text-lg font-light leading-relaxed text-on-surface-variant">
            Meet the dedicated individuals who volunteer their time and
            expertise to ensure every community we touch feels the healing power
            of a cold nose and a warm heart.
          </p>
        </div>
        <div className="relative">
          <div className="relative h-[min(420px,70vh)] overflow-hidden rounded-[3rem] shadow-soft lg:h-[500px]">
            <Image
              src={BOARD_IMG.hero}
              alt="Therapy-style dog outdoors in natural light (placeholder hero image)"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-4 max-w-xs rounded-2xl bg-surface-container-lowest p-8 shadow-soft lg:-bottom-8 lg:-left-8">
            <p className="font-serif text-lg italic text-primary">
              &ldquo;Our board members aren&apos;t just leaders; they&apos;re the
              first to volunteer for a shift.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
