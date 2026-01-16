import { NextResponse } from "next/server";

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME;

export async function POST(req: Request) {
  try {
    if (!AIRTABLE_TOKEN || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_NAME) {
      console.error("Missing Airtable env vars", {
        hasToken: !!AIRTABLE_TOKEN,
        hasBase: !!AIRTABLE_BASE_ID,
        hasTable: !!AIRTABLE_TABLE_NAME,
      });
      return NextResponse.json({ ok: false, error: "missing_env" });
    }

    const body = await req.json();

    // Build Airtable fields (only include values that exist)
    const fields: Record<string, any> = {
      event_type: body.event,
      session_id: body.props?.session_id,
      decision: body.props?.decision,
      duration_ms: body.props?.duration_ms,
    };

    // Remove undefined/null so Airtable doesn't complain
    for (const k of Object.keys(fields)) {
      if (fields[k] === undefined || fields[k] === null) delete fields[k];
    }

    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(
      AIRTABLE_TABLE_NAME
    )}`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [{ fields }],
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Airtable write failed:", res.status, text.slice(0, 500));
      return NextResponse.json({ ok: false, status: res.status });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Event handler error:", err);
    return NextResponse.json({ ok: false });
  }
}
