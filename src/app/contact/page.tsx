import { ContactMainSection } from "@/components/contact/ContactMainSection";
import { ContactMapTeaser } from "@/components/contact/ContactMapTeaser";
import { Reveal } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Request a Therapy Dog Visit in Houston",
  description:
    "Contact Angel Paws Pet Therapy or submit the visitation request form to schedule therapy dog visits for Houston-area hospitals, schools, senior care, churches, and community partners.",
  path: "/contact",
  keywords: [
    "request therapy dog visit Houston",
    "schedule therapy dog visit Houston",
    "Angel Paws contact",
    "pet therapy visit request Greater Houston",
  ],
});

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
