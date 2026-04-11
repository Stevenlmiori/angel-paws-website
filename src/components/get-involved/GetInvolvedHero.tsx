import Image from "next/image";
import { ABOUT_IMG } from "@/components/about/media";

/** Note: `page-3-Get-Involved.txt` in WebsiteBuild is a duplicate of Where We Serve; this page follows the “Become a Healing Presence” Blue Edition structure until dedicated HTML is available. */
export function GetInvolvedHero() {
  return (
    <section className="mx-auto mb-20 max-w-screen-xl px-6 sm:px-10 md:mb-28 lg:px-12">
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <span className="mb-4 inline-block rounded-full bg-primary-container/40 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
            Join Us
          </span>
          <h1 className="mb-8 font-serif text-5xl leading-[1.08] tracking-tight text-on-surface md:text-6xl lg:text-7xl">
            Become a{" "}
            <span className="italic text-primary">Healing Presence.</span>
          </h1>
          <p className="max-w-xl text-xl leading-relaxed text-on-surface-variant">
            Angel Paws grows through gentle hearts and steady hands—people who
            are willing to walk beside others with a well-trained companion and
            a posture of humility. Whether you dream of visiting beside a
            hospital bed or supporting teams behind the scenes, there is a place
            for you.
          </p>
        </div>
        <div className="relative aspect-[4/5] max-h-[520px] overflow-hidden rounded-[2.5rem] shadow-2xl lg:max-h-none lg:translate-y-2">
          <Image
            src={ABOUT_IMG.hero}
            alt="Therapy dog with a person in a warm, quiet moment of connection"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
