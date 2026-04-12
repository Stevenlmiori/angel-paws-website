import type { Metadata } from "next";
import { PetTherapyCTA } from "@/components/pet-therapy/PetTherapyCTA";
import { PetTherapyHero } from "@/components/pet-therapy/PetTherapyHero";
import { PetTherapySections } from "@/components/pet-therapy/PetTherapySections";

export const metadata: Metadata = {
  title: "What Is Pet Therapy? Definition & Benefits",
  description:
    "Discover how certified therapy dogs provide comfort and support. Angel Paws explains the definition, safety policies, and faith-based approach to pet therapy in Houston.",
};

export default function WhatIsPetTherapyPage() {
  return (
    <div className="flex flex-col pb-16 md:pb-20">
      <PetTherapyHero />
      <PetTherapySections />
      <PetTherapyCTA />
    </div>
  );
}
