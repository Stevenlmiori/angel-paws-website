"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_PORTAL_COOKIE_NAME } from "@/lib/memberPortal/adminSession";
import { getAdminSession } from "@/lib/memberPortal/getAdminSession";
import { persistPortalResources } from "@/lib/memberPortal/resourcesStore";
import { adminCookieBase } from "@/lib/memberPortal/adminCookie";
import { parsePortalResourcesJsonString } from "@/lib/memberPortal/validatePortalResources";

export async function adminLogoutAction() {
  const jar = await cookies();
  jar.set(ADMIN_PORTAL_COOKIE_NAME, "", {
    ...adminCookieBase(),
    maxAge: 0,
  });
  redirect("/admin/member-portal/login");
}

export type SavePortalState = { ok: boolean; message: string };

export async function savePortalResourcesDirect(
  payloadJson: string,
): Promise<SavePortalState> {
  const session = await getAdminSession();
  if (!session) {
    return { ok: false, message: "Not signed in." };
  }

  const parsed = parsePortalResourcesJsonString(payloadJson);
  if (!parsed) {
    return {
      ok: false,
      message:
        "Validation failed. Check titles, links (https:// or internal paths), and icons.",
    };
  }

  const result = await persistPortalResources(parsed);
  if (!result.ok) {
    const message =
      result.error === "no_storage"
        ? "Production storage is not set up. Add Upstash Redis env vars on Vercel (see .env.example)."
        : result.error === "redis_write_failed"
          ? "Could not save to Redis. Check credentials and try again."
          : result.error === "file_write_failed"
            ? "Could not write the local data file."
            : "Could not save.";
    return { ok: false, message };
  }

  revalidatePath("/members/portal");
  revalidatePath("/admin/member-portal");
  return { ok: true, message: "Saved. Members will see this on their next visit." };
}
