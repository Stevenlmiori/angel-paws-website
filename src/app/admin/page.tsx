import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { BookOpen, Link2, LogOut } from "lucide-react";
import { getAdminPortalEnv } from "@/lib/memberPortal/adminEnv";
import { getAdminSession } from "@/lib/memberPortal/getAdminSession";
import { adminLogoutAction } from "@/app/admin/member-portal/actions";
import { AdminMisconfigured } from "@/app/admin/member-portal/AdminMisconfigured";
import { Button } from "@/components/ui/Button";

export const dynamic = "force-dynamic";

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
    <div className="mx-auto max-w-screen-xl px-6 py-16 sm:px-10 md:py-24 lg:px-12">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Angel Paws
          </p>
          <h1 className="mt-1 font-serif text-4xl text-on-surface md:text-5xl">
            Site admin
          </h1>
          <p className="mt-2 max-w-xl text-on-surface-variant">
            Choose an area to manage. This hub is not linked in public navigation.
          </p>
        </div>
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

      <ul className="grid gap-6 sm:grid-cols-2">
        <li>
          <Link
            href="/admin/member-portal"
            className="group flex h-full flex-col rounded-3xl bg-surface-container-high p-8 shadow-soft ring-1 ring-primary/5 transition hover:ring-primary/15"
          >
            <span className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary-container text-on-primary-container">
              <Link2 className="size-7" strokeWidth={1.75} aria-hidden />
            </span>
            <h2 className="font-serif text-2xl text-on-surface group-hover:text-primary">
              Member portal links
            </h2>
            <p className="mt-2 flex-1 text-on-surface-variant">
              Reorder resources, edit titles and URLs for the member-only portal.
            </p>
            <span className="mt-6 text-sm font-semibold text-primary underline-offset-4 group-hover:underline">
              Open editor
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="/admin/stories"
            className="group flex h-full flex-col rounded-3xl bg-surface-container-high p-8 shadow-soft ring-1 ring-primary/5 transition hover:ring-primary/15"
          >
            <span className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-tertiary-container text-on-tertiary-container">
              <BookOpen className="size-7" strokeWidth={1.75} aria-hidden />
            </span>
            <h2 className="font-serif text-2xl text-on-surface group-hover:text-primary">
              Stories
            </h2>
            <p className="mt-2 flex-1 text-on-surface-variant">
              Create and edit public stories with photos and rich text.
            </p>
            <span className="mt-6 text-sm font-semibold text-primary underline-offset-4 group-hover:underline">
              Open stories
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
