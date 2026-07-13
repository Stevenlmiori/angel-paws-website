"use server";

import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/memberPortal/getAdminSession";
import { persistColoringPages } from "@/lib/siteContent/coloringPagesStore";
import { parseStoredColoringPages } from "@/lib/siteContent/coloringPageTypes";

export type SaveColoringPagesState = { ok: boolean; message: string };

export async function saveColoringPagesDirect(
  payloadJson: string,
): Promise<SaveColoringPagesState> {
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

  const parsed = parseStoredColoringPages(data);
  if (!parsed) {
    return {
      ok: false,
      message:
        "Each coloring page needs a name, image, unique URL slug, and visible setting.",
    };
  }

  const result = await persistColoringPages(parsed);
  if (!result.ok) {
    const message =
      result.error === "no_storage"
        ? "Production storage is not set up. Add Upstash Redis env vars on Vercel."
        : "Could not save coloring pages.";
    return { ok: false, message };
  }

  revalidatePath("/coloring-pages");
  revalidatePath("/admin/coloring-pages");
  for (const page of parsed) {
    revalidatePath(`/coloring-pages/${page.slug}/color`);
  }
  return {
    ok: true,
    message: "Saved. Coloring pages will update on next visit.",
  };
}
