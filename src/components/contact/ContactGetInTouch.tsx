import { Mail } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/siteLinks";
import { ContactEmailCopy } from "./ContactEmailCopy";

const goodFor = [
  "A general question about Angel Paws",
  "Media, partnership, or church inquiries",
  "Follow-up after you have submitted a visit request",
] as const;

export function ContactGetInTouch() {
  return (
    <article
      id="get-in-touch"
      className="scroll-mt-28 flex h-full flex-col rounded-[2.5rem] bg-surface-container-low p-8 sm:p-10 md:p-12"
    >
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
        Get in touch
      </p>
      <h2 className="mt-4 font-serif text-3xl text-on-surface md:text-4xl">
        Send us a message
      </h2>
      <p className="mt-4 text-lg leading-relaxed text-on-surface-variant">
        Email is the best way to start a conversation. A real person on our team
        will read your note and respond as soon as we can.
      </p>

      <ul className="mt-8 space-y-2.5 text-on-surface-variant">
        {goodFor.map((item) => (
          <li key={item} className="flex gap-2 leading-relaxed">
            <span className="text-primary" aria-hidden>
              ·
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-10">
        <p className="mb-4 font-sans text-sm font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
          Email us
        </p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="font-serif text-xl text-primary underline-offset-4 transition-colors hover:underline md:text-2xl"
        >
          {CONTACT_EMAIL}
        </a>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-on-primary shadow-lg shadow-primary/20 transition hover:opacity-90"
          >
            <Mail className="size-4" strokeWidth={2.25} aria-hidden />
            Send email
          </a>
          <ContactEmailCopy email={CONTACT_EMAIL} />
        </div>
      </div>
    </article>
  );
}
