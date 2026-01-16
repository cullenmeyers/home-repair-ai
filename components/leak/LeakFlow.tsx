// components/leak/LeakFlow.tsx
"use client";

import Script from "next/script";
import { useEffect, useMemo, useRef, useState } from "react";
import { evaluateLeak, LeakAnswers, LeakWhere, YesNo } from "./leakLogic";

type Step = 1 | 2 | 3 | 4;

const TALLY_SRC =
  "https://tally.so/r/zxM7A1?hideTitle=1&transparentBackground=1&dynamicHeight=1";

function newId() {
  // crypto.randomUUID is supported in modern browsers; fallback just in case
  try {
    // @ts-ignore
    return crypto.randomUUID();
  } catch {
    return `id_${Math.random().toString(16).slice(2)}_${Date.now()}`;
  }
}

/**
 * We treat "session_id" as a "run id" for ONE attempt through the flow.
 * - New run id on first load
 * - New run id on reset
 */
function getOrCreateRunId() {
  if (typeof window === "undefined") return "server";
  const key = "leak_run_id";
  let id = window.sessionStorage.getItem(key);
  if (!id) {
    id = newId();
    window.sessionStorage.setItem(key, id);
  }
  return id;
}

function setNewRunId() {
  if (typeof window === "undefined") return "server";
  const key = "leak_run_id";
  const id = newId();
  window.sessionStorage.setItem(key, id);
  return id;
}

async function track(event: string, props?: Record<string, any>) {
  try {
    await fetch("/api/event", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ event, props }),
      keepalive: true,
    });
  } catch {
    // ignore (tracking should never break UX)
  }
}

export default function LeakFlow() {
  const [step, setStep] = useState<Step>(1);

  const [where, setWhere] = useState<LeakWhere | null>(null);
  const [actively, setActively] = useState<YesNo | null>(null);
  const [danger, setDanger] = useState<YesNo | null>(null);

  // Tally (optional save after value)
  const [saveOpen, setSaveOpen] = useState(false);
  const [tallyLoaded, setTallyLoaded] = useState(false);

  // Run/session tracking
  const [runId, setRunId] = useState<string>(() => getOrCreateRunId());
  const startTimeRef = useRef<number>(Date.now());
  const completedRef = useRef<boolean>(false);

  const result = useMemo(() => {
    if (!where || !actively || !danger) return null;
    const answers: LeakAnswers = {
      where,
      actively_dripping: actively,
      danger_triggers: danger,
    };
    return evaluateLeak(answers);
  }, [where, actively, danger]);

  // Track: flow started (once per run)
  useEffect(() => {
    // when runId changes (new run), reset timers/flags and send "started"
    startTimeRef.current = Date.now();
    completedRef.current = false;

    track("leak_flow_started", {
      session_id: runId,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runId]);

  // Track: flow completed (once per run)
  useEffect(() => {
    if (step !== 4 || !result) return;
    if (completedRef.current) return;

    completedRef.current = true;

    const duration_ms = Date.now() - startTimeRef.current;

    track("leak_flow_completed", {
      session_id: runId,
      where,
      actively,
      danger,
      decision: result.decision,
      urgency: result.urgencyLabel,
      duration_ms,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, result]);

  // When the save form opens, ensure tally loads embeds
  useEffect(() => {
    if (!saveOpen) return;
    if (!tallyLoaded) return;

    const t = setTimeout(() => {
      // @ts-ignore
      window.Tally?.loadEmbeds?.();
    }, 50);

    return () => clearTimeout(t);
  }, [saveOpen, tallyLoaded]);

  const reset = () => {
    setStep(1);
    setWhere(null);
    setActively(null);
    setDanger(null);
    setSaveOpen(false);

    track("leak_flow_reset", {
      session_id: runId,
    });

    // Start a brand new run id so this attempt is measured separately
    const next = setNewRunId();
    setRunId(next);
  };

  const badge =
    !result
      ? null
      : result.decision === "escalate"
      ? "Recommendation: ESCALATE"
      : result.decision === "submit"
      ? "Recommendation: SUBMIT"
      : "Recommendation: MONITOR";

  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="afterInteractive"
        onLoad={() => {
          setTallyLoaded(true);
          // @ts-ignore
          window.Tally?.loadEmbeds?.();
        }}
      />

      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold">Quick leak check</p>
        <p className="text-xs text-neutral-600">3 taps • instant result</p>
      </div>

      {/* Step 1 */}
      {step === 1 ? (
        <div className="mt-5">
          <p className="text-sm font-semibold">1) Where is the leak?</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <Choice
              title="Under a sink"
              desc="Under cabinet, damp or pooling"
              onClick={() => {
                setWhere("under_sink");
                setStep(2);
                track("leak_q1_answered", {
                  session_id: runId,
                  where: "under_sink",
                });
              }}
            />
            <Choice
              title="Toilet area"
              desc="Running, water near base/valve"
              onClick={() => {
                setWhere("toilet");
                setStep(2);
                track("leak_q1_answered", {
                  session_id: runId,
                  where: "toilet",
                });
              }}
            />
            <Choice
              title="Ceiling / wall stain"
              desc="Spot, bubbling paint, damp drywall"
              onClick={() => {
                setWhere("ceiling_wall");
                setStep(2);
                track("leak_q1_answered", {
                  session_id: runId,
                  where: "ceiling_wall",
                });
              }}
            />
            <Choice
              title="Not sure"
              desc="Intermittent drip, damp smell"
              onClick={() => {
                setWhere("unknown");
                setStep(2);
                track("leak_q1_answered", {
                  session_id: runId,
                  where: "unknown",
                });
              }}
            />
          </div>
        </div>
      ) : null}

      {/* Step 2 */}
      {step === 2 ? (
        <div className="mt-5">
          <p className="text-sm font-semibold">2) Is it actively leaking right now?</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <Pill
              label="Yes"
              onClick={() => {
                setActively("yes");
                setStep(3);
                track("leak_q2_answered", {
                  session_id: runId,
                  actively: "yes",
                });
              }}
            />
            <Pill
              label="No"
              onClick={() => {
                setActively("no");
                setStep(3);
                track("leak_q2_answered", {
                  session_id: runId,
                  actively: "no",
                });
              }}
            />
          </div>
          <Back
            onClick={() => {
              setStep(1);
              track("leak_back", { session_id: runId, from_step: 2, to_step: 1 });
            }}
          />
        </div>
      ) : null}

      {/* Step 3 */}
      {step === 3 ? (
        <div className="mt-5">
          <p className="text-sm font-semibold">
            3) Any danger signs? (near electrical, ceiling bulging, fast pooling, or you
            can’t stop it)
          </p>

          <div className="mt-3 flex flex-wrap gap-3">
            <Pill
              label="Yes"
              onClick={() => {
                setDanger("yes");
                setStep(4);
                track("leak_q3_answered", {
                  session_id: runId,
                  danger: "yes",
                });
              }}
            />
            <Pill
              label="No"
              onClick={() => {
                setDanger("no");
                setStep(4);
                track("leak_q3_answered", {
                  session_id: runId,
                  danger: "no",
                });
              }}
            />
          </div>

          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-xs font-semibold text-neutral-900">Quick examples</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-neutral-700">
              <li>Water near outlets / lights / electrical panels</li>
              <li>Ceiling bulging, sagging, or actively dripping overhead</li>
              <li>Water spreading fast / pooling you can’t control</li>
              <li>You can’t shut it off or the source is unclear and worsening</li>
            </ul>
          </div>

          <Back
            onClick={() => {
              setStep(2);
              track("leak_back", { session_id: runId, from_step: 3, to_step: 2 });
            }}
          />
        </div>
      ) : null}

      {/* Result */}
      {step === 4 && result ? (
        <div className="mt-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-neutral-900 px-3 py-1 text-xs font-semibold text-white">
                {badge}
              </span>
              <span className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-700">
                Urgency: {result.urgencyLabel}
              </span>
              <span className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-700">
                Responsibility: likely management/owner
              </span>
            </div>

            <div className="mt-5 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
              <p className="text-xs font-semibold text-neutral-700">Copy/paste message</p>
              <p className="mt-2 text-xs text-neutral-700">{result.messageTemplate}</p>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(result.messageTemplate);

                  track("message_copied", {
                    session_id: runId,
                    decision: result.decision,
                    urgency: result.urgencyLabel,
                    where,
                    actively,
                    danger,
                  });
                }}
                className="rounded-xl bg-neutral-900 px-4 py-2 text-xs font-semibold text-white hover:bg-neutral-800"
              >
                Copy message
              </button>

              <button
                type="button"
                onClick={() => {
                  const nextOpen = !saveOpen;
                  setSaveOpen(nextOpen);

                  track("save_toggle", {
                    session_id: runId,
                    open: nextOpen,
                    decision: result.decision,
                    urgency: result.urgencyLabel,
                  });
                }}
                className="rounded-xl border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold text-neutral-900 hover:bg-neutral-50"
              >
                {saveOpen ? "Hide save" : "Save this result (email)"}
              </button>

              <button
                type="button"
                onClick={reset}
                className="rounded-xl border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold text-neutral-900 hover:bg-neutral-50"
              >
                Start over
              </button>
            </div>

            {/* ✅ Tally save (email only) */}
            {saveOpen ? (
              <div className="mt-5 rounded-xl border border-neutral-200 bg-white">
                <div className="border-b border-neutral-200 px-4 py-3">
                  <p className="text-sm font-semibold text-neutral-900">Save this result</p>
                  <p className="mt-1 text-xs text-neutral-600">
                    Optional — enter your email to save it.
                  </p>
                </div>

                <div className="px-2 sm:px-3">
                  <iframe
                    title="Save result"
                    src={TALLY_SRC}
                    data-tally-embed
                    data-tally-src={TALLY_SRC}
                    loading="lazy"
                    frameBorder="0"
                    marginHeight={0}
                    marginWidth={0}
                    style={{
                      border: 0,
                      display: "block",
                      width: "100%",
                      maxWidth: "100%",
                      minHeight: 360,
                    }}
                  />
                </div>
              </div>
            ) : null}

            <p className="mt-4 text-xs text-neutral-500">
              This is decision support, not repair instructions. If danger signs appear,
              escalate.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Choice({
  title,
  desc,
  onClick,
}: {
  title: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-2xl border border-neutral-200 bg-white p-5 text-left hover:bg-neutral-50"
    >
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-sm text-neutral-600">{desc}</p>
    </button>
  );
}

function Pill({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-neutral-200 bg-white px-5 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
    >
      {label}
    </button>
  );
}

function Back({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-5 text-xs font-semibold text-neutral-600 hover:text-neutral-900"
    >
      ← Back
    </button>
  );
}

