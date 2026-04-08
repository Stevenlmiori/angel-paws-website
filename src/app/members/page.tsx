import type { Metadata } from "next";
import { MembershipHero } from "@/components/members/MembershipHero";
import { MembershipPortalTeaser } from "@/components/members/MembershipPortalTeaser";
import { MembershipSteps } from "@/components/members/MembershipSteps";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "How to become a member of Angel Paws Pet Therapy—steps, heart, and the member portal to come.",
};

export default function MembersPage() {
  return (
    <div className="flex flex-col">
      <MembershipHero />
      <MembershipSteps />
      <MembershipPortalTeaser />
    </div>
  );
}
