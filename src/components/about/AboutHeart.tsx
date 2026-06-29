import Image from "next/image";
import { DEBBIE_IMG } from "@/lib/debbieImages";

const beliefPhotos = [
  { src: DEBBIE_IMG.lily, alt: "Lily, Angel Paws therapy dog" },
  { src: DEBBIE_IMG.lexie, alt: "Lexie during a visit" },
  { src: DEBBIE_IMG.boone, alt: "Boone, therapy dog" },
  { src: DEBBIE_IMG.kylo, alt: "Kylo during a community visit" },
] as const;

export function AboutHeart() {
  return (
    <section className="section-tone-inverse pt-24 pb-12 md:pt-32 md:pb-16">
      <div className="mx-auto max-w-screen-xl px-6 sm:px-10 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6 text-lg leading-relaxed text-on-surface-inverse-muted">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary-container">
              This is the heart of Angel Paws
            </p>
            <p>
              This ministry is also deeply grateful for every church, school,
              hospital, and community partner that opens a door for our teams to
              serve. We do not take those invitations lightly.
            </p>
            <p>
              As God continues to call Angel Paws to serve an even greater area,
              we know the next step was to form a 501(c)(3). Angel Paws trusted
              that calling and is now a 501(c)(3) nonprofit organization, ready
              to go wherever God calls us.
            </p>
            <p>
              God is still opening doors—sometimes in familiar hallways, sometimes
              in places of grief we never expected to walk. Our prayer is to keep
              showing up with excellence, humility, and the steady comfort our
              pets bring.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-3 lg:grid-cols-2">
            {beliefPhotos.map((photo) => (
              <li
                key={photo.src}
                className="relative aspect-square overflow-hidden rounded-2xl bg-surface-container-low shadow-soft md:rounded-3xl"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
