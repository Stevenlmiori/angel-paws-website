import { DonateHero } from "@/components/donate/DonateHero";
import { DonateImpactSection } from "@/components/donate/DonateImpactSection";
import { DonateDonationPanel } from "@/components/donate/DonateDonationPanel";
import { DonateByMail } from "@/components/donate/DonateByMail";
import { DonateNewsletter } from "@/components/donate/DonateNewsletter";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Donate to Therapy Dog Visits in Houston",
  description:
    "Support Angel Paws Pet Therapy. Donations help fund therapy dog certification, training, ministry care, and visits to hospitals, schools, and communities across Greater Houston.",
  path: "/donate",
  keywords: [
    "donate pet therapy Houston",
    "support therapy dogs Houston",
    "Houston therapy dog nonprofit donation",
  ],
});

export default function DonatePage() {
  return (
    <div className="flex flex-col">
      <DonateHero />
      <DonateImpactSection />
      <DonateDonationPanel />
      <DonateByMail />
      <DonateNewsletter />
    </div>
  );
}
