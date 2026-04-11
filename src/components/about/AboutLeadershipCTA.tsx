import Link from "next/link";

export function AboutLeadershipCTA() {
  return (
    <section className="mx-auto mb-24 max-w-screen-xl px-6 sm:px-10 md:mb-32 lg:px-12">
      <div className="rounded-[2.5rem] bg-surface-container-highest px-8 py-16 text-center shadow-soft md:rounded-[3rem] md:p-20">
        <h2 className="mb-6 font-serif text-3xl text-on-surface md:text-4xl">
          Want to learn more about our leadership?
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-xl text-on-surface-variant">
          Meet the dedicated board members and specialists who guide our ministry
          with wisdom and heart.
        </p>
        <Link
          href="/meet-the-board"
          className="inline-flex rounded-full bg-primary px-10 py-4 text-lg font-bold text-on-primary shadow-lg shadow-primary/20 transition-all hover:opacity-90 active:scale-[0.98]"
        >
          Meet the Board
        </Link>
      </div>
    </section>
  );
}
