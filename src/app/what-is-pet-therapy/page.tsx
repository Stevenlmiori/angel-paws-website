import { PetTherapyCTA } from "@/components/pet-therapy/PetTherapyCTA";
import { PetTherapyHero } from "@/components/pet-therapy/PetTherapyHero";
import { PetTherapySections } from "@/components/pet-therapy/PetTherapySections";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "What Is Pet Therapy? Houston Therapy Dog Visits & Benefits",
  description:
    "Understand pet therapy, therapy dog standards, safety policies, and how Angel Paws teams bring comfort to hospitals, schools, care communities, and crisis settings in Houston.",
  path: "/what-is-pet-therapy",
  keywords: [
    "what is pet therapy",
    "therapy dog benefits Houston",
    "animal assisted activities Houston",
    "certified therapy dogs Houston",
  ],
});

export default function WhatIsPetTherapyPage() {
  return (
    <div className="flex flex-col pb-16 md:pb-20">
      <PetTherapyHero />
      <PetTherapySections />
      <PetTherapyCTA />
    </div>
  );
}
