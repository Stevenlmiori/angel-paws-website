import type { Metadata } from "next";
import { MembershipHero } from "@/components/members/MembershipHero";
import { MembershipPortalTeaser } from "@/components/members/MembershipPortalTeaser";
import { MembershipSteps } from "@/components/members/MembershipSteps";

export const metadata: Metadata = {
  title: "Become a Member | Therapy Dog Training & Membership",
  description:
    "How to join Angel Paws Pet Therapy. Learn the steps to become a certified therapy dog team, from temperment testing to national certification in Houston.",
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
