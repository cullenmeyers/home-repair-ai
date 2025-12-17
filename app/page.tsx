"use client";

import Script from "next/script";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    const t = setTimeout(() => {
      // @ts-ignore
      window.Tally?.loadEmbeds?.();
    }, 50);
    return () => clearTimeout(t);
  }, []);

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
            Renters & small repairs
          </span>
        </div>

        {/* Hero */}
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Before you submit a maintenance request, know if this is yours to fix.
        </h1>

        <p className="mt-5 text-lg text-neutral-700">
          Upload a photo or describe the issue. Get a quick, safety-aware check to
          help renters and condo owners decide whether to fix it themselves or
          submit maintenance — without guesswork or risk.
        </p>

        {/* How it works */}
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-neutral-200 p-5">
            <p className="text-sm font-semibold">1) Describe the issue</p>
            <p className="mt-2 text-sm text-neutral-600">
              Share what’s happening or upload a photo — no technical terms needed.
            </p>
          </div>
          <div className="rounded-xl border border-neutral-200 p-5">
            <p className="text-sm font-semibold">2) Get a responsibility check</p>
            <p className="mt-2 text-sm text-neutral-600">
              See whether this is likely tenant-responsible, maintenance, or
              something to escalate.
            </p>
          </div>
          <div className="rounded-xl border border-neutral-200 p-5">
            <p className="text-sm font-semibold">3) Know when to stop</p>
            <p className="mt-2 text-sm text-neutral-600">
              Clear “stop & submit maintenance” guidance if it’s risky or not yours.
            </p>
          </div>
        </div>

        {/* What this helps with */}
        <div className="mt-10 rounded-2xl border border-neutral-200 p-6">
          <h3 className="text-base font-semibold">What this helps with</h3>
          <ul className="mt-3 space-y-2 text-sm text-neutral-700">
            <li>• Deciding whether an issue is your responsibility</li>
            <li>• Avoiding unnecessary or awkward maintenance requests</li>
            <li>
              • Knowing when something is{" "}
              <span className="font-semibold">not</span> a DIY fix
            </li>
            <li>• Small, low-risk issues where you’re unsure what to do</li>
          </ul>
        </div>

        {/* Get early access — Tally */}
        <div className="mt-10 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
          <h2 className="text-lg font-semibold">Get early access</h2>
          <p className="mt-2 text-sm text-neutral-600">
            Describe an issue you’re unsure about — it takes about 10 seconds.
          </p>

          {/* FIX:
             - remove p-2 (was causing the “cut off on both sides” look)
             - use overflow-hidden to keep rounded corners clean
             - add a tiny wrapper padding via background border only (not inner padding)
          */}
          <div className="mt-5 rounded-xl border border-neutral-200 bg-white overflow-hidden">
            <iframe
              title="Maintenance check"
              data-tally-embed
              data-tally-src="https://tally.so/r/BzaNMY?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
              loading="lazy"
              width="100%"
              height="1200" // safe floor so the submit button never gets clipped
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              style={{
                border: 0,
                width: "100%",
                display: "block",
                minHeight: 1200,
              }}
              onLoad={() => {
                // @ts-ignore
                window.Tally?.loadEmbeds?.();
              }}
            />
          </div>
        </div>

        {/* Safety promise */}
        <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <p className="text-sm font-semibold">Safety first — always</p>
          <p className="mt-2 text-sm text-neutral-700">
            This tool is intentionally limited to{" "}
            <span className="font-semibold">small, low-risk issues</span>. Anything
            involving gas, major electrical work, flooding, mold, or structural
            damage will be flagged as “submit maintenance or call a professional.”
          </p>
        </div>

        {/* Scope */}
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
