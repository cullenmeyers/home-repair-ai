"use client";

import { useSearchParams } from "next/navigation";

export const dynamic = "force-static";

export default function ThanksPage() {
  const sp = useSearchParams();
  const clarity = sp.get("clarity"); // "clear" | "somewhat" | "unclear" | null

  const clarityLabel =
    clarity === "clear"
      ? "Clear ✅"
      : clarity === "somewhat"
      ? "Somewhat 🤔"
      : clarity === "unclear"
      ? "Unclear ❌"
      : null;

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
            Submitted
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Got it — we’ll email your verdict.
          </h1>

          {/* Response-time expectation */}
          <p className="mt-3 text-sm text-neutral-600">
            Typical response time: <span className="font-semibold">within 24 hours</span>.
          </p>

          <p className="mt-4 text-base text-neutral-700">
            You’ll receive a{" "}
            <span className="font-semibold">
              “yours to fix vs landlord/maintenance”
            </span>{" "}
            answer plus the safest next step (including a message template if
            needed).
          </p>

          {/* What happens next */}
          <div className="mt-6 rounded-xl border border-neutral-200 bg-white p-5">
            <p className="text-sm font-semibold text-neutral-900">
              What happens next
            </p>
            <ul className="mt-2 space-y-2 text-sm text-neutral-700">
              <li>
                <span className="font-semibold">1)</span> We use your details to
                determine the safest recommendation.
              </li>
              <li>
                <span className="font-semibold">2)</span> You get a verdict + a
                short “why.”
              </li>
              <li>
                <span className="font-semibold">3)</span> You get the best next
                step (DIY, maintenance, or stop).
              </li>
            </ul>
          </div>

          {/* Safety first */}
          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5">
            <p className="text-sm font-semibold">Safety first</p>
            <p className="mt-2 text-sm text-neutral-700">
              If it’s urgent or safety-related (gas smell, sparks, active
              flooding, sewage/mold, structural concerns), contact maintenance or
              a licensed professional first.
            </p>
          </div>

          {/* Feedback note (only shown when arriving from an email feedback link) */}
          {clarityLabel ? (
            <div className="mt-6 rounded-xl border border-neutral-200 bg-white p-5">
              <p className="text-sm font-semibold text-neutral-900">
                Feedback received
              </p>
              <p className="mt-2 text-sm text-neutral-700">
                Thanks — you rated the verdict:{" "}
                <span className="font-semibold">{clarityLabel}</span>
              </p>
              <p className="mt-2 text-xs text-neutral-500">
                (This helps us improve — nothing else required.)
              </p>
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800"
            >
              Back to home
            </a>

            <a
              href="/#check"
              className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
            >
              Check another issue
            </a>
          </div>

          <p className="mt-6 text-xs text-neutral-500">
            Tip: add a photo or a short video next time if you can — it helps
            make the verdict faster and more accurate.
          </p>
        </div>
      </div>
    </main>
  );
}



