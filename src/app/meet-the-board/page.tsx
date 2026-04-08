import type { Metadata } from "next";
import { MeetTheBoardGrid } from "@/components/meet-the-board/MeetTheBoardGrid";
import { MeetTheBoardHero } from "@/components/meet-the-board/MeetTheBoardHero";
import { MeetTheBoardImpact } from "@/components/meet-the-board/MeetTheBoardImpact";

export const metadata: Metadata = {
  title: "Meet the Board",
  description:
    "Leadership guiding Angel Paws Pet Therapy—guided by compassion, led by connection.",
};

export default function MeetTheBoardPage() {
  return (
    <div className="flex flex-col pb-16 md:pb-20">
      <MeetTheBoardHero />
      <MeetTheBoardGrid />
      <MeetTheBoardImpact />
    </div>
  );
}
