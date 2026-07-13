import { ColoringPagesGrid } from "@/components/coloring-pages/ColoringPagesGrid";
import { Section } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/seo";
import { loadActiveColoringPages } from "@/lib/siteContent/coloringPagesStore";
import { Sparkles } from "lucide-react";

export const metadata = pageMetadata({
  title: "Therapy Dog Coloring Pages",
  description:
    "Free printable coloring pages featuring Angel Paws therapy dogs. Download letter-size pages for kids, classrooms, and community events.",
  path: "/coloring-pages",
  keywords: [
    "therapy dog coloring pages",
    "Angel Paws coloring sheets",
    "printable dog coloring pages",
  ],
});

export const dynamic = "force-dynamic";

export default async function ColoringPagesPage() {
  const pages = await loadActiveColoringPages();

  return (
    <>
      <Section
        tone="inverse"
        className="!pt-28 md:!pt-32 !pb-16 md:!pb-20"
      >
        <div className="mx-auto max-w-screen-xl px-6 sm:px-10 lg:px-12">
          <div className="max-w-2xl">
            <p className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-primary">
              <Sparkles className="size-4" aria-hidden />
              For kids &amp; classrooms
            </p>
            <h1 className="mb-6 font-serif text-5xl leading-tight md:text-6xl">
              Meet our dogs — then color them in
            </h1>
            <p className="text-lg leading-relaxed text-on-surface-inverse-muted">
              Color our therapy dogs online with brush and tap-to-fill tools, or
              download free letter-size pages for crayons and markers at home or
              in the classroom.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="warm" className="!pt-12 !pb-20 md:!pt-16 md:!pb-28">
        <div className="mx-auto max-w-screen-xl px-6 sm:px-10 lg:px-12">
          {pages.length > 0 ? (
            <ColoringPagesGrid pages={pages} />
          ) : (
            <p className="rounded-[2rem] bg-white px-8 py-12 text-center text-on-surface-variant shadow-soft">
              Coloring pages are being refreshed. Please check back soon.
            </p>
          )}
          <p className="mt-14 max-w-2xl text-sm leading-relaxed text-on-surface-variant">
            These pages are free to print for personal use, classrooms, and
            community events. Please do not sell or redistribute the artwork.
            Questions?{" "}
            <a
              href="/contact"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              Get in touch
            </a>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
