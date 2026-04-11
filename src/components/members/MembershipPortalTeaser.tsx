import Link from "next/link";
import { FileText, Lock } from "lucide-react";

const futureItems = [
  "Membership roster (for members)",
  "Annual wellness form",
  "Incident report form",
  "Policies and handbooks (PDFs)",
] as const;

export function MembershipPortalTeaser() {
  return (
    <section className="mx-auto max-w-screen-xl px-6 pb-16 sm:px-10 md:pb-20 lg:px-12">
      <div className="rounded-[2.5rem] bg-surface-container-high px-8 py-12 md:px-14 md:py-16">
        <div className="mb-8 flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary">
            <Lock className="size-6" strokeWidth={2} aria-hidden />
          </div>
          <div>
            <h2 className="font-serif text-3xl text-on-surface md:text-4xl">
              Member portal
            </h2>
            <p className="mt-2 max-w-2xl text-on-surface-variant">
              Members will sign in here for forms and documents. When this goes
              live, everything will live in one calm place—simple for our team to
              update and simple for handlers to find.
            </p>
          </div>
        </div>
        <ul className="mb-10 grid gap-3 sm:grid-cols-2">
          {futureItems.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 rounded-2xl bg-surface-container-lowest px-4 py-3 font-sans text-sm text-on-surface"
            >
              <FileText
                className="size-4 shrink-0 text-primary"
                strokeWidth={2}
                aria-hidden
              />
              {item}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/members/portal"
            className="rounded-full bg-primary px-8 py-4 text-sm font-bold uppercase tracking-widest text-on-primary transition-opacity hover:opacity-90"
          >
            Go to portal
          </Link>
          <a
            href="https://drive.google.com/drive/folders/angel-paws-resources-placeholder"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-8 py-4 text-sm font-bold uppercase tracking-widest text-primary transition-colors hover:bg-primary/10"
          >
            <FileText className="size-4" />
            Member Resources (Drive)
          </a>
        </div>
      </div>
    </section>
  );
}
