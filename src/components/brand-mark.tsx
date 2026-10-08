import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        aria-hidden
        className="relative grid size-6 place-items-center rounded-md bg-foreground text-[11px] font-semibold tracking-tight text-background"
      >
        D
        <span className="absolute -top-0.5 -right-0.5 size-1.5 rounded-full bg-emerald-400" />
      </span>
      <span className="text-[15px] font-semibold tracking-tight">Driven</span>
    </span>
  );
}
