"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Images,
  Link2,
  LogOut,
  Palette,
  Quote,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { adminLogoutAction } from "@/app/admin/member-portal/actions";

const NAV = [
  { href: "/admin/member-portal", label: "Portal", icon: Link2 },
  { href: "/admin/stories", label: "Stories", icon: BookOpen },
  { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/coloring-pages", label: "Coloring", icon: Palette },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/admin") {
    return pathname === "/admin";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminNav() {
  const pathname = usePathname() ?? "";
  const onLogin = pathname.startsWith("/admin/member-portal/login");

  if (onLogin) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/admin"
            className={cn(
              "shrink-0 font-serif text-lg tracking-tight text-on-surface transition hover:text-primary",
              pathname === "/admin" && "text-primary",
            )}
          >
            Angel Paws Admin
          </Link>
          <form action={adminLogoutAction}>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-on-surface-variant transition hover:bg-black/[0.04] hover:text-on-surface"
            >
              <LogOut className="size-3.5" aria-hidden />
              Sign out
            </button>
          </form>
        </div>
        <nav aria-label="Admin sections" className="-mx-1 overflow-x-auto">
          <ul className="flex min-w-max gap-1 px-1 pb-0.5">
            {NAV.map(({ href, label, icon: Icon }) => {
              const active = isActive(pathname, href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition",
                      active
                        ? "bg-primary text-on-primary"
                        : "text-on-surface-variant hover:bg-black/[0.04] hover:text-on-surface",
                    )}
                  >
                    <Icon className="size-3.5" aria-hidden />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
