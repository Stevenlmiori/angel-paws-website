import Link from "next/link";

export function WhereWeServeCTA() {
  return (
    <section className="relative section-tone-charcoal mt-24 px-6 py-24 text-center sm:px-10 md:mt-32 md:py-32 lg:px-12">
      <div
        className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 size-96 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-4xl">
        <p className="mx-auto mb-8 max-w-2xl text-balance font-serif text-2xl italic leading-snug text-primary md:text-3xl">
          A calm presence can change the tone of an entire room.
        </p>
        <h2 className="mx-auto mb-8 max-w-3xl text-balance font-serif text-3xl leading-tight md:text-4xl">
          Does your facility need a{" "}
          <span className="italic">visit from Angel Paws?</span>
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          <Link
            href="/contact#visitation-request"
            className="rounded-full bg-primary px-10 py-4 text-sm font-bold uppercase tracking-widest text-on-primary transition-opacity hover:opacity-90"
          >
            Request a Visit
          </Link>
          <Link
            href="/donate"
            className="rounded-full bg-primary/12 px-10 py-4 text-sm font-bold uppercase tracking-widest text-primary transition-colors hover:bg-primary/18"
          >
            Give
          </Link>
        </div>
      </div>
    </section>
  );
}
