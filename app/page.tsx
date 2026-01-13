// app/page.tsx
"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function Page() {
  const sp = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const s = (sp.get("s") || "").toLowerCase();
    if (s === "leak" || s === "water") {
      // Preserve all query params (fbclid, etc) when redirecting
      const qs = sp.toString();
      router.replace(qs ? `/leak?${qs}` : "/leak");
    }
  }, [sp, router]);

  // Simple home content while redirect happens (and for normal traffic)
  return (
    <main style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: 22, fontWeight: 700 }}>Home Maintenance Check</h1>
      <p style={{ marginTop: 8, color: "#555" }}>
        If you came here for a water leak check, you’ll be redirected automatically.
      </p>

      <div style={{ marginTop: 16 }}>
        <a href="/leak" style={{ color: "#111", textDecoration: "underline" }}>
          Go to Water Leak Triage →
        </a>
      </div>
    </main>
  );
}











