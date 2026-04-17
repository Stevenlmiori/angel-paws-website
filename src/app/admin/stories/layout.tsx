import { redirect } from "next/navigation";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { getAdminPortalEnv } from "@/lib/memberPortal/adminEnv";
import { getAdminSession } from "@/lib/memberPortal/getAdminSession";
import { adminLogoutAction } from "@/app/admin/member-portal/actions";
import { AdminMisconfigured } from "@/app/admin/member-portal/AdminMisconfigured";
import { Button } from "@/components/ui/Button";

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

  return (
    <>
      <div className="border-b border-primary/10 bg-surface-container-low px-6 py-3 sm:px-10">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
            Stories admin
          </span>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin"
              className="text-sm font-semibold text-on-surface-variant underline-offset-4 hover:text-primary hover:underline"
            >
              Admin home
            </Link>
            <Link
              href="/admin/member-portal"
              className="text-sm font-semibold text-on-surface-variant underline-offset-4 hover:text-primary hover:underline"
            >
              Member portal
            </Link>
            <Link
              href="/stories"
              className="text-sm font-semibold text-primary underline underline-offset-4"
            >
              View public stories
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
      {children}
    </>
  );
}
