import type { Metadata } from "next";
import { WhereWeServeAreas } from "@/components/where-we-serve/WhereWeServeAreas";
import { WhereWeServeCTA } from "@/components/where-we-serve/WhereWeServeCTA";
import { WhereWeServeHero } from "@/components/where-we-serve/WhereWeServeHero";

export const metadata: Metadata = {
  title: "Where We Serve",
  description:
    "Hospitals, schools, care facilities, and community outreach—Angel Paws brings comfort across Greater Houston.",
};

export default function WhereWeServePage() {
  return (
    <div className="flex flex-col pb-16 md:pb-20">
      <WhereWeServeHero />
      <WhereWeServeAreas />
      <WhereWeServeCTA />
    </div>
  );
}
