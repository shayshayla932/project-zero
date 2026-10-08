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
