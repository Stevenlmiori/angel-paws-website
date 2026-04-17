import { Button } from "@/components/ui/Button";

const ERROR_MESSAGES: Record<string, string> = {
  invalid: "That email or password did not match.",
  fields: "Enter email and password.",
  config: "Admin sign-in is not configured on the server.",
};

type Props = {
  errorKey?: string | null;
  /** Full URL so Safari always posts to the same host (e.g. https://www…/api/admin/login). */
  postAction: string;
};

export function AdminLoginForm({ errorKey, postAction }: Props) {
  const message =
    errorKey && ERROR_MESSAGES[errorKey] ? ERROR_MESSAGES[errorKey] : null;

  return (
    <form method="post" action={postAction} className="mx-auto w-full max-w-md text-left">
      <label
        htmlFor="admin-email"
        className="mb-2 block text-sm font-semibold text-on-surface"
      >
        Email
      </label>
      <input
        id="admin-email"
        name="email"
        type="email"
        autoComplete="username"
        required
        className="mb-4 w-full rounded-[0.625rem] border border-primary/15 bg-surface-container-lowest px-4 py-3.5 text-on-surface outline-none ring-primary/25 transition focus-visible:ring-2"
      />
      <label
        htmlFor="admin-password"
        className="mb-2 block text-sm font-semibold text-on-surface"
      >
        Password
      </label>
      <input
        id="admin-password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        className="mb-4 w-full rounded-[0.625rem] border border-primary/15 bg-surface-container-lowest px-4 py-3.5 text-on-surface outline-none ring-primary/25 transition focus-visible:ring-2"
      />
      {message ? (
        <p className="mb-4 text-sm font-medium text-red-700" role="alert">
          {message}
        </p>
      ) : null}
      <Button type="submit" className="w-full sm:w-auto">
        Sign in
      </Button>
    </form>
  );
}
