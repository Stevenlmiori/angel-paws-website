import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  CircleCheck,
  School,
  Stethoscope,
  UserRound,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { SERVE_IMG } from "./media";

function ImagePanel({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="group relative h-[min(500px,70vh)] overflow-hidden rounded-[2rem] shadow-lg lg:h-[500px]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 58vw"
        className="object-cover transition-transform duration-1000 group-hover:scale-105"
      />
    </div>
  );
}

export function WhereWeServeAreas() {
  return (
    <section className="mx-auto max-w-screen-2xl space-y-24 px-6 sm:px-10 lg:space-y-32 lg:px-12">
      {/* Hospitals */}
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <ImagePanel
            src={SERVE_IMG.hospitals}
            alt="Patient's hand resting gently on a therapy dog in a recovery setting"
          />
        </div>
        <div className="lg:col-span-5">
          <div className="mb-6 flex items-center gap-3 text-primary">
            <Stethoscope className="size-10 shrink-0" strokeWidth={1.5} />
            <h2 className="font-serif text-3xl font-bold text-on-surface">
              Hospitals
            </h2>
          </div>
          <p className="mb-8 text-lg leading-loose text-on-surface-variant">
            In the sterile silence of recovery units and waiting rooms, our
            teams offer a vital spark of normalcy. We serve adult and pediatric
            wards, rehabilitation centers, and oncology units, providing a
            non-clinical touch that lowers stress and encourages healing.
          </p>
          <ul className="space-y-4">
            {[
              "Critical & Intensive Care Support",
              "Post-Operative Rehabilitation Motivation",
              "Waiting Area Anxiety Reduction",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CircleCheck
                  className="mt-0.5 size-6 shrink-0 text-primary"
                  strokeWidth={2}
                  aria-hidden
                />
                <span className="font-medium text-on-surface">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Schools */}
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="order-2 lg:order-1 lg:col-span-5">
          <div className="mb-6 flex items-center gap-3 text-primary">
            <BookOpen className="size-10 shrink-0" strokeWidth={1.5} />
            <h2 className="font-serif text-3xl font-bold text-on-surface">
              Schools &amp; Reading
            </h2>
          </div>
          <p className="mb-8 text-lg leading-loose text-on-surface-variant">
            Our &ldquo;Paws to Read&rdquo; program transforms the literacy
            journey for young learners. By providing a non-judgmental, furry
            listener, we help children build confidence, fluency, and a
            lifelong love for stories.
          </p>
          <div className="mb-8 rounded-2xl bg-surface-container-low p-8">
            <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
              Program Highlight
            </h4>
            <p className="font-serif italic text-on-surface">
              &ldquo;Dogs don&apos;t correct pronunciation; they just wag their
              tails and listen to the magic of the words.&rdquo;
            </p>
          </div>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <BookOpen
                className="mt-0.5 size-6 shrink-0 text-primary"
                strokeWidth={2}
                aria-hidden
              />
              <span className="font-medium text-on-surface">
                One-on-One Literacy Coaching
              </span>
            </li>
            <li className="flex items-start gap-3">
              <School
                className="mt-0.5 size-6 shrink-0 text-primary"
                strokeWidth={2}
                aria-hidden
              />
              <span className="font-medium text-on-surface">
                University Finals Week De-stressing
              </span>
            </li>
          </ul>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-7">
          <ImagePanel
            src={SERVE_IMG.schools}
            alt="Children reading to a golden retriever in a school library"
          />
        </div>
      </div>

      {/* Care facilities */}
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <ImagePanel
            src={SERVE_IMG.care}
            alt="Resident with a small dog in a comfortable sunlit living area"
          />
        </div>
        <div className="lg:col-span-5">
          <div className="mb-6 flex items-center gap-3 text-primary">
            <UserRound className="size-10 shrink-0" strokeWidth={1.5} />
            <h2 className="font-serif text-3xl font-bold text-on-surface">
              Care Facilities
            </h2>
          </div>
          <p className="mb-8 text-lg leading-loose text-on-surface-variant">
            Loneliness can be a heavy burden in assisted living. Our therapy
            dogs provide tactile comfort and a social bridge, sparking memories
            of former pets and facilitating meaningful conversations between
            residents and staff.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-surface-container p-6 shadow-soft">
              <div className="mb-1 text-3xl font-bold text-primary">85%</div>
              <div className="text-xs font-bold uppercase tracking-tight text-on-surface-variant">
                Resident Engagement Increase
              </div>
            </div>
            <div className="rounded-xl bg-surface-container p-6 shadow-soft">
              <div className="mb-1 text-3xl font-bold text-primary">400+</div>
              <div className="text-xs font-bold uppercase tracking-tight text-on-surface-variant">
                Visits Annually
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Community */}
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="order-2 lg:order-1 lg:col-span-5">
          <div className="mb-6 flex items-center gap-3 text-primary">
            <UsersRound className="size-10 shrink-0" strokeWidth={1.5} />
            <h2 className="font-serif text-3xl font-bold text-on-surface">
              Community Outreach
            </h2>
          </div>
          <p className="mb-8 text-lg leading-loose text-on-surface-variant">
            Beyond the walls of institutions, Angel Paws is active in the heart
            of our city. We provide support at community events, memorials, and
            public safety initiatives, demonstrating the power of the
            human-animal bond for all.
          </p>
          <Link
            href="#"
            className="group inline-flex items-center gap-2 font-bold tracking-tight text-primary transition-opacity hover:opacity-80"
          >
            Explore Event Calendar
            <ArrowRight
              className="size-5 transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-7">
          <ImagePanel
            src={SERVE_IMG.community}
            alt="Community fair with therapy dogs in Angel Paws vests"
          />
        </div>
      </div>
    </section>
  );
}
