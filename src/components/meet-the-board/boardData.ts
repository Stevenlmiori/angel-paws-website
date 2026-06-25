import { DEBBIE_IMG } from "@/lib/debbieImages";
import type { BoardMember } from "./BoardMemberCard";

/** Interim card photos: handler + therapy dog until portrait photos arrive. */
export const BOARD_MEMBER_IMG = {
  debbie: DEBBIE_IMG.sam,
  susan: DEBBIE_IMG.lexie,
  andrea: DEBBIE_IMG.kylo,
} as const;

export const boardMembers: BoardMember[] = [
  {
    name: "Debbie Benningfield",
    role: "President",
    companion: "Sam",
    bio: "Debbie Benningfield is the President of Angel Paws Pet Therapy. She came to know Christ after being diagnosed with a brain tumor in 2014. Therapy dogs helped her recover, and she saw how dogs could help people through difficult times. Members of Champion Forest Baptist Church encouraged her to start a pet therapy ministry; Angel Paws began in 2017. She and her Shetland Sheepdog Sam continue that work today—alongside teaching forensic science and serving in her local church.",
    image: BOARD_MEMBER_IMG.debbie,
    imageAlt: "Debbie Benningfield with Sam, her Shetland Sheepdog therapy partner",
  },
  {
    name: "Susan Canon",
    role: "Board Member",
    companion: "Lexie",
    bio: "Susan brings more than 20 years of professional experience as a practicing CPA and a heart for serving others to the Angel Paws board. She has been a dedicated Angel Paws volunteer for nine years, partnering with her Shetland Sheepdog, Lexie, to provide comfort and encouragement to those in need. Susan also serves in her local church and in the student program of a non-denominational Bible study.",
    image: BOARD_MEMBER_IMG.susan,
    imageAlt: "Susan Canon with Lexie, her Shetland Sheepdog therapy partner",
  },
  {
    name: "Andrea Langford",
    role: "Board Member",
    companion: "Kylo Ren",
    bio: "Andrea has volunteered in pet therapy for the past 10 years, sharing comfort, encouragement, and joy with those facing physical or emotional challenges. She works in healthcare, where caring for patients is both her profession and passion. Her faith in Jesus inspires her to serve others, and she and Kylo Ren enjoy bringing smiles and hope to the people they visit.",
    image: BOARD_MEMBER_IMG.andrea,
    imageAlt: "Andrea Langford with Kylo Ren, her therapy dog partner",
  },
];

/** From Debbie’s board bio doc — advisory roster still being finalized. */
export const advisoryBoardMembers: BoardMember[] = [
  {
    name: "Bart Canon",
    role: "Advisory Board",
    bio: "Bart brings more than 45 years of professional experience in risk management and as an insurance broker. He is also a CPA. Like his wife Susan, he has a heart for serving through the Angel Paws ministry as an advisor and active participant. He serves in his local church and in a non-denominational Bible study.",
  },
];
