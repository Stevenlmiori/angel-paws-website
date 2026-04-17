import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { getSanityWebhookSecret } from "@/lib/sanity/env";

export async function POST(req: NextRequest) {
  const secret = getSanityWebhookSecret();
  const { isValidSignature, body } = await parseBody(req, secret ?? undefined, true);

  if (secret && isValidSignature === false) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  const slug =
    body &&
    typeof body === "object" &&
    "slug" in body &&
    body.slug &&
    typeof body.slug === "object" &&
    "current" in body.slug &&
    typeof (body.slug as { current?: unknown }).current === "string"
      ? (body.slug as { current: string }).current
      : null;

  revalidatePath("/stories");
  revalidatePath("/");
  if (slug) {
    revalidatePath(`/stories/${slug}`);
  }

  return NextResponse.json({ revalidated: true, slug });
}
