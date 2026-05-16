import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "We'll be right back",
  description:
    "Angel Paws Pet Therapy is updating our website. Please check back soon.",
  robots: { index: false, follow: false },
};

export default function UnderConstructionPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-16 text-center">
      <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-primary">
        Angel Paws Pet Therapy
      </p>
      <h1 className="mt-6 max-w-xl font-serif text-4xl font-semibold leading-tight tracking-tight text-on-background md:text-5xl">
        Website under construction
      </h1>
      <p className="mt-6 max-w-md text-lg leading-relaxed text-on-surface-variant">
        We&apos;re preparing something new. Thanks for your patience—we&apos;ll be
        here soon.
      </p>
    </div>
  );
}
