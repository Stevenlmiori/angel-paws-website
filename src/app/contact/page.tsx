import type { Metadata } from "next";
import { ContactMainSection } from "@/components/contact/ContactMainSection";
import { ContactMapTeaser } from "@/components/contact/ContactMapTeaser";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach Angel Paws Pet Therapy—general inquiries, facility visits, volunteering, and stories of hope.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col pb-16 md:pb-20">
      <ContactMainSection />
      <ContactMapTeaser />
    </div>
  );
}
