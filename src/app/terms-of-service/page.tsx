import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Angel Paws Houston website use, content, and external services.",
};

export default function TermsOfServicePage() {
  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-24 sm:px-10 md:py-32 lg:px-12">
      <div className="space-y-8">
        <header className="space-y-4">
          <h1 className="font-serif text-5xl text-on-surface md:text-6xl">
            Terms of Service
          </h1>
          <p className="text-sm uppercase tracking-[0.16em] text-on-surface-variant">
            Last updated: April 15, 2026
          </p>
          <p className="max-w-3xl text-lg leading-relaxed text-on-surface-variant">
            These Terms of Service ("Terms") govern your use of the Angel Paws
            Houston website. By using this website, you agree to these Terms.
          </p>
        </header>

        <div className="space-y-10 text-base leading-relaxed text-on-surface-variant">
          <section className="space-y-3">
            <h2 className="font-serif text-3xl text-on-surface">
              Website Use
            </h2>
            <p>
              You agree to use this website for lawful purposes only and in a
              way that does not infringe the rights of others or interfere with
              website operations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-3xl text-on-surface">
              Informational Content
            </h2>
            <p>
              Website content is provided for general informational and
              ministry-related purposes. We make reasonable efforts to keep
              content accurate but do not guarantee completeness, timeliness, or
              suitability for every purpose.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-3xl text-on-surface">
              Donations and Third-Party Services
            </h2>
            <p>
              Donations, forms, and other interactions may be handled by
              third-party services. Your use of those services is subject to
              their terms and policies, and we are not responsible for their
              independent operations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-3xl text-on-surface">
              Intellectual Property
            </h2>
            <p>
              Unless otherwise noted, website content, branding, and materials
              are owned by or licensed to Angel Paws Houston and are protected
              by applicable intellectual property laws.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-3xl text-on-surface">
              Disclaimer of Warranties
            </h2>
            <p>
              This website is provided on an "as is" and "as available" basis
              without warranties of any kind, express or implied.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-3xl text-on-surface">
              Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by law, Angel Paws Houston is not
              liable for indirect, incidental, or consequential damages arising
              from or related to use of this website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-3xl text-on-surface">
              Changes to Terms
            </h2>
            <p>
              We may update these Terms at any time. Updates are effective when
              posted on this page with a revised effective date.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-3xl text-on-surface">
              Governing Law
            </h2>
            <p>
              These Terms are governed by the laws of the State of Texas,
              without regard to conflict of law principles.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-3xl text-on-surface">Contact Us</h2>
            <p>
              For questions about these Terms, please contact Angel Paws Houston
              through our contact page.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
