/**
 * Public embed configuration (Donorbox, Tally). Set in `.env.local` for local dev
 * and in the host (e.g. Vercel) for production.
 *
 * Form ids and campaign slugs are validated so malformed env values cannot alter
 * embed URLs (open redirect / path injection via query or path segments).
 */

const TALLY_FORM_ID_RE = /^[a-zA-Z0-9_-]{1,64}$/;
const DONORBOX_CAMPAIGN_RE = /^[a-zA-Z0-9_-]{1,128}$/;

function tallyFormIdOrNull(raw: string | undefined): string | null {
  const id = raw?.trim();
  if (!id) return null;
  return TALLY_FORM_ID_RE.test(id) ? id : null;
}

/** Donorbox campaign id from the dashboard embed (`campaign="..."` on dbox-widget). */
export function getDonorboxCampaign(): string {
  const fromEnv = process.env.NEXT_PUBLIC_DONORBOX_CAMPAIGN?.trim();
  if (fromEnv && DONORBOX_CAMPAIGN_RE.test(fromEnv)) return fromEnv;
  return "angel-paws-donation";
}

/** Tally form id from the share URL (e.g. `https://tally.so/r/abcXYZ` → `abcXYZ`). */
export function getTallyContactFormId(): string | null {
  return tallyFormIdOrNull(process.env.NEXT_PUBLIC_TALLY_CONTACT_FORM_ID);
}

export function getTallyVisitFormId(): string | null {
  return tallyFormIdOrNull(process.env.NEXT_PUBLIC_TALLY_VISIT_FORM_ID);
}

/** URL for Tally iframe embeds (`data-tally-src` on iframe). */
export function tallyDataSrc(formId: string): string {
  const q = new URLSearchParams({
    alignLeft: "1",
    hideTitle: "0",
    transparentBackground: "1",
  });
  return `https://tally.so/embed/${encodeURIComponent(formId)}?${q.toString()}`;
}
