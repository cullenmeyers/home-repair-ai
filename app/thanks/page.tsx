export const dynamic = "force-static";

export default function ThanksPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
            Submitted
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            You’re in.
          </h1>

          <p className="mt-4 text-base text-neutral-700">
            We’ll review your issue and send a quick{" "}
            <span className="font-semibold">“DIY vs maintenance”</span>{" "}
            recommendation.
          </p>

          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5">
            <p className="text-sm font-semibold">Safety first</p>
            <p className="mt-2 text-sm text-neutral-700">
              If it’s urgent or safety-related (gas smell, sparks, active flooding,
              sewage/mold, structural concerns), contact maintenance or a licensed
              professional first.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800"
            >
              Back to home
            </a>

            <a
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
            >
              Submit another issue
            </a>
          </div>

          <p className="mt-6 text-xs text-neutral-500">
            Tip: add a screenshot/photo next time if you can — it helps us respond
            faster.
          </p>
        </div>
      </div>
    </main>
  );
}
