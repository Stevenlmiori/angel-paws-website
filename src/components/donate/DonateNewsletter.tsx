import { ExternalLink } from "lucide-react";
import { ANGEL_PAWS_FACEBOOK_URL } from "@/lib/siteLinks";

export function DonateNewsletter() {
  return (
    <section className="mx-auto max-w-screen-xl px-6 pb-16 pt-16 sm:px-10 md:pt-24 lg:px-12">
      <div className="rounded-[3rem] bg-primary px-8 py-16 text-center text-on-primary sm:px-12 md:py-24">
        <h2 className="mb-6 font-serif text-4xl md:text-5xl">
          Stay Connected with Hope
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-white/90">
          Follow Angel Paws on Facebook for visit highlights, ministry updates,
          and stories from the field.
        </p>
        <a
          href={ANGEL_PAWS_FACEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-primary transition-transform hover:scale-[1.02]"
        >
          Visit our Facebook page
          <ExternalLink className="size-4" aria-hidden />
        </a>
      </div>
    </section>
  );
}
