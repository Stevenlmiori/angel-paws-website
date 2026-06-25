import path from "node:path";

const MAX_IMAGE_UPLOAD_BYTES = 8 * 1024 * 1024;

const allowedTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

type ImageUploadOk = {
  ok: true;
  value: {
    buffer: Buffer;
    contentType: string;
    filename: string;
  };
};

type ImageUploadError = {
  ok: false;
  status: number;
  message: string;
};

function safeFilename(name: string, fallback: string): string {
  const base = path.basename(name || fallback).replace(/[^a-zA-Z0-9._-]+/g, "-");
  return base.length > 0 ? base : fallback;
}

function sniffImageContentType(buffer: Buffer): string | null {
  if (
    buffer.length >= 3 &&
    buffer[0] === 0xff &&
    buffer[1] === 0xd8 &&
    buffer[2] === 0xff
  ) {
    return "image/jpeg";
  }
  if (
    buffer.length >= 8 &&
    buffer.subarray(0, 8).equals(
      Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    )
  ) {
    return "image/png";
  }
  if (
    buffer.length >= 12 &&
    buffer.subarray(0, 4).toString("ascii") === "RIFF" &&
    buffer.subarray(8, 12).toString("ascii") === "WEBP"
  ) {
    return "image/webp";
  }
  if (
    buffer.length >= 6 &&
    (buffer.subarray(0, 6).toString("ascii") === "GIF87a" ||
      buffer.subarray(0, 6).toString("ascii") === "GIF89a")
  ) {
    return "image/gif";
  }
  return null;
}

export async function readVerifiedImageUpload(
  file: File,
  fallbackFilename: string,
): Promise<ImageUploadOk | ImageUploadError> {
  if (file.size <= 0) {
    return { ok: false, status: 400, message: "Missing image file." };
  }
  if (file.size > MAX_IMAGE_UPLOAD_BYTES) {
    return {
      ok: false,
      status: 413,
      message: "Image is too large. Upload an image under 8 MB.",
    };
  }
  if (!allowedTypes.has(file.type)) {
    return {
      ok: false,
      status: 415,
      message: "Upload a JPG, PNG, WebP, or GIF image.",
    };
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const detected = sniffImageContentType(buffer);
  if (!detected || detected !== file.type) {
    return {
      ok: false,
      status: 415,
      message: "The uploaded file does not match a supported image type.",
    };
  }

  return {
    ok: true,
    value: {
      buffer,
      contentType: detected,
      filename: safeFilename(file.name, fallbackFilename),
    },
  };
}
