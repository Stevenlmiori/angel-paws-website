"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JsonLd } from "@/components/seo/JsonLd";

/**
 * Public marketing chrome for the site. Admin routes get a blank shell so
 * Debbie isn’t editing next to “Request a Visit” / “Give”.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <div className="flex min-h-full flex-1 flex-col">{children}</div>;
  }

  return (
    <>
      <JsonLd />
      <SiteHeader />
      <main className="flex flex-col pt-20 md:pt-24">{children}</main>
      <SiteFooter />
    </>
  );
}
