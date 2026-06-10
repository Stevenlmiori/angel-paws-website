import Link from "next/link";
import { Heart } from "lucide-react";
import { TallyContactSection } from "@/components/embeds/TallyContactSection";
import { VisitationRequestForm } from "@/components/embeds/VisitationRequestForm";
import { DirectEmailReveal } from "@/components/contact/DirectEmailReveal";

export function ContactMainSection() {
  return (
    <section className="mx-auto mb-24 max-w-screen-xl px-6 sm:px-10 md:mb-32 lg:px-12">
      <div className="mb-16 max-w-3xl">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-primary">
          Contact
        </p>
        <h1 className="font-serif text-5xl leading-tight text-on-surface md:text-6xl">
          Get in touch
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-on-surface-variant">
          Share a question, request a visit, or tell us a bit about your
          organization. We will follow up as soon as we can.
        </p>
      </div>

      <div className="grid gap-16 lg:grid-cols-[minmax(0,0.92fr)_minmax(16rem,0.38fr)]">
        <div className="space-y-16">
          <VisitationRequestForm />

          <div className="border-t border-primary/10 pt-16">
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              General inquiries
            </p>
            <TallyContactSection />
            <div className="mt-10">
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
