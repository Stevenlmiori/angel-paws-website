import Link from "next/link";

type Props = { reason: "missing_password" | "missing_cookie_secret" };

export function MemberPortalMisconfigured({ reason }: Props) {
  const detail =
    reason === "missing_password"
      ? "MEMBER_PORTAL_PASSWORD is not set in the server environment."
      : "MEMBER_PORTAL_COOKIE_SECRET is missing or shorter than 16 characters.";

  return (
    <div className="mx-auto max-w-screen-xl px-6 py-16 sm:px-10 md:py-24 lg:px-12">
      <div className="mx-auto max-w-xl rounded-[2rem] bg-tertiary-container/40 px-8 py-10 text-center md:px-12">
        <h1 className="mb-4 font-serif text-3xl text-on-surface md:text-4xl">
          Portal setup needed
        </h1>
        <p className="mb-2 text-on-surface-variant leading-relaxed">
          The member portal cannot accept sign-ins until environment variables
          are configured on the server ({detail}).
        </p>
        <p className="mb-8 text-sm text-on-surface-variant leading-relaxed">
          See <code className="rounded bg-surface-container-high px-1.5 py-0.5 text-xs">.env.example</code>{" "}
          for the required variables.
        </p>
        <Link
          href="/members"
          className="inline-flex rounded-full bg-primary px-8 py-4 text-sm font-bold uppercase tracking-widest text-on-primary"
        >
          Back to membership
        </Link>
      </div>
    </div>
  );
}
