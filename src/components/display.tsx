import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

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
        "font-serif text-[40px] leading-[1.28] font-normal tracking-[-0.015em] text-balance sm:text-[48px] md:text-[60px] xl:text-7xl",
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
    <div className={cn("rounded-[28px] bg-[#F7F7F8]", className)}>{children}</div>
  );
}

export function SectionLead({
  label,
  title,
  support,
  cta,
  className,
}: {
  label: string;
  title: string;
  support: string;
  cta?: { href: string; label: string };
  className?: string;
}) {
  return (
    <div className={cn("flex max-w-[580px] flex-col items-start text-left", className)}>
      <p className="mb-4 inline-flex items-center gap-0.5 text-[13px] text-foreground">
        {label}
        <ChevronRight className="size-3.5 opacity-50" />
      </p>
      <DisplayTitle>{title}</DisplayTitle>
      <p className="mt-5 max-w-[580px] text-lg leading-relaxed text-foreground/60 md:text-xl">
        {support}
      </p>
      {cta ? (
        <a
          href={cta.href}
          className="mt-6 inline-flex h-10 items-center gap-1.5 rounded-full bg-foreground/5 px-5 text-[13px] text-foreground transition-colors hover:bg-foreground/10 md:h-11 md:text-[15px]"
        >
          {cta.label}
          <span aria-hidden>→</span>
        </a>
      ) : null}
    </div>
  );
}
