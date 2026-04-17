"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { ChevronDown, Menu, X } from "lucide-react";

const aboutSubLinks = [
  { href: "/about", label: "Who We Are & Beliefs" },
  { href: "/what-is-pet-therapy", label: "What is Pet Therapy?" },
  { href: "/meet-the-board", label: "Meet our Board" },
  { href: "/where-we-serve", label: "Where We Serve" },
] as const;

const navAfterAbout = [
  { href: "/get-involved", label: "Get Involved" },
  { href: "/stories", label: "Stories" },
  { href: "/members", label: "Members" },
  { href: "/contact", label: "Contact" },
] as const;

const ABOUT_PATHS = [
  "/about",
  "/what-is-pet-therapy",
  "/meet-the-board",
  "/where-we-serve",
] as const;

function navLinkActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function aboutSectionActive(pathname: string) {
  return ABOUT_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
}

function linkClass(active: boolean) {
  return cn(
    "block whitespace-nowrap font-serif text-base tracking-[0.02em] transition-all duration-300 xl:text-lg",
    active
      ? "font-bold text-primary underline decoration-primary decoration-2 underline-offset-[10px]"
      : "text-stone-600 hover:text-primary",
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const aboutActive = aboutSectionActive(pathname);

  return (
    <header className="fixed top-0 z-50 w-full bg-stone-50/85 text-stone-900 shadow-sm backdrop-blur-md transition-all">
      <div className="relative mx-auto flex min-h-[4rem] max-w-screen-xl items-center gap-3 px-6 py-3 sm:gap-4 sm:px-10 md:min-h-[4.25rem] lg:px-12 xl:gap-6 2xl:gap-8">
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
          className="hidden min-w-0 flex-1 items-center justify-center xl:flex xl:px-2"
          aria-label="Primary"
        >
          {/* Centered cluster + even gaps — avoids pinning Home/Contact to logo & Donate */}
          <ul className="flex max-w-full flex-wrap items-center justify-center gap-x-6 gap-y-2 xl:flex-nowrap xl:gap-x-8 2xl:gap-x-10">
            <li>
              <Link href="/" className={linkClass(navLinkActive("/", pathname))}>
                Home
              </Link>
            </li>

            <li className="group/aboutnav relative">
              <div className="flex items-center gap-0.5">
                <Link href="/about" className={linkClass(aboutActive)}>
                  About
                </Link>
                <ChevronDown
                  className="size-[1.05rem] shrink-0 text-stone-400 transition-transform duration-200 group-hover/aboutnav:rotate-180 group-hover/aboutnav:text-primary"
                  strokeWidth={2}
                  aria-hidden
                />
              </div>
              <ul
                role="list"
                className="invisible absolute left-1/2 top-full z-50 mt-1 min-w-[14rem] -translate-x-1/2 rounded-2xl border border-stone-200/90 bg-white/95 py-2 shadow-lg shadow-stone-900/5 backdrop-blur-md opacity-0 transition-[opacity,visibility] duration-150 group-hover/aboutnav:visible group-hover/aboutnav:opacity-100 group-focus-within/aboutnav:visible group-focus-within/aboutnav:opacity-100"
              >
                {aboutSubLinks.map(({ href, label }) => {
                  const active = navLinkActive(href, pathname);
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        className={cn(
                          "block px-4 py-2.5 font-serif text-base tracking-tight transition-colors",
                          active
                            ? "bg-primary-container/60 font-semibold text-primary"
                            : "text-stone-700 hover:bg-stone-100 hover:text-stone-900",
                        )}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>

            {navAfterAbout.map(({ href, label }) => {
              const active = navLinkActive(href, pathname);
              return (
                <li key={label}>
                  <Link href={href} className={linkClass(active)}>
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
            className="hidden font-serif text-base tracking-tight text-stone-600 transition-colors hover:text-primary 2xl:inline xl:text-lg"
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
          className="mx-auto flex max-w-screen-xl flex-col gap-0.5 px-6 py-4 sm:px-10 lg:px-12"
          aria-label="Primary mobile"
        >
          <Link
            href="/"
            className={cn(
              "rounded-xl px-3 py-3 font-serif text-lg transition-colors",
              navLinkActive("/", pathname)
                ? "bg-primary-container/80 font-bold text-primary"
                : "text-stone-600 hover:bg-stone-200/50 hover:text-stone-900",
            )}
            onClick={() => setOpen(false)}
          >
            Home
          </Link>

          <div className="rounded-xl py-1">
            <p className="px-3 py-2 font-serif text-xs font-bold uppercase tracking-widest text-stone-500">
              About
            </p>
            {aboutSubLinks.map(({ href, label }) => {
              const active = navLinkActive(href, pathname);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "block rounded-lg py-2.5 pl-6 pr-3 font-serif text-base transition-colors",
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
          </div>

          {navAfterAbout.map(({ href, label }) => {
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
