import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminPortalEnv } from "@/lib/memberPortal/adminEnv";
import { getAdminSession } from "@/lib/memberPortal/getAdminSession";
import { loadStoredPortalResources } from "@/lib/memberPortal/resourcesStore";
import { adminLogoutAction } from "./actions";
import { AdminMisconfigured } from "./AdminMisconfigured";
import { MemberPortalEditor } from "./MemberPortalEditor";
import { Button } from "@/components/ui/Button";
import { LogOut } from "lucide-react";

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
    <>
      <div className="border-b border-primary/10 bg-surface-container-low px-6 py-3 sm:px-10">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
            Signed in
          </span>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/members/portal"
              className="text-sm font-semibold text-primary underline underline-offset-4"
            >
              View member portal
            </Link>
            <form action={adminLogoutAction}>
              <Button
                type="submit"
                variant="secondary"
                className="gap-2 py-2.5 text-xs uppercase tracking-widest"
              >
                <LogOut className="size-4" aria-hidden />
                Sign out
              </Button>
            </form>
          </div>
        </div>
      </div>
      <MemberPortalEditor initialItems={initialItems} />
    </>
  );
}
