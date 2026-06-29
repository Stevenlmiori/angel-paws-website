import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { ArrowLeft, Images } from "lucide-react";
import { getAdminSession } from "@/lib/memberPortal/getAdminSession";
import { loadStoredGalleryImages } from "@/lib/siteContent/galleryStore";
import { GalleryEditor } from "./GalleryEditor";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  noStore();
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/member-portal/login");
  }

  const items = await loadStoredGalleryImages();

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
              <Images className="size-4" aria-hidden />
              Gallery manager
            </p>
            <h1 className="mt-4 font-serif text-4xl font-bold text-on-surface-inverse md:text-5xl">
              Photo gallery
            </h1>
            <p className="mt-4 max-w-2xl text-on-surface-inverse-muted">
              Curate the public photo gallery and homepage preview with visual
              cards, captions, and publish controls.
            </p>
          </div>
          <div className="rounded-2xl bg-white/8 px-5 py-4 text-sm text-on-surface-inverse-muted ring-1 ring-white/10">
            <span className="block text-2xl font-bold text-on-surface-inverse">
              {items.filter((item) => item.active).length}
            </span>
            visible photos
          </div>
        </div>
      </div>

      <div>
        <GalleryEditor initialItems={items} />
      </div>
    </div>
  );
}
