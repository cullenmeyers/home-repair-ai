"use client";

import Script from "next/script";
import { useEffect, useMemo, useState } from "react";

// Tally embed (keep as-is)
const TALLY_SRC =
  "https://tally.so/r/BzaNMY?hideTitle=1&transparentBackground=1&dynamicHeight=1";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Simple local “engagement” state to tailor copy (no tracking dependencies)
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);

  // Auto-open form when arriving from /thanks "Check another issue"
  useEffect(() => {
    if (typeof window === "undefined") return;

    const url = new URL(window.location.href);
    if (url.searchParams.get("open") === "1") {
      setIsOpen(true);
      setHasOpenedOnce(true);

      // Optional: clean the URL so refresh doesn't keep opening the form
      url.searchParams.delete("open");
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  // When form opens, scroll into view + ensure Tally embed loads
  useEffect(() => {
    if (!isOpen) return;

    document.getElementById("check")?.scrollIntoView({ behavior: "smooth" });

    if (!scriptLoaded) return;

    const t = setTimeout(() => {
      // @ts-ignore
      window.Tally?.loadEmbeds?.();
    }, 50);

    return () => clearTimeout(t);
  }, [isOpen, scriptLoaded]);

  const openAndScroll = () => {
    setIsOpen(true);
    setHasOpenedOnce(true);
    document.getElementById("check")?.scrollIntoView({ behavior: "smooth" });

    if (scriptLoaded) {
      // @ts-ignore
      window.Tally?.loadEmbeds?.();
    }
  };

  const closeForm = () => setIsOpen(false);

  const year = useMemo(() => new Date().getFullYear(), []);

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

      {/* Mobile sticky CTA (reduces bounce / increases form opens) */}
      {!isOpen ? (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-neutral-200 bg-white/95 backdrop-blur sm:hidden">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-neutral-900">
                Unsure if you should report it?
              </p>
              <p className="truncate text-[11px] text-neutral-600">
                Not repair steps • just what to do next
              </p>
            </div>
            <button
              type="button"
              onClick={openAndScroll}
              className="shrink-0 rounded-xl bg-neutral-900 px-4 py-2 text-xs font-semibold text-white hover:bg-neutral-800"
            >
              Check my issue
            </button>
          </div>
        </div>
      ) : null}

      <div className="mx-auto max-w-3xl px-6 py-14 sm:py-16">
        {/* Top label */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
            Early access
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs text-neutral-700">
              Renters
            </span>
            <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs text-neutral-700">
              Condo / HOA owners
            </span>
            <span className="rounded-full bg-neutral-900 px-3 py-1 text-xs font-semibold text-white">
              Decision support
            </span>
          </div>
        </div>

        {/* Hero */}
        <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
          Before you DIY or wait — know if you should report it.
        </h1>

        {/* ✅ Outcome promise (new) */}
        <p className="mt-3 text-base text-neutral-700">
          <span className="font-semibold">
            Stop guessing. Send the right request (with the right details) in
            under 2 minutes.
          </span>
        </p>

        {/* ✅ Who it’s for strip (new) */}
        <div className="mt-4 flex flex-wrap gap-2 text-sm text-neutral-700">
          <span className="rounded-full border border-neutral-200 bg-white px-3 py-1">
            Renters: avoid being blamed for damage
          </span>
          <span className="rounded-full border border-neutral-200 bg-white px-3 py-1">
            Condo/HOA: know if it’s unit vs common area
          </span>
        </div>

        <p className="mt-5 text-lg text-neutral-700">
          Answer a few quick questions (photo optional) and get a clear{" "}
          <span className="font-semibold">recommendation</span>:{" "}
          <span className="font-semibold">submit</span>,{" "}
          <span className="font-semibold">monitor</span>, or{" "}
          <span className="font-semibold">escalate</span> — plus the{" "}
          <span className="font-semibold">safest next step</span> and a message
          you can copy/paste to maintenance or your HOA/manager.
        </p>

        {/* ✅ Common issues chips (new) */}
        <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-neutral-700">
          <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1">
            Small leak / drip
          </span>
          <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1">
            Appliance issue
          </span>
          <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1">
            Outlet / switch concern
          </span>
          <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1">
            Stuck door / window
          </span>
          <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1">
            Responsibility confusion
          </span>
        </div>

        {/* Value bullets */}
        <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-sm font-semibold">Responsibility</p>
              <p className="mt-1 text-sm text-neutral-600">
                Is this likely tenant-owned, landlord-owned, or HOA/common area?
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold">Urgency</p>
              <p className="mt-1 text-sm text-neutral-600">
                Low / Medium / High risk — and when to escalate immediately.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold">Message template</p>
              <p className="mt-1 text-sm text-neutral-600">
                A clean note you can send with the right details (and a photo).
              </p>
            </div>
          </div>

          {/* ✅ Reduced repetition: keep only the most important chips */}
          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-neutral-700">
            <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1">
              Takes ~30 seconds
            </span>
            <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1">
              No account
            </span>
            <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1">
              Not repair instructions
            </span>
          </div>

          <p className="mt-4 text-xs text-neutral-500">
            Privacy: we only use your submission to send your recommendation.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={openAndScroll}
            className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800"
          >
            {hasOpenedOnce ? "Check another issue" : "Check my issue"}
          </button>

          {/* ✅ CTA microcopy to repel DIY crowd (new) */}
          <span className="text-sm text-neutral-600">
            Not repair steps — just: should you report it + what to say
          </span>
        </div>

        {/* Example */}
        <div className="mt-8 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            What you’ll get (example)
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
                Urgency: medium (water damage risk)
              </span>
              <span className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-700">
                Responsibility: usually building plumbing
              </span>
            </div>

            <p className="mt-3 text-sm text-neutral-600">
              Why: small leaks often worsen quietly. Reporting early helps prevent
              damage and avoids liability questions later.
            </p>

            <div className="mt-4 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
              <p className="text-xs font-semibold text-neutral-700">
                Copy/paste message template
              </p>
              <p className="mt-2 text-xs text-neutral-600">
                “Hi — I noticed water dripping under the kitchen sink today. I
                attached a photo/video. Can you advise next steps and timeline
                for a repair?”
              </p>
            </div>

            <p className="mt-3 text-xs text-neutral-500">
              Example only — recommendations depend on your details and photos.
            </p>
          </div>
        </div>

        {/* How it works */}
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-neutral-200 p-5">
            <p className="text-sm font-semibold">1) Describe the issue</p>
            <p className="mt-2 text-sm text-neutral-600">
              A few simple questions. Add a photo/video if you can.
            </p>
          </div>
          <div className="rounded-xl border border-neutral-200 p-5">
            <p className="text-sm font-semibold">2) Get a recommendation</p>
            <p className="mt-2 text-sm text-neutral-600">
              Submit, monitor, or escalate — with a clear reason.
            </p>
          </div>
          <div className="rounded-xl border border-neutral-200 p-5">
            <p className="text-sm font-semibold">3) Send the right message</p>
            <p className="mt-2 text-sm text-neutral-600">
              Copy/paste a note with the details maintenance actually needs.
            </p>
          </div>
        </div>

        {/* When it helps / when to escalate */}
        <div className="mt-10 rounded-2xl border border-neutral-200 p-6">
          <h3 className="text-base font-semibold">
            When this helps (and when to escalate immediately)
          </h3>

          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-neutral-200 bg-white p-5">
              <p className="text-sm font-semibold">Good fit</p>
              <ul className="mt-3 space-y-2 text-sm text-neutral-700">
                <li>• “Should I submit a maintenance request?” questions</li>
                <li>• Tenant vs landlord vs HOA responsibility confusion</li>
                <li>• Small leaks, clogs, running toilets</li>
                <li>• Stuck doors/windows, loose fixtures</li>
                <li>• Appliance issues, minor electrical concerns</li>
              </ul>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
              <p className="text-sm font-semibold">Escalate now</p>
              <ul className="mt-3 space-y-2 text-sm text-neutral-700">
                <li>• Gas smell, sparks, or major electrical hazard</li>
                <li>• Active flooding / sewage / suspected mold</li>
                <li>• Structural damage</li>
                <li>• Anything that feels unsafe</li>
              </ul>
              <p className="mt-3 text-xs text-neutral-600">
                If you’re unsure, choose the safest option and report/escalate.
              </p>
            </div>
          </div>

          {/* ✅ Move “low-risk” idea here instead of above the fold */}
          <p className="mt-4 text-xs text-neutral-500">
            Note: This tool is best for everyday issues and “should I report
            this?” decisions — not step-by-step repair guidance.
          </p>
        </div>

        {/* Tally section */}
        <div
          id="check"
          className="mt-10 rounded-2xl border border-neutral-200 bg-neutral-50 p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Maintenance Check</h2>

              <p className="mt-2 text-sm text-neutral-700">
                Submit one issue and get: recommendation + urgency +
                responsibility + a message template.
              </p>

              {/* ✅ Better “speed” wording */}
              <p className="mt-2 text-xs text-neutral-500">
                You’ll receive your recommendation by email shortly after
                submission.
              </p>

              <p className="mt-2 text-xs text-neutral-500">
                Tip: include a clear photo/video if you can — it improves accuracy.
              </p>
            </div>

            {isOpen ? (
              <button
                type="button"
                onClick={closeForm}
                className="hidden sm:inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
              >
                Close
              </button>
            ) : null}
          </div>

          {!isOpen ? (
            <div className="mt-5 rounded-xl border border-neutral-200 bg-white p-6">
              <p className="text-sm text-neutral-700">
                Ready? Open the form and describe what’s happening.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={openAndScroll}
                  className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800"
                >
                  Open the form
                </button>
                <p className="text-xs text-neutral-500">
                  Not repair instructions — just a decision + message template.
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-5 rounded-xl border border-neutral-200 bg-white">
              {/* ✅ Start header when open (new) */}
              <div className="border-b border-neutral-200 px-4 py-3">
                <p className="text-sm font-semibold text-neutral-900">
                  Start here →
                </p>
                <p className="mt-1 text-xs text-neutral-600">
                  Describe the issue in plain words. Photo/video optional.
                </p>
              </div>

              {/* small padding so iframe never touches edges */}
              <div className="px-2 sm:px-3">
                <iframe
                  title="Maintenance check"
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
                    minHeight: 920,
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* ✅ FAQ trimmed to 2 items */}
        <div className="mt-10 rounded-2xl border border-neutral-200 p-6">
          <h3 className="text-base font-semibold">FAQ</h3>

          <div className="mt-4 space-y-4">
            <div className="rounded-xl border border-neutral-200 bg-white p-5">
              <p className="text-sm font-semibold">
                Is this telling me how to repair things?
              </p>
              <p className="mt-2 text-sm text-neutral-600">
                No — it’s intentionally limited to a “should I report this?”
                recommendation, urgency, responsibility, and a message template.
              </p>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white p-5">
              <p className="text-sm font-semibold">
                What if I’m not sure who’s responsible (HOA vs unit)?
              </p>
              <p className="mt-2 text-sm text-neutral-600">
                That’s exactly what this is for — we’ll ask a couple questions
                and suggest the most likely path (and what to include in your
                note).
              </p>
            </div>
          </div>
        </div>

        {/* Safety */}
        <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <p className="text-sm font-semibold">Safety first — always</p>
          <p className="mt-2 text-sm text-neutral-700">
            If there’s any gas smell, sparks, major electrical risk, flooding,
            mold, or structural damage, the safest move is to{" "}
            <span className="font-semibold">escalate immediately</span> (submit
            maintenance or contact a professional/emergency services as
            appropriate).
          </p>
        </div>

        {/* Footer */}
        <div className="mt-10 border-t border-neutral-200 pt-6">
          <p className="text-xs text-neutral-500">
            © {year} Home Repair AI • This MVP provides decision support (submit
            vs monitor vs escalate). It does not provide repair instructions.
          </p>
        </div>

        {/* Spacer so mobile sticky bar doesn’t cover content */}
        <div className="h-16 sm:hidden" />
      </div>
    </main>
  );
}












