/**
 * The page "turns on" once: after the preloader (first visit) or right away (return visits).
 * Everything that ignites (headline, skyline windows, the 3D diamond) subscribes here.
 */
const EVENT = "dm:ignite";

export function ignite() {
  if (typeof window === "undefined" || window.__dmIgnited) return;
  window.__dmIgnited = true;
  document.documentElement.classList.add("is-ignited");
  window.dispatchEvent(new Event(EVENT));
}

export function onIgnite(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  if (window.__dmIgnited) {
    const id = requestAnimationFrame(cb);
    return () => cancelAnimationFrame(id);
  }
  const handler = () => cb();
  window.addEventListener(EVENT, handler, { once: true });
  return () => window.removeEventListener(EVENT, handler);
}
