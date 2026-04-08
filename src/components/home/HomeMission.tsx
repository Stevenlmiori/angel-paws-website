export function HomeMission() {
  return (
    <section className="bg-surface-container-low py-24 md:py-32">
      <div className="mx-auto max-w-4xl space-y-12 px-6 text-center sm:px-10 lg:px-12">
        <h2 className="font-serif text-4xl font-bold leading-tight text-on-surface lg:text-5xl">
          &ldquo;Our mission is to share{" "}
          <span className="font-serif italic text-primary underline decoration-primary-container decoration-4 underline-offset-8">
            Jesus
          </span>{" "}
          through the unconditional love our pets give to those whom God places
          in our path.&rdquo;
        </h2>
        <div className="flex justify-center gap-2 pt-4" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-primary/35" />
          <span className="h-2 w-2 rounded-full bg-primary/25" />
          <span className="h-2 w-2 rounded-full bg-primary/15" />
        </div>
      </div>
    </section>
  );
}
