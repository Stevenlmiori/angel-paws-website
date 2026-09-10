import { PawPrint } from "lucide-react";

export function MeetTheBoardHero() {
  return (
    <header className="mx-auto mb-20 max-w-screen-xl px-6 sm:px-10 md:mb-24 lg:px-12">
      <div className="section-tone-inverse relative overflow-hidden rounded-[3rem] px-8 py-16 sm:px-12 md:py-20 lg:px-20">
        <div className="relative z-10 max-w-4xl">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
            The Heart of Our Mission
          </span>
          <h1 className="mb-8 font-serif text-5xl leading-tight md:text-6xl lg:text-7xl">
            Guided by compassion, led by{" "}
            <span className="italic text-primary-container">connection.</span>
          </h1>
          <p className="max-w-2xl text-lg font-light leading-relaxed text-on-surface-inverse-muted">
            Meet the dedicated individuals who guide Angel Paws with care,
            wisdom, and a shared commitment to every community we touch.
          </p>
        </div>
        <div className="pointer-events-none absolute -bottom-16 -right-12 text-primary-container/10" aria-hidden>
          <PawPrint className="size-72 rotate-[-12deg]" strokeWidth={1} />
        </div>
      </div>
    </header>
  );
}
