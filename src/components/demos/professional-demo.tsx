"use client";

import { DemoFrame, Stage } from "@/components/demos/demo-frame";
import { values } from "@/lib/content";
import {
  useInView,
  usePrefersReducedMotion,
  useStagedPlayback,
} from "@/lib/use-demo-playback";
import { cn } from "@/lib/utils";

const stages = values[1].stages;
const durations = [2400, 2800, 2600, 3200] as const;

export function ProfessionalDemo() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();
  const stage = useStagedPlayback(durations, inView && !reduced);
  const current = reduced ? 3 : stage;

  return (
    <div ref={ref}>
      <DemoFrame title="Skill Store · 持仓诊断" stages={stages} stage={current}>
        <Stage active={current === 0}>
          <p className="text-[12px] text-white/40">正在调用 Skill</p>
          <div className="mt-3 rounded-xl border border-sky-300/25 bg-sky-300/10 px-4 py-3">
            <p className="text-[11px] tracking-[0.16em] text-sky-100/70 uppercase">
              Skill Store
            </p>
            <p className="mt-1 text-[15px] text-white">持仓诊断</p>
            <p className="mt-1 text-[12px] text-white/55">
              由基金经理维护 · 读取持仓、希腊值与集中度
            </p>
          </div>
          <div className="mt-4 space-y-2 text-[12px] text-white/60">
            <p>1. 读取组合权重与期权敞口</p>
            <p>2. 对照风险预算与行业上限</p>
            <p>3. 输出可执行的调仓与期权建议</p>
          </div>
        </Stage>

        <Stage active={current === 1}>
          <p className="text-[12px] text-white/40">调仓建议</p>
          <div className="mt-3 space-y-2">
            <Advice title="降低 NVDA 现货集中度" detail="单票权重 18% → 建议降至 12%" tone="warn" />
            <Advice title="卖出 NVDA 105 Call 做备兑" detail="IV 分位 78 · 到期 10/17 · 权利金约 $1.8" tone="ok" />
            <Advice title="保留 0700.HK 核心仓" detail="基本面框架未触发减仓条件" tone="neutral" />
          </div>
        </Stage>

        <Stage active={current === 2}>
          <p className="text-[12px] text-white/40">添加券商 MCP</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {["富途 / Moomoo", "盈透证券", "长桥", "雪盈"].map((name, index) => (
              <div
                key={name}
                className={cn(
                  "rounded-xl border px-3 py-3 text-[13px] transition-all duration-500",
                  index === 0
                    ? "border-emerald-300/35 bg-emerald-300/12 text-white"
                    : "border-white/8 bg-white/3 text-white/55"
                )}
              >
                {name}
                {index === 0 ? (
                  <p className="mt-1 text-[11px] text-emerald-100/80">已授权 · 只读持仓 + 下单</p>
                ) : (
                  <p className="mt-1 text-[11px] text-white/30">未连接</p>
                )}
              </div>
            ))}
          </div>
        </Stage>

        <Stage active={current === 3}>
          <div className="flex h-full flex-col">
            <div className="space-y-2">
              <Chat align="right">按建议卖出 1 张 NVDA 105 Call，备兑现货仓。</Chat>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-[11px] text-white/40">订单预览 · 富途 MCP</p>
                <p className="mt-1 text-[14px] text-white">SELL 1 NVDA 10/17 105 Call</p>
                <p className="mt-1 text-[12px] text-white/55">限价 $1.80 · 备兑 · 待你确认</p>
              </div>
              <Chat align="left">订单已起草。签字权在你，不会自动成交。</Chat>
            </div>
          </div>
        </Stage>
      </DemoFrame>
    </div>
  );
}

function Advice({
  title,
  detail,
  tone,
}: {
  title: string;
  detail: string;
  tone: "ok" | "warn" | "neutral";
}) {
  const toneClass = {
    ok: "border-emerald-300/25 bg-emerald-300/10",
    warn: "border-amber-300/25 bg-amber-300/10",
    neutral: "border-white/8 bg-white/4",
  }[tone];

  return (
    <div className={cn("rounded-xl border px-3 py-2.5", toneClass)}>
      <p className="text-[13px] text-white">{title}</p>
      <p className="mt-1 text-[12px] text-white/55">{detail}</p>
    </div>
  );
}

function Chat({
  align,
  children,
}: {
  align: "left" | "right";
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "max-w-[92%] rounded-xl px-3 py-2 text-[12px] leading-relaxed",
        align === "right" ? "ml-auto bg-white/12 text-white" : "bg-white/5 text-white/75"
      )}
    >
      {children}
    </div>
  );
}
