"use client";

import { useEffect, useRef, useState } from "react";

export function useInView<T extends HTMLElement>(threshold = 0.4) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export function useStagedPlayback(durations: readonly number[], active: boolean) {
  const [stage, setStage] = useState(0);
  const durationsKey = durations.join(",");

  useEffect(() => {
    if (!active) return;

    const ms = durations[stage] ?? 2600;
    const id = window.setTimeout(() => {
      setStage((current) => (current + 1) % durations.length);
    }, ms);
    return () => window.clearTimeout(id);
  }, [active, stage, durations, durationsKey]);

  return active ? stage : 0;
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
