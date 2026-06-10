import { ArrowRight, Calendar, ExternalLink, MapPin } from "lucide-react";
import {
  VISITATION_REQUEST_EMAIL,
  VISITATION_REQUEST_FORM_URL,
} from "@/lib/siteLinks";

const prepItems = [
  { Icon: MapPin, text: "Facility name and visit address" },
  { Icon: Calendar, text: "Preferred date, time, and indoor or outdoor setup" },
] as const;

/**
 * Google Forms cannot be styled inside an iframe (fixed purple chrome, Google
 * typography). A direct link keeps the page on-brand; the form opens full-screen.
 */
export function VisitationRequestForm() {
  return (
    <div className="rounded-[2.5rem] bg-surface-container-low p-8 sm:p-10 md:p-12">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
        Facility visit requests
      </p>
      <h2 className="mt-4 font-serif text-3xl text-on-surface md:text-4xl">
        Request a therapy dog visit
      </h2>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-on-surface-variant">
        Hospitals, schools, assisted living communities, churches, and workplaces
        — tell us about your setting and we will follow up to schedule a visit.
      </p>

      <ul className="mt-8 space-y-3">
        {prepItems.map(({ Icon, text }) => (
          <li key={text} className="flex items-start gap-3 text-on-surface-variant">
            <Icon className="mt-0.5 size-5 shrink-0 text-primary" strokeWidth={1.75} aria-hidden />
            <span>{text}</span>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <a
          href={VISITATION_REQUEST_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-bold uppercase tracking-widest text-on-primary shadow-lg shadow-primary/20 transition hover:opacity-90"
        >
          Complete visit request
          <ArrowRight className="size-5" strokeWidth={2.25} aria-hidden />
        </a>
        <span className="flex items-center gap-1.5 text-sm text-on-surface-variant">
          <ExternalLink className="size-3.5" aria-hidden />
          Opens secure Google Form
        </span>
      </div>

      <p className="mt-8 text-sm leading-relaxed text-on-surface-variant">
        Questions before you submit? Email{" "}
        <a
          href={`mailto:${VISITATION_REQUEST_EMAIL}`}
          className="font-semibold text-primary underline-offset-4 hover:underline"
        >
          {VISITATION_REQUEST_EMAIL}
        </a>
        .
      </p>
    </div>
  );
}
