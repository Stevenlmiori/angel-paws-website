import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Angel Paws Houston, including what information we collect and how we use it.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-24 sm:px-10 md:py-32 lg:px-12">
      <div className="space-y-8">
        <header className="space-y-4">
          <h1 className="font-serif text-5xl text-on-surface md:text-6xl">
            Privacy Policy
          </h1>
          <p className="text-sm uppercase tracking-[0.16em] text-on-surface-variant">
            Last updated: April 15, 2026
          </p>
          <p className="max-w-3xl text-lg leading-relaxed text-on-surface-variant">
            Angel Paws Houston ("we," "our," or "us") respects your privacy.
            This Privacy Policy explains how we collect, use, and protect
            information when you visit our website.
          </p>
        </header>

        <div className="space-y-10 text-base leading-relaxed text-on-surface-variant">
          <section className="space-y-3">
            <h2 className="font-serif text-3xl text-on-surface">
              Information We Collect
            </h2>
            <p>We may collect information you voluntarily provide, including:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Name, email address, phone number, and message details</li>
              <li>Volunteer, contact, or donation-related form submissions</li>
              <li>
                Communications you send to us through forms or email links
              </li>
            </ul>
            <p>
              We may also collect limited technical data such as browser type,
              device information, and basic site usage analytics.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-3xl text-on-surface">
              How We Use Information
            </h2>
            <p>We use collected information to:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Respond to inquiries and requests</li>
              <li>
                Coordinate ministry, volunteer, visit, or donation follow-up
              </li>
              <li>Improve website content and user experience</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-3xl text-on-surface">
              Sharing of Information
            </h2>
            <p>
              We do not sell personal information. We may share information with
              trusted service providers that support website operations (such as
              form and donation platforms) and only as needed to provide those
              services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-3xl text-on-surface">
              Cookies and Tracking
            </h2>
            <p>
              Our website may use cookies or similar technologies for basic
              functionality, performance, and analytics. You can manage cookie
              settings through your browser.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-3xl text-on-surface">
              Data Security
            </h2>
            <p>
              We use reasonable administrative and technical safeguards to
              protect information. However, no internet transmission or storage
              system is guaranteed to be fully secure.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-3xl text-on-surface">
              Third-Party Services and Links
            </h2>
            <p>
              This website may use or link to third-party services, including
              embedded forms and donation providers. Those third parties have
              their own privacy practices, and we encourage you to review their
              policies directly.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-3xl text-on-surface">
              Children's Privacy
            </h2>
            <p>
              Our website is not directed to children under 13. We do not
              knowingly collect personal information from children under 13.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-3xl text-on-surface">
              Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Updated
              versions will be posted on this page with a revised effective
              date.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-3xl text-on-surface">Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact
              Angel Paws Houston through our contact page.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
