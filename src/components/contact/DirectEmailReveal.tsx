"use client";

import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/siteLinks";

export function DirectEmailReveal() {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const email = CONTACT_EMAIL;

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-on-surface-variant">
        Prefer email?
      </p>
      {!revealed ? (
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-strong"
        >
          Reveal email address
        </button>
      ) : (
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${email}`}
            className="font-semibold text-primary underline underline-offset-4 transition-colors hover:text-primary-strong"
          >
            {email}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="rounded-full border border-primary/20 px-4 py-2 text-sm font-semibold text-on-surface transition-colors hover:border-primary hover:text-primary"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
}
