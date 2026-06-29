/** Public embed configuration for Donorbox. */
const DONORBOX_CAMPAIGN_RE = /^[a-zA-Z0-9_-]{1,128}$/;

/** Donorbox campaign id from the dashboard embed (`campaign="..."` on dbox-widget). */
export function getDonorboxCampaign(): string {
  const fromEnv = process.env.NEXT_PUBLIC_DONORBOX_CAMPAIGN?.trim();
  if (fromEnv && DONORBOX_CAMPAIGN_RE.test(fromEnv)) return fromEnv;
  return "angel-paws-donation";
}
