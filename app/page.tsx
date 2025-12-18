"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const TALLY_SRC =
  "https://tally.so/r/BzaNMY?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Auto-open form when arriving from /thanks "Check another issue"
  useEffect(() => {
    if (typeof window === "undefined") return;

    const url = new URL(window.location.href);
    if (url.searchParams.get("open") === "1") {
      setIsOpen(true);

      // Optional: clean the URL so refresh doesn't keep opening the form
      url.searchParams.delete("open");
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  // When form opens, scroll into view + ensure Tally embed loads
  useEffect(() => {
    if (!isOpen) return;

    const t = setTimeout(() => {
      document.getElementById("check")?.scrollIntoView({ behavior: "smooth" });
      // @ts-ignore
      window.Tally?.loadEmbeds?.();
    }, 50);

    return () => clearTimeout(t);
  }, [isOpen]);

  const openAndScroll = () => {
    setIsOpen(true);
    // If already open, still scroll immediately.
    document.getElementById("check")?.scrollIntoView({ behavior: "smooth" });
    // @ts-ignore
    window.Tally?.loadEmbeds?.();
  };

  return (
    <main className="bg-white text-neutral-900">
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="afterInteractive"
        onLoad={() => {
          // @ts-ignore
          window.Tally?.loadEmbeds?.();
        }}
      />

      <div className="mx-auto max-w-3xl px-6 py-16">
        {/* Top label */}
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
            Early access
          </p>
          <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs text-neutral-600">
            Renters & condo/HOA owners
          </span>
        </div>

        {/* Hero */}
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Before you submit a maintenance request, know if this is yours to fix.
        </h1>

        <p className="mt-5 text-lg text-neutral-700">
          For <span className="font-semibold">renters</span> and{" "}
          <span className="font-semibold">condo/HOA owners</span>: answer a few
          quick questions (photo optional) and get a clear{" "}
          <span className="font-semibold">“yours vs maintenance”</span> verdict —
          plus the safest next step.
        </p>

        {/* Response-time expectation */}
        <p className="mt-3 text-sm text-neutral-600">
          Typical response time:{" "}
          <span className="font-semibold">within 24 hours</span>.
        </p>

        {/* Example verdict */}
        <div className="mt-8 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Example verdict
          </p>

          <div className="mt-3 rounded-xl border border-neutral-200 bg-white p-5">
            <p className="text-sm text-neutral-700">
              Issue:{" "}
              <span className="font-semibold">
                Water dripping under the kitchen sink
              </span>
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-neutral-900 px-3 py-1 text-xs font-semibold text-white">
                Likely maintenance
              </span>
              <span className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-700">
                Next step: notify + photo
              </span>
              <span className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-700">
                Safety: shut off valve if active
              </span>
            </div>

            <p className="mt-3 text-sm text-neutral-600">
              Why: under-sink leaks are often plumbing/fixture-related. If the
              leak is active, shut off the valve and contact maintenance.
            </p>

            <p className="mt-4 text-xs text-neutral-500">
              Message template: “Hi — I noticed a leak under the kitchen sink
              today. I’ve attached a photo. Please advise the next step for{" "}
              <span className="font-semibold">maintenance/management</span>.”
            </p>

            <p className="mt-3 text-xs text-neutral-500">
              Example only — your verdict may differ based on your details and
              photos.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={openAndScroll}
            className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800"
          >
            Run an early check
          </button>

          <span className="text-sm text-neutral-600">
            Early version • human-reviewed • small, low-risk issues only
          </span>
        </div>

        {/* How it works */}
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-neutral-200 p-5">
            <p className="text-sm font-semibold">1) Describe the issue</p>
            <p className="mt-2 text-sm text-neutral-600">
              Share what’s happening (photo optional) — no technical terms needed.
            </p>
          </div>
          <div className="rounded-xl border border-neutral-200 p-5">
            <p className="text-sm font-semibold">2) Get a verdict</p>
            <p className="mt-2 text-sm text-neutral-600">
              Yours to fix, maintenance, or unclear → safest path.
            </p>
          </div>
          <div className="rounded-xl border border-neutral-200 p-5">
            <p className="text-sm font-semibold">3) Next step (or stop)</p>
            <p className="mt-2 text-sm text-neutral-600">
              Clear “stop & submit maintenance” guidance when it’s risky or not
              yours.
            </p>
          </div>
        </div>

        {/* When this helps */}
        <div className="mt-10 rounded-2xl border border-neutral-200 p-6">
          <h3 className="text-base font-semibold">
            When this helps (and when it doesn’t)
          </h3>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-neutral-200 bg-white p-5">
              <p className="text-sm font-semibold">When it helps</p>
              <ul className="mt-3 space-y-2 text-sm text-neutral-700">
                <li>• “Is this my responsibility?” questions</li>
                <li>• Renters: avoid unnecessary maintenance requests</li>
                <li>• Condo/HOA: unit vs common-area responsibility confusion</li>
                <li>• Small leaks, clogs, stuck doors</li>
                <li>• Loose fixtures, basic appliances</li>
              </ul>
            </div>
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
              <p className="text-sm font-semibold">When to escalate</p>
              <ul className="mt-3 space-y-2 text-sm text-neutral-700">
                <li>• Gas smell, sparks, major electrical</li>
                <li>• Active flooding / sewage / mold</li>
                <li>• Structural damage</li>
                <li>• Anything that feels unsafe</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tally */}
        <div
          id="check"
          className="mt-10 rounded-2xl border border-neutral-200 bg-neutral-50 p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Maintenance Check</h2>
              <p className="mt-2 text-sm text-neutral-600">
                Early version: submit one issue and we’ll email you a verdict +
                safest next step.
              </p>
            </div>

            {isOpen ? (
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="hidden sm:inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
              >
                Close
              </button>
            ) : null}
          </div>

          {!isOpen ? (
            <div className="mt-5 rounded-xl border border-neutral-200 bg-white p-6">
              <p className="text-sm text-neutral-700">
                Run an early check to open the form.
              </p>
              <p className="mt-2 text-xs text-neutral-500">
                This is an early MVP — we review your submission and email you
                the verdict.
              </p>
            </div>
          ) : (
            <div className="mt-5 rounded-xl border border-neutral-200 bg-white overflow-hidden">
              <iframe
                title="Maintenance check"
                data-tally-embed
                data-tally-src={TALLY_SRC}
                loading="lazy"
                width="100%"
                height="1200"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                style={{ border: 0, width: "100%", display: "block" }}
              />
            </div>
          )}

          <p className="mt-3 text-xs text-neutral-500">
            Tip: include a clear photo/video if you can — it improves accuracy.
          </p>
        </div>

        {/* Safety */}
        <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <p className="text-sm font-semibold">Safety first — always</p>
          <p className="mt-2 text-sm text-neutral-700">
            This tool is intentionally limited to{" "}
            <span className="font-semibold">small, low-risk issues</span>. Anything
            involving gas, major electrical work, flooding, mold, or structural
            damage will be flagged as “submit maintenance or call a professional.”
          </p>
        </div>

        {/* Common examples */}
        <div className="mt-10 text-sm text-neutral-700">
          <p className="font-semibold">Common examples:</p>
          <p className="mt-1">
            loose fixtures, stuck doors, running toilets, clogged sinks, minor
            leaks, switches, outlets, and “is this my responsibility?” questions.
          </p>
        </div>
      </div>
    </main>
  );
}





