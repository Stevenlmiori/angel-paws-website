import { PawPrint, School, Stethoscope } from "lucide-react";

const items = [
  {
    icon: Stethoscope,
    title: "Hospital Visits",
    body: "Funding specialized training for high-stress medical environments.",
  },
  {
    icon: School,
    title: "School Programs",
    body: "Supporting literacy programs and emotional support in classrooms.",
  },
  {
    icon: PawPrint,
    title: "Animal Welfare",
    body: "Ensuring our therapy partners receive top-tier veterinary care.",
  },
] as const;

export function DonateImpactSection() {
  return (
    <section className="mx-auto mb-24 max-w-screen-xl px-6 sm:px-10 md:mb-32 lg:px-12">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <h2 className="mb-12 font-serif text-4xl text-on-surface md:text-5xl">
            How Your Gift Helps
          </h2>
          <div className="space-y-12">
            {items.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex gap-8">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary-container text-on-primary-container">
                  <Icon className="size-7" strokeWidth={2} aria-hidden />
                </div>
                <div>
                  <h3 className="mb-3 font-serif text-2xl text-on-surface">
                    {title}
                  </h3>
                  <p className="font-sans leading-relaxed text-on-surface-variant">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center rounded-[3rem] bg-surface-container-low p-10 sm:p-16">
          <span className="mb-8 text-6xl text-primary">&ldquo;</span>
          <blockquote className="mb-10 font-serif text-3xl italic leading-snug text-on-surface md:text-4xl">
            Seeing my daughter smile for the first time in weeks because of a
            visit from Bella was a miracle we&apos;ll never forget.
          </blockquote>
          <div>
            <p className="font-sans text-sm font-bold uppercase tracking-widest text-on-surface">
              Sarah J.
            </p>
            <p className="text-sm text-on-surface-variant">
              Parent of a patient
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
