"use server";

import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/memberPortal/getAdminSession";
import { persistGalleryImages } from "@/lib/siteContent/galleryStore";
import { parseStoredGalleryImages } from "@/lib/siteContent/galleryTypes";

export type SaveGalleryState = { ok: boolean; message: string };

export async function saveGalleryDirect(
  payloadJson: string,
): Promise<SaveGalleryState> {
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

  const parsed = parseStoredGalleryImages(data);
  if (!parsed) {
    return { ok: false, message: "Each image needs a path, alt text, and active flag." };
  }

  const result = await persistGalleryImages(parsed);
  if (!result.ok) {
    const message =
      result.error === "no_storage"
        ? "Production storage is not set up. Add Upstash Redis env vars on Vercel."
        : "Could not save gallery.";
    return { ok: false, message };
  }

  revalidatePath("/");
  revalidatePath("/photo-gallery");
  revalidatePath("/admin/gallery");
  return { ok: true, message: "Saved. Gallery pages will update on next visit." };
}
