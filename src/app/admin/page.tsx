import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import {
  BookOpen,
  ChevronRight,
  Images,
  Link2,
  Palette,
  Quote,
} from "lucide-react";
import { getAdminPortalEnv } from "@/lib/memberPortal/adminEnv";
import { getAdminSession } from "@/lib/memberPortal/getAdminSession";
import { AdminMisconfigured } from "@/app/admin/member-portal/AdminMisconfigured";

export const dynamic = "force-dynamic";

const AREAS = [
  {
    href: "/admin/member-portal",
    title: "Participant portal",
    blurb: "Links and documents for signed-in participants",
    icon: Link2,
  },
  {
    href: "/admin/stories",
    title: "Stories",
    blurb: "Public ministry stories and photos",
    icon: BookOpen,
  },
  {
    href: "/admin/testimonials",
    title: "Testimonials",
    blurb: "Homepage quotes and portraits",
    icon: Quote,
  },
  {
    href: "/admin/gallery",
    title: "Photo gallery",
    blurb: "Gallery page and homepage photo strip",
    icon: Images,
  },
  {
    href: "/admin/coloring-pages",
    title: "Coloring pages",
    blurb: "Printables and the online coloring studio",
    icon: Palette,
  },
] as const;

export default async function AdminHubPage() {
  noStore();
  const adminEnv = getAdminPortalEnv();
  if (!adminEnv.ok) {
    return <AdminMisconfigured reason={adminEnv.reason} />;
  }

  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/member-portal/login");
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="font-serif text-3xl tracking-tight text-on-surface">
          What would you like to update?
        </h1>
        <p className="mt-2 text-sm text-on-surface-variant">
          Pick a section. Changes save only when you press Save in that editor.
        </p>
      </header>

      <ul className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-sm">
        {AREAS.map(({ href, title, blurb, icon: Icon }, index) => (
          <li
            key={href}
            className={
              index > 0 ? "border-t border-black/[0.06]" : undefined
            }
          >
            <Link
              href={href}
              className="group flex items-center gap-4 px-4 py-4 transition hover:bg-black/[0.02] sm:px-5"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" strokeWidth={1.75} aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-medium text-on-surface group-hover:text-primary">
                  {title}
                </span>
                <span className="mt-0.5 block text-sm text-on-surface-variant">
                  {blurb}
                </span>
              </span>
              <ChevronRight
                className="size-5 shrink-0 text-on-surface-variant/50 transition group-hover:translate-x-0.5 group-hover:text-primary"
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
