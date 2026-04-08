"use client";

import Script from "next/script";
import { createElement } from "react";
import { getDonorboxCampaign } from "@/lib/embeds";

export function DonorboxFrame() {
  const campaign = getDonorboxCampaign();

  return (
    <div className="mx-auto w-full max-w-[min(100%,36rem)]">
      <Script
        src="https://donorbox.org/widgets.js"
        type="module"
        strategy="afterInteractive"
      />
      {createElement("dbox-widget", {
        campaign,
        type: "donation_form",
        "enable-auto-scroll": "true",
      })}
    </div>
  );
}
