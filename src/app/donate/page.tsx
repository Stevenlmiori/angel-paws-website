import type { Metadata } from "next";
import { DonateHero } from "@/components/donate/DonateHero";
import { DonateImpactSection } from "@/components/donate/DonateImpactSection";
import { DonateDonationPanel } from "@/components/donate/DonateDonationPanel";
import { DonateNewsletter } from "@/components/donate/DonateNewsletter";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support Angel Paws Pet Therapy—your gift funds therapy animal care, training, and visits to hospitals, schools, and communities.",
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
