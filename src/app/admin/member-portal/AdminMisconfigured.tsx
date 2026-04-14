import Link from "next/link";

type Reason =
  | "missing_member_portal"
  | "missing_admin_email"
  | "missing_admin_password";

const copy: Record<Reason, string> = {
  missing_member_portal:
    "Configure MEMBER_PORTAL_PASSWORD and MEMBER_PORTAL_COOKIE_SECRET first.",
  missing_admin_email: "Set MEMBER_PORTAL_ADMIN_EMAIL on the server.",
  missing_admin_password: "Set MEMBER_PORTAL_ADMIN_PASSWORD on the server.",
};

export function AdminMisconfigured({ reason }: { reason: Reason }) {
  return (
    <div className="mx-auto max-w-screen-xl px-6 py-16 sm:px-10 md:py-24 lg:px-12">
      <div className="mx-auto max-w-xl rounded-[2rem] bg-tertiary-container/40 px-8 py-10 text-center md:px-12">
        <h1 className="mb-4 font-serif text-3xl text-on-surface md:text-4xl">
          Admin setup needed
        </h1>
        <p className="mb-8 text-on-surface-variant leading-relaxed">{copy[reason]}</p>
        <p className="mb-8 text-sm text-on-surface-variant leading-relaxed">
          See <code className="rounded bg-surface-container-high px-1.5 py-0.5 text-xs">.env.example</code>{" "}
          for variable names.
        </p>
        <Link
          href="/"
          className="inline-flex rounded-full bg-primary px-8 py-4 text-sm font-bold uppercase tracking-widest text-on-primary"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
