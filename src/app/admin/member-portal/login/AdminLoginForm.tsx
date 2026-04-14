"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { type AdminLoginState, adminLoginAction } from "../actions";

const initial: AdminLoginState = { error: null };

export function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(adminLoginAction, initial);

  return (
    <form action={formAction} className="mx-auto w-full max-w-md text-left">
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
      {state.error ? (
        <p className="mb-4 text-sm font-medium text-red-700" role="alert">
          {state.error}
        </p>
      ) : null}
      <Button type="submit" className="w-full sm:w-auto" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
