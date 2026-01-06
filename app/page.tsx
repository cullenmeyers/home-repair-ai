"use client";

import Script from "next/script";
import { useEffect, useMemo, useState } from "react";

const TALLY_SRC =
  "https://tally.so/r/BzaNMY?hideTitle=1&transparentBackground=1&dynamicHeight=1";

type ScenarioKey = "general" | "leak";
type LeakType = "under_sink" | "toilet" | "ceiling_stain" | "unknown";

function getScenarioFromUrl(): ScenarioKey {
  if (typeof window === "undefined") return "general";
  const url = new URL(window.location.href);
  const s = (url.searchParams.get("s") || "").toLowerCase();
  if (s === "leak" || s === "water") return "leak";
  return "general";
}

function setUrlParam(key: string, value: string) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.replaceState({}, "", url.toString());
}

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);

  const [scenario, setScenario] = useState<ScenarioKey>("general");
  const [leakType, setLeakType] = useState<LeakType | null>(null);

  // ✅ Consistent time promise everywhere
  const timePromise = "~60 seconds";

  useEffect(() => {
    setScenario(getScenarioFromUrl());
  }, []);

  // Auto-open form when arriving from /thanks "Check another issue"
  useEffect(() => {
    if (typeof window === "undefined") return;

    const url = new URL(window.location.href);
    if (url.searchParams.get("open") === "1") {
      setIsOpen(true);
      setHasOpenedOnce(true);

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

  const chooseLeakType = (t: LeakType) => {
    setLeakType(t);
    // store it in URL for cheap tracking / future personalization
    setUrlParam("leak", t);
    // open form immediately (scenario-first action)
    openAndScroll();
  };

  const year = useMemo(() => new Date().getFullYear(), []);

  const stickyTitle =
    scenario === "leak" ? "Water leak? Don’t guess." : "Unsure if you should report it?";
  const stickySubtitle =
    scenario === "leak"
      ? "Check urgency + who to contact"
      : "Not repair steps • just what to do next";

  // ✅ Stronger, reassurance-based CTA labels
  const primaryCtaLabel =
    scenario === "leak" ? "Get my next step" : "Should I report this?";
  const stickyCtaLabel = scenario === "leak" ? "Get next step" : "Quick check";

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

      {/* Mobile sticky CTA */}
      {!isOpen ? (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-neutral-200 bg-white/95 backdrop-blur sm:hidden">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-neutral-900">
                {stickyTitle}
              </p>
              <p className="truncate text-[11px] text-neutral-600">
                {stickySubtitle}
              </p>
            </div>
            <button
              type="button"
              onClick={openAndScroll}
              className="shrink-0 rounded-xl bg-neutral-900 px-4 py-2 text-xs font-semibold text-white hover:bg-neutral-800"
            >
              {stickyCtaLabel}
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

        {/* ✅ SCENARIO-FIRST HERO (only when ?s=leak) */}
        {scenario === "leak" ? (
          <>
            {/* Shorter, higher-urgency hero */}
            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
              Water leaking in your home?
            </h1>

            <p className="mt-4 text-lg text-neutral-700">
              Pick what you’re seeing. Get a clear{" "}
              <span className="font-semibold">submit vs monitor vs escalate</span>{" "}
              recommendation + a message template to send.
            </p>

            {/* Big scenario picker (micro-win + low effort) */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => chooseLeakType("under_sink")}
                className="rounded-2xl border border-neutral-200 bg-white p-5 text-left hover:bg-neutral-50"
              >
                <p className="text-sm font-semibold">Dripping under a sink</p>
                <p className="mt-1 text-sm text-neutral-600">
                  Under cabinet, damp or pooling.
                </p>
              </button>

              <button
                type="button"
                onClick={() => chooseLeakType("toilet")}
                className="rounded-2xl border border-neutral-200 bg-white p-5 text-left hover:bg-neutral-50"
              >
                <p className="text-sm font-semibold">Toilet running / leaking</p>
                <p className="mt-1 text-sm text-neutral-600">
                  Constant running, water near base.
                </p>
              </button>

              <button
                type="button"
                onClick={() => chooseLeakType("ceiling_stain")}
                className="rounded-2xl border border-neutral-200 bg-white p-5 text-left hover:bg-neutral-50"
              >
                <p className="text-sm font-semibold">Ceiling / wall stain</p>
                <p className="mt-1 text-sm text-neutral-600">
                  Spot, bubbling paint, damp drywall.
                </p>
              </button>

              <button
                type="button"
                onClick={() => chooseLeakType("unknown")}
                className="rounded-2xl border border-neutral-200 bg-white p-5 text-left hover:bg-neutral-50"
              >
                <p className="text-sm font-semibold">Not sure where it’s from</p>
                <p className="mt-1 text-sm text-neutral-600">
                  Damp smell, wet area, intermittent drip.
                </p>
              </button>
            </div>

            {/* Primary CTA + microcopy (short, reassurance-based) */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={openAndScroll}
                className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800"
              >
                {hasOpenedOnce ? "Check another issue" : primaryCtaLabel}
              </button>
              <span className="text-sm text-neutral-600">
                {timePromise} • No account • One email result • No spam
              </span>
            </div>

            {/* Tiny reassurance (micro-win) */}
            <div className="mt-7 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
              <p className="text-sm font-semibold">Quick safety note</p>
              <p className="mt-2 text-sm text-neutral-700">
                If water is actively spreading or near electrical outlets, the safest move is to{" "}
                <span className="font-semibold">escalate immediately</span>{" "}
                (notify maintenance/manager now).
              </p>
            </div>
          </>
        ) : (
          /* ✅ GENERAL HERO (control) — shorter above the fold */
          <>
            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
              Should you report this — or wait?
            </h1>

            <p className="mt-3 text-base text-neutral-700">
              <span className="font-semibold">
                Get a clear next step and a copy/paste message for maintenance/HOA.
              </span>
            </p>

            {/* Keep chips but lightweight */}
            <div className="mt-4 flex flex-wrap gap-2 text-sm text-neutral-700">
              <span className="rounded-full border border-neutral-200 bg-white px-3 py-1">
                Renters: avoid being blamed for damage
              </span>
              <span className="rounded-full border border-neutral-200 bg-white px-3 py-1">
                Condo/HOA: unit vs common area
              </span>
            </div>

            {/* CTA immediately (reduce reading) */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={openAndScroll}
                className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800"
              >
                {hasOpenedOnce ? "Check another issue" : primaryCtaLabel}
              </button>

              <span className="text-sm text-neutral-600">
                {timePromise} • No account • One email result • No spam
              </span>
            </div>

            {/* Move longer explanation below CTA */}
            <p className="mt-5 text-lg text-neutral-700">
              Answer a few quick questions (photo optional) and get a clear{" "}
              <span className="font-semibold">recommendation</span>:{" "}
              <span className="font-semibold">submit</span>,{" "}
              <span className="font-semibold">monitor</span>, or{" "}
              <span className="font-semibold">escalate</span> — plus likely{" "}
              <span className="font-semibold">responsibility</span> and what to say.
            </p>
          </>
        )}

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

        {/* ✅ Remove redundancy: replace "How it works" 3-box with a smaller 2-line strip */}
        <div className="mt-10 rounded-2xl border border-neutral-200 bg-white p-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-sm font-semibold">Responsibility</p>
              <p className="mt-1 text-sm text-neutral-600">
                Tenant-owned vs landlord-owned vs HOA/common area.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold">Urgency</p>
              <p className="mt-1 text-sm text-neutral-600">
                Low / Medium / High risk + when to escalate.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold">Message template</p>
              <p className="mt-1 text-sm text-neutral-600">
                Copy/paste note with the right details + photo prompt.
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-neutral-700">
            <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1">
              {timePromise}
            </span>
            <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1">
              No account
            </span>
            <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1">
              One email result
            </span>
            <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1">
              No spam
            </span>
            <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1">
              Not repair instructions
            </span>
          </div>

          <p className="mt-4 text-xs text-neutral-500">
            Privacy: we only use your submission to send your recommendation.
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

              {/* ✅ Trust reducer (direct + simple) */}
              <p className="mt-2 text-xs text-neutral-600">
                {timePromise} • No account • One email result • No spam
              </p>

              <p className="mt-2 text-xs text-neutral-500">
                Tip: include a clear photo/video if you can — it improves accuracy.
              </p>

              {scenario === "leak" && leakType ? (
                <p className="mt-3 text-xs text-neutral-600">
                  You selected:{" "}
                  <span className="font-semibold">
                    {leakType === "under_sink"
                      ? "Dripping under a sink"
                      : leakType === "toilet"
                      ? "Toilet running/leaking"
                      : leakType === "ceiling_stain"
                      ? "Ceiling/wall stain"
                      : "Not sure where it’s from"}
                  </span>
                </p>
              ) : null}
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
              <div className="border-b border-neutral-200 px-4 py-3">
                <p className="text-sm font-semibold text-neutral-900">
                  Start here →
                </p>
                <p className="mt-1 text-xs text-neutral-600">
                  Describe the issue in plain words. Photo/video optional.
                </p>
              </div>

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

        {/* Safety (kept, but short + clear) */}
        <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <p className="text-sm font-semibold">Safety first — always</p>
          <p className="mt-2 text-sm text-neutral-700">
            If there’s any gas smell, sparks, major electrical risk, flooding,
            suspected mold, or structural damage, the safest move is to{" "}
            <span className="font-semibold">escalate immediately</span>.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-10 border-t border-neutral-200 pt-6">
          <p className="text-xs text-neutral-500">
            © {year} Home Repair AI • This MVP provides decision support (submit
            vs monitor vs escalate). It does not provide repair instructions.
          </p>
        </div>

        <div className="h-16 sm:hidden" />
      </div>
    </main>
  );
}












