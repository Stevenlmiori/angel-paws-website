import type { Metadata } from "next";
import { ContactMainSection } from "@/components/contact/ContactMainSection";
import { ContactMapTeaser } from "@/components/contact/ContactMapTeaser";
import { Reveal } from "@/components/ui";

export const metadata: Metadata = {
  title: "Get in Touch",
  description:
    "Contact Angel Paws Pet Therapy by email, or submit a visitation request form to schedule therapy dog visits in Greater Houston.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col pb-16 md:pb-20">
      <ContactMainSection />
      <Reveal delayMs={50}>
        <ContactMapTeaser />
      </Reveal>
    </div>
  );
}
