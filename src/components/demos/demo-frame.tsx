"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function DemoFrame({
  title,
  children,
  className,
  stages,
  stage,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  stages?: readonly string[];
  stage?: number;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-white/8 bg-[#12141a] text-white shadow-[0_24px_80px_-32px_rgba(20,20,30,0.55)]",
        className
      )}
    >
      <div className="flex items-center gap-3 border-b border-white/8 px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2 rounded-full bg-white/20" />
          <span className="size-2 rounded-full bg-white/20" />
          <span className="size-2 rounded-full bg-white/20" />
        </div>
        <p className="text-[12px] text-white/55">{title}</p>
      </div>
      <div className="relative min-h-[22rem] p-4 sm:min-h-[24rem] sm:p-5">
        {children}
      </div>
      {stages && typeof stage === "number" ? (
        <div className="flex flex-wrap gap-2 border-t border-white/8 px-4 py-3">
          {stages.map((label, index) => (
            <span
              key={label}
              className={cn(
                "rounded-full px-2.5 py-1 text-[11px] tracking-wide transition-colors",
                index === stage
                  ? "bg-white text-[#12141a]"
                  : "bg-white/6 text-white/45"
              )}
            >
              {label}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function Stage({
  active,
  children,
  className,
}: {
  active: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "absolute inset-4 transition-all duration-500 sm:inset-5",
        active
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
        className
      )}
    >
      {children}
    </div>
  );
}
