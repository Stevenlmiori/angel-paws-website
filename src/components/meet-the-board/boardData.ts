import type { BoardMember } from "./BoardMemberCard";

export const BOARD_MEMBER_IMG = {
  debbie: "/img/board/debbie-benningfield.png",
  kathleen: "/img/board/kathleen-yeaman.jpg",
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
    name: "Kathleen Yeaman",
    role: "Treasurer",
    companion: "Covey",
    bio: "Kathleen has participated in Angel Paws for seven years and has a heart for serving the elderly. Professionally, Kathleen works in the energy industry. Personally, she finds joy and fulfillment in serving others. Being the hands and feet of Jesus is both a privilege and a responsibility. Covey brings joy and opens doors to personal connections on visits.",
    image: BOARD_MEMBER_IMG.kathleen,
    imageAlt: "Kathleen Yeaman, Treasurer of Angel Paws Pet Therapy",
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
