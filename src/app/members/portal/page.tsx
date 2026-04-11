import type { Metadata } from "next";
import Link from "next/link";
import { KeyRound } from "lucide-react";

export const metadata: Metadata = {
  title: "Member Portal",
  description:
    "Member resources for Angel Paws Pet Therapy—forms and documents (sign-in coming soon).",
};

export default function MemberPortalPage() {
  return (
    <div className="mx-auto max-w-screen-xl px-6 py-16 sm:px-10 md:py-24 lg:px-12">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-8 flex justify-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-primary-container text-on-primary-container">
            <KeyRound className="size-8" strokeWidth={1.75} aria-hidden />
          </span>
        </div>
        <h1 className="mb-6 font-serif text-4xl text-on-surface md:text-5xl">
          Member portal
        </h1>
        <p className="mb-6 text-lg leading-relaxed text-on-surface-variant">
          Sign-in is not connected yet. When it is, members will use this page
          to open forms (wellness, incident reports), download policies, and
          view the roster—without hunting through email threads.
        </p>
        <p className="mb-10 text-lg leading-relaxed text-on-surface-variant">
          If you are already on a team and need something today, please use{" "}
          <Link href="/contact" className="font-semibold text-primary underline underline-offset-4">
            Contact
          </Link>{" "}
          so we can help you directly.
        </p>
        <Link
          href="/members"
          className="inline-flex rounded-full bg-primary px-8 py-4 text-sm font-bold uppercase tracking-widest text-on-primary"
        >
          Back to membership
        </Link>
      </div>
    </div>
  );
}
