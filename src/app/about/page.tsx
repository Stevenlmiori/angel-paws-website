import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutLeadershipCTA } from "@/components/about/AboutLeadershipCTA";
import { AboutMissionBeliefs } from "@/components/about/AboutMissionBeliefs";
import { AboutStory } from "@/components/about/AboutStory";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Who we are, what we believe, and how Angel Paws became a living sanctuary of connection across Greater Houston.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <AboutHero />
      <AboutMissionBeliefs />
      <AboutStory />
      <AboutLeadershipCTA />
    </div>
  );
}
