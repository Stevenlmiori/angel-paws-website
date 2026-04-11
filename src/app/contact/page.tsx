import type { Metadata } from "next";
import { ContactMainSection } from "@/components/contact/ContactMainSection";
import { ContactMapTeaser } from "@/components/contact/ContactMapTeaser";
import { Reveal } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach Angel Paws Pet Therapy—general inquiries, facility visits, volunteering, and stories of hope.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col pb-16 md:pb-20">
      <Reveal>
        <ContactMainSection />
      </Reveal>
      <Reveal delayMs={50}>
        <ContactMapTeaser />
      </Reveal>
    </div>
  );
}
