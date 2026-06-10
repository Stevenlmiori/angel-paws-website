"use server";

import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/memberPortal/getAdminSession";
import { persistTestimonials } from "@/lib/siteContent/testimonialsStore";
import { parseStoredTestimonials } from "@/lib/siteContent/testimonialTypes";

export type SaveTestimonialsState = { ok: boolean; message: string };

export async function saveTestimonialsDirect(
  payloadJson: string,
): Promise<SaveTestimonialsState> {
  const session = await getAdminSession();
  if (!session) {
    return { ok: false, message: "Not signed in." };
  }

  let data: unknown;
  try {
    data = JSON.parse(payloadJson);
  } catch {
    return { ok: false, message: "Invalid JSON." };
  }

  const parsed = parseStoredTestimonials(data);
  if (!parsed) {
    return { ok: false, message: "Each testimonial needs a quote and attribution." };
  }

  const result = await persistTestimonials(parsed);
  if (!result.ok) {
    const message =
      result.error === "no_storage"
        ? "Production storage is not set up. Add Upstash Redis env vars on Vercel."
        : "Could not save testimonials.";
    return { ok: false, message };
  }

  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  return { ok: true, message: "Saved. The homepage carousel will update on next visit." };
}
