import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
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
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <AdminPageHeader
        title="Testimonials"
        description="Quotes on the homepage. Toggle “Show on homepage” to hide one without deleting it."
      />
      <TestimonialsEditor initialItems={items} />
    </div>
  );
}
