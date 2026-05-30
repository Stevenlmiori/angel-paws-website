import { HeartHandshake, Mail } from "lucide-react";

export function DonateByMail() {
  return (
    <section id="donate-by-mail" className="section-tone-inverse py-24 md:py-32">
      <div className="mx-auto grid max-w-screen-xl gap-10 px-6 sm:px-10 md:grid-cols-2 md:items-center md:gap-16 lg:px-12">
        <div>
          <span className="mb-6 inline-flex size-12 items-center justify-center rounded-2xl bg-white/10 text-on-surface-inverse">
            <HeartHandshake className="size-6" strokeWidth={1.75} aria-hidden />
          </span>
          <h2 className="mb-5 font-serif text-3xl md:text-4xl">
            Prefer to Give by Mail?
          </h2>
          <p className="mb-4 text-lg leading-relaxed text-on-surface-inverse-muted">
            We are a 501(c)(3) non-profit organization, and we welcome donations
            to our ministry. All donations are tax deductible and will be used to
            operate our organization and further our mission.
          </p>
          <p className="text-lg leading-relaxed text-on-surface-inverse-muted">
            Checks should be made out to{" "}
            <span className="font-semibold text-on-surface-inverse">
              Angel Paws Pet Therapy
            </span>{" "}
            and mailed to the address shown here.
          </p>
        </div>

        <div className="rounded-[2rem] bg-surface-container-lowest p-8 shadow-soft md:p-10">
          <div className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
            <Mail className="size-4 text-primary" strokeWidth={2} aria-hidden />
            <span>Mailing Address</span>
          </div>
          <address className="font-serif text-lg not-italic leading-relaxed text-on-surface">
            Debbie Benningfield / Susan Canon
            <br />
            ℅ Angel Paws Pet Therapy
            <br />
            14090 FM 2920, Suite G-186
            <br />
            Tomball, Texas 77375
          </address>
        </div>
      </div>
    </section>
  );
}
