import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function DisplayTitle({
  children,
  as: Tag = "h2",
  className,
}: {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <Tag
      className={cn(
        "text-[40px] leading-[1.22] font-medium tracking-[-0.02em] text-balance sm:text-[48px] md:text-[56px]",
        className
      )}
    >
      {children}
    </Tag>
  );
}

export function SoftPanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-[28px] bg-panel", className)}>{children}</div>
  );
}
