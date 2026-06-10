"use client";

import { useState } from "react";

export function ContactEmailCopy({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

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
    <button
      type="button"
      onClick={copyEmail}
      className="rounded-full border border-primary/20 px-5 py-3 text-sm font-semibold text-on-surface transition-colors hover:border-primary hover:text-primary"
    >
      {copied ? "Copied" : "Copy address"}
    </button>
  );
}
