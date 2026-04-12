import type { Metadata } from "next";
import { DonateHero } from "@/components/donate/DonateHero";
import { DonateImpactSection } from "@/components/donate/DonateImpactSection";
import { DonateDonationPanel } from "@/components/donate/DonateDonationPanel";
import { DonateNewsletter } from "@/components/donate/DonateNewsletter";

export const metadata: Metadata = {
  title: "Support Our Mission | Donate to Angel Paws",
  description:
    "Your donations fund therapy dog certification, training, and visits to hospitals and schools. Support the Angel Paws ministry and help us share hope across Houston.",
};

export default function DonatePage() {
  return (
    <div className="flex flex-col">
      <DonateHero />
      <DonateImpactSection />
      <DonateDonationPanel />
      <DonateNewsletter />
    </div>
  );
}
