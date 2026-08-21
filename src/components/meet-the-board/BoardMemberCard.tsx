import Image from "next/image";
import { PawPrint } from "lucide-react";

export type BoardMember = {
  name: string;
  role: string;
  companion?: string;
  bio: string;
  image?: string;
  imageAlt?: string;
};

function memberInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function BoardMemberCard({ member }: { member: BoardMember }) {
  return (
    <article className="group">
      <div className="relative mb-6 overflow-hidden rounded-[2rem] bg-surface-container-low p-2 transition-colors duration-500 group-hover:bg-surface-container-high">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem]">
          {member.image ? (
            <Image
              src={member.image}
              alt={member.imageAlt ?? member.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
            />
          ) : (
            <div
              className="flex size-full items-center justify-center bg-gradient-to-br from-primary-container/50 to-secondary-container/40 font-serif text-5xl text-primary"
              aria-hidden
            >
              {memberInitials(member.name)}
            </div>
          )}
        </div>
      </div>
      <div>
        <h3 className="font-serif text-2xl text-on-surface">{member.name}</h3>
        <p className="mt-1 font-sans text-xs font-bold uppercase tracking-[0.2em] text-primary">
          {member.role}
        </p>
        {member.companion ? (
          <p className="mt-2.5 mb-4 flex items-center gap-1.5 text-sm text-on-surface-variant">
            <PawPrint className="size-4 shrink-0 text-primary" strokeWidth={1.75} aria-hidden />
            <span>
              Companion:{" "}
              <strong className="font-medium text-on-surface">
                {member.companion}
              </strong>
            </span>
          </p>
        ) : (
          <div className="mb-4" />
        )}
        <p className="font-light leading-relaxed text-on-surface-variant">
          {member.bio}
        </p>
      </div>
    </article>
  );
}
