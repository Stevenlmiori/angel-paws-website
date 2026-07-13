import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { ArrowLeft, Palette } from "lucide-react";
import { getAdminSession } from "@/lib/memberPortal/getAdminSession";
import { loadStoredColoringPages } from "@/lib/siteContent/coloringPagesStore";
import { ColoringPagesEditor } from "./ColoringPagesEditor";

export const dynamic = "force-dynamic";

export default async function AdminColoringPagesPage() {
  noStore();
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/member-portal/login");
  }

  const items = await loadStoredColoringPages();

  return (
    <div className="mx-auto max-w-screen-xl px-6 py-10 sm:px-10 md:py-16 lg:px-12">
      <Link
        href="/admin"
        className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Site admin
      </Link>

      <div className="mb-8 overflow-hidden rounded-[2rem] bg-surface-inverse text-on-surface-inverse shadow-soft">
        <div className="grid gap-8 p-8 md:grid-cols-[1fr_auto] md:items-end lg:p-10">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary-container">
              <Palette className="size-4" aria-hidden />
              Coloring pages manager
            </p>
            <h1 className="mt-4 font-serif text-4xl font-bold text-on-surface-inverse md:text-5xl">
              Coloring pages
            </h1>
            <p className="mt-4 max-w-2xl text-on-surface-inverse-muted">
              Add, hide, delete, and rearrange printable coloring sheets for
              the public Coloring Pages experience and online studio.
            </p>
          </div>
          <div className="rounded-2xl bg-white/8 px-5 py-4 text-sm text-on-surface-inverse-muted ring-1 ring-white/10">
            <span className="block text-2xl font-bold text-on-surface-inverse">
              {items.filter((item) => item.active).length}
            </span>
            visible pages
          </div>
        </div>
      </div>

      <ColoringPagesEditor initialItems={items} />
    </div>
  );
}
