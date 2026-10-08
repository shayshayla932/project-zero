"use client";

import { DemoFrame, Stage } from "@/components/demos/demo-frame";
import { values } from "@/lib/content";
import {
  useInView,
  usePrefersReducedMotion,
  useStagedPlayback,
} from "@/lib/use-demo-playback";
import { cn } from "@/lib/utils";

const stages = values[0].stages;
const durations = [2200, 2800, 3000, 3400] as const;

const rows = [
  { contract: "NVDA 10/17 120C", vol: "18,420", prem: "$2.4M", iv: "48.2", flag: true },
  { contract: "NVDA 10/17 125C", vol: "9,110", prem: "$980K", iv: "46.1", flag: false },
  { contract: "NVDA 10/24 130C", vol: "6,540", prem: "$710K", iv: "44.8", flag: false },
];

export function RealtimeDemo() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();
  const stage = useStagedPlayback(durations, inView && !reduced);
  const current = reduced ? 3 : stage;

  return (
    <div ref={ref}>
      <DemoFrame title="新对话 · 期权大单异动" stages={stages} stage={current}>
        <Stage active={current === 0}>
          <p className="text-[13px] text-white/50">你可以这样开始</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["盘前简报", "期权大单异动", "持仓诊断"].map((chip) => (
              <span
                key={chip}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-[13px] transition-all duration-500",
                  chip === "期权大单异动"
                    ? "scale-[1.03] border-emerald-300/40 bg-emerald-300/15 text-emerald-100"
                    : "border-white/10 text-white/60"
                )}
              >
                {chip}
              </span>
            ))}
          </div>
          <div className="mt-8 rounded-xl border border-white/8 bg-white/4 px-4 py-3 text-[13px] text-white/70">
            点击「期权大单异动」，用实时成交筛出异常权利金。
          </div>
        </Stage>

        <Stage active={current === 1}>
          <div className="space-y-3">
            <ToolLine label="正在获取美股期权链" detail="NVDA · CBOE · 14:32:08 ET" done={inView} />
            <ToolLine label="计算异常成交与权利金" detail="volume z-score · premium rank" done={inView} />
            <ToolLine label="衍生指标" detail="IV · Delta · OI 变化" done={inView} />
          </div>
          <div className="mt-5 overflow-hidden rounded-xl border border-white/8">
            <table className="w-full text-left text-[12px]">
              <thead className="bg-white/4 text-white/40">
                <tr>
                  <th className="px-3 py-2 font-medium">合约</th>
                  <th className="px-3 py-2 font-medium">成交</th>
                  <th className="px-3 py-2 font-medium">权利金</th>
                  <th className="hidden px-3 py-2 font-medium sm:table-cell">IV</th>
                </tr>
              </thead>
              <tbody className="text-white/80">
                {rows.map((row) => (
                  <tr key={row.contract} className="border-t border-white/6">
                    <td className="px-3 py-2">{row.contract}</td>
                    <td className="px-3 py-2">{row.vol}</td>
                    <td className="px-3 py-2">{row.prem}</td>
                    <td className="hidden px-3 py-2 sm:table-cell">{row.iv}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Stage>

        <Stage active={current === 2}>
          <div className="relative overflow-hidden rounded-xl border border-white/8">
            <table className="w-full text-left text-[12px]">
              <thead className="bg-white/4 text-white/40">
                <tr>
                  <th className="px-3 py-2 font-medium">合约</th>
                  <th className="px-3 py-2 font-medium">成交</th>
                  <th className="px-3 py-2 font-medium">权利金</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr
                    key={row.contract}
                    className={cn(
                      "border-t border-white/6",
                      index === 0 ? "bg-emerald-300/10 text-white" : "text-white/70"
                    )}
                  >
                    <td className="px-3 py-2.5">{row.contract}</td>
                    <td className="px-3 py-2.5">{row.vol}</td>
                    <td className="px-3 py-2.5">{row.prem}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <aside className="absolute top-12 right-3 w-[min(100%,16rem)] rounded-xl border border-white/12 bg-[#1b1e27] p-3 shadow-2xl">
              <p className="text-[10px] tracking-[0.16em] text-white/40 uppercase">
                Data citation
              </p>
              <p className="mt-2 text-[13px] text-white">CBOE 实时期权成交</p>
              <p className="mt-1 text-[12px] leading-relaxed text-white/55">
                NVDA 10/17 120C · 成交 18,420 · 权利金 $2.4M · 更新 14:32:08 ET
              </p>
              <p className="mt-2 font-mono text-[11px] text-emerald-200/80">
                OPT-FLOW-8841
              </p>
            </aside>
          </div>
        </Stage>

        <Stage active={current === 3}>
          <div className="grid h-full grid-cols-[7.5rem_1fr] gap-3 sm:grid-cols-[9rem_1fr]">
            <aside className="rounded-xl bg-white/4 p-2 text-[12px]">
              <p className="px-2 py-1 text-white/35">期权 Space</p>
              {["NVDA 期权轨道", "周度备兑扫描", "波动率曲面"].map((item, index) => (
                <div
                  key={item}
                  className={cn(
                    "rounded-lg px-2 py-2 transition-colors",
                    index === 0 ? "bg-white/12 text-white" : "text-white/45"
                  )}
                >
                  {item}
                </div>
              ))}
            </aside>
            <div className="flex flex-col overflow-hidden rounded-xl border border-white/8">
              <div className="border-b border-white/8 px-3 py-2 text-[12px] text-white/50">
                option track · NVDA
              </div>
              <div className="flex-1 space-y-2 overflow-hidden p-3">
                <ChatBubble role="user">盯一下 NVDA 期权大单，异常的单独拉出来。</ChatBubble>
                <ChatBubble role="agent">
                  已接入实时行情与期权链。120C 成交与权利金显著偏离，建议加入 option track。
                </ChatBubble>
                <div className="rounded-lg border border-emerald-300/25 bg-emerald-300/10 px-3 py-2 text-[12px] text-emerald-50">
                  已定格 · option track
                  <span className="ml-2 text-emerald-100/70">NVDA 10/17 120C</span>
                </div>
              </div>
            </div>
          </div>
        </Stage>
      </DemoFrame>
    </div>
  );
}

function ToolLine({
  label,
  detail,
  done,
}: {
  label: string;
  detail: string;
  done: boolean;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/4 px-3 py-2.5">
      <span
        className={cn(
          "mt-1 size-1.5 rounded-full",
          done ? "bg-emerald-400" : "bg-white/30"
        )}
      />
      <div>
        <p className="text-[13px] text-white">{label}</p>
        <p className="text-[12px] text-white/45">{detail}</p>
      </div>
    </div>
  );
}

function ChatBubble({
  role,
  children,
}: {
  role: "user" | "agent";
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "max-w-[95%] rounded-xl px-3 py-2 text-[12px] leading-relaxed",
        role === "user"
          ? "ml-auto bg-white/12 text-white"
          : "bg-white/5 text-white/80"
      )}
    >
      {children}
    </div>
  );
}
