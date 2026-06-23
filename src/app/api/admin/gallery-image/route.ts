import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/memberPortal/getAdminSession";
import { sanityWriteClient } from "@/lib/sanity/client";

function safeFilename(name: string): string {
  const base = path.basename(name).replace(/[^a-zA-Z0-9._-]+/g, "-");
  return base.length > 0 ? base : `upload-${Date.now()}.jpg`;
}

async function saveLocalUpload(file: File): Promise<string> {
  const filename = `${Date.now()}-${safeFilename(file.name || "gallery-upload.jpg")}`;
  const dir = path.join(process.cwd(), "public", "gallery", "uploads");
  await mkdir(dir, { recursive: true });
  const buf = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, filename), buf);
  return `/gallery/uploads/${filename}`;
}

function uploadErrorMessage(error: unknown): string {
  const message = error instanceof Error ? error.message : "";
  if (/permission|insufficient/i.test(message)) {
    return "Image storage is connected, but the Sanity token needs permission to create image assets.";
  }
  return message || "Upload failed.";
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const client = sanityWriteClient();
  if (!client) {
    if (process.env.NODE_ENV !== "production") {
      const formData = await request.formData();
      const file = formData.get("file");
      if (!(file instanceof File) || file.size === 0) {
        return NextResponse.json({ error: "Missing image file." }, { status: 400 });
      }
      const src = await saveLocalUpload(file);
      return NextResponse.json({ src });
    }

    return NextResponse.json(
      { error: "Image uploads are not configured." },
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

  try {
    const buf = Buffer.from(await file.arrayBuffer());
    const asset = await client.assets.upload("image", buf, {
      filename: file.name || "gallery-upload.jpg",
      contentType: file.type || "image/jpeg",
    });

    if (!asset.url) {
      return NextResponse.json(
        { error: "Image upload finished without a usable URL." },
        { status: 502 },
      );
    }

    return NextResponse.json({ src: asset.url });
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      const src = await saveLocalUpload(file);
      return NextResponse.json({ src });
    }

    return NextResponse.json(
      { error: uploadErrorMessage(error) },
      { status: 500 },
    );
  }
}
