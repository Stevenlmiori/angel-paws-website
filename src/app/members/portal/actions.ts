"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getMemberPortalEnv } from "@/lib/memberPortal/env";
import {
  createSessionToken,
  MEMBER_PORTAL_COOKIE_NAME,
  safePasswordEqual,
} from "@/lib/memberPortal/session";

function portalCookieBase() {
  return {
    path: "/members/portal",
    sameSite: "lax" as const,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };
}

export type LoginActionState = { error: string | null };

export async function loginAction(
  _prev: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const passwordField = formData.get("password");
  if (typeof passwordField !== "string") {
    return { error: "Enter the member password." };
  }

  const env = getMemberPortalEnv();
  if (!env.ok) {
    return {
      error: "The portal is not configured yet. Please contact the site administrator.",
    };
  }

  if (!safePasswordEqual(passwordField, env.value.password)) {
    return { error: "That password did not match." };
  }

  const expMs = Date.now() + env.value.maxAgeSec * 1000;
  const token = createSessionToken(expMs, env.value.cookieSecret);
  const jar = await cookies();
  jar.set(MEMBER_PORTAL_COOKIE_NAME, token, {
    ...portalCookieBase(),
    maxAge: env.value.maxAgeSec,
  });

  redirect("/members/portal");
}

export async function logoutAction() {
  const jar = await cookies();
  jar.set(MEMBER_PORTAL_COOKIE_NAME, "", {
    ...portalCookieBase(),
    maxAge: 0,
  });
  redirect("/members/portal");
}
