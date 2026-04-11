import Link from "next/link";

export function PetTherapyCTA() {
  return (
    <section className="mx-auto max-w-screen-xl px-6 py-20 sm:px-10 md:py-28 lg:px-12">
      <div className="rounded-[2.5rem] bg-primary px-8 py-14 text-center text-on-primary md:px-16 md:py-16">
        <h2 className="mb-4 font-serif text-3xl md:text-4xl">
          Want to learn more?
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-lg text-white/90">
          Read how we serve on{" "}
          <Link href="/where-we-serve" className="underline underline-offset-4">
            Where We Serve
          </Link>
          , or reach out on{" "}
          <Link href="/contact" className="underline underline-offset-4">
            Contact
          </Link>{" "}
          with a question.
        </p>
        <Link
          href="/members"
          className="inline-flex rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-primary transition-transform hover:scale-[1.02]"
        >
          Thinking about membership
        </Link>
      </div>
    </section>
  );
}
