import type { Metadata } from "next";
import { WhereWeServeAreas } from "@/components/where-we-serve/WhereWeServeAreas";
import { WhereWeServeCTA } from "@/components/where-we-serve/WhereWeServeCTA";
import { WhereWeServeHero } from "@/components/where-we-serve/WhereWeServeHero";

export const metadata: Metadata = {
  title: "Where We Serve | Houston Pet Therapy Locations",
  description:
    "Angel Paws provides therapy dog visits to hospitals, schools, and nursing homes across Greater Houston, including Cypress, Katy, and Northwest Houston.",
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
