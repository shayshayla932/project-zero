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
        "overflow-hidden rounded-[24px] bg-[#12141a] text-white shadow-[0_24px_60px_rgba(22,28,45,0.07),0_2px_8px_rgba(22,28,45,0.04)]",
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
      {children}
      {stages && typeof stage === "number" ? (
        <div className="flex flex-wrap gap-2 border-t border-white/8 px-4 py-3">
          {stages.map((label, index) => (
            <span
              key={label}
              data-stage-pill={index === stage ? "active" : "idle"}
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

export function Workspace({
  rail,
  children,
  prompt,
}: {
  rail?: ReactNode;
  children: ReactNode;
  prompt: string;
}) {
  return (
    <div className="flex h-[23.5rem] flex-col">
      <div className="flex min-h-0 flex-1">
        {rail ? (
          <aside className="hidden w-[8.5rem] shrink-0 border-r border-white/8 p-2 sm:block">
            {rail}
          </aside>
        ) : null}
        <div className="relative min-w-0 flex-1 overflow-hidden">{children}</div>
      </div>
      <div className="border-t border-white/8 px-3 py-2.5">
        <div className="rounded-full bg-white/6 px-3.5 py-2 text-[12px] text-white/38">
          {prompt}
        </div>
      </div>
    </div>
  );
}

export function RailItem({
  active,
  children,
  muted,
}: {
  active?: boolean;
  children: ReactNode;
  muted?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-lg px-2 py-1.5 text-[12px] leading-snug",
        active && "bg-white/12 text-white",
        !active && muted && "text-white/30",
        !active && !muted && "text-white/55"
      )}
    >
      {children}
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
        "absolute inset-0 overflow-auto p-3.5 transition-all duration-500",
        active
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0",
        className
      )}
    >
      {children}
    </div>
  );
}
