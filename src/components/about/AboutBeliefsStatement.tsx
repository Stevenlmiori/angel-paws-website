import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { CHAMPION_FOREST_BELIEFS_URL } from "@/lib/siteLinks";

export function AboutBeliefsStatement() {
  return (
    <section
      id="beliefs"
      className="mx-auto max-w-screen-xl px-6 py-16 sm:px-10 md:py-24 lg:px-12"
    >
      <div className="rounded-[2.5rem] bg-surface-container-low px-8 py-12 md:rounded-[3rem] md:px-12 md:py-16">
        <h2 className="mb-6 font-serif text-3xl text-on-surface md:text-4xl">
          Our beliefs
        </h2>
        <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-on-surface-variant">
          <p>
            Angel Paws is a Christian organization—a faith-based 501(c)(3)
            nonprofit ministry. We exist to share the love of Jesus through the
            steady comfort our therapy dogs bring to the people God places in our
            path.
          </p>
          <p>
            Our ministry was born from and continues to be shaped by the
            biblical convictions of our home church,{" "}
            <span className="font-medium text-on-surface">
              Champion Forest Baptist Church
            </span>{" "}
            in Houston. Angel Paws aligns with that theological foundation in how
            we serve—with humility, compassion, and integrity.
          </p>
          <p>
            For the full statement of faith we hold in common with our church
            family, we invite you to read Champion Forest&apos;s beliefs page
            rather than restating those convictions separately here.
          </p>
        </div>
        <a
          href={CHAMPION_FOREST_BELIEFS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-on-primary transition hover:opacity-90"
        >
          Read Champion Forest&apos;s beliefs
          <ExternalLink className="size-4" aria-hidden />
        </a>
        <p className="mt-8 text-sm text-on-surface-variant">
          Interested in serving as a handler? See{" "}
          <Link
            href="/get-involved"
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            how to become involved
          </Link>
          . Current members can find policies and resources in the{" "}
          <Link
            href="/members/portal"
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            member portal
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
