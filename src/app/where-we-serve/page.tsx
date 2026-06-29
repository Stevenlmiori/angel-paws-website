import { WhereWeServeAreas } from "@/components/where-we-serve/WhereWeServeAreas";
import { WhereWeServeCTA } from "@/components/where-we-serve/WhereWeServeCTA";
import { WhereWeServeHero } from "@/components/where-we-serve/WhereWeServeHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Where We Serve | Therapy Dog Visits in Greater Houston",
  description:
    "Angel Paws provides therapy dog visits to hospitals, schools, assisted living and nursing homes, churches, workplaces, and crisis-impacted settings across Greater Houston.",
  path: "/where-we-serve",
  keywords: [
    "Houston therapy dog locations",
    "therapy dogs for nursing homes Houston",
    "therapy dogs for assisted living Houston",
    "therapy dogs for workplaces Houston",
  ],
});

export default function WhereWeServePage() {
  return (
    <div className="flex flex-col pb-16 md:pb-20">
      <WhereWeServeHero />
      <WhereWeServeAreas />
      <WhereWeServeCTA />
    </div>
  );
}
