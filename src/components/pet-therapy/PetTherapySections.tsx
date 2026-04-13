import { Heart, Shield, Sparkles } from "lucide-react";

const remainderCards = [
  {
    Icon: Shield,
    title: "What are your safety policies?",
    body: "Safety is our priority. Every team is vaccinated, temperament-tested, and certified. We adhere to the policies of each facility, ensuring a professional and hygienic environment for all visits.",
  },
  {
    Icon: Sparkles,
    title: "How does faith shape your work?",
    body: "As a ministry of Champion Forest, we believe a faithful dog carries the comfort Christ asks us to share. We love without agenda, offering prayer and presence wherever we are invited.",
  },
] as const;

export function PetTherapySections() {
  return (
    <section className="rounded-[2.5rem] bg-surface-container-low py-20 md:rounded-[3rem] md:py-28">
      <div className="mx-auto max-w-screen-xl px-6 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary-container text-on-primary-container">
            <Heart className="size-6" strokeWidth={2} aria-hidden />
          </div>
          <h2 className="mb-6 font-serif text-3xl text-on-surface md:text-4xl">
            Why It Works
          </h2>
          <div className="space-y-6 leading-relaxed text-on-surface-variant">
            <p>There&apos;s something about a dog that puts people at ease.</p>
            <div className="space-y-2">
              <p>They don&apos;t expect anything.</p>
              <p>They don&apos;t need conversation.</p>
              <p>They don&apos;t bring pressure into the room.</p>
            </div>
            <p>
              That kind of presence can change how a person feels, even in a
              short visit.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-3xl md:mt-20">
          <h2 className="mb-6 font-serif text-3xl text-on-surface md:text-4xl">
            What We See Every Day
          </h2>
          <ul className="list-disc space-y-4 pl-6 leading-relaxed text-on-surface-variant">
            <li>Patients who relax during difficult treatments</li>
            <li>Students who gain confidence and focus</li>
            <li>People who simply feel less alone</li>
          </ul>
          <p className="mt-6 font-medium text-on-surface">
            You can see the difference almost immediately.
          </p>
        </div>

        <div className="mt-16 grid gap-10 md:mt-20 md:grid-cols-2 md:gap-10">
          {remainderCards.map(({ Icon, title, body }) => (
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
            <h3 className="mb-6 font-serif text-3xl text-on-surface">
              Policies & Procedures
            </h3>
            <p className="mb-6 leading-relaxed text-on-surface-variant">
              To ensure the highest quality of service, Angel Paws teams follow a
              strict set of protocols:
            </p>
            <ul className="list-disc space-y-4 pl-6 text-on-surface-variant">
              <li>
                <strong>Certification:</strong> All dogs must pass a temperament
                evaluation and basic obedience test.
              </li>
              <li>
                <strong>Health:</strong> Up-to-date vaccinations and wellness
                exams are required annually.
              </li>
              <li>
                <strong>Conduct:</strong> Handlers are trained in active listening
                and proper hospital etiquette.
              </li>
              <li>
                <strong>Frequency:</strong> Teams typically visit for 1-2 hours at
                a time to ensure the comfort and health of the animal.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
