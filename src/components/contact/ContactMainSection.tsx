import { ContactGetInTouch } from "@/components/contact/ContactGetInTouch";
import { VisitationRequestCTA } from "@/components/contact/VisitationRequestCTA";

export function ContactMainSection() {
  return (
    <section className="mx-auto mb-24 max-w-screen-xl px-6 sm:px-10 md:mb-32 lg:px-12">
      <div className="mb-14 max-w-2xl">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-primary">
          Contact
        </p>
        <h1 className="font-serif text-5xl leading-tight text-on-surface md:text-6xl">
          Get in touch
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-on-surface-variant">
          Angel Paws welcomes two kinds of outreach. Choose the path that matches
          what you need today — a conversation by email, or a structured request
          to schedule a therapy dog visit.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        <ContactGetInTouch />
        <VisitationRequestCTA />
      </div>
    </section>
  );
}
