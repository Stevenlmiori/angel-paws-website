export function AboutTherapyDifference() {
  return (
    <section className="section-tone-inverse pt-8 pb-24 md:pt-10 md:pb-32">
      <div className="mx-auto max-w-screen-xl px-6 sm:px-10 lg:px-12">
        <div className="grid gap-10 pt-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16 md:pt-16">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-primary-container">
              Therapy dog distinction
            </p>
            <h2 className="font-serif text-3xl text-on-surface-inverse md:text-4xl">
              What Makes Therapy Dogs Different
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-on-surface-inverse-muted">
            <p>
              Therapy dogs are not service animals trained for one individual.
              They are trained to interact with many people, offering comfort,
              companionship, and emotional support in a variety of environments.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {["They do not judge.", "They do not rush.", "They do not interrupt."].map(
                (line) => (
                  <p
                    key={line}
                    className="rounded-2xl bg-white/7 px-4 py-4 text-sm font-semibold text-on-surface-inverse ring-1 ring-white/10"
                  >
                    {line}
                  </p>
                ),
              )}
            </div>
            <p className="font-medium text-on-surface-inverse">
              They simply show up with calm, steady presence, and that is often
              enough.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
