import { HomeHero } from "@/components/home/HomeHero";
import { HomeImpact } from "@/components/home/HomeImpact";
import { HomeJourneyCTA } from "@/components/home/HomeJourneyCTA";
import { HomeMission } from "@/components/home/HomeMission";
import { HomeWhatWeDo } from "@/components/home/HomeWhatWeDo";
import { HomeWhereWeServe } from "@/components/home/HomeWhereWeServe";
import { Reveal } from "@/components/ui";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Reveal>
        <HomeHero />
      </Reveal>
      <Reveal delayMs={40}>
        <HomeMission />
      </Reveal>
      <Reveal delayMs={40}>
        <HomeWhatWeDo />
      </Reveal>
      <Reveal delayMs={40}>
        <HomeImpact />
      </Reveal>
      <Reveal delayMs={40}>
        <HomeWhereWeServe />
      </Reveal>
      <Reveal delayMs={40}>
        <HomeJourneyCTA />
      </Reveal>
    </div>
  );
}
