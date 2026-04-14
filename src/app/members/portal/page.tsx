import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { KeyRound } from "lucide-react";
import { getMemberPortalEnv } from "@/lib/memberPortal/env";
import {
  MEMBER_PORTAL_COOKIE_NAME,
  verifySessionToken,
} from "@/lib/memberPortal/session";
import { MemberPortalDashboard } from "./MemberPortalDashboard";
import { MemberPortalLoginForm } from "./MemberPortalLoginForm";
import { MemberPortalMisconfigured } from "./MemberPortalMisconfigured";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Member Portal",
  description:
    "Member resources for Angel Paws Pet Therapy—forms, policies, and links.",
};

export default async function MemberPortalPage() {
  const env = getMemberPortalEnv();
  if (!env.ok) {
    return <MemberPortalMisconfigured reason={env.reason} />;
  }

  const jar = await cookies();
  const raw = jar.get(MEMBER_PORTAL_COOKIE_NAME)?.value;
  const authed =
    typeof raw === "string" && verifySessionToken(raw, env.value.cookieSecret);

  if (authed) {
    return <MemberPortalDashboard />;
  }

  return (
    <div className="mx-auto max-w-screen-xl px-6 py-16 sm:px-10 md:py-24 lg:px-12">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-8 flex justify-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-primary-container text-on-primary-container">
            <KeyRound className="size-8" strokeWidth={1.75} aria-hidden />
          </span>
        </div>
        <h1 className="mb-6 font-serif text-4xl text-on-surface md:text-5xl">
          Member portal
        </h1>
        <p className="mb-10 text-lg leading-relaxed text-on-surface-variant">
          Enter the password your team lead shared with you. This page lists
          forms, policies, and other links—without digging through email.
        </p>
        <MemberPortalLoginForm />
        <p className="mt-10 text-sm text-on-surface-variant">
          <Link
            href="/members"
            className="font-semibold text-primary underline underline-offset-4"
          >
            Back to membership
          </Link>
        </p>
      </div>
    </div>
  );
}
