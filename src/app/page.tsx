import { HomeHero } from "@/components/home/HomeHero";
import { HomeImpact } from "@/components/home/HomeImpact";
import { HomeJourneyCTA } from "@/components/home/HomeJourneyCTA";
import { HomeMission } from "@/components/home/HomeMission";
import { HomeWhatWeDo } from "@/components/home/HomeWhatWeDo";
import { HomeWhereWeServe } from "@/components/home/HomeWhereWeServe";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HomeHero />
      <HomeMission />
      <HomeWhatWeDo />
      <HomeImpact />
      <HomeWhereWeServe />
      <HomeJourneyCTA />
    </div>
  );
}
