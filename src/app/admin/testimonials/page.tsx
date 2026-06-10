import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getAdminSession } from "@/lib/memberPortal/getAdminSession";
import { loadStoredTestimonials } from "@/lib/siteContent/testimonialsStore";
import { TestimonialsEditor } from "./TestimonialsEditor";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  noStore();
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/member-portal/login");
  }

  const items = await loadStoredTestimonials();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:px-10 md:py-24 lg:px-12">
      <Link
        href="/admin"
        className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Site admin
      </Link>
      <h1 className="font-serif text-4xl text-on-surface">Testimonials</h1>
      <p className="mt-3 max-w-xl text-on-surface-variant">
        Edit the rotating quotes on the homepage. No photos—text only, minimal
        and classy.
      </p>
      <div className="mt-10">
        <TestimonialsEditor initialItems={items} />
      </div>
    </div>
  );
}
