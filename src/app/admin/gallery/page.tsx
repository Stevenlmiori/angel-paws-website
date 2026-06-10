import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
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
    <div className="mx-auto max-w-3xl px-6 py-16 sm:px-10 md:py-24 lg:px-12">
      <Link
        href="/admin"
        className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Site admin
      </Link>
      <h1 className="font-serif text-4xl text-on-surface">Photo gallery</h1>
      <p className="mt-3 max-w-xl text-on-surface-variant">
        Manage homepage preview and the full photo gallery page. For production,
        the durable approach is to add image files under{" "}
        <code className="text-xs">public/gallery/</code> (synced via git) and
        reference their paths here. Browser uploads work locally; on Vercel they
        are temporary unless you commit new files to the repo.
      </p>
      <div className="mt-10">
        <GalleryEditor initialItems={items} />
      </div>
    </div>
  );
}
