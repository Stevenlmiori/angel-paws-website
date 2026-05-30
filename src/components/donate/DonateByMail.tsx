import { HeartHandshake, Mail } from "lucide-react";

export function DonateByMail() {
  return (
    <section
      id="donate-by-mail"
      className="mx-auto mb-24 max-w-screen-xl px-6 sm:px-10 md:mb-32 lg:px-12"
    >
      <div className="mx-auto grid max-w-5xl gap-8 rounded-[3rem] bg-surface-container-high p-8 shadow-soft sm:p-12 md:grid-cols-2 md:items-center md:gap-12 md:p-16">
        <div>
          <span className="mb-6 inline-flex size-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
            <HeartHandshake className="size-6" strokeWidth={1.75} aria-hidden />
          </span>
          <h2 className="mb-4 font-serif text-3xl text-on-surface md:text-4xl">
            Prefer to Give by Mail?
          </h2>
          <p className="mb-4 leading-relaxed text-on-surface-variant">
            We are a 501(c)(3) non-profit organization, and we welcome donations
            to our ministry. All donations are tax deductible and will be used to
            operate our organization and further our mission.
          </p>
          <p className="leading-relaxed text-on-surface-variant">
            Checks should be made out to{" "}
            <span className="font-semibold text-on-surface">
              Angel Paws Pet Therapy
            </span>{" "}
            and mailed to the address shown here.
          </p>
        </div>

        <div className="rounded-[2rem] border border-on-surface/10 bg-surface-container-lowest p-8">
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
