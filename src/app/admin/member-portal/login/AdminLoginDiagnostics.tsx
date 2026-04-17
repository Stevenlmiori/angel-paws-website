"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/Button";

type Props = { enabled: boolean };

export function AdminLoginDiagnostics({ enabled }: Props) {
  const [key, setKey] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [json, setJson] = useState<string | null>(null);

  const run = useCallback(async () => {
    setError(null);
    setJson(null);
    setBusy(true);
    try {
      const res = await fetch("/api/admin/login-debug", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: key.trim() }),
      });
      const text = await res.text();
      let data: unknown;
      try {
        data = JSON.parse(text) as unknown;
      } catch {
        setError(`HTTP ${res.status} — non-JSON response`);
        return;
      }
      if (!res.ok) {
        setError(`HTTP ${res.status} — ${JSON.stringify(data)}`);
        return;
      }
      const pretty = JSON.stringify(data, null, 2);
      setJson(pretty);
      console.info("[AngelPaws admin login debug]", data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed");
    } finally {
      setBusy(false);
    }
  }, [key]);

  const copy = useCallback(async () => {
    if (!json) {
      return;
    }
    try {
      await navigator.clipboard.writeText(json);
    } catch {
      setError("Could not copy to clipboard");
    }
  }, [json]);

  if (!enabled) {
    return null;
  }

  return (
    <section
      className="mx-auto mt-14 max-w-2xl rounded-2xl border border-primary/15 bg-surface-container-lowest p-6 text-left text-sm text-on-surface-variant"
      aria-label="Login diagnostics (operator only)"
    >
      <h2 className="font-semibold text-on-surface">Login diagnostics</h2>
      <p className="mt-2 leading-relaxed">
        The admin cookie is <strong className="text-on-surface">httpOnly</strong>, so normal
        page JavaScript cannot read it. This tool asks the server for a{" "}
        <strong className="text-on-surface">safe snapshot</strong> (lengths and flags only—no
        passwords, no cookie values) and prints it to the{" "}
        <strong className="text-on-surface">Safari console</strong> as{" "}
        <code className="rounded bg-surface-container-high px-1 py-0.5 text-xs">
          [AngelPaws admin login debug]
        </code>
        .
      </p>
      <p className="mt-2 leading-relaxed">
        Set <code className="text-xs">ADMIN_LOGIN_DEBUG_KEY</code> in Vercel (≥ 16 characters),
        redeploy, paste the same key here, then click <strong className="text-on-surface">Run</strong>.
        Remove the env var when you are done.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
        <label className="min-w-0 flex-1">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-on-surface">
            Debug key
          </span>
          <input
            type="password"
            autoComplete="off"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="w-full rounded-[0.625rem] border border-primary/15 bg-white px-3 py-2.5 text-on-surface outline-none ring-primary/25 focus-visible:ring-2"
            placeholder="Same value as ADMIN_LOGIN_DEBUG_KEY"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <Button type="button" onClick={() => void run()} disabled={busy || !key.trim()}>
            {busy ? "Running…" : "Run"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => void copy()}
            disabled={!json}
          >
            Copy JSON
          </Button>
        </div>
      </div>
      {error ? (
        <p className="mt-3 text-sm font-medium text-red-700" role="alert">
          {error}
        </p>
      ) : null}
      {json ? (
        <pre className="mt-4 max-h-64 overflow-auto rounded-xl bg-surface-container-high p-4 text-xs text-on-surface">
          {json}
        </pre>
      ) : null}
    </section>
  );
}
