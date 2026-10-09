"use client";

import { useEffect, useState } from "react";

export function useStagedPlayback(count: number, active: boolean, intervalMs = 2400) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!active) return;

    const id = window.setInterval(() => {
      setStage((current) => (current + 1) % count);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [active, count, intervalMs]);

  return stage;
}

/** Speeds every product demo. 1 matches the original timeline. */
export const demoSpeed = 1.4;

/** Move clipped demo copy without turning it into a scroll container. */
export function followScroll(viewport: HTMLElement, top?: number) {
  const inner = viewport.firstElementChild as HTMLElement | null;
  if (!inner) return;
  const max = Math.max(0, inner.offsetHeight - viewport.clientHeight);
  const next = top == null ? max : Math.min(max, Math.max(0, top));
  inner.style.transition = "none";
  inner.style.transform = `translateY(-${next}px)`;
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}
