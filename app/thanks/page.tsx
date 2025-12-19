export const dynamic = "force-static";

type Props = {
  searchParams?: {
    clarity?: string; // "clear" | "somewhat" | "unclear"
  };
};

export default function ThanksPage({ searchParams }: Props) {
  const clarity = searchParams?.clarity ?? null;

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
            Thanks — we’ll email your recommendation.
          </h1>

          {/* Response-time expectation */}
          <p className="mt-3 text-sm text-neutral-600">
            Early MVP: most recommendations are sent{" "}
            <span className="font-semibold">within ~24 hours</span>.
          </p>

          <p className="mt-4 text-base text-neutral-700">
            You’ll receive a clear recommendation on whether to{" "}
            <span className="font-semibold">submit a maintenance request</span>,{" "}
            <span className="font-semibold">monitor</span>, or{" "}
            <span className="font-semibold">escalate</span> — plus a short
            explanation and a message you can copy if needed.
          </p>

          {/* What happens next */}
          <div className="mt-6 rounded-xl border border-neutral-200 bg-white p-5">
            <p className="text-sm font-semibold text-neutral-900">
              What happens next
            </p>
            <ul className="mt-2 space-y-2 text-sm text-neutral-700">
              <li>
                <span className="font-semibold">1)</span> We review your details
                and any photos/videos.
              </li>
              <li>
                <span className="font-semibold">2)</span> We determine the safest
                recommendation.
              </li>
              <li>
                <span className="font-semibold">3)</span> You receive the result
                by email.
              </li>
            </ul>
          </div>

          {/* Safety first */}
          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5">
            <p className="text-sm font-semibold">Safety first</p>
            <p className="mt-2 text-sm text-neutral-700">
              If anything feels urgent or unsafe (gas smell, sparks, active
              flooding, sewage/mold, or structural concerns), don’t wait for this
              check — contact maintenance or emergency services immediately.
            </p>
          </div>

          {/* Feedback note (only shown when arriving from an email feedback link) */}
          {clarityLabel ? (
            <div className="mt-6 rounded-xl border border-neutral-200 bg-white p-5">
              <p className="text-sm font-semibold text-neutral-900">
                Feedback received
              </p>
              <p className="mt-2 text-sm text-neutral-700">
                Thanks — you rated the recommendation:{" "}
                <span className="font-semibold">{clarityLabel}</span>
              </p>
              <p className="mt-2 text-xs text-neutral-500">
                This helps us improve. No further action needed.
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

            {/* Auto-open form on return */}
            <a
              href="/?open=1#check"
              className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
            >
              Check another issue
            </a>
          </div>

          <p className="mt-6 text-xs text-neutral-500">
            Tip: clear photos or short videos can help us give a faster, more
            accurate recommendation.
          </p>
        </div>
      </div>
    </main>
  );
}





