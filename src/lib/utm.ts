export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;
export type UtmKey = (typeof UTM_KEYS)[number];
export type Utm = Partial<Record<UtmKey, string>>;

/** Reads UTM params from the URL, persisting them for the session so they survive in-page navigation. */
export function readUtm(): Utm {
  const out: Utm = {};
  try {
    const q = new URLSearchParams(window.location.search);
    for (const key of UTM_KEYS) {
      const value = q.get(key) || sessionStorage.getItem(key);
      if (value) {
        out[key] = value;
        sessionStorage.setItem(key, value);
      }
    }
  } catch {
    /* storage blocked: UTMs are best-effort */
  }
  return out;
}

export const SEGMENT_KEY = "dm-segment";

export function rememberSegment(segment: string) {
  try {
    sessionStorage.setItem(SEGMENT_KEY, segment);
  } catch {
    /* ignore */
  }
}

export function readSegment() {
  try {
    return sessionStorage.getItem(SEGMENT_KEY) || "unknown";
  } catch {
    return "unknown";
  }
}
