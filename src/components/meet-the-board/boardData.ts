import type { BoardMember } from "./BoardMemberCard";

export const BOARD_MEMBER_IMG = {
  debbie: "/img/board/debbie-benningfield.png",
  susan: "/img/board/susan-canon.png",
  andrea: "/img/board/andrea-langford.png",
} as const;

export const boardMembers: BoardMember[] = [
  {
    name: "Debbie Benningfield",
    role: "President",
    companion: "Sam",
    bio: "Debbie Benningfield is the President of Angel Paws Pet Therapy. She came to know Christ after being diagnosed with a brain tumor in 2014. Therapy dogs helped her recover, and she saw how dogs could help people through difficult times. Members of Champion Forest Baptist Church encouraged her to start a pet therapy ministry; Angel Paws began in 2017. She and her Shetland Sheepdog Sam continue that work today—alongside teaching forensic science and serving in her local church.",
    image: BOARD_MEMBER_IMG.debbie,
    imageAlt: "Debbie Benningfield, President of Angel Paws Pet Therapy",
  },
  {
    name: "Susan Canon",
    role: "Treasurer",
    companion: "Lexie",
    bio: "Susan brings more than 20 years of professional experience as a practicing CPA and a heart for serving others to the Angel Paws board. She has been a dedicated Angel Paws volunteer for nine years, partnering with her Shetland Sheepdog, Lexie, to provide comfort and encouragement to those in need. Susan also serves in her local church and in the student program of a non-denominational Bible study.",
    image: BOARD_MEMBER_IMG.susan,
    imageAlt: "Susan Canon, Treasurer of Angel Paws Pet Therapy",
  },
  {
    name: "Andrea Langford",
    role: "Secretary",
    companion: "Kylo Ren",
    bio: "Andrea has volunteered in pet therapy for the past 10 years, sharing comfort, encouragement, and joy with those facing physical or emotional challenges. She works in healthcare, where caring for patients is both her profession and passion. Her faith in Jesus inspires her to serve others, and she and Kylo Ren enjoy bringing smiles and hope to the people they visit.",
    image: BOARD_MEMBER_IMG.andrea,
    imageAlt: "Andrea Langford, Secretary of Angel Paws Pet Therapy",
  },
];

/** Advisory roster will be added once finalized. */
export const advisoryBoardMembers: BoardMember[] = [];
