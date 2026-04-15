import Link from "next/link";
import { Globe, Heart, Mail } from "lucide-react";

/** Stitch footer is a light slab only — no dark theme variant (matches reference). */
const linkClass =
  "text-xs font-medium uppercase tracking-[0.2em] text-stone-500 transition-colors hover:text-primary";

export function SiteFooter() {
  return (
    <footer className="mt-16 w-full overflow-hidden rounded-t-[2rem] bg-stone-100 text-stone-900">
      <div className="mx-auto grid w-full max-w-screen-xl grid-cols-1 gap-12 px-6 py-16 sm:px-10 md:grid-cols-2 md:gap-x-12 md:gap-y-14 md:py-20 lg:grid-cols-4 lg:gap-x-16 lg:px-12">
        <div className="space-y-6 md:max-w-sm lg:pr-4">
          <div className="font-serif text-xl font-bold tracking-tight text-stone-900">
            Angel Paws
          </div>
          <p className="font-sans text-sm leading-[1.75] text-stone-500">
            Serving our community through faith, compassion, and the comfort
            of therapy dogs.
          </p>
        </div>

        <div className="space-y-6">
          <h4 className="font-serif text-lg font-medium italic leading-snug text-stone-800">
            Mission
          </h4>
          <ul className="flex flex-col gap-4">
            <li>
              <Link href="/about" className={linkClass}>
                Who We Are
              </Link>
            </li>
            <li>
              <Link href="/about" className={linkClass}>
                Beliefs
              </Link>
            </li>
            <li>
              <Link href="/where-we-serve" className={linkClass}>
                Where We Serve
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="font-serif text-lg font-medium italic leading-snug text-stone-800">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-4">
            <li>
              <Link href="/donate" className={linkClass}>
                Donate
              </Link>
            </li>
            <li>
              <Link href="/contact" className={linkClass}>
                Contact
              </Link>
            </li>
            <li>
              <Link href="/what-is-pet-therapy" className={linkClass}>
                What Is Pet Therapy
              </Link>
            </li>
            <li>
              <Link href="/members" className={linkClass}>
                Membership
              </Link>
            </li>
            <li>
              <Link href="/members/portal" className={linkClass}>
                Member Portal
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="font-serif text-lg font-medium italic leading-snug text-stone-800">
            Connect
          </h4>
          <div className="flex gap-5 text-stone-600">
            <a
              href="#"
              className="rounded-lg p-1 transition-colors hover:text-primary"
              aria-label="Website"
            >
              <Globe className="size-6" strokeWidth={1.5} />
            </a>
            <a
              href="#"
              className="rounded-lg p-1 transition-colors hover:text-primary"
              aria-label="Email"
            >
              <Mail className="size-6" strokeWidth={1.5} />
            </a>
            <a
              href="#"
              className="rounded-lg p-1 transition-colors hover:text-primary"
              aria-label="Support"
            >
              <Heart className="size-6" strokeWidth={1.5} />
            </a>
          </div>
          <div className="flex flex-col gap-3 pt-1 text-xs text-stone-500">
            <Link
              href="/privacy-policy"
              className="w-fit transition-colors hover:text-primary"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="w-fit transition-colors hover:text-primary"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-stone-200/40">
        <div className="mx-auto max-w-screen-xl px-6 py-10 text-center sm:px-10 lg:px-12">
          <p className="font-sans text-xs uppercase leading-relaxed tracking-[0.22em] text-stone-500">
            © {new Date().getFullYear()} Angel Paws Pet Therapy. A Digital
            Home for Healing and Hope.
          </p>
        </div>
      </div>
    </footer>
  );
}
