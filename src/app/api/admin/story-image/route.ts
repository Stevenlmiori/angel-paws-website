import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/memberPortal/getAdminSession";
import { sanityWriteClient } from "@/lib/sanity/client";

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const client = sanityWriteClient();
  if (!client) {
    return NextResponse.json(
      { error: "Sanity write client is not configured." },
      { status: 503 },
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Missing image file." }, { status: 400 });
  }

  const buf = Buffer.from(await file.arrayBuffer());
  const asset = await client.assets.upload("image", buf, {
    filename: file.name || "story-inline.jpg",
    contentType: file.type || "image/jpeg",
  });

  return NextResponse.json({ ref: asset._id });
}
