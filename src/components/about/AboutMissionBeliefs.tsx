import type { LucideIcon } from "lucide-react";
import { BookOpen, Cross, HeartHandshake, Sparkles } from "lucide-react";

const beliefs: {
  Icon: LucideIcon;
  title: string;
  body: string;
}[] = [
  {
    Icon: Sparkles,
    title: "Christ-Centered Mission",
    body: "Angel Paws exists to share the love of Jesus with gentleness, humility, and compassion in every visit.",
  },
  {
    Icon: BookOpen,
    title: "Scripture",
    body: "We believe the Bible is God's inspired Word and the trustworthy authority for faith, character, and the way we serve others.",
  },
  {
    Icon: Cross,
    title: "Jesus Christ",
    body: "We believe in one God: Father, Son, and Holy Spirit. Jesus Christ is fully God and fully man, crucified for our sins, risen bodily, and coming again.",
  },
  {
    Icon: HeartHandshake,
    title: "Grace & Service",
    body: "We believe salvation is God's gift of grace through faith in Jesus Christ. Because He first loved us, we seek to serve people with compassion, integrity, prayer, and hope.",
  },
];

export function AboutMissionBeliefs() {
  return (
    <section
      id="beliefs"
      className="rounded-[2.5rem] bg-surface-container-low py-24 md:rounded-[3rem] md:py-32"
    >
      <div className="mx-auto max-w-screen-xl px-6 sm:px-10 lg:px-12">
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
              Guided by Scripture, centered on Jesus, and expressed through
              compassionate service.
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
