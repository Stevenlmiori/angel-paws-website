import { loadActiveTestimonials } from "@/lib/siteContent/testimonialsStore";
import { TestimonialsCarousel } from "./TestimonialsCarousel";

export async function HomeTestimonials() {
  const testimonials = await loadActiveTestimonials();
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="bg-surface-container-low py-24 md:py-32">
      <div className="mx-auto max-w-screen-xl px-6 sm:px-10 lg:px-12">
        <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.24em] text-primary">
          Testimonials
        </p>
        <h2 className="mb-14 text-center font-serif text-4xl text-on-surface md:text-5xl">
          Voices from the field
        </h2>
        <TestimonialsCarousel testimonials={testimonials} />
      </div>
    </section>
  );
}
