"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/what-is-pet-therapy", label: "Pet Therapy" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/where-we-serve", label: "Where We Serve" },
  { href: "/meet-the-board", label: "Meet the Board" },
  { href: "/members", label: "Members" },
  { href: "/contact", label: "Contact" },
] as const;

function navLinkActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 z-50 w-full bg-stone-50/85 text-stone-900 shadow-sm backdrop-blur-md transition-all">
      {/* Row: brand | (flex-1 nav, centered) | actions — no absolute centering, so nothing overlaps */}
      <div className="relative mx-auto flex min-h-[4rem] max-w-screen-2xl items-center gap-3 px-6 py-3 sm:gap-4 sm:px-10 md:min-h-[4.25rem] lg:px-12">
        <Link
          href="/"
          className="relative z-20 flex min-w-0 shrink-0 items-center gap-2 sm:gap-2.5 md:gap-3"
        >
          <Image
            src="/brand/angel-paws/logo@2x.png"
            alt=""
            width={155}
            height={75}
            priority
            className="h-8 w-auto md:h-9"
          />
          <span className="truncate font-serif text-xl font-semibold italic tracking-tight text-stone-900 sm:text-2xl">
            Angel Paws
          </span>
        </Link>

        <nav
          className="hidden min-w-0 flex-1 justify-center px-2 xl:flex"
          aria-label="Primary"
        >
          <ul className="flex max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-1 2xl:gap-x-6 2xl:gap-y-0">
            {navLinks.map(({ href, label }) => {
              const active = navLinkActive(href, pathname);
              return (
                <li key={label}>
                  <Link
                    href={href}
                    className={cn(
                      "block whitespace-nowrap font-serif text-base tracking-tight transition-all duration-300 2xl:text-lg",
                      active
                        ? "font-bold text-primary underline decoration-primary decoration-2 underline-offset-[10px]"
                        : "text-stone-600 hover:text-primary",
                    )}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="relative z-20 ml-auto flex min-w-0 shrink-0 items-center gap-2 sm:gap-3 md:gap-4">
          <Link
            href="/members/portal"
            className="hidden font-serif text-base tracking-tight text-stone-600 transition-colors hover:text-primary 2xl:inline 2xl:text-lg"
          >
            Member Resources
          </Link>
          <Link
            href="/donate"
            className="rounded-full bg-primary px-4 py-2.5 font-sans text-sm font-semibold text-on-primary transition-all duration-150 hover:opacity-90 active:scale-[0.98] sm:px-5 md:px-6"
          >
            Donate
          </Link>
          <button
            type="button"
            className="rounded-lg p-2 text-stone-600 transition-colors hover:bg-stone-200/70 hover:text-stone-900 xl:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="size-6" strokeWidth={2.25} aria-hidden />
            ) : (
              <Menu className="size-6" strokeWidth={2.25} aria-hidden />
            )}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "bg-stone-100/90 backdrop-blur-md xl:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav
          className="mx-auto flex max-w-screen-2xl flex-col gap-0.5 px-6 py-4 sm:px-10 lg:px-12"
          aria-label="Primary mobile"
        >
          {navLinks.map(({ href, label }) => {
            const active = navLinkActive(href, pathname);
            return (
              <Link
                key={label}
                href={href}
                className={cn(
                  "rounded-xl px-3 py-3 font-serif text-lg transition-colors",
                  active
                    ? "bg-primary-container/80 font-bold text-primary"
                    : "text-stone-600 hover:bg-stone-200/50 hover:text-stone-900",
                )}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            );
          })}
          <Link
            href="/members/portal"
            className="mt-1 rounded-xl px-3 py-3 font-serif text-base text-stone-600 hover:bg-stone-200/50"
            onClick={() => setOpen(false)}
          >
            Member Resources
          </Link>
        </nav>
      </div>
    </header>
  );
}
