"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const TALLY_SRC =
  "https://tally.so/r/BzaNMY?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

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

    // Scroll immediately so user sees the section open
    document.getElementById("check")?.scrollIntoView({ behavior: "smooth" });

    // If the script isn't loaded yet, we'll load embeds once it is.
    if (!scriptLoaded) return;

    // Give React a tick to render the iframe before loading embeds
    const t = setTimeout(() => {
      // @ts-ignore
      window.Tally?.loadEmbeds?.();
    }, 50);

    return () => clearTimeout(t);
  }, [isOpen, scriptLoaded]);

  const openAndScroll = () => {
    setIsOpen(true);
    document.getElementById("check")?.scrollIntoView({ behavior: "smooth" });

    // If script already loaded, try loading immediately too.
    if (scriptLoaded) {
      // @ts-ignore
      window.Tally?.loadEmbeds?.();
    }
  };

  return (
    <main className="bg-white text-neutral-900">
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="afterInteractive"
        onLoad={() => {
          setScriptLoaded(true);
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
          Should you submit a maintenance request — or not?
        </h1>

        <p className="mt-5 text-lg text-neutral-700">
          Describe what’s happening (photo optional) and get a clear{" "}
          <span className="font-semibold">recommendation</span>:{" "}
          <span className="font-semibold">submit</span>,{" "}
          <span className="font-semibold">monitor</span>, or{" "}
          <span className="font-semibold">escalate</span> — plus a safe next step
          and a message you can send to maintenance/management.
        </p>

        {/* Response-time expectation */}
        <p className="mt-3 text-sm text-neutral-600">
          Early MVP: human-reviewed verdicts via email (typically{" "}
          <span className="font-semibold">within ~24 hours</span>).
        </p>

        {/* Example verdict */}
        <div className="mt-8 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Example output
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
                Recommendation: submit maintenance request
              </span>
              <span className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-700">
                Risk: medium (water damage)
              </span>
              <span className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-700">
                Next step: notify + attach photo
              </span>
            </div>

            <p className="mt-3 text-sm text-neutral-600">
              Why: under-sink leaks can worsen quickly and are usually plumbing
              related. Reporting early helps prevent damage and avoids liability
              questions later.
            </p>

            <p className="mt-4 text-xs text-neutral-500">
              Message template: “Hi — I noticed water dripping under the kitchen
              sink today. I’ve attached a photo/video. Please advise next steps
              for{" "}
              <span className="font-semibold">maintenance/management</span>.”
            </p>

            <p className="mt-3 text-xs text-neutral-500">
              Example only — recommendations depend on your details and photos.
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
              Share what’s happening (photo optional). No technical terms needed.
            </p>
          </div>
          <div className="rounded-xl border border-neutral-200 p-5">
            <p className="text-sm font-semibold">2) Get a recommendation</p>
            <p className="mt-2 text-sm text-neutral-600">
              Submit a request, monitor, or escalate — with a simple reason.
            </p>
          </div>
          <div className="rounded-xl border border-neutral-200 p-5">
            <p className="text-sm font-semibold">3) Take the safest next step</p>
            <p className="mt-2 text-sm text-neutral-600">
              Includes a message template you can copy/paste to
              maintenance/management.
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
                <li>• “Should I submit a maintenance request?” questions</li>
                <li>
                  • Responsibility confusion (tenant vs landlord / unit vs HOA)
                </li>
                <li>• Small leaks, clogs, stuck doors</li>
                <li>• Loose fixtures, basic appliances</li>
                <li>• Non-urgent issues you’re unsure are “worth reporting”</li>
              </ul>
            </div>
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
              <p className="text-sm font-semibold">When to escalate now</p>
              <ul className="mt-3 space-y-2 text-sm text-neutral-700">
                <li>• Gas smell, sparks, or major electrical</li>
                <li>• Active flooding / sewage / suspected mold</li>
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
                Early MVP: submit one issue and we’ll email you a recommendation
                + safest next step (and a message template).
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
                the recommendation.
              </p>
            </div>
          ) : (
            <div className="mt-5 rounded-xl border border-neutral-200 bg-white">
              <iframe
                title="Maintenance check"
                src={TALLY_SRC} // ✅ fallback: loads even if script doesn’t set src
                data-tally-embed
                data-tally-src={TALLY_SRC}
                loading="lazy"
                width="100%"
                height="900" // ✅ never blank; Tally will resize taller when dynamicHeight works
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                style={{
                  border: 0,
                  width: "100%",
                  display: "block",
                  minHeight: 900, // ✅ keeps it visible before resize
                }}
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
            <span className="font-semibold">small, low-risk issues</span>. If
            there’s any gas smell, major electrical risk, flooding, mold, or
            structural damage, the safest move is to{" "}
            <span className="font-semibold">escalate immediately</span> (submit
            maintenance or call a professional/emergency services as appropriate).
          </p>
        </div>

        {/* Common examples */}
        <div className="mt-10 text-sm text-neutral-700">
          <p className="font-semibold">Common examples:</p>
          <p className="mt-1">
            stuck doors, running toilets, clogged sinks, minor leaks, appliance
            issues, switches/outlets concerns, and responsibility questions (unit
            vs common area / renter vs landlord).
          </p>
        </div>

        {/* Footer note */}
        <p className="mt-10 text-xs text-neutral-500">
          Note: This MVP provides decision support (submit vs monitor vs
          escalate). It does not provide repair instructions.
        </p>
      </div>
    </main>
  );
}








