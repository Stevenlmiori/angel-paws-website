import { ExternalLink } from "lucide-react";
import {
  VISITATION_REQUEST_EMAIL,
  VISITATION_REQUEST_FORM_EMBED_URL,
  VISITATION_REQUEST_FORM_URL,
} from "@/lib/siteLinks";

export function VisitationRequestForm() {
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
        <a
          href={VISITATION_REQUEST_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          Open form in a new tab
          <ExternalLink className="size-3.5" aria-hidden />
        </a>
      </div>

      <div className="overflow-hidden rounded-[2rem] bg-white shadow-soft ring-1 ring-primary/10">
        <iframe
          title="Angel Paws Pet Therapy visitation request form"
          src={VISITATION_REQUEST_FORM_EMBED_URL}
          width="100%"
          height={2200}
          className="block w-full border-0"
          loading="lazy"
        >
          Loading form…{" "}
          <a href={VISITATION_REQUEST_FORM_URL}>Open the visitation request form</a>
        </iframe>
      </div>
    </div>
  );
}
