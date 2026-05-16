import Link from "next/link";
import { ArrowRight, DoorOpen, Heart, Mail, MapPin } from "lucide-react";
import { TallyContactSection } from "@/components/embeds/TallyContactSection";
import { DirectEmailReveal } from "@/components/contact/DirectEmailReveal";

export function ContactMainSection() {
  return (
    <section className="mx-auto mb-24 grid max-w-screen-xl gap-16 px-6 sm:px-10 md:mb-32 lg:grid-cols-[minmax(0,0.92fr)_minmax(20rem,0.48fr)] lg:px-12">
      <div>
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-primary">
          Contact
        </p>
        <div className="max-w-3xl">
          <h1 className="font-serif text-5xl leading-tight text-on-surface md:text-6xl">
            Get in touch
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-on-surface-variant">
            Share a question, request a visit, or tell us a bit about your
            organization. We will follow up as soon as we can.
          </p>
        </div>

        <div className="mt-12 space-y-10">
          <TallyContactSection />

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              For facility visit requests
            </p>
            <p className="mt-3 max-w-2xl leading-relaxed text-on-surface-variant">
              To help us schedule quickly, please include your facility name,
              address, visit type, preferred date/time, indoor or outdoor setup,
              and the best contact person.
            </p>
          </div>

          <DirectEmailReveal />
        </div>
      </div>

      <aside className="self-start lg:pl-10">
        <div className="space-y-9">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
              Start here
            </p>
            <div className="mt-5 space-y-6">
              <Link
                href="/where-we-serve"
                className="group flex items-center justify-between gap-6 text-left"
              >
                <span>
                  <span className="flex items-center gap-2 font-serif text-xl text-on-surface">
                    <MapPin className="size-5 text-primary" aria-hidden />
                    Request a visit
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-on-surface-variant">
                    See where Angel Paws serves before reaching out.
                  </span>
                </span>
                <ArrowRight
                  className="size-4 shrink-0 text-primary transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
              <Link
                href="/members/portal"
                className="group flex items-center justify-between gap-6 text-left"
              >
                <span>
                  <span className="flex items-center gap-2 font-serif text-xl text-on-surface">
                    <DoorOpen className="size-5 text-primary" aria-hidden />
                    Member resources
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-on-surface-variant">
                    Open the protected portal for forms and links.
                  </span>
                </span>
                <ArrowRight
                  className="size-4 shrink-0 text-primary transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
              <Link
                href="/donate"
                className="group flex items-center justify-between gap-6 text-left"
              >
                <span>
                  <span className="flex items-center gap-2 font-serif text-xl text-on-surface">
                    <Heart className="size-5 text-primary" aria-hidden />
                    Give support
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-on-surface-variant">
                    Help fund training, care, and visits.
                  </span>
                </span>
                <ArrowRight
                  className="size-4 shrink-0 text-primary transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </div>
          </div>

          <div className="section-tone-inverse px-6 py-7">
            <Mail className="mb-5 size-5 text-primary" aria-hidden />
            <p className="font-serif text-2xl leading-snug text-on-surface-inverse">
              A real person will read your note.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-on-surface-inverse-muted">
              Short messages are fine. If details are missing, Angel Paws can
              follow up.
            </p>
          </div>
        </div>
      </aside>
    </section>
  );
}
