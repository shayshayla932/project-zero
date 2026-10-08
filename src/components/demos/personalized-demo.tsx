"use client";

import { ComingSoonBadge } from "@/components/coming-soon-badge";
import { DemoFrame, RailItem, Stage, Workspace } from "@/components/demos/demo-frame";
import { values } from "@/lib/content";
import { usePrefersReducedMotion, useStagedPlayback } from "@/lib/use-demo-playback";

const stages = values[3].stages;

export function PersonalizedDemo() {
  const reduced = usePrefersReducedMotion();
  const stage = useStagedPlayback(stages.length, !reduced);
  const current = reduced ? 2 : stage;

  return (
    <div>
      <DemoFrame title="Memory · Playbook" stages={stages} stage={current}>
        <Workspace
          prompt="把这条经验写回 Playbook，或先只记在 Memory…"
          rail={
            <>
              <p className="px-2 py-1 text-[10px] tracking-[0.14em] text-white/30 uppercase">
                You
              </p>
              <RailItem active={current === 0}>Memory</RailItem>
              <RailItem active={current === 1}>Playbook</RailItem>
              <RailItem active={current === 2} muted={current !== 2}>
                Suggest
              </RailItem>
            </>
          }
        >
          <Stage active={current === 0}>
            <p className="text-[12px] text-white/40">长期记忆被召回</p>
            <div className="mt-3 space-y-2">
              <Memory title="风险偏好" body="单笔权利金不超过组合 2%，避免在财报日前裸卖。" />
              <Memory title="交易习惯" body="更常做周度备兑，而不是方向性买权。" />
              <Memory title="关注名单" body="NVDA、0700.HK，以及半导体设备。" />
            </div>
          </Stage>

          <Stage active={current === 1}>
            <p className="text-[12px] text-white/40">按既定 Playbook 执行</p>
            <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="text-[11px] tracking-[0.16em] text-white/40 uppercase">Playbook</p>
              <p className="mt-1 text-[15px] text-white">周度备兑</p>
              <ol className="mt-3 space-y-2 text-[12px] text-white/70">
                <li>1. 筛选 IV 分位 &gt; 70 且已有现货仓的标的</li>
                <li>2. 卖出 7–14 DTE、Delta 0.20–0.30 的 Call</li>
                <li>3. 权利金占用不超过组合 2%</li>
              </ol>
            </div>
            <p className="mt-3 text-[12px] text-white/50">
              今天命中 NVDA。已按 Playbook 起草 10/17 105 Call。
            </p>
          </Stage>

          <Stage active={current === 2}>
            <div className="flex items-center gap-2">
              <p className="text-[13px] text-white">进化中的建议</p>
              <ComingSoonBadge className="border-white/15 bg-white/5 text-white/55" />
            </div>
            <p className="mt-1 text-[12px] text-white/40">Suggest tool · 待开发</p>
            <div className="mt-4 rounded-xl border border-dashed border-white/15 bg-white/4 p-4">
              <p className="text-[13px] leading-relaxed text-white/80">
                你连续四周在财报前停止备兑，胜率高于默认规则。Suggest tool
                上线后，会把这条经验写回 Playbook，而不是每次重新解释。
              </p>
              <p className="mt-3 text-[12px] text-white/40">
                建议仍由你确认。记忆会留下，规则会进化。
              </p>
            </div>
          </Stage>
        </Workspace>
      </DemoFrame>
    </div>
  );
}

function Memory({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-white/8 bg-white/4 px-3 py-2.5">
      <p className="text-[12px] text-white/40">{title}</p>
      <p className="mt-1 text-[13px] leading-relaxed text-white/85">{body}</p>
    </div>
  );
}
