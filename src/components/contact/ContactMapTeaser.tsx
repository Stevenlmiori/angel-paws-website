import Image from "next/image";
import Link from "next/link";
import { CONTACT_IMG } from "./media";

export function ContactMapTeaser() {
  return (
    <section className="mx-auto max-w-screen-xl px-6 sm:px-10 lg:px-12">
      <div className="group relative h-[min(400px,55vh)] overflow-hidden rounded-[3rem] md:h-[400px] md:rounded-[4rem]">
        <Image
          src={CONTACT_IMG.map}
          alt="Therapy team outdoors—suggesting Greater Houston service area"
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-blue-900/40 p-8 text-center backdrop-blur-sm md:p-12">
          <div>
            <h2 className="mb-6 font-serif text-4xl text-white md:text-5xl">
              We Serve Across the Region
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-xl text-white/80">
              From hospitals to schools, we bring comfort wherever it&apos;s
              needed most in the Tri-State area.
            </p>
            <Link
              href="/where-we-serve"
              className="inline-flex rounded-full bg-white/20 px-10 py-4 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-blue-900"
            >
              Explore Service Areas
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
