import { Heart, Shield, Sparkles } from "lucide-react";

const blocks = [
  {
    Icon: Heart,
    title: "The Definition",
    body: "Pet therapy, or Animal-Assisted Activities (AAA), involves a trained handler and their pet visiting people to provide comfort, distraction, and a sense of normalcy in environments like hospitals and schools.",
  },
  {
    Icon: Shield,
    title: "Our Policies",
    body: "Safety is our priority. Every team is vaccinated, temperament-tested, and certified. We adhere to the policies of each facility, ensuring a professional and hygienic environment for all visits.",
  },
  {
    Icon: Sparkles,
    title: "Faith-Centered Comfort",
    body: "As a ministry of Champion Forest, we believe a faithful dog carries the comfort Christ asks us to share. We love without agenda, offering prayer and presence wherever we are invited.",
  },
] as const;

export function PetTherapySections() {
  return (
    <section className="rounded-[2.5rem] bg-surface-container-low py-20 md:rounded-[3rem] md:py-28">
      <div className="mx-auto max-w-screen-2xl px-6 sm:px-10 lg:px-12">
        <div className="grid gap-12 md:grid-cols-3 md:gap-10">
          {blocks.map(({ Icon, title, body }) => (
            <div
              key={title}
              className="rounded-3xl bg-surface-container-lowest p-8 shadow-soft ring-1 ring-on-surface/5"
            >
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-primary-container text-on-primary-container">
                <Icon className="size-6" strokeWidth={2} aria-hidden />
              </div>
              <h2 className="mb-3 font-serif text-2xl text-on-surface">{title}</h2>
              <p className="font-sans leading-relaxed text-on-surface-variant">
                {body}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-20 border-t border-stone-200/60 pt-16">
          <div className="mx-auto max-w-3xl">
            <h3 className="mb-6 font-serif text-3xl text-on-surface">Policies & Procedures</h3>
            <p className="mb-6 leading-relaxed text-on-surface-variant">
              To ensure the highest quality of service, Angel Paws teams follow a strict set of protocols:
            </p>
            <ul className="list-disc space-y-4 pl-6 text-on-surface-variant">
              <li><strong>Certification:</strong> All dogs must pass a temperament evaluation and basic obedience test.</li>
              <li><strong>Health:</strong> Up-to-date vaccinations and wellness exams are required annually.</li>
              <li><strong>Conduct:</strong> Handlers are trained in active listening and proper hospital etiquette.</li>
              <li><strong>Frequency:</strong> Teams typically visit for 1-2 hours at a time to ensure the comfort and health of the animal.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
