import Link from "next/link";
import { DoorOpen, Home, Heart } from "lucide-react";
import { TallyContactSection } from "@/components/embeds/TallyContactSection";

export function ContactMainSection() {
  return (
    <section className="mx-auto mb-24 max-w-screen-2xl px-6 sm:px-10 md:mb-32 lg:px-12">
      <div className="space-y-10">
        <div className="rounded-[3rem] bg-surface-container-low p-10 shadow-soft sm:p-12 lg:p-16">
          <h2 className="mb-6 font-serif text-4xl text-on-surface">
            Get in touch
          </h2>
          <p className="mb-10 font-sans text-on-surface-variant">
            Share a question, request a visit, or tell us a bit about your
            organization. We will follow up as soon as we can.
          </p>
          <TallyContactSection />
        </div>
        <aside className="rounded-3xl bg-surface-container-low p-8 sm:p-10">
          <p className="mb-5 font-sans text-xs font-bold uppercase tracking-widest text-on-surface-variant">
            Quick links
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Link
              href="/"
              className="group flex items-center justify-center gap-2 rounded-2xl bg-surface-container-high px-5 py-4 text-sm font-bold text-on-surface transition-colors hover:bg-primary hover:text-on-primary"
            >
              <Home className="size-4" strokeWidth={2} aria-hidden />
              Home
            </Link>
            <Link
              href="/members/portal"
              className="group flex items-center justify-center gap-2 rounded-2xl bg-surface-container-high px-5 py-4 text-sm font-bold text-on-surface transition-colors hover:bg-primary hover:text-on-primary"
            >
              <DoorOpen className="size-4" strokeWidth={2} aria-hidden />
              Member Portal
            </Link>
            <Link
              href="/donate"
              className="group flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-4 text-sm font-bold text-on-primary shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
            >
              <Heart className="size-4" strokeWidth={2} aria-hidden />
              Donate
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
