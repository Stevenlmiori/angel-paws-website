import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
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
  const visible = items.filter((item) => item.active).length;

  return (
    <div className="mx-auto w-full max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
      <AdminPageHeader
        title="Coloring pages"
        description="Upload printable sheets, drag to reorder, and save. Kids can print or color online."
        meta={
          <p className="text-sm text-on-surface-variant">
            {visible} visible · {items.length} total
          </p>
        }
      />
      <ColoringPagesEditor initialItems={items} />
    </div>
  );
}
