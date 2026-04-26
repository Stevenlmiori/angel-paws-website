import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { writeRedisHeartbeat } from "@/lib/memberPortal/resourcesStore";

export const dynamic = "force-dynamic";

function tokenFromRequest(request: Request): string {
  const auth = request.headers.get("authorization") ?? "";
  const match = /^Bearer\s+(\S+)$/i.exec(auth);
  if (match?.[1]) {
    return match[1].trim();
  }

  const header = request.headers.get("x-cron-secret");
  return header?.trim() ?? "";
}

function secureTokenEqual(actual: string, expected: string): boolean {
  const a = Buffer.from(actual, "utf8");
  const b = Buffer.from(expected, "utf8");
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function GET(request: Request) {
  const expected =
    process.env.REDIS_HEARTBEAT_SECRET?.trim() ??
    process.env.CRON_SECRET?.trim() ??
    "";
  if (!expected || expected.length < 16) {
    return NextResponse.json(
      { ok: false, error: "misconfigured_secret" },
      { status: 503 },
    );
  }

  const provided = tokenFromRequest(request);
  if (!provided || !secureTokenEqual(provided, expected)) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  const result = await writeRedisHeartbeat();
  if (!result.ok) {
    const status = result.error === "no_storage" ? 503 : 500;
    return NextResponse.json({ ok: false, error: result.error }, { status });
  }

  return NextResponse.json({ ok: true });
}
