"use client";

import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import {
  VISITATION_REQUEST_EMAIL,
  VISITATION_REQUEST_FORM_EMBED_URL,
  VISITATION_REQUEST_FORM_URL,
} from "@/lib/siteLinks";

export function VisitationRequestForm() {
  const [embedReady, setEmbedReady] = useState(false);
  const [formLoaded, setFormLoaded] = useState(false);

  // Defer iframe src until after mount so it is not created inside a hidden
  // ancestor (Reveal / gsap-reveal use visibility:hidden, which breaks embeds).
  useEffect(() => {
    setEmbedReady(true);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
          Facility visit requests
        </p>
        <p className="mt-3 max-w-2xl leading-relaxed text-on-surface-variant">
          Complete the form below to request a therapy dog visit. For questions,
          email{" "}
          <a
            href={`mailto:${VISITATION_REQUEST_EMAIL}`}
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            {VISITATION_REQUEST_EMAIL}
          </a>
          .
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <a
            href={VISITATION_REQUEST_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-on-primary transition hover:opacity-90"
          >
            Open form in a new tab
            <ExternalLink className="size-4" aria-hidden />
          </a>
          <a
            href={VISITATION_REQUEST_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            Prefer a full-screen form?
          </a>
        </div>
      </div>

      <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] bg-white shadow-soft ring-1 ring-primary/10">
        {!formLoaded ? (
          <div className="absolute inset-0 z-10 flex items-center justify-center px-6 py-16 text-center">
            <div>
              <p className="font-serif text-2xl text-on-surface">
                Loading visitation form
              </p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-on-surface-variant">
                If the form does not appear, use{" "}
                <a
                  href={VISITATION_REQUEST_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary underline underline-offset-4"
                >
                  open form in a new tab
                </a>
                .
              </p>
            </div>
          </div>
        ) : null}
        {embedReady ? (
          <iframe
            title="Angel Paws Pet Therapy visitation request form"
            src={VISITATION_REQUEST_FORM_EMBED_URL}
            width="100%"
            height={2400}
            className="relative z-0 block w-full border-0"
            onLoad={() => setFormLoaded(true)}
          />
        ) : null}
      </div>
    </div>
  );
}
