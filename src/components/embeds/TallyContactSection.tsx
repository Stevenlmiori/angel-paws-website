"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import {
  getTallyContactFormId,
  getTallyVisitFormId,
  tallyDataSrc,
  tallyShareUrl,
} from "@/lib/embeds";

function loadTallyEmbeds() {
  const w = window as Window & { Tally?: { loadEmbeds?: () => void } };
  w.Tally?.loadEmbeds?.();
}

export function TallyContactSection() {
  const contactId = getTallyContactFormId();
  const visitId = getTallyVisitFormId();
  const [contactLoaded, setContactLoaded] = useState(false);
  const [visitLoaded, setVisitLoaded] = useState(false);

  useEffect(() => {
    const timers = [
      window.setTimeout(loadTallyEmbeds, 250),
      window.setTimeout(loadTallyEmbeds, 1200),
      window.setTimeout(loadTallyEmbeds, 2600),
    ];
    return () => timers.forEach(window.clearTimeout);
  }, []);

  if (!contactId && !visitId) {
    return (
      <div className="py-4">
        <p className="font-serif text-2xl text-on-surface">
          Online forms are being finalized
        </p>
        <p className="mt-3 max-w-2xl leading-relaxed text-on-surface-variant">
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
          <div className="relative min-h-[460px]">
            {!contactLoaded ? (
              <div className="absolute inset-x-0 top-0 z-20 flex min-h-[360px] items-center justify-center rounded-lg border border-primary/10 bg-white px-6 text-center">
                <div>
                  <p className="font-serif text-2xl text-on-surface">
                    Loading contact form
                  </p>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-on-surface-variant">
                    The secure form is loading from Tally. If it takes a moment,
                    the direct link below will still work.
                  </p>
                </div>
              </div>
            ) : null}
            <iframe
              src={tallyDataSrc(contactId)}
              data-tally-src={tallyDataSrc(contactId)}
              data-tally-dynamic-height="true"
              width="100%"
              height="460"
              title="Contact Angel Paws"
              scrolling="no"
              onLoad={() =>
                window.setTimeout(() => setContactLoaded(true), 700)
              }
              className="relative z-10 w-full overflow-hidden bg-transparent"
              style={{ opacity: contactLoaded ? 1 : 0 }}
            />
          </div>
          <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
            Having trouble with the embedded form?{" "}
            <a
              href={tallyShareUrl(contactId)}
              className="font-semibold text-primary underline underline-offset-4"
            >
              Open it directly.
            </a>
          </p>
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
          <a
            href={tallyShareUrl(visitId)}
            className="mb-5 inline-flex text-sm font-semibold text-primary underline underline-offset-4"
          >
            Open visit request form directly
          </a>
          <div className="relative min-h-[760px]">
            {!visitLoaded ? (
              <div className="absolute inset-x-0 top-0 z-20 flex min-h-[360px] items-center justify-center rounded-lg border border-primary/10 bg-white px-6 text-center">
                <div>
                  <p className="font-serif text-2xl text-on-surface">
                    Loading visit request form
                  </p>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-on-surface-variant">
                    The secure form is loading from Tally.
                  </p>
                </div>
              </div>
            ) : null}
            <iframe
              src={tallyDataSrc(visitId)}
              data-tally-src={tallyDataSrc(visitId)}
              data-tally-dynamic-height="true"
              width="100%"
              height="760"
              title="Request a therapy visit"
              scrolling="no"
              onLoad={() => window.setTimeout(() => setVisitLoaded(true), 700)}
              className="relative z-10 w-full overflow-hidden bg-transparent"
              style={{ opacity: visitLoaded ? 1 : 0 }}
            />
          </div>
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
