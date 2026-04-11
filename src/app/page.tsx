import { HomeHero } from "@/components/home/HomeHero";
import { HomeImpact } from "@/components/home/HomeImpact";
import { HomeJourneyCTA } from "@/components/home/HomeJourneyCTA";
import { HomeMission } from "@/components/home/HomeMission";
import { HomeWhatWeDo } from "@/components/home/HomeWhatWeDo";
import { HomeWhereWeServe } from "@/components/home/HomeWhereWeServe";
import { SlideShow } from "@/components/home/SlideShow";
import { MeetingDates } from "@/components/home/MeetingDates";
import { Reveal } from "@/components/ui";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Reveal>
        <HomeHero />
      </Reveal>
      <section className="px-6 pb-24 md:pb-32 lg:px-12">
        <div className="mx-auto max-w-screen-2xl">
          <Reveal delayMs={100}>
            <SlideShow />
          </Reveal>
        </div>
      </section>
      <Reveal>
        <HomeMission />
      </Reveal>
      <Reveal>
        <HomeWhatWeDo />
      </Reveal>
      <MeetingDates />
      <Reveal>
        <HomeImpact />
      </Reveal>
      <Reveal>
        <HomeWhereWeServe />
      </Reveal>
      <Reveal>
        <HomeJourneyCTA />
      </Reveal>
    </div>
  );
}
