import { HomeGalleryPreview } from "@/components/home/HomeGalleryPreview";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeImpact } from "@/components/home/HomeImpact";
import { HomeQuote } from "@/components/home/HomeQuote";
import { HomeJourneyCTA } from "@/components/home/HomeJourneyCTA";
import { HomeStories } from "@/components/home/HomeStories";
import { HomeMission } from "@/components/home/HomeMission";
import { HomeTestimonials } from "@/components/home/HomeTestimonials";
import { HomeWhatWeDo } from "@/components/home/HomeWhatWeDo";
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
        <HomeImpact />
      </Reveal>
      <Reveal>
        <HomeStories />
      </Reveal>
      <Reveal>
        <HomeTestimonials />
      </Reveal>
      <Reveal>
        <HomeGalleryPreview />
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
