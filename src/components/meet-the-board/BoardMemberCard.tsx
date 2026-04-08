import Image from "next/image";
import { PawPrint } from "lucide-react";

export type BoardMember = {
  name: string;
  role: string;
  companion: string;
  bio: string;
  image: string;
  imageAlt: string;
};

export function BoardMemberCard({ member }: { member: BoardMember }) {
  return (
    <article className="group">
      <div className="relative mb-6 overflow-hidden rounded-[2rem] bg-surface-container-low p-2 transition-colors duration-500 group-hover:bg-surface-container-high">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem]">
          <Image
            src={member.image}
            alt={member.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
          />
        </div>
      </div>
      <div>
        <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
          <h3 className="font-serif text-2xl text-on-surface">{member.name}</h3>
          <span className="rounded-full bg-primary/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-primary">
            {member.role}
          </span>
        </div>
        <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-secondary">
          <PawPrint className="size-4 shrink-0" strokeWidth={2} aria-hidden />
          Companion: {member.companion}
        </p>
        <p className="font-light leading-relaxed text-on-surface-variant">
          {member.bio}
        </p>
      </div>
    </article>
  );
}
