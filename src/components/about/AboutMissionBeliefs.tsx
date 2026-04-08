import type { LucideIcon } from "lucide-react";
import { HeartHandshake, Shield, Sparkles, Users } from "lucide-react";

const beliefs: {
  Icon: LucideIcon;
  title: string;
  body: string;
}[] = [
  {
    Icon: Sparkles,
    title: "Divine Connection",
    body: "We believe that God uses all of His creation to bring healing. The bond between humans and animals is a sacred gift that reflects unconditional love.",
  },
  {
    Icon: HeartHandshake,
    title: "Compassionate Service",
    body: "Our call is to serve the marginalized, the hurting, and the lonely with humility, mirroring the servant heart of Christ in every visit.",
  },
  {
    Icon: Shield,
    title: "Integrity & Honor",
    body: "We honor the trust placed in us by hospitals, schools, and families by maintaining the highest standards of safety and professionalism.",
  },
  {
    Icon: Users,
    title: "Unity in Diversity",
    body: "We celebrate the diversity of our community, offering comfort to all people regardless of background, as we are all unified by our shared humanity.",
  },
];

export function AboutMissionBeliefs() {
  return (
    <section className="rounded-[2.5rem] bg-surface-container-low py-24 md:rounded-[3rem] md:py-32">
      <div className="mx-auto max-w-screen-2xl px-6 sm:px-10 lg:px-12">
        <div className="flex flex-col gap-16 md:flex-row md:gap-20">
          <div className="md:w-1/3">
            <h2 className="mb-8 font-serif text-4xl text-on-surface md:text-5xl">
              Our Mission &amp; Beliefs
            </h2>
            <div className="mb-8 flex gap-2" aria-hidden>
              <span className="h-2 w-2 rounded-full bg-primary/40" />
              <span className="h-2 w-2 rounded-full bg-primary/25" />
              <span className="h-2 w-2 rounded-full bg-primary/15" />
            </div>
            <p className="text-lg italic leading-relaxed text-on-surface-variant">
              Guided by faith, led by compassion, and sustained by the simple wag
              of a tail.
            </p>
          </div>
          <div className="grid flex-1 grid-cols-1 gap-8 sm:grid-cols-2 md:min-w-0">
            {beliefs.map(({ Icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl bg-surface-container-lowest p-8 shadow-soft transition-colors duration-300 hover:bg-white md:p-10"
              >
                <div className="mb-6 text-primary">
                  <Icon className="size-10" strokeWidth={1.5} aria-hidden />
                </div>
                <h3 className="mb-4 font-serif text-2xl text-on-surface">
                  {title}
                </h3>
                <p className="leading-relaxed text-on-surface-variant">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
