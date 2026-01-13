// components/leak/leakLogic.ts
export type LeakWhere = "under_sink" | "toilet" | "ceiling_wall" | "unknown";
export type YesNo = "yes" | "no";
export type Decision = "monitor" | "submit" | "escalate";

export type LeakAnswers = {
  where: LeakWhere;
  actively_dripping: YesNo;
  // ✅ Replaced "visible_damage" with "danger_triggers"
  // Meaning: any high-risk signals (near electrical, ceiling bulge, fast pooling, can't stop it)
  danger_triggers: YesNo;
};

export type LeakResult = {
  decision: Decision;
  urgencyLabel: "Low" | "Medium" | "High";
  responsibilityHint: string;
  why: string;
  nextSteps: string[];
  messageTemplate: string;
};

function responsibilityHint(where: LeakWhere): string {
  switch (where) {
    case "under_sink":
      return "Often landlord/maintenance if it’s supply/drain plumbing; if it’s your appliance/fixture, it may be on you.";
    case "toilet":
      return "Often landlord/maintenance for supply/valve/base leaks; HOA may apply in condos depending on what’s leaking.";
    case "ceiling_wall":
      return "Often upstream source (unit above/common area) → landlord/HOA/management is usually responsible.";
    default:
      return "Varies — management can determine responsibility once they see photos and location details.";
  }
}

function whereText(where: LeakWhere) {
  return where === "under_sink"
    ? "under the sink"
    : where === "toilet"
    ? "around the toilet"
    : where === "ceiling_wall"
    ? "on the ceiling/wall"
    : "in my home (source unclear)";
}

function defaultMessage(decision: Decision, where: LeakWhere): string {
  const loc = whereText(where);

  // Light renter-friendly framing that increases “send” rate
  const renterLine =
    "If this is a rental, I’d like to document it early to prevent damage and avoid liability confusion.";

  if (decision === "escalate") {
    return `Hi — I have an active water leak ${loc} with higher-risk signs (possible spreading / safety concern). Can someone assist ASAP? I can share photos/video and access details. ${renterLine}`;
  }

  if (decision === "submit") {
    return `Hi — I noticed a water leak ${loc}. It’s not an emergency, but I’m concerned about damage. Can you advise next steps and schedule a repair? I can share photos/video. ${renterLine}`;
  }

  return `Hi — I noticed possible moisture/leak signs ${loc}. I’m monitoring it and can share a photo for documentation. Please advise if you’d like me to submit a maintenance request.`;
}

export function evaluateLeak(a: LeakAnswers): LeakResult {
  const isActive = a.actively_dripping === "yes";
  const danger = a.danger_triggers === "yes";

  // ✅ Decision rules
  // - Danger triggers => escalate (even if not actively dripping)
  // - Active leak with no danger => submit
  // - Not active + no danger => monitor (short)
  let decision: Decision = "monitor";
  if (danger) decision = "escalate";
  else if (isActive) decision = "submit";

  const urgencyLabel: LeakResult["urgencyLabel"] =
    decision === "escalate" ? "High" : decision === "submit" ? "Medium" : "Low";

  // ✅ Shorter “why” (mobile-friendly)
  const why =
    decision === "escalate"
      ? "High-risk signs mean it can worsen fast. Escalate now for safety and damage control."
      : decision === "submit"
      ? "Active leaks often get worse quietly. Reporting early prevents damage and blame later."
      : "No active leak and no danger signs → monitor briefly, but document it.";

  const stepsEscalate = [
    "If safe, shut off the nearest water valve (sink/toilet/main) and move items away.",
    "If water is near outlets or ceiling is bulging, avoid contact and escalate immediately.",
    "Take a quick photo/video (helps them respond faster).",
    "Notify landlord/maintenance/HOA now (use the message below).",
  ];

  const stepsSubmit = [
    "Take a photo/video (helps accuracy and documentation).",
    "Submit a maintenance request today.",
    "Keep a towel/bucket in place until serviced.",
  ];

  const stepsMonitor = [
    "Take a photo now (timestamp).",
    "Re-check in 2–4 hours and again tomorrow.",
    "If it becomes active or danger signs appear → escalate.",
  ];

  const nextSteps =
    decision === "escalate"
      ? stepsEscalate
      : decision === "submit"
      ? stepsSubmit
      : stepsMonitor;

  return {
    decision,
    urgencyLabel,
    responsibilityHint: responsibilityHint(a.where),
    why,
    nextSteps,
    messageTemplate: defaultMessage(decision, a.where),
  };
}


