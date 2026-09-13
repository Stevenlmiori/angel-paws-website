import { redirect } from "next/navigation";
import { getAdminPortalEnv } from "@/lib/memberPortal/adminEnv";
import { getAdminSession } from "@/lib/memberPortal/getAdminSession";
import { AdminMisconfigured } from "@/app/admin/member-portal/AdminMisconfigured";

export const dynamic = "force-dynamic";

export default async function AdminStoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adminEnv = getAdminPortalEnv();
  if (!adminEnv.ok) {
    return <AdminMisconfigured reason={adminEnv.reason} />;
  }

  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/member-portal/login");
  }

  return children;
}
