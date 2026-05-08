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
          Online forms are being finalized
        </p>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-on-surface-variant">
          For now, please use the email option below and include a few details
          about your question, facility, or visit request. Angel Paws will
          follow up as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {contactId ? (
        <div>
          <iframe
            src={tallyDataSrc(contactId)}
            data-tally-src={tallyDataSrc(contactId)}
            data-tally-dynamic-height="true"
            width="100%"
            height="700"
            title="Contact Angel Paws"
            scrolling="no"
            className="w-full overflow-hidden rounded-xl border border-stone-200/60 bg-white"
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
            src={tallyDataSrc(visitId)}
            data-tally-src={tallyDataSrc(visitId)}
            data-tally-dynamic-height="true"
            width="100%"
            height="900"
            title="Request a therapy visit"
            scrolling="no"
            className="w-full overflow-hidden rounded-xl border border-stone-200/60 bg-white"
          />
        </div>
      ) : null}
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="afterInteractive"
        onLoad={loadTallyEmbeds}
      />
    </div>
  );
}
