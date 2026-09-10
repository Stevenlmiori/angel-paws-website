import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Statement of Beliefs | Angel Paws Pet Therapy",
  description:
    "Read the full Statement of Beliefs that guides Angel Paws Pet Therapy and its ministry participants.",
  path: "/statement-of-beliefs",
});

export default function StatementOfBeliefsPage() {
  return (
    <Section tone="warm" className="!pt-28 md:!pt-32">
      <article className="mx-auto max-w-screen-md px-6 sm:px-10 lg:px-12">
        <Link
          href="/about#beliefs"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          <ArrowLeft className="size-4" strokeWidth={2} aria-hidden />
          Back to Our Mission and Beliefs
        </Link>
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-primary">
          Adopted September 8, 2026
        </p>
        <h1 className="font-serif text-4xl leading-tight text-on-surface sm:text-5xl md:text-6xl">
          Angel Paws Pet Therapy Statement of Beliefs
        </h1>

        <div className="mt-10 space-y-6 text-lg leading-relaxed text-on-surface-variant">
          <p>
            The Nonprofit Corporation is guided by the Holy Bible, God&apos;s only
            divinely inspired, infallible and inerrant revelation of Himself.
            The Holy Bible speaks as the final authority concerning truth,
            morality, and the proper conduct of mankind and is the final source
            of all that we believe.
          </p>
          <p>
            In the Holy Bible, God reveals himself as the one true and sovereign
            God, existing eternally in three persons as Father, Son, and Holy
            Spirit, yet one in substance. Mankind was created by and in the image
            of God, but all of humanity has fallen willfully into sin and is in
            need of God&apos;s forgiveness and salvation.
          </p>
          <p>
            Salvation is available only through faith in Jesus Christ, God&apos;s
            unique and only Son. Both fully divine and fully human, Jesus was
            born of a virgin, lived a sinless life, and suffered for the sins of
            the world through His atoning work on the cross, made efficient to
            all who believe. He was buried, bodily raised again on the third day,
            and ascended to the right hand of the Father, where He makes
            intercession for the saints and awaits the time of His return to
            earth. Upon His return, He will rapture the church and resurrect the
            bodies of departed saints unto eternal life in Heaven and establish
            His Kingdom reign forever.
          </p>
          <p>
            God wonderfully and immutably creates each person as male and female
            and the two distinct, but complementary genders, uniquely in all of
            creation, reflect the image and nature of God. We believe God
            commanded the male and female to be fruitful and multiply and fill
            the earth, so He ordained marriage to be exclusively the union of one
            man and one woman, and that sexual activity occur exclusively within
            that sacred union.
          </p>
          <p>
            We believe Human life is sacred, being created by God in His own
            image, and of inestimable dignity and worth in all of its dimensions
            including pre-born babies, the aged, the physically or mentally
            challenged and every other stage or condition of life, from
            conception through natural death. As such mankind is called to
            defend, protect, and greatly value human life. As used in these
            Bylaws, &ldquo;man&rdquo; means a biological male, and &ldquo;woman&rdquo;
            means a biological female.
          </p>
          <p>
            All persons who volunteer and serve as representatives of the
            Nonprofit Corporation shall adhere to and comply with the statement
            of beliefs set forth in this Section and personally testify to a
            personal relationship with Jesus Christ and a desire to live as
            Christian who follows the life and teachings of Jesus Christ. Any
            person who seeks to represent the Nonprofit Corporation or otherwise
            volunteer in furtherance of the Nonprofit Corporation&apos;s purpose is
            subject to approval by the Nonprofit Corporation&apos;s President and
            Board of Directors (if requested by the President).
          </p>
        </div>
      </article>
    </Section>
  );
}
