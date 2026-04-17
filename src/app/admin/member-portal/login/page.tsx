import Link from "next/link";
import { redirect } from "next/navigation";
import { Settings2 } from "lucide-react";
import { getAdminPortalEnv } from "@/lib/memberPortal/adminEnv";
import { getAdminSession } from "@/lib/memberPortal/getAdminSession";
import { AdminMisconfigured } from "../AdminMisconfigured";
import { AdminLoginForm } from "./AdminLoginForm";

export const dynamic = "force-dynamic";

export default async function AdminMemberPortalLoginPage() {
  const adminEnv = getAdminPortalEnv();
  if (!adminEnv.ok) {
    return <AdminMisconfigured reason={adminEnv.reason} />;
  }

  const session = await getAdminSession();
  if (session) {
    redirect("/admin");
  }

  return (
    <div className="mx-auto max-w-screen-xl px-6 py-16 sm:px-10 md:py-24 lg:px-12">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-8 flex justify-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-primary-container text-on-primary-container">
            <Settings2 className="size-8" strokeWidth={1.75} aria-hidden />
          </span>
        </div>
        <h1 className="mb-4 font-serif text-4xl text-on-surface md:text-5xl">
          Site admin
        </h1>
        <p className="mb-10 text-lg leading-relaxed text-on-surface-variant">
          Sign in to manage member portal links and public stories. This area is
          not linked in the public navigation.
        </p>
        <AdminLoginForm />
        <p className="mt-10 text-sm text-on-surface-variant">
          <Link
            href="/members/portal"
            className="font-semibold text-primary underline underline-offset-4"
          >
            Member portal
          </Link>
        </p>
      </div>
    </div>
  );
}
