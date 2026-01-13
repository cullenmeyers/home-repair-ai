// app/api/event/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Minimal server-side logging (shows in Vercel logs)
    console.log("[event]", JSON.stringify(body));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[event] error", err);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
