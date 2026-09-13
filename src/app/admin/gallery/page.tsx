import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
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
  const visible = items.filter((item) => item.active).length;

  return (
    <div className="mx-auto w-full max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
      <AdminPageHeader
        title="Photo gallery"
        description="Upload photos, add a short description, then save. Hidden photos stay in the list until you delete them."
        meta={
          <p className="text-sm text-on-surface-variant">
            {visible} visible · {items.length} total
          </p>
        }
      />
      <GalleryEditor initialItems={items} />
    </div>
  );
}
