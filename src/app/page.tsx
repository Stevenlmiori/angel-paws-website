import { HomeHero } from "@/components/home/HomeHero";
import { HomeImpact } from "@/components/home/HomeImpact";
import { HomeQuote } from "@/components/home/HomeQuote";
import { HomeJourneyCTA } from "@/components/home/HomeJourneyCTA";
import { HomeStories } from "@/components/home/HomeStories";
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
      <HomeMission />
      <Reveal>
        <HomeWhatWeDo />
      </Reveal>
      <Reveal>
        <HomeWhereWeServe />
      </Reveal>
      <Reveal>
        <HomeImpact />
      </Reveal>
      <Reveal>
        <HomeStories />
      </Reveal>
      <Reveal>
        <HomeQuote />
      </Reveal>
      <Reveal>
        <HomeJourneyCTA />
      </Reveal>
    </div>
  );
}
