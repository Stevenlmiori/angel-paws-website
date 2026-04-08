const steps = [
  {
    n: "1",
    title: "Say hello",
    body: "Reach out through Contact. Tell us a little about you and your dog—we read every message.",
  },
  {
    n: "2",
    title: "Meet and learn",
    body: "We will walk you through expectations, training rhythms, and how visits fit real life.",
  },
  {
    n: "3",
    title: "Train and certify",
    body: "Your dog’s temperament and health matter. We help you understand what certification asks and where to get it.",
  },
  {
    n: "4",
    title: "Serve together",
    body: "When you are ready, you join a team that shows up with humility—treat bags in one pocket, prayers in the other.",
  },
] as const;

export function MembershipSteps() {
  return (
    <section className="mx-auto mb-20 max-w-screen-2xl px-6 sm:px-10 lg:px-12">
      <ol className="space-y-10">
        {steps.map(({ n, title, body }) => (
          <li
            key={n}
            className="flex gap-6 rounded-3xl bg-surface-container-low p-8 md:gap-10 md:p-10"
          >
            <span
              className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary font-serif text-xl font-bold text-on-primary md:size-14 md:text-2xl"
              aria-hidden
            >
              {n}
            </span>
            <div>
              <h2 className="mb-2 font-serif text-2xl text-on-surface md:text-3xl">
                {title}
              </h2>
              <p className="font-sans leading-relaxed text-on-surface-variant">
                {body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
