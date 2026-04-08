import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { TallyContactSection } from "@/components/embeds/TallyContactSection";

export function ContactMainSection() {
  return (
    <section className="mx-auto mb-24 max-w-screen-2xl px-6 sm:px-10 md:mb-32 lg:px-12">
      <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2 lg:gap-24">
        <div className="space-y-16">
          <div>
            <h2 className="mb-8 font-serif text-4xl text-on-surface">
              General Inquiries
            </h2>
            <div className="space-y-6">
              <div className="group flex items-start gap-6">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-surface-container-high text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-on-primary">
                  <Mail className="size-5" strokeWidth={2} aria-hidden />
                </div>
                <div>
                  <p className="mb-1 font-sans text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                    Email Us
                  </p>
                  <a
                    href="mailto:hello@angelpaws.org"
                    className="font-serif text-2xl text-on-surface transition-colors hover:text-primary"
                  >
                    hello@angelpaws.org
                  </a>
                </div>
              </div>
              <div className="group flex items-start gap-6">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-surface-container-high text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-on-primary">
                  <MapPin className="size-5" strokeWidth={2} aria-hidden />
                </div>
                <div>
                  <p className="mb-1 font-sans text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                    Visit Us
                  </p>
                  <p className="font-serif text-2xl text-on-surface">
                    412 Compassion Drive,
                    <br />
                    Serenity Valley, OH 43015
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] bg-primary p-10 text-on-primary md:p-12">
            <div className="relative z-10">
              <h3 className="mb-4 font-serif text-3xl">Membership Resources</h3>
              <p className="mb-8 font-sans leading-relaxed text-white/90">
                Existing members can access their portal for training logs,
                scheduling, and community forums.
              </p>
              <Link
                href="/members/portal"
                className="inline-flex rounded-full bg-white px-8 py-3 text-sm font-bold text-primary transition-transform hover:scale-[1.02]"
              >
                Member Portal
              </Link>
            </div>
            <div
              className="pointer-events-none absolute -bottom-20 -right-20 size-64 rounded-full bg-white/10 blur-3xl"
              aria-hidden
            />
          </div>
        </div>
        <div className="rounded-[3rem] bg-surface-container-low p-10 shadow-soft sm:p-12 lg:p-16">
          <h2 className="mb-6 font-serif text-4xl text-on-surface">
            Forms
          </h2>
          <p className="mb-10 font-sans text-on-surface-variant">
            Use the forms below—or email us directly if you prefer a
            conversation first.
          </p>
          <TallyContactSection />
        </div>
      </div>
    </section>
  );
}
