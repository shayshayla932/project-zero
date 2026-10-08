import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function ComingSoonBadge({
  label = "待开发",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "border-foreground/15 bg-background/70 font-normal text-muted-foreground",
        className
      )}
    >
      {label}
    </Badge>
  );
}
