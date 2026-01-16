import { NextResponse } from "next/server";

const TALLY_EVENT_URL = process.env.TALLY_EVENT_URL;

export async function POST(req: Request) {
  try {
    if (!TALLY_EVENT_URL) {
      // Don't break UX, but make it visible in logs once when debugging
      console.error("Missing env var: TALLY_EVENT_URL");
      return NextResponse.json({ ok: false, error: "missing_env" });
    }

    const body = await req.json();

    const payload: Record<string, any> = {
      event_type: body.event,
      session_id: body.props?.session_id,
      decision: body.props?.decision,
      duration_ms: body.props?.duration_ms,
      timestamp: new Date().toISOString(),
    };

    // Tally behaves like a normal HTML form submission
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(payload)) {
      if (v === undefined || v === null) continue;
      params.append(k, String(v));
    }

    const res = await fetch(TALLY_EVENT_URL, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    // Helpful when debugging once (you can remove later)
    if (!res.ok) {
      const text = await res.text();
      console.error("Tally submit failed:", res.status, text.slice(0, 300));
      return NextResponse.json({ ok: false, status: res.status });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Event handler error:", err);
    return NextResponse.json({ ok: false });
  }
}
