"use client";

import { ComingSoonBadge } from "@/components/coming-soon-badge";
import { DemoFrame, Stage } from "@/components/demos/demo-frame";
import { values } from "@/lib/content";
import {
  useInView,
  usePrefersReducedMotion,
  useStagedPlayback,
} from "@/lib/use-demo-playback";

const stages = values[2].stages;
const durations = [2600, 2800, 3000] as const;

export function ProactiveDemo() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();
  const stage = useStagedPlayback(durations, inView && !reduced);
  const current = reduced ? 2 : stage;

  return (
    <div ref={ref}>
      <DemoFrame title="Schedule · Telegram Channel" stages={stages} stage={current}>
        <Stage active={current === 0}>
          <div className="ml-auto max-w-[92%] rounded-xl bg-white/12 px-3 py-2 text-[12px] leading-relaxed text-white">
            NVDA 财报发布后，自动出一份简报，发到我的 Telegram。
          </div>
          <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-[13px] text-white">已创建日程</p>
              <ComingSoonBadge className="border-white/15 bg-white/5 text-white/55" />
            </div>
            <p className="mt-2 text-[12px] text-white/60">
              触发条件：NVDA 财报事件 · Event Trigger
            </p>
            <p className="mt-1 text-[12px] text-white/40">
              事件触发能力标记为待开发，当前先按财报日历写入 Schedule。
            </p>
          </div>
        </Stage>

        <Stage active={current === 1}>
          <p className="text-[12px] text-white/40">财报已发布 · 正在产出报告 H5</p>
          <article className="mt-3 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/8 to-white/2">
            <div className="border-b border-white/8 px-4 py-3">
              <p className="text-[11px] tracking-[0.16em] text-white/35 uppercase">
                Earnings brief
              </p>
              <p className="mt-1 text-[16px] text-white">NVDA 财报速览</p>
            </div>
            <div className="grid grid-cols-3 gap-2 px-4 py-3 text-center">
              <Metric label="营收" value="+12%" />
              <Metric label="毛利率" value="75.1%" />
              <Metric label="指引" value="上修" />
            </div>
            <p className="px-4 pb-4 text-[12px] leading-relaxed text-white/55">
              数据中心需求仍是主线。对照你的 Playbook，现货仓可继续持有，备兑窗口打开。
            </p>
          </article>
        </Stage>

        <Stage active={current === 2}>
          <div className="rounded-xl border border-[#2a6ea8]/40 bg-[#1e2c3c] p-4">
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-full bg-[#2AABEE] text-[11px] font-semibold text-white">
                TG
              </span>
              <div>
                <p className="text-[13px] text-white">Driven Channel</p>
                <p className="text-[11px] text-white/40">Telegram · 刚刚</p>
              </div>
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-white/85">
              NVDA 财报简报已生成。营收超预期，指引上修。点击查看 H5 报告。
            </p>
            <div className="mt-3 rounded-lg bg-white/8 px-3 py-2 text-[12px] text-sky-100">
              driven.ai/report/nvda-earnings
            </div>
          </div>
        </Stage>
      </DemoFrame>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-black/20 px-2 py-2">
      <p className="text-[11px] text-white/40">{label}</p>
      <p className="mt-0.5 text-[14px] text-white">{value}</p>
    </div>
  );
}
