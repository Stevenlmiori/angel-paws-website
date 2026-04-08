import { BOARD_IMG } from "./media";
import type { BoardMember } from "./BoardMemberCard";

export const boardMembers: BoardMember[] = [
  {
    name: "Sarah Jenkins",
    role: "President",
    companion: "Barnaby",
    bio: "With 15 years in healthcare administration, Sarah founded Angel Paws after seeing the transformative effect Barnaby had on hospital patients during their private visits.",
    image: BOARD_IMG.sarah,
    imageAlt: "Sarah Jenkins with her black Labrador, Barnaby",
  },
  {
    name: "Michael Chen",
    role: "Treasurer",
    companion: "Pippin",
    bio: "Michael brings financial precision and a soft heart to the board. He believes that emotional support should be accessible to everyone, regardless of their circumstances.",
    image: BOARD_IMG.michael,
    imageAlt: "Michael Chen with his terrier, Pippin",
  },
  {
    name: "Elena Rodriguez",
    role: "Secretary",
    companion: "Luna",
    bio: "A retired school teacher, Elena coordinates our education initiatives. She is passionate about the bond between therapy animals and children with learning disabilities.",
    image: BOARD_IMG.elena,
    imageAlt: "Elena Rodriguez with her Samoyed, Luna",
  },
  {
    name: "David Thorne",
    role: "Strategy",
    companion: "Copper",
    bio: "David ensures our long-term growth is sustainable. His dog Copper is a favorite at the local veterans' hospice where they visit weekly.",
    image: BOARD_IMG.david,
    imageAlt: "David Thorne with his beagle, Copper",
  },
  {
    name: "Maya Patel",
    role: "Community",
    companion: "Roo",
    bio: "Maya leads our community outreach and volunteer recruitment. Her background in social work helps us identify new areas where pet therapy can make a difference.",
    image: BOARD_IMG.maya,
    imageAlt: "Maya Patel with her golden retriever, Roo",
  },
];
