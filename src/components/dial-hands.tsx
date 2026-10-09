"use client";

import { useEffect, useRef } from "react";

const TILT = 56;
const TURN = -14;
const SPEED = 1;
const MECH = true;
const FG = "26, 74, 112";
const RED = "255, 92, 96";
const BLUE = "76, 141, 255";
const GREEN = "46, 211, 160";

export function DialHands() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0;
    let H = 0;
    let R = 0;
    let vt = Date.now();
    let last = performance.now();
    const view = { ax: (TILT * Math.PI) / 180, ay: (TURN * Math.PI) / 180, px: 0, py: 0 };
    const ptr = { x: 0, y: 0 };
    let frameId = 0;

    function resize() {
      if (!cv || !ctx) return;
      const rect = cv.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width;
      H = rect.height;
      R = Math.min(W, H * 1.22) * 0.42;
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function project(x: number, y: number, z: number) {
      const ax = view.ax + view.py;
      const ay = view.ay + view.px;
      const y1 = y * Math.cos(ax) - z * Math.sin(ax);
      const z1 = y * Math.sin(ax) + z * Math.cos(ax);
      const x2 = x * Math.cos(ay) + z1 * Math.sin(ay);
      const z2 = -x * Math.sin(ay) + z1 * Math.cos(ay);
      const f = 3.2 / (3.2 + z2);
      return [W / 2 + x2 * f * R, H / 2 - y1 * f * R] as const;
    }

    const polar = (a: number, r: number) => project(Math.sin(a) * r, Math.cos(a) * r, 0);

    const easeOutBack = (t: number) => {
      const c1 = 1.7;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    };

    function angles(t: number) {
      const d = new Date(t);
      const ms = d.getMilliseconds();
      const s = d.getSeconds();
      const m = d.getMinutes();
      const h = d.getHours();
      let sec: number;
      if (MECH && SPEED === 1) {
        const p = ms / 1000;
        const k = 0.26;
        sec = s + (p < k ? easeOutBack(p / k) - 1 : 0);
      } else {
        sec = s + ms / 1000;
      }
      const min = m + (s + ms / 1000) / 60;
      const hr = (h % 12) + min / 60;
      return { s: (sec / 60) * Math.PI * 2, m: (min / 60) * Math.PI * 2, h: (hr / 12) * Math.PI * 2 };
    }

    function ring(r: number, alpha: number, w: number) {
      if (!ctx) return;
      ctx.beginPath();
      for (let i = 0; i <= 120; i++) {
        const [x, y] = polar((i / 120) * Math.PI * 2, r);
        if (i) ctx.lineTo(x, y);
        else ctx.moveTo(x, y);
      }
      ctx.strokeStyle = `rgba(${FG},${alpha})`;
      ctx.lineWidth = w;
      ctx.stroke();
    }

    function seg(a: number, r0: number, r1: number, alpha: number, w: number, color: string, cap: CanvasLineCap = "butt") {
      if (!ctx) return;
      const [x0, y0] = polar(a, r0);
      const [x1, y1] = polar(a, r1);
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.strokeStyle = `rgba(${color},${alpha})`;
      ctx.lineWidth = w;
      ctx.lineCap = cap;
      ctx.stroke();
    }

    function frame(now: number) {
      if (!ctx) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      vt += dt * 1000 * SPEED;
      const A = angles(vt);
      view.px += (ptr.x * 0.17 - view.px) * 0.06;
      view.py += (ptr.y * 0.17 - view.py) * 0.06;

      ctx.clearRect(0, 0, W, H);
      if (W > 0 && H > 0) {
        ring(1, 0.45, 1.2);
        ring(0.58, 0.12, 0.8);

        for (let i = 0; i < 12; i++) {
          const a = (i / 12) * Math.PI * 2;
          const d = Math.atan2(Math.sin(a - A.s), Math.cos(a - A.s));
          const e = Math.exp(-Math.pow(d / 0.18, 2));
          const len = (i % 3 === 0 ? 0.1 : 0.06) + e * 0.03;
          seg(a, 1 - len, 1, 0.5 + e * 0.5, i % 3 === 0 ? 2 : 1.2, e > 0.35 ? GREEN : FG);
        }

        seg(A.h, 0, 0.46, 1, 3.6, RED, "round");
        seg(A.m, 0, 0.72, 1, 2.4, BLUE, "round");
        seg(A.s, -0.14, 0.88, 1, 1.4, GREEN, "round");

        const [cx, cy] = project(0, 0, 0);
        ctx.beginPath();
        ctx.arc(cx, cy, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${FG})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(cx, cy, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = "#f4fbff";
        ctx.fill();
      }

      frameId = requestAnimationFrame(frame);
    }

    const onMove = (ev: PointerEvent) => {
      ptr.x = (ev.clientX / window.innerWidth - 0.5) * 2;
      ptr.y = (ev.clientY / window.innerHeight - 0.5) * 2;
    };
    const onLeave = () => {
      ptr.x = 0;
      ptr.y = 0;
    };

    const observer = new ResizeObserver(resize);
    observer.observe(cv);
    resize();
    if (!reduce) {
      window.addEventListener("pointermove", onMove);
      window.addEventListener("blur", onLeave);
    }
    frameId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="size-full" />;
}
