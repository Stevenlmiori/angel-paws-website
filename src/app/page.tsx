import { HomeHero } from "@/components/home/HomeHero";
import { HomeImpact } from "@/components/home/HomeImpact";
import { HomeQuote } from "@/components/home/HomeQuote";
import { HomeJourneyCTA } from "@/components/home/HomeJourneyCTA";
import { HomeMission } from "@/components/home/HomeMission";
import { HomeWhatWeDo } from "@/components/home/HomeWhatWeDo";
import { HomeWhereWeServe } from "@/components/home/HomeWhereWeServe";
import { SlideShow } from "@/components/home/SlideShow";
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
        <HomeQuote />
      </Reveal>
      <Reveal>
        <HomeJourneyCTA />
      </Reveal>
      <section className="px-6 pb-24 pt-12 md:pb-32 md:pt-16 lg:px-12">
        <div className="mx-auto max-w-screen-xl">
          <Reveal delayMs={100}>
            <SlideShow />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
