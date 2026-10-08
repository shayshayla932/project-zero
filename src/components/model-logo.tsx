import { cn } from "@/lib/utils";

const logos: Record<string, string> = {
  Anthropic: "/model-logos/anthropic.svg",
  "Moonshot AI": "/model-logos/moonshot-ai.svg",
  DeepSeek: "/model-logos/deepseek.svg",
  xAI: "/model-logos/xai.svg",
  "Zhipu AI": "/model-logos/zhipu-ai.svg",
  OpenAI: "/model-logos/openai.svg",
  Google: "/model-logos/gemini.png",
};

export function ModelLogo({
  vendor,
  model,
  className,
}: {
  vendor: string;
  model: string;
  className?: string;
}) {
  const src = logos[vendor];
  return (
    <span
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-lg border border-foreground/10 bg-background",
        className
      )}
    >
      {src ? (
        // Official DrivenBench vendor marks; local copies of driven.ai/images/ModelLogo
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" width={18} height={18} className="size-[18px] object-contain" />
      ) : (
        <span className="text-[10px] font-medium text-muted-foreground">
          {model.slice(0, 1)}
        </span>
      )}
    </span>
  );
}
