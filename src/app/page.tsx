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
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Therapy Dog Visits in Houston & Greater Houston",
  description:
    "Angel Paws Pet Therapy offers faith-based therapy dog visits for hospitals, schools, senior care communities, churches, workplaces, and crisis response across Greater Houston.",
  path: "/",
  keywords: [
    "Houston pet therapy nonprofit",
    "request a therapy dog visit Houston",
    "therapy dogs for hospitals Houston",
    "therapy dogs for schools Houston",
  ],
});

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
