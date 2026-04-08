import type { Metadata } from "next";
import { PetTherapyCTA } from "@/components/pet-therapy/PetTherapyCTA";
import { PetTherapyHero } from "@/components/pet-therapy/PetTherapyHero";
import { PetTherapySections } from "@/components/pet-therapy/PetTherapySections";

export const metadata: Metadata = {
  title: "What Is Pet Therapy?",
  description:
    "How Angel Paws thinks about pet therapy—comfort, safety, and faith-centered visits in Greater Houston.",
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
