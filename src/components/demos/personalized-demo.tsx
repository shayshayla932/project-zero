"use client";

import { FileText, Pencil, Settings2, Zap } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

import { AgentRow, ChatComposer, UserBubble } from "@/components/demos/chat-chrome";
import { publicAsset } from "@/lib/public-asset";
import { demoSpeed, followScroll, usePrefersReducedMotion } from "@/lib/use-demo-playback";
import { cn } from "@/lib/utils";

const FRAME_W = 960;
const FRAME_H = 640;
const ease = "cubic-bezier(0.22,1,0.36,1)";
const cardShadow = "0 24px 60px rgba(22, 28, 45, 0.07), 0 2px 8px rgba(22, 28, 45, 0.04)";
const productFont: CSSProperties = {
  fontFamily: 'var(--font-geist), "PingFang SC", "Noto Sans SC", sans-serif',
};

const USER_PREFS = "我想看看美股、ETF和期权，主要关注人工智能、半导体和科技领域";
const USER_RISK = "我能承受中等风险，但希望能明确指出下行风险。先找一些符合这些要求的股票";

const T = {
  user1: 2400,
  tools: 3100,
  files: 5200,
  ask: 5900,
  choose: 7200,
  user2: 8800,
  work: 9600,
  check1: 10800,
  check2: 11600,
  check3: 12400,
  pick: 13600,
  table: 15200,
  exit: 21400,
  loop: 22200,
};

type Phase = "greet" | "user1" | "tools" | "files" | "ask" | "choose" | "user2" | "work" | "check1" | "check2" | "check3" | "pick" | "table" | "exit";

function ui(file: string) {
  return publicAsset(`/product-ui/${file}`);
}

function phaseAt(now: number): Phase {
  if (now >= T.exit) return "exit";
  if (now >= T.table) return "table";
  if (now >= T.pick) return "pick";
  if (now >= T.check3) return "check3";
  if (now >= T.check2) return "check2";
  if (now >= T.check1) return "check1";
  if (now >= T.work) return "work";
  if (now >= T.user2) return "user2";
  if (now >= T.choose) return "choose";
  if (now >= T.ask) return "ask";
  if (now >= T.files) return "files";
  if (now >= T.tools) return "tools";
  if (now >= T.user1) return "user1";
  return "greet";
}

const past: Record<Phase, Phase[]> = {
  greet: [],
  user1: ["user1"],
  tools: ["user1", "tools"],
  files: ["user1", "tools", "files"],
  ask: ["user1", "tools", "files", "ask"],
  choose: ["user1", "tools", "files", "ask", "choose"],
  user2: ["user1", "tools", "files", "ask", "choose", "user2"],
  work: ["user1", "tools", "files", "ask", "choose", "user2", "work"],
  check1: ["user1", "tools", "files", "ask", "choose", "user2", "work", "check1"],
  check2: ["user1", "tools", "files", "ask", "choose", "user2", "work", "check1", "check2"],
  check3: ["user1", "tools", "files", "ask", "choose", "user2", "work", "check1", "check2", "check3"],
  pick: ["user1", "tools", "files", "ask", "choose", "user2", "work", "check1", "check2", "check3", "pick"],
  table: ["user1", "tools", "files", "ask", "choose", "user2", "work", "check1", "check2", "check3", "pick", "table"],
  exit: [],
};

export function PersonalizedDemo() {
  const reduced = usePrefersReducedMotion();
  const phase = usePhase(reduced);
  const show = (name: Phase) => reduced || past[phase].includes(name);
  const asking = phase === "ask" || phase === "choose";
  const chosen = phase === "choose";
  const done = reduced || phase === "table" || phase === "pick" ? 3 : phase === "check3" ? 3 : phase === "check2" ? 2 : phase === "check1" ? 1 : 0;
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = scroller.current;
    if (!node) return;
    const align = () => followScroll(node);
    align();
    const inner = node.firstElementChild;
    if (!inner) return;
    const observer = new ResizeObserver(align);
    observer.observe(inner);
    return () => observer.disconnect();
  }, [phase, reduced]);

  return (
    <ScaledCanvas width={FRAME_W} height={FRAME_H}>
      <div
        className="flex overflow-hidden rounded-[24px] bg-white"
        style={{ width: FRAME_W, height: FRAME_H, boxShadow: cardShadow, ...productFont }}
      >
        <Sidebar />
        <div className="flex h-full min-w-0 flex-1 flex-col bg-[#f7f7f8]">
          <div ref={scroller} className="min-h-0 flex-1 overflow-clip">
            <div className="relative px-6 pt-5 pb-3">
            <div data-anchor="greet">
              <p className="max-w-[640px] text-[13.5px] leading-6 text-[#101423]">
                Hi! I&apos;m your Driven assistant. I can help with multi-asset research, 24/7 market monitoring through scheduled tasks, paper trading for US and Hong Kong stocks, and live trading through a connected brokerage that supports orders. What should I call you?
              </p>
              <div className="mt-4 flex flex-col items-start gap-2">
                <Chip icon={<Spark />}>癌症疫苗里程碑能否改写莫德纳叙事？</Chip>
                <Chip icon={<Bars />}>试一试最受欢迎的投资技能 Global Flow Pulse</Chip>
                <Chip icon={<ImageIcon />}>上传你的持仓截图进行分析</Chip>
              </div>
            </div>

            <Reveal show={show("user1")}>
              <div data-anchor="user1" className="mt-5">
                <UserBubble>{USER_PREFS}</UserBubble>
              </div>
            </Reveal>

            <Reveal show={show("tools")}>
              <div data-anchor="tools" className="mt-4">
                <Tool icon={<FileText size={14} />} label="读取文件" detail="/workspace/MEMORY.md" />
                <Tool icon={<Pencil size={14} />} label="编辑文件" detail="3 次" />
                <Tool icon={<FileText size={14} />} label="读取文件" detail="/workspace/PROFILE.md" />
                <Tool icon={<Pencil size={14} />} label="编辑文件" detail="2 次" />
                <Tool icon={<Settings2 size={14} />} label="设置" detail='{"name":"Avery","description":"Avery is a personal investmen...' />
              </div>
            </Reveal>

            <Reveal show={show("files")}>
              <div data-anchor="files" className="mt-3 flex gap-3">
                <FileCard name="MEMORY.md" />
                <FileCard name="PROFILE.md" />
              </div>
            </Reveal>

            <Reveal show={show("user2")}>
              <div data-anchor="user2" className="mt-5">
                <UserBubble>{USER_RISK}</UserBubble>
              </div>
            </Reveal>

            <Reveal show={show("work")}>
              <div data-anchor="work" className="mt-4">
                <Tool icon={<Zap size={14} />} label="加载技能" detail="2 次" />
                <div className="rounded-xl border border-[#eceef2] bg-white px-3 py-2.5">
                  <p className="flex items-center gap-1.5 text-[12px] text-[#797c86]">
                    待办清单已更新
                    <Glyph file="chevron-down.svg" width={12} height={12} />
                  </p>
                  <ul className="mt-2 flex flex-col gap-2">
                    <Todo done={done >= 1}>Screening US AI and technology stocks</Todo>
                    <Todo done={done >= 2}>Validate shortlist candidates and source current downside risks</Todo>
                    <Todo done={done >= 3}>Present a concise risk-aware shortlist and screening caveats</Todo>
                  </ul>
                </div>
                <Tool icon={<FileText size={14} />} label="读取文件" detail="2 次" />
                <Tool icon={<Pencil size={14} />} label="编辑文件" detail="2 次" />
              </div>
            </Reveal>

            <Reveal show={show("pick")}>
              <div data-anchor="pick" className="mt-5">
                <p className="text-[13.5px] leading-7 text-[#101423]">
                  初筛值得继续研究的有<b className="font-semibold">英伟达（NVDA）和博通（AVGO）</b>；<b className="font-semibold">台积电（TSM）</b>也在主题内，但地缘政治尾部风险更高。坦白说，半导体单股很难算严格的“中等风险”，所以下面是候选观察名单，不是买入建议。
                </p>
                <div data-anchor="table" className="mt-4 overflow-hidden rounded-xl border border-[#eceef2] bg-white">
                  <div className="grid grid-cols-[88px_92px_1fr] gap-3 border-b border-[#f1f1f1] px-3 py-2.5 text-[12px] text-[#797c86]">
                    <span>候选</span>
                    <span>样本内平衡筛选分</span>
                    <span>主要下行风险</span>
                  </div>
                  <PickRow name="英伟达" ticker="NVDA" score="67.5" risk="出口管制可能限制中国市场和产品销售；公司披露供应链主要集中在亚洲，制造与先进封装环节若受扰，可能影响交付。见其2026财年10-K。" />
                  <PickRow name="台积电" ticker="TSM" score="55" risk="地缘政治是显著尾部风险；公司也披露地震、洪水以及水电等公用设施中断可能扰乱运营。对中等风险偏好者，我会把它列为较高风险备选。见其2025年20-F。" />
                  <PickRow name="博通" ticker="AVGO" score="27.5" risk="公司披露，2025财年前五大终端客户合计约占营收40%；若大客户削减AI基础设施支出或转向自研，业绩可能受影响。" last />
                </div>
                <p className="mt-4 text-[13px] leading-6 text-[#101423]">
                  <b className="font-semibold">筛选口径：</b>
                  美国科技、半导体及相关设备类别；采用估值因子（P/E、P/B）40%、ROE 35%、250日价格动量 25%的平衡权重。本轮只对按市值顺序返回的3只做相对计分，不代表全市场排名；分数也不是风险分，不能据此判断哪只更安全。
                </p>
                <p className="mt-3 text-[13px] leading-6 text-[#101423]">
                  <b className="font-semibold">按你的中等风险偏好，我会先深入看NVDA和AVGO；TSM则要把地缘政治风险作为核心考量。</b>
                  三者仍有行业和公司集中风险，不应把任何一只视为低波动标的。
                </p>
              </div>
            </Reveal>
            </div>
          </div>
          <div className="relative px-5 pb-4">
            <ChatComposer placeholder="聊聊投资吧..." />
            {asking ? (
              <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-4">
                <div className="rounded-2xl border border-[#eceef2] bg-white px-4 pt-3.5 pb-3 shadow-[0_16px_40px_rgba(16,20,35,0.12)]">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[14px] font-medium text-[#101423]">你想先从哪类内容开始？</p>
                    <span className="text-[16px] leading-none text-[#b0b3bd]">×</span>
                  </div>
                  <div className="mt-2">
                    <Choice k="A" selected={chosen}>AI / 半导体个股与ETF</Choice>
                    <Choice k="B">相关期权机会</Choice>
                    <Choice k="C">建立一份美股关注清单</Choice>
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <p className="flex items-center gap-1.5 text-[12.5px] text-[#797c86]">
                      <Pencil size={13} />
                      也可以直接说股票代码或具体主题
                    </p>
                    <span className="rounded-full border border-[#eceef2] px-3 py-1 text-[12px] text-[#797c86]">跳过</span>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </ScaledCanvas>
  );
}

function Sidebar() {
  return (
    <aside className="flex h-full w-[200px] shrink-0 flex-col border-r border-[#f1f1f1] bg-white px-2.5 pt-3.5">
      <div className="flex items-center justify-between px-1.5">
        <Glyph file="sidebar-logo.svg" width={78} height={18.87} />
        <Glyph file="sidebar-panel.svg" width={16} height={16} />
      </div>
      <div className="my-3 h-px bg-[#eceef2]" />
      <div className="flex flex-col gap-0.5">
        <SideItem file="sidebar-newchat.svg" turn>新对话</SideItem>
        <SideItem bell>通知渠道</SideItem>
        <SideItem file="sidebar-cron.svg">定时任务</SideItem>
        <SideItem file="sidebar-skill.svg">技能</SideItem>
        <SideItem file="sidebar-workflow.svg">连接器</SideItem>
        <SideItem file="sidebar-accounts.svg">模拟账户</SideItem>
        <SideItem file="sidebar-files.svg">文件</SideItem>
      </div>
      <div className="my-2.5 h-px bg-[#eceef2]" />
      <p className="px-1.5 py-1 text-[12px] text-[#797c86]">空间</p>
      <SideItem file="sidebar-options.svg" active>期权</SideItem>
      <div className="mt-3 flex h-8 items-center px-1.5">
        <p className="min-w-0 flex-1 text-[12px] text-[#797c86]">对话</p>
        <Glyph file="sidebar-ellipsis.svg" width={16} height={16} />
      </div>
      <p className="truncate rounded-md bg-[#f2f3f5] px-1.5 text-[13px] leading-8 text-[#101423]">Friendly Greeting</p>
    </aside>
  );
}

function SideItem({
  file,
  bell,
  turn,
  active,
  children,
}: {
  file?: string;
  bell?: boolean;
  turn?: boolean;
  active?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex h-8 items-center gap-2 rounded-md px-1.5", active && "bg-[#f2f3f5]")}>
      <span className={cn("inline-flex text-[#101423]", turn && "-rotate-90")}>
        {bell ? <BellIcon /> : <Glyph file={file!} width={16} height={16} />}
      </span>
      <span className="truncate text-[13px] leading-none font-medium text-[#101423]">{children}</span>
    </div>
  );
}

function Chip({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-[#eceef2] bg-white px-3 py-1.5 text-[12.5px] text-[#101423]">
      {icon}
      <span className="truncate">{children}</span>
    </span>
  );
}

function Tool({ icon, label, detail }: { icon: ReactNode; label: string; detail: string }) {
  return <AgentRow on icon={<span className="text-[#b0b3bd]">{icon}</span>} label={label} detail={detail} />;
}

function FileCard({ name }: { name: string }) {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-2.5 rounded-xl border border-[#eceef2] bg-white px-3 py-2.5">
      <span className="grid size-8 place-items-center rounded-lg bg-[#fff1e8] text-[#f08a24]">
        <FileText size={16} />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[13px] font-medium text-[#101423]">{name}</span>
        <span className="block text-[12px] text-[#8b8e99]">已更新文件</span>
      </span>
    </div>
  );
}

function Todo({ done, children }: { done: boolean; children: ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-[12.5px] leading-5 text-[#101423]">
      <span
        className={cn(
          "mt-0.5 grid size-4 shrink-0 place-items-center rounded-full border transition-colors duration-300",
          done ? "border-[#1f9d55] bg-[#1f9d55] text-white" : "border-[#d5d8e0] bg-white"
        )}
      >
        {done ? (
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
            <path d="M2 5.1 4.1 7.2 8 2.8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : null}
      </span>
      <span className={cn(!done && "text-[#797c86]")}>{children}</span>
    </li>
  );
}

function Choice({ k, selected, children }: { k: string; selected?: boolean; children: ReactNode }) {
  return (
    <div className={cn("flex items-center gap-2 border-t border-[#f4f5f7] py-2.5 text-[13px] text-[#101423] transition-colors duration-300", selected && "-mx-4 bg-[#f3f7ff] px-4")}>
      <span
        className={cn(
          "grid size-5 place-items-center rounded-full border text-[11px] transition-colors duration-300",
          selected ? "border-[#101423] bg-[#101423] text-white" : "border-[#e1e3e8] text-[#797c86]"
        )}
      >
        {k}
      </span>
      <span className={cn(selected && "font-medium")}>{children}</span>
    </div>
  );
}

function PickRow({ name, ticker, score, risk, last }: { name: string; ticker: string; score: string; risk: string; last?: boolean }) {
  return (
    <div className={cn("grid grid-cols-[88px_92px_1fr] gap-3 px-3 py-3 text-[12.5px] leading-5 text-[#101423]", !last && "border-b border-[#f4f5f7]")}>
      <span>
        {name}
        <span className="block text-[#797c86]">({ticker})</span>
      </span>
      <span className="pt-0.5 font-medium">{score}</span>
      <span className="text-[#3a3d48]">{risk}</span>
    </div>
  );
}

function Reveal({ show, children }: { show: boolean; children: ReactNode }) {
  return (
    <div
      className={cn("grid transition-[grid-template-rows,opacity] duration-500", show ? "opacity-100" : "opacity-0")}
      style={{ gridTemplateRows: show ? "1fr" : "0fr", transitionTimingFunction: ease }}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}

function Glyph({ file, width, height }: { file: string; width: number; height: number }) {
  return <img alt="" src={ui(file)} width={width} height={height} className="block shrink-0 max-w-none" />;
}

function BellIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
      <path d="M8 2.2a3.6 3.6 0 0 0-3.6 3.6v1.7c0 .5-.2 1-.5 1.4L3.2 10h9.6l-.7-1.1c-.3-.4-.5-.9-.5-1.4V5.8A3.6 3.6 0 0 0 8 2.2Z" fill="none" stroke="#101423" strokeWidth="1.2" />
      <path d="M6.6 11.2a1.4 1.4 0 0 0 2.8 0" fill="none" stroke="#101423" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function Spark() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
      <path d="M7 1.5 8 5l3.5 1L8 7l-1 3.5L6 7 2.5 6 6 5Z" fill="none" stroke="#7a5af8" strokeWidth="1.1" strokeLinejoin="round" />
    </svg>
  );
}

function Bars() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
      <path d="M2.5 10.5V7M7 10.5V3.5M11.5 10.5V5.5" stroke="#2f9bff" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
      <rect x="2" y="3" width="10" height="8" rx="1.2" fill="none" stroke="#8b8e99" strokeWidth="1.1" />
      <path d="M3.2 9.2 5.4 7l1.6 1.5L8.8 6.8 10.8 9.2" fill="none" stroke="#8b8e99" strokeWidth="1.1" strokeLinejoin="round" />
    </svg>
  );
}

function ScaledCanvas({ width, height, children }: { width: number; height: number; children: ReactNode }) {
  const [scale, setScale] = useState(1);
  const [node, setNode] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!node) return;
    const update = () => setScale(node.clientWidth / width);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, [node, width]);

  return (
    <div ref={setNode} className="relative w-full" style={{ height: height * scale }}>
      <div className="absolute top-0 left-0" style={{ width, height, transform: `scale(${scale})`, transformOrigin: "top left" }}>
        {children}
      </div>
    </div>
  );
}

function usePhase(reduced: boolean) {
  const [phase, setPhase] = useState<Phase>("greet");

  useEffect(() => {
    if (reduced) return;
    let start = performance.now();
    let frame = 0;
    let prev: Phase = "greet";
    const tick = (time: number) => {
      const next = phaseAt(((time - start) * demoSpeed) % T.loop);
      if (next !== prev) {
        prev = next;
        setPhase(next);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced]);

  return reduced ? "pick" : phase;
}
