import Image from "next/image";
import { BOARD_IMG } from "./media";

export function MeetTheBoardImpact() {
  return (
    <section className="mx-auto mt-24 max-w-screen-2xl px-6 pb-12 sm:px-10 md:mt-32 lg:px-12">
      <div className="relative grid grid-cols-1 items-center lg:grid-cols-12">
        <div className="z-10 lg:col-span-7 lg:-mr-20">
          <div className="rounded-[2.5rem] bg-surface-container-lowest p-10 shadow-soft lg:p-20">
            <span className="mb-6 block text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Our Shared Vision
            </span>
            <h2 className="mb-8 font-serif text-4xl leading-tight text-on-surface md:text-5xl">
              Every paw print leaves a mark on the soul.
            </h2>
            <p className="mb-10 text-lg font-light leading-relaxed text-on-surface-variant">
              Our board meets monthly not just to review numbers, but to share
              stories from the field. It&apos;s this proximity to our
              mission—the actual wagging tails and the smiles they provoke—that
              keeps our leadership grounded and focused.
            </p>
            <div className="flex gap-12">
              <div>
                <span className="mb-1 block font-serif text-4xl text-primary">
                  500+
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                  Monthly Visits
                </span>
              </div>
              <div>
                <span className="mb-1 block font-serif text-4xl text-primary">
                  12
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                  Districts Served
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="relative mt-8 h-[min(400px,60vh)] overflow-hidden rounded-[3rem] lg:col-span-6 lg:mt-0 lg:h-[600px]">
          <Image
            src={BOARD_IMG.impact}
            alt="Therapy dog teams walking through a park at sunrise"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
