import Link from "next/link";

export function GetInvolvedCTA() {
  return (
    <section className="mx-auto mt-20 max-w-screen-xl px-6 sm:px-10 md:mt-28 lg:px-12">
      <div className="rounded-[2rem] bg-gradient-to-br from-primary/12 via-surface-container-low to-secondary-container/30 px-8 py-16 text-center md:rounded-[3rem] md:py-20">
        <h2 className="mb-4 font-serif text-3xl text-on-surface md:text-4xl">
          Ready for the next step?
        </h2>
        <p className="mx-auto mb-4 max-w-xl text-on-surface-variant">
          Share a little about yourself—we&apos;ll follow up with the right
          forms, training dates, and a warm welcome.
        </p>
        <p className="mx-auto mb-10 max-w-xl font-serif text-lg italic text-on-surface md:text-xl">
          You don&apos;t have to do everything. You just have to take the next
          step.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="#"
            className="rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-on-primary shadow-lg shadow-primary/15 transition-opacity hover:opacity-90"
          >
            Start an application
          </Link>
          <Link
            href="/where-we-serve"
            className="rounded-full bg-white/70 px-8 py-3.5 text-sm font-bold text-primary backdrop-blur-sm transition-colors hover:bg-white"
          >
            See where we serve
          </Link>
        </div>
      </div>
    </section>
  );
}
