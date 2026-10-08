"use client";

import { DemoFrame, RailItem, Stage, Workspace } from "@/components/demos/demo-frame";
import { values } from "@/lib/content";
import { usePrefersReducedMotion, useStagedPlayback } from "@/lib/use-demo-playback";
import { cn } from "@/lib/utils";

const stages = values[0].stages;

const rows = [
  { contract: "NVDA 10/17 120C", vol: "18,420", prem: "$2.4M", iv: "48.2" },
  { contract: "NVDA 10/17 125C", vol: "9,110", prem: "$980K", iv: "46.1" },
  { contract: "NVDA 10/24 130C", vol: "6,540", prem: "$710K", iv: "44.8" },
];

export function RealtimeDemo() {
  const reduced = usePrefersReducedMotion();
  const stage = useStagedPlayback(stages.length, !reduced);
  const current = reduced ? 3 : stage;

  return (
    <div>
      <DemoFrame title="新对话 · 期权大单异动" stages={stages} stage={current}>
        <Workspace
          prompt="继续追问成交来源、希腊值或写入 option track…"
          rail={
            <>
              <p className="px-2 py-1 text-[10px] tracking-[0.14em] text-white/30 uppercase">
                Spaces
              </p>
              <RailItem>新对话</RailItem>
              <RailItem active={current === 3}>期权 Space</RailItem>
              <RailItem muted={!current} active={current === 3}>
                · option track
              </RailItem>
              <RailItem muted>周度备兑</RailItem>
            </>
          }
        >
          <Stage active={current === 0}>
            <p className="text-[13px] text-white/80">今天想先看哪一类信号？</p>
            <p className="mt-2 text-[12px] leading-relaxed text-white/45">
              实时行情已接入美、港、A 股与期权链。点一个提示即可开始。
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
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
            <div className="mt-6 rounded-xl border border-white/8 bg-white/4 px-3 py-3 text-[12px] leading-relaxed text-white/65">
              点击「期权大单异动」，用实时成交筛出异常权利金，并带上可核验的数据来源。
            </div>
          </Stage>

          <Stage active={current === 1}>
            <div className="space-y-2">
              <ToolLine label="获取美股期权链" detail="NVDA · CBOE · 14:32:08 ET" />
              <ToolLine label="计算异常成交" detail="volume z-score · premium rank" />
              <ToolLine label="衍生指标" detail="IV 48.2 · Delta 0.41 · OI +12%" />
            </div>
            <div className="mt-3 overflow-hidden rounded-xl border border-white/8">
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
            <div className="relative">
              <div className="overflow-hidden rounded-xl border border-white/8">
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
                          index === 0 ? "bg-emerald-300/10 text-white" : "text-white/65"
                        )}
                      >
                        <td className="px-3 py-2.5">{row.contract}</td>
                        <td className="px-3 py-2.5">{row.vol}</td>
                        <td className="px-3 py-2.5">{row.prem}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <aside className="absolute top-14 right-3 w-[min(100%,15.5rem)] rounded-xl border border-white/12 bg-[#1b1e27] p-3 shadow-2xl">
                <p className="text-[10px] tracking-[0.16em] text-white/40 uppercase">
                  Data citation
                </p>
                <p className="mt-2 text-[13px] text-white">CBOE 实时期权成交</p>
                <p className="mt-1 text-[12px] leading-relaxed text-white/55">
                  NVDA 10/17 120C · 成交 18,420 · 权利金 $2.4M · 14:32:08 ET
                </p>
                <p className="mt-2 font-mono text-[11px] text-emerald-200/80">OPT-FLOW-8841</p>
              </aside>
            </div>
          </Stage>

          <Stage active={current === 3}>
            <p className="mb-3 text-[11px] text-white/40">期权 Space · 已定格到 option track</p>
            <div className="space-y-2">
              <ChatBubble role="user">盯一下 NVDA 期权大单，异常的单独拉出来。</ChatBubble>
              <ChatBubble role="agent">
                已写入 NVDA option track。120C 成交与权利金显著偏离，引用 CBOE 实时成交。
              </ChatBubble>
              <div className="rounded-lg border border-emerald-300/25 bg-emerald-300/10 px-3 py-2 text-[12px] text-emerald-50">
                定格 · option track
                <span className="ml-2 text-emerald-100/70">NVDA 10/17 120C</span>
              </div>
            </div>
          </Stage>
        </Workspace>
      </DemoFrame>
    </div>
  );
}

function ToolLine({ label, detail }: { label: string; detail: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/4 px-3 py-2">
      <span className="mt-1 size-1.5 rounded-full bg-emerald-400" />
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
        role === "user" ? "ml-auto bg-white/12 text-white" : "bg-white/5 text-white/80"
      )}
    >
      {children}
    </div>
  );
}
