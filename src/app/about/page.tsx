import { AboutHeart } from "@/components/about/AboutHeart";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutLeadershipCTA } from "@/components/about/AboutLeadershipCTA";
import { AboutMissionBeliefs } from "@/components/about/AboutMissionBeliefs";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutTherapyDifference } from "@/components/about/AboutTherapyDifference";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Angel Paws | Faith-Based Pet Therapy in Houston",
  description:
    "Learn how Angel Paws Pet Therapy began, what we believe, and how certified therapy dog teams serve hospitals, schools, hospice care, and partners across Greater Houston.",
  path: "/about",
  keywords: [
    "Angel Paws founder Debbie Benningfield",
    "faith-based therapy dog ministry Houston",
    "Houston pet therapy nonprofit",
  ],
});

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <AboutHero />
      <AboutMissionBeliefs />
      <AboutHeart />
      <AboutTherapyDifference />
      <AboutStory />
      <AboutLeadershipCTA />
    </div>
  );
}
