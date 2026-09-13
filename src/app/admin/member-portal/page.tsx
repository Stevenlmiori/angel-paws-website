import { redirect } from "next/navigation";
import Link from "next/link";
import { getAdminPortalEnv } from "@/lib/memberPortal/adminEnv";
import { getAdminSession } from "@/lib/memberPortal/getAdminSession";
import { loadStoredPortalResources } from "@/lib/memberPortal/resourcesStore";
import { AdminMisconfigured } from "./AdminMisconfigured";
import { MemberPortalEditor } from "./MemberPortalEditor";

export const dynamic = "force-dynamic";

export default async function AdminMemberPortalPage() {
  const adminEnv = getAdminPortalEnv();
  if (!adminEnv.ok) {
    return <AdminMisconfigured reason={adminEnv.reason} />;
  }

  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/member-portal/login");
  }

  const initialItems = await loadStoredPortalResources();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-2 flex justify-end">
        <Link
          href="/members/portal"
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium text-primary hover:underline"
        >
          Preview portal
        </Link>
      </div>
      <MemberPortalEditor initialItems={initialItems} />
    </div>
  );
}
