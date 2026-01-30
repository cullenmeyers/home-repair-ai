// components/leak/LeakLanding.tsx
"use client";

import { useMemo } from "react";
import LeakFlow from "./LeakFlow";

export default function LeakLanding() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <main className="bg-white text-neutral-900">
      <div className="mx-auto max-w-3xl px-6 py-14 sm:py-16">
        {/* Top label */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
            Water leak triage (instant)
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs text-neutral-700">
              Renters
            </span>
            <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs text-neutral-700">
              Condo / HOA
            </span>
            <span className="rounded-full bg-neutral-900 px-3 py-1 text-xs font-semibold text-white">
              No waiting
            </span>
          </div>
        </div>

        <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
          Water leaking in your home??
        </h1>

        <p className="mt-4 text-lg text-neutral-700">
          Answer 3 quick taps. Get a clear{" "}
          <span className="font-semibold">submit vs monitor vs escalate</span>{" "}
          recommendation — plus a message you can copy/paste.
        </p>

        <div className="mt-8">
          <LeakFlow />
        </div>

        {/* Safety note */}
        <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <p className="text-sm font-semibold">Safety first</p>
          <p className="mt-2 text-sm text-neutral-700">
            If there’s flooding, water near outlets, ceiling bulging, or you suspect a major
            pipe issue, the safest move is to{" "}
            <span className="font-semibold">escalate immediately</span>.
          </p>
        </div>

        <div className="mt-10 border-t border-neutral-200 pt-6">
          <p className="text-xs text-neutral-500">
            © {year} Home Maintenance Check • Decision support only (submit vs monitor vs
            escalate). Not repair instructions.
          </p>
        </div>
      </div>
    </main>
  );
}

