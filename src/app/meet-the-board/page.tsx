import { MeetTheBoardGrid } from "@/components/meet-the-board/MeetTheBoardGrid";
import { MeetTheBoardHero } from "@/components/meet-the-board/MeetTheBoardHero";
import { MeetTheBoardImpact } from "@/components/meet-the-board/MeetTheBoardImpact";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Angel Paws Leadership | Houston Therapy Dog Nonprofit",
  description:
    "Meet the board and volunteer leaders guiding Angel Paws Pet Therapy as a faith-based therapy dog nonprofit serving Greater Houston.",
  path: "/meet-the-board",
  keywords: [
    "Angel Paws board",
    "Houston therapy dog nonprofit leadership",
    "Debbie Benningfield Angel Paws",
  ],
});

export default function MeetTheBoardPage() {
  return (
    <div className="flex flex-col pb-16 md:pb-20">
      <MeetTheBoardHero />
      <MeetTheBoardGrid />
      <MeetTheBoardImpact />
    </div>
  );
}
