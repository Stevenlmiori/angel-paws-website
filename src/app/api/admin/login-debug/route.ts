import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { buildLoginDebugSnapshot } from "@/lib/memberPortal/loginDebugSnapshot";

function readKeyFromBody(body: unknown): string {
  if (
    typeof body === "object" &&
    body !== null &&
    "key" in body &&
    typeof (body as { key: unknown }).key === "string"
  ) {
    return (body as { key: string }).key;
  }
  return "";
}

export async function POST(request: Request) {
  const expected = process.env.ADMIN_LOGIN_DEBUG_KEY?.trim() ?? "";
  if (expected.length < 16) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const key = readKeyFromBody(body);
  const a = Buffer.from(key, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const snapshot = await buildLoginDebugSnapshot();
  return NextResponse.json(snapshot);
}
