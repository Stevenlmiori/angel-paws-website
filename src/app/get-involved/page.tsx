import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, FileText, HeartHandshake } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { HOW_TO_BECOME_INVOLVED_DOC_URL } from "@/lib/siteLinks";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Learn what is involved in serving with Angel Paws Pet Therapy—handler requirements, training, and how to become part of the team.",
};

export default function GetInvolvedPage() {
  return (
    <Section tone="mist" className="!pt-28 md:!pt-32">
      <div className="mx-auto max-w-screen-md px-6 sm:px-10 lg:px-12">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-primary">
          Serve with us
        </p>
        <h1 className="mb-6 font-serif text-5xl leading-tight text-on-surface md:text-6xl">
          How to become involved with Angel Paws
        </h1>
        <p className="mb-10 text-lg leading-relaxed text-on-surface-variant">
          Angel Paws is a faith-based 501(c)(3) nonprofit. Serving as a handler
          is a meaningful commitment—training, temperament standards, facility
          etiquette, and a heart for people. We want every interested volunteer
          to understand what is involved before taking the next step.
        </p>

        <div className="space-y-6">
          <a
            href={HOW_TO_BECOME_INVOLVED_DOC_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-5 rounded-3xl bg-surface-container-high p-8 shadow-soft ring-1 ring-primary/5 transition hover:ring-primary/15"
          >
            <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary-container text-on-primary-container">
              <FileText className="size-7" strokeWidth={1.75} aria-hidden />
            </span>
            <span>
              <span className="flex items-center gap-2 font-serif text-2xl text-on-surface group-hover:text-primary">
                How to Become Involved
                <ExternalLink className="size-5 shrink-0 opacity-60" aria-hidden />
              </span>
              <span className="mt-2 block leading-relaxed text-on-surface-variant">
                Requirements, expectations, and the path to joining a therapy dog
                team. Open the overview document to read at your own pace.
              </span>
            </span>
          </a>

          <div className="rounded-3xl bg-surface-container-low p-8">
            <div className="mb-4 flex items-center gap-3 text-primary">
              <HeartHandshake className="size-8" strokeWidth={1.75} aria-hidden />
              <h2 className="font-serif text-2xl text-on-surface">
                Already a member?
              </h2>
            </div>
            <p className="mb-6 leading-relaxed text-on-surface-variant">
              Handlers can sign in to the member portal for day-to-day resources,
              or review the same involvement overview linked above.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/members/portal"
                className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-on-primary transition hover:opacity-90"
              >
                Member login
              </Link>
              <a
                href={HOW_TO_BECOME_INVOLVED_DOC_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full bg-surface-container-high px-6 py-3 text-sm font-semibold text-on-surface transition hover:bg-surface-container-highest"
              >
                Member overview doc
              </a>
            </div>
          </div>
        </div>

        <p className="mt-12 text-sm text-on-surface-variant">
          Questions before you begin?{" "}
          <Link href="/contact" className="font-semibold text-primary underline-offset-4 hover:underline">
            Contact us
          </Link>
          .
        </p>
      </div>
    </Section>
  );
}
