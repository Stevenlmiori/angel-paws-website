"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  adminCredentialsMatch,
  getAdminPortalEnv,
  normalizeAdminEmail,
} from "@/lib/memberPortal/adminEnv";
import {
  ADMIN_PORTAL_COOKIE_NAME,
  createAdminSessionToken,
} from "@/lib/memberPortal/adminSession";
import { getMemberPortalEnv } from "@/lib/memberPortal/env";
import { getAdminSession } from "@/lib/memberPortal/getAdminSession";
import { persistPortalResources } from "@/lib/memberPortal/resourcesStore";
import { parsePortalResourcesJsonString } from "@/lib/memberPortal/validatePortalResources";

function adminCookieBase() {
  return {
    path: "/admin/member-portal",
    sameSite: "lax" as const,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };
}

export type AdminLoginState = { error: string | null };

export async function adminLoginAction(
  _prev: AdminLoginState,
  formData: FormData,
): Promise<AdminLoginState> {
  const email = formData.get("email");
  const password = formData.get("password");
  if (typeof email !== "string" || typeof password !== "string") {
    return { error: "Enter email and password." };
  }

  const adminEnv = getAdminPortalEnv();
  if (!adminEnv.ok) {
    return {
      error:
        adminEnv.reason === "missing_member_portal"
          ? "Member portal must be configured before admin sign-in."
          : "Admin sign-in is not configured on the server.",
    };
  }

  const member = getMemberPortalEnv();
  if (!member.ok) {
    return { error: "Member portal is not configured on the server." };
  }

  if (!adminCredentialsMatch(email, password, adminEnv.value)) {
    return { error: "That email or password did not match." };
  }

  const expMs = Date.now() + adminEnv.value.maxAgeSec * 1000;
  const token = createAdminSessionToken(
    expMs,
    normalizeAdminEmail(email),
    member.value.cookieSecret,
  );
  const jar = await cookies();
  jar.set(ADMIN_PORTAL_COOKIE_NAME, token, {
    ...adminCookieBase(),
    maxAge: adminEnv.value.maxAgeSec,
  });

  redirect("/admin/member-portal");
}

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
