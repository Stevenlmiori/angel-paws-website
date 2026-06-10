import type { Metadata } from "next";
import { AboutBeliefsStatement } from "@/components/about/AboutBeliefsStatement";
import { AboutHeart } from "@/components/about/AboutHeart";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutLeadershipCTA } from "@/components/about/AboutLeadershipCTA";
import { AboutMissionBeliefs } from "@/components/about/AboutMissionBeliefs";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutTherapyDifference } from "@/components/about/AboutTherapyDifference";

export const metadata: Metadata = {
  title: "Who We Are & What We Believe",
  description:
    "Learn how Angel Paws Pet Therapy shares the love of Jesus through certified therapy dog visits at hospitals, schools, and hospice care in Greater Houston.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <AboutHero />
      <AboutMissionBeliefs />
      <AboutBeliefsStatement />
      <AboutHeart />
      <AboutTherapyDifference />
      <AboutStory />
      <AboutLeadershipCTA />
    </div>
  );
}
