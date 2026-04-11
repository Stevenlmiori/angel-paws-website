import type { LucideIcon } from "lucide-react";
import { Baby, Brain, HeartHandshake, Hospital } from "lucide-react";

const places: { Icon: LucideIcon; title: string }[] = [
  { Icon: Hospital, title: "Medical Center" },
  { Icon: HeartHandshake, title: "Hospice Care" },
  { Icon: Baby, title: "Elementary Schools" },
  { Icon: Brain, title: "Mental Health" },
];

export function HomeWhereWeServe() {
  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-screen-xl px-6 sm:px-10 lg:px-12">
        <div className="mb-16 space-y-6 text-center md:mb-20">
          <h2 className="font-serif text-5xl font-bold text-on-surface">
            Where We Serve
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-on-surface-variant">
            Our ministry extends across the Greater Houston area, from major
            medical centers to local elementary schools.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {places.map(({ Icon, title }) => (
            <div
              key={title}
              className="group space-y-4 rounded-3xl bg-surface-container-low p-8 text-center transition-all hover:bg-white hover:shadow-lg"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                <Icon className="size-8" strokeWidth={1.75} aria-hidden />
              </div>
              <h3 className="font-serif text-xl font-bold text-on-surface">
                {title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
