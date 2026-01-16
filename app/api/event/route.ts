import { NextResponse } from "next/server";

const TALLY_EVENT_URL = process.env.TALLY_EVENT_URL!;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const payload = {
      event_type: body.event,
      session_id: body.props?.session_id,
      decision: body.props?.decision,
      duration_ms: body.props?.duration_ms,
      timestamp: new Date().toISOString(),
    };

    // Send event to Tally
    await fetch(TALLY_EVENT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    // Never break UX because of analytics
    return NextResponse.json({ ok: false });
  }
}
