import Link from "next/link";

export function WhereWeServeCTA() {
  return (
    <section className="relative mt-24 overflow-hidden bg-surface-container-low px-6 py-24 text-center sm:px-10 md:mt-32 md:py-32 lg:px-12">
      <div
        className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-primary/5 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 size-96 rounded-full bg-primary/5 blur-3xl"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-3xl">
        <p className="mb-8 font-serif text-2xl italic leading-snug text-primary md:text-3xl">
          A calm presence can change the tone of an entire room.
        </p>
        <h2 className="mb-8 font-serif text-3xl leading-tight text-on-surface md:text-4xl">
          Does your facility need a{" "}
          <span className="italic">visit from Angel Paws?</span>
        </h2>
        <p className="mb-12 text-xl text-on-surface-variant">
          We are always looking to expand our reach. If you represent a
          healthcare, educational, or community organization, we invite you
          to apply for our services.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <button
            type="button"
            className="rounded-full bg-primary px-10 py-4 text-sm font-bold uppercase tracking-widest text-on-primary transition-opacity hover:opacity-90"
          >
            Request a Visit
          </button>
          <Link
            href="/get-involved"
            className="rounded-full bg-primary/12 px-10 py-4 text-sm font-bold uppercase tracking-widest text-primary transition-colors hover:bg-primary/18"
          >
            Become a Volunteer
          </Link>
        </div>
      </div>
    </section>
  );
}
