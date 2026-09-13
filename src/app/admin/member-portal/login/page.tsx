import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminPortalEnv } from "@/lib/memberPortal/adminEnv";
import { getAdminSession } from "@/lib/memberPortal/getAdminSession";
import { AdminMisconfigured } from "../AdminMisconfigured";
import { AdminLoginForm } from "./AdminLoginForm";
import { AdminLoginDiagnostics } from "./AdminLoginDiagnostics";

export const dynamic = "force-dynamic";

export default async function AdminMemberPortalLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  noStore();
  const { error } = await searchParams;
  const h = await headers();
  const rawHost = h.get("x-forwarded-host") ?? h.get("host") ?? "";
  const host = rawHost.split(",")[0]?.trim() ?? "";
  /**
   * Absolute URL helps Safari post to the canonical host in production. On
   * `next dev`, `x-forwarded-proto` is often missing — defaulting to `https`
   * would send the form to `https://localhost:…` while the server only speaks
   * HTTP, so sign-in silently fails.
   */
  const forwardedProto = h.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const isLocal =
    host.includes("localhost") ||
    host.includes("127.0.0.1") ||
    host.includes("::1");
  const proto = forwardedProto ?? (isLocal ? "http" : "https");
  const loginPostAction =
    host.length > 0 ? `${proto}://${host}/api/admin/login` : "/api/admin/login";
  const loginDiagnosticsEnabled = Boolean(
    process.env.ADMIN_LOGIN_DEBUG_KEY?.trim() &&
      (process.env.NODE_ENV !== "production" ||
        process.env.ADMIN_LOGIN_DEBUG_ENABLED === "true"),
  );

  const adminEnv = getAdminPortalEnv();
  if (!adminEnv.ok) {
    return <AdminMisconfigured reason={adminEnv.reason} />;
  }

  const session = await getAdminSession();
  if (session) {
    redirect("/admin");
  }

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16 sm:px-6">
      <div className="w-full max-w-md rounded-2xl border border-black/[0.06] bg-white p-8 shadow-sm sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Angel Paws
        </p>
        <h1 className="mt-2 font-serif text-3xl tracking-tight text-on-surface">
          Sign in
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
          Manage portal links, stories, testimonials, gallery, and coloring
          pages.
        </p>
        <div className="mt-8">
          <AdminLoginForm errorKey={error} postAction={loginPostAction} />
        </div>
        <p className="mt-8 text-center text-sm text-on-surface-variant">
          <Link href="/" className="font-medium text-primary hover:underline">
            Back to website
          </Link>
        </p>
        <AdminLoginDiagnostics enabled={loginDiagnosticsEnabled} />
      </div>
    </div>
  );
}
