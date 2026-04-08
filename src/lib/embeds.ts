/**
 * Public embed configuration (Donorbox, Tally). Set in `.env.local` for local dev
 * and in the host (e.g. Vercel) for production.
 */

/** Donorbox campaign id from the dashboard embed (`campaign="..."` on dbox-widget). */
export function getDonorboxCampaign(): string {
  const fromEnv = process.env.NEXT_PUBLIC_DONORBOX_CAMPAIGN?.trim();
  if (fromEnv) return fromEnv;
  return "angel-paws-donation";
}

/** Tally form id from the share URL (e.g. `https://tally.so/r/abcXYZ` → `abcXYZ`). */
export function getTallyContactFormId(): string | null {
  const id = process.env.NEXT_PUBLIC_TALLY_CONTACT_FORM_ID?.trim();
  return id || null;
}

export function getTallyVisitFormId(): string | null {
  const id = process.env.NEXT_PUBLIC_TALLY_VISIT_FORM_ID?.trim();
  return id || null;
}

/** URL for Tally’s embed script (`data-tally-src` on iframe). */
export function tallyDataSrc(formId: string): string {
  const q = new URLSearchParams({
    alignLeft: "1",
    hideTitle: "0",
    transparentBackground: "1",
  });
  return `https://tally.so/r/${encodeURIComponent(formId)}?${q.toString()}`;
}
