import Link from "next/link";
import { Heart } from "lucide-react";
import { VisitationRequestForm } from "@/components/embeds/VisitationRequestForm";
import { DirectEmailReveal } from "@/components/contact/DirectEmailReveal";

export function ContactMainSection() {
  return (
    <section className="mx-auto mb-24 max-w-screen-xl px-6 sm:px-10 md:mb-32 lg:px-12">
      <div className="mb-12 max-w-2xl">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-primary">
          Contact
        </p>
        <h1 className="font-serif text-5xl leading-tight text-on-surface md:text-6xl">
          Get in touch
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-on-surface-variant">
          Request a visit for your facility, or reach out with a general question.
          We respond as soon as we can.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(14rem,0.32fr)] lg:gap-16">
        <div className="space-y-12">
          <VisitationRequestForm />

          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              General questions
            </p>
            <p className="mt-3 leading-relaxed text-on-surface-variant">
              For anything that is not a facility visit request, email us directly.
            </p>
            <div className="mt-6">
              <DirectEmailReveal />
            </div>
          </div>
        </div>

        <aside className="self-start lg:sticky lg:top-28">
          <div className="rounded-3xl bg-surface-container-low p-8">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
              Support our mission
            </p>
            <Link
              href="/donate"
              className="group mt-5 flex items-center gap-3 text-left"
            >
              <Heart className="size-5 text-primary" aria-hidden />
              <span>
                <span className="block font-serif text-xl text-on-surface">
                  Give support
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-on-surface-variant">
                  Help fund training, care, and visits.
                </span>
              </span>
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
