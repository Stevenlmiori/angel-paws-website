import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/memberPortal/getAdminSession";
import { sanityWriteClient } from "@/lib/sanity/client";
import { readVerifiedImageUpload } from "@/lib/security/uploads";

async function saveLocalUpload(buffer: Buffer, filenameBase: string): Promise<string> {
  const filename = `${Date.now()}-${path.basename(filenameBase)}`;
  const dir = path.join(process.cwd(), "public", "gallery", "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), buffer);
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
      const upload = await readVerifiedImageUpload(file, "gallery-upload.jpg");
      if (!upload.ok) {
        return NextResponse.json(
          { error: upload.message },
          { status: upload.status },
        );
      }
      const src = await saveLocalUpload(upload.value.buffer, upload.value.filename);
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
  const upload = await readVerifiedImageUpload(file, "gallery-upload.jpg");
  if (!upload.ok) {
    return NextResponse.json(
      { error: upload.message },
      { status: upload.status },
    );
  }

  try {
    const asset = await client.assets.upload("image", upload.value.buffer, {
      filename: upload.value.filename,
      contentType: upload.value.contentType,
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
      const src = await saveLocalUpload(upload.value.buffer, upload.value.filename);
      return NextResponse.json({ src });
    }

    return NextResponse.json(
      { error: uploadErrorMessage(error) },
      { status: 500 },
    );
  }
}
