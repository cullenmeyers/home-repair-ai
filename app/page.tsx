// app/page.tsx
import { Suspense } from "react";
import HomeRedirector from "../components/home/HomeRedirector";

export default function Page() {
  return (
    <Suspense fallback={<div style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>Loading…</div>}>
      <HomeRedirector />
    </Suspense>
  );
}











