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
    <section className="bg-surface pb-24 pt-2 md:pb-32 md:pt-4">
      <div className="mx-auto max-w-screen-xl px-6 sm:px-10 lg:px-12">
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
