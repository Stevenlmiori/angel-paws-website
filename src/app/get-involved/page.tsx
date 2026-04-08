import type { Metadata } from "next";
import { GetInvolvedCTA } from "@/components/get-involved/GetInvolvedCTA";
import { GetInvolvedHero } from "@/components/get-involved/GetInvolvedHero";
import { GetInvolvedPaths } from "@/components/get-involved/GetInvolvedPaths";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Become a healing presence with Angel Paws—therapy teams, training, and ways to serve behind the scenes.",
};

export default function GetInvolvedPage() {
  return (
    <div className="flex flex-col pb-16 md:pb-20">
      <GetInvolvedHero />
      <GetInvolvedPaths />
      <GetInvolvedCTA />
    </div>
  );
}
