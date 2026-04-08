import { PawPrint } from "lucide-react";

export function MembershipHero() {
  return (
    <section className="mx-auto mb-16 max-w-screen-2xl px-6 sm:px-10 md:mb-20 lg:px-12">
      <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-tertiary-container px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-on-tertiary-container">
        <PawPrint className="size-4" strokeWidth={2} aria-hidden />
        Membership
      </span>
      <h1 className="mb-8 max-w-3xl font-serif text-5xl leading-[1.08] tracking-tight text-on-surface md:text-6xl">
        How you <span className="italic text-primary">become a member</span>
      </h1>
      <p className="max-w-2xl text-xl leading-relaxed text-on-surface-variant">
        Angel Paws grows through families who love Jesus and love dogs. If that
        sounds like you, here is the gentle path we follow—no rush, no pressure,
        just clarity.
      </p>
    </section>
  );
}
