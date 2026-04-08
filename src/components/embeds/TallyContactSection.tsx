"use client";

import Script from "next/script";
import {
  getTallyContactFormId,
  getTallyVisitFormId,
  tallyDataSrc,
} from "@/lib/embeds";

function loadTallyEmbeds() {
  const w = window as Window & { Tally?: { loadEmbeds?: () => void } };
  w.Tally?.loadEmbeds?.();
}

export function TallyContactSection() {
  const contactId = getTallyContactFormId();
  const visitId = getTallyVisitFormId();

  if (!contactId && !visitId) {
    return (
      <div className="rounded-2xl bg-surface-container-low px-6 py-10 text-center">
        <p className="mb-2 font-serif text-lg text-on-surface">
          Contact forms coming soon
        </p>
        <p className="text-sm leading-relaxed text-on-surface-variant">
          Create your forms in{" "}
          <a
            href="https://tally.so"
            className="font-medium text-primary underline underline-offset-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tally
          </a>
          , then add the form ids to{" "}
          <code className="rounded bg-surface-container px-1.5 py-0.5 font-mono text-xs">
            NEXT_PUBLIC_TALLY_CONTACT_FORM_ID
          </code>
          {` and optionally `}
          <code className="rounded bg-surface-container px-1.5 py-0.5 font-mono text-xs">
            NEXT_PUBLIC_TALLY_VISIT_FORM_ID
          </code>{" "}
          in{" "}
          <code className="rounded bg-surface-container px-1.5 py-0.5 font-mono text-xs">
            .env.local
          </code>
          . The id is the part after{" "}
          <code className="rounded bg-surface-container px-1.5 py-0.5 font-mono text-xs">
            tally.so/r/
          </code>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {contactId ? (
        <div>
          <h3 className="mb-4 font-serif text-2xl text-on-surface">
            Send a message
          </h3>
          <p className="mb-6 font-sans text-on-surface-variant">
            Questions, introductions, or anything on your heart—we read every
            note.
          </p>
          <iframe
            data-tally-src={tallyDataSrc(contactId)}
            width="100%"
            height="0"
            title="Contact Angel Paws"
            className="min-h-[480px] w-full rounded-xl border-0 bg-transparent"
          />
        </div>
      ) : null}
      {visitId ? (
        <div>
          <h3 className="mb-4 font-serif text-2xl text-on-surface">
            Request a visit
          </h3>
          <p className="mb-6 font-sans text-on-surface-variant">
            Tell us about your facility or need. We will follow up by email or
            phone.
          </p>
          <iframe
            data-tally-src={tallyDataSrc(visitId)}
            width="100%"
            height="0"
            title="Request a therapy visit"
            className="min-h-[560px] w-full rounded-xl border-0 bg-transparent"
          />
        </div>
      ) : null}
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="lazyOnload"
        onLoad={loadTallyEmbeds}
      />
    </div>
  );
}
