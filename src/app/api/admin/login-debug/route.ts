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
    return (body as { key: string }).key.trim();
  }
  return "";
}

function bearerFromRequest(request: Request): string {
  const raw = request.headers.get("authorization") ?? "";
  const m = /^Bearer\s+(\S+)/i.exec(raw);
  return m?.[1]?.trim() ?? "";
}

export async function POST(request: Request) {
  const expected = process.env.ADMIN_LOGIN_DEBUG_KEY?.trim() ?? "";
  if (!expected || expected.length < 16) {
    return NextResponse.json(
      {
        error: "debug_disabled",
        hint: "This deployment has no ADMIN_LOGIN_DEBUG_KEY (or it is shorter than 16 characters). In Vercel, add it for the same environment as this URL (usually Production), save, then redeploy.",
      },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: "bad_json",
        hint: "The browser did not send valid JSON. Try again, or use a different browser.",
      },
      { status: 400 },
    );
  }

  const keyFromBody = readKeyFromBody(body);
  const keyFromBearer = bearerFromRequest(request);
  const key = keyFromBody || keyFromBearer;

  const a = Buffer.from(key, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return NextResponse.json(
      {
        error: "invalid_key",
        hint: "The key does not match ADMIN_LOGIN_DEBUG_KEY on this deployment. Open Vercel → Settings → Environment Variables, copy the value again for Production (if you use www), paste here with no spaces before/after, save in Vercel if you changed it, then redeploy so the server picks it up.",
      },
      { status: 401 },
    );
  }

  const snapshot = await buildLoginDebugSnapshot();
  return NextResponse.json(snapshot);
}
