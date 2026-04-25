"use client";

import { useMemo, useState } from "react";

const EMAIL_LOCAL = "angelpawshouston";
const EMAIL_DOMAIN = "gmail.com";

export function DirectEmailReveal() {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const email = useMemo(() => `${EMAIL_LOCAL}@${EMAIL_DOMAIN}`, []);

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
    <div className="mt-8 rounded-2xl border border-stone-200 bg-white/70 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
        Prefer email?
      </p>
      {!revealed ? (
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="mt-3 rounded-full bg-surface-container-high px-5 py-2 text-sm font-semibold text-on-surface transition-colors hover:bg-primary hover:text-on-primary"
        >
          Reveal email address
        </button>
      ) : (
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${email}`}
            className="rounded-full bg-surface-container-high px-4 py-2 text-sm font-semibold text-on-surface underline decoration-stone-300 underline-offset-4 transition-colors hover:text-primary"
          >
            {email}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 transition-colors hover:border-primary hover:text-primary"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
}
