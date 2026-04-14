"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { type LoginActionState, loginAction } from "./actions";

const initial: LoginActionState = { error: null };

export function MemberPortalLoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initial);

  return (
    <form action={formAction} className="mx-auto w-full max-w-md text-left">
      <label
        htmlFor="member-portal-password"
        className="mb-2 block text-sm font-semibold text-on-surface"
      >
        Member password
      </label>
      <input
        id="member-portal-password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        className="mb-4 w-full rounded-[0.625rem] border border-primary/15 bg-surface-container-lowest px-4 py-3.5 text-on-surface shadow-none outline-none ring-primary/25 transition focus-visible:ring-2"
      />
      {state.error ? (
        <p
          className="mb-4 text-sm font-medium text-red-700"
          role="alert"
          aria-live="polite"
        >
          {state.error}
        </p>
      ) : null}
      <Button type="submit" className="w-full sm:w-auto" disabled={pending}>
        {pending ? "Checking…" : "Unlock resources"}
      </Button>
    </form>
  );
}
