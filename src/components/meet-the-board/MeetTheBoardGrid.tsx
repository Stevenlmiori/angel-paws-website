import Link from "next/link";
import { BoardMemberCard } from "./BoardMemberCard";
import { boardMembers } from "./boardData";

export function MeetTheBoardGrid() {
  return (
    <section className="mx-auto max-w-screen-2xl px-6 sm:px-10 lg:px-12">
      <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
        {boardMembers.map((member) => (
          <BoardMemberCard key={member.name} member={member} />
        ))}
        <article className="relative flex flex-col items-center justify-center rounded-[2rem] bg-primary p-10 text-center text-on-primary md:p-12">
          <h3 className="mb-4 font-serif text-3xl">Could you be next?</h3>
          <p className="mb-8 font-light opacity-90">
            We are always looking for passionate individuals to join our
            advisory councils and committees.
          </p>
          <Link
            href="/get-involved"
            className="rounded-full bg-surface-container-lowest px-8 py-3 font-bold text-primary transition-transform hover:scale-[1.02]"
          >
            Get Involved
          </Link>
          <div
            className="pointer-events-none absolute inset-0 opacity-10"
            aria-hidden
          >
            <svg className="size-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M47.5,-51.2C61.4,-38.3,72.4,-22.4,74.5,-5.5C76.6,11.3,69.8,29.1,57.5,42.4C45.2,55.7,27.3,64.4,8,63.2C-11.4,62.1,-32.2,51.1,-46.7,36.5C-61.2,21.9,-69.3,3.7,-67,-14.2C-64.7,-32.1,-52,-49.6,-36.5,-62.1C-21,-74.6,-2.7,-82.1,10.6,-83.1C24,-84.1,33.6,-64,47.5,-51.2Z"
                fill="#ffffff"
                transform="translate(100 100)"
              />
            </svg>
          </div>
        </article>
      </div>
    </section>
  );
}
