import Image from "next/image";

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
              As God continued to call Angel Paws to serve an even greater area,
              we knew the next step was to form a 501(c)(3). Angel Paws trusted
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
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-surface-container-low shadow-soft md:rounded-[2.5rem]">
            <Image
              src="/img/lillian-and-lily.jpg"
              alt="Lillian with foster children and rescue therapy dog Lily at Redeemer Church"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
