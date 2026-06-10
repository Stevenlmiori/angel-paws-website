import { ArrowRight, Calendar, ExternalLink, MapPin } from "lucide-react";
import { VISITATION_REQUEST_FORM_URL } from "@/lib/siteLinks";

const formCollects = [
  { Icon: MapPin, text: "Facility name, address, and type of visit" },
  { Icon: Calendar, text: "Requested date, time, and indoor or outdoor setup" },
] as const;

/**
 * Structured visit scheduling — separate from general “get in touch” email.
 * Google Form opens in a new tab (cannot be styled in-page).
 */
export function VisitationRequestCTA() {
  return (
    <article
      id="visitation-request"
      className="scroll-mt-28 flex h-full flex-col rounded-[2.5rem] section-tone-inverse p-8 sm:p-10 md:p-12"
    >
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary-container">
        Visitation request
      </p>
      <h2 className="mt-4 font-serif text-3xl md:text-4xl">
        Schedule a therapy dog visit
      </h2>
      <p className="mt-4 text-lg leading-relaxed text-on-surface-inverse-muted">
        For hospitals, schools, assisted living communities, churches, and
        workplaces ready to request a visit — use our official request form so we
        have the details needed to schedule your team.
      </p>

      <ul className="mt-8 space-y-3">
        {formCollects.map(({ Icon, text }) => (
          <li
            key={text}
            className="flex items-start gap-3 text-on-surface-inverse-muted"
          >
            <Icon
              className="mt-0.5 size-5 shrink-0 text-primary-container"
              strokeWidth={1.75}
              aria-hidden
            />
            <span>{text}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-10">
        <a
          href={VISITATION_REQUEST_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-bold uppercase tracking-widest text-on-primary shadow-lg shadow-primary/25 transition hover:opacity-90"
        >
          Open visitation request form
          <ArrowRight className="size-5" strokeWidth={2.25} aria-hidden />
        </a>
        <p className="mt-4 flex items-center gap-1.5 text-sm text-on-surface-inverse-muted">
          <ExternalLink className="size-3.5" aria-hidden />
          Secure Google Form · opens in a new tab
        </p>
      </div>
    </article>
  );
}
