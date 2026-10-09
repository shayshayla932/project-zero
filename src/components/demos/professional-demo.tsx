"use client";

import { Calculator, Clock, FileText, Search, Terminal, UserRound, Zap } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

import { AgentRow, ChatComposer, StreamBlock, UserBubble } from "@/components/demos/chat-chrome";
import { publicAsset } from "@/lib/public-asset";
import { demoSpeed, followScroll, usePrefersReducedMotion } from "@/lib/use-demo-playback";
import { cn } from "@/lib/utils";

const FRAME_W = 960;
const FRAME_H = 640;
const PROMPT = "请诊断我的账户，相关性、历史回撤、波动和各持仓的风险贡献，给我仓位调整建议";
const CHAR_MS = 24;
const TYPE_START = 7600;
const TYPE_END = TYPE_START + PROMPT.length * CHAR_MS;
const SEND_AT = TYPE_END + 520;
const THREAD_AT = SEND_AT + 240;
const TOOLS_AT = THREAD_AT + 180;
const TOOL_STEP = 110;
const ADVICE_AT = TOOLS_AT + 6 * TOOL_STEP + 220;
const ORDER = "帮我下单 20 股 JNJ";
const ORDER_CHAR = 28;
const cardShadow = "0 24px 60px rgba(22, 28, 45, 0.07), 0 2px 8px rgba(22, 28, 45, 0.04)";

const productFont: CSSProperties = {
  fontFamily: 'var(--font-geist), "PingFang SC", "Noto Sans SC", sans-serif',
};

const brokers = [
  {
    id: "longbridge",
    name: "长桥证券",
    body: "通过你的长桥证券账户获取行情数据、投资组合洞察，以及其支持的券商操作。",
  },
  {
    id: "ibkr",
    name: "盈透证券",
    body: "用自然语言研究全球市场、分析组合风险，并在你的盈透账户下单（需在盈透客户端确认交易）。",
  },
  {
    id: "webull",
    name: "微牛证券",
    body: "通过你的微牛证券账户获取市场情报、组合数据与已授权的交易工具。",
  },
  {
    id: "moomoo",
    name: "Moomoo",
    body: "获取实时行情、筛选证券、分析投资组合、管理自选股，并在全球市场下单交易。",
  },
  {
    id: "tiger",
    name: "雪盈证券",
    body: "查看、分析你在雪盈证券的持仓并执行交易，安全且便捷。",
  },
  {
    id: "futu",
    name: "富途牛牛",
    body: "通过 Futu 获取实时行情、组合洞察、预设筛选和交易能力。",
  },
  {
    id: "rockflow",
    name: "Rockflow",
    body: "连接 Rockflow，查看持仓并使用已授权的交易能力。",
  },
] as const;

function ui(file: string) {
  return publicAsset(`/product-ui/${file}`);
}

const toolRows = [
  { kind: "skill", label: "加载技能", detail: '{"name":"portfolio-monitor"}' },
  { kind: "ask", label: "提问", detail: "" },
  { kind: "account", label: "account", detail: '{"action":"positions","accountId":"oci8ow7y535kyrbr2d4fgnkg"...' },
  { kind: "driven", label: "Driven Data", detail: "11 次" },
  { kind: "term", label: "终端", detail: `print '%s' {"schemaVersion":1,"holdings":[{"symbol":"AAPL"...` },
  { kind: "file", label: "读取文件", detail: "3 次" },
] as const;

const REPLY_BEAT = 780;
const REPLY_STEPS = 4;
const ORDER_START = ADVICE_AT + REPLY_STEPS * REPLY_BEAT + 520;
const DONE_TEXT = "已向 USD Account 账户提交 JNJ 20 股市价买单（GTC）。";
const ORDER_END = ORDER_START + ORDER.length * ORDER_CHAR;
const ORDER_SEND = ORDER_END + 280;
const ORDER_AT = ORDER_SEND + 200;
const ORDER_TOOLS_AT = ORDER_AT + 140;
const CONFIRM_AT = ORDER_TOOLS_AT + 3 * TOOL_STEP + 180;
const CHOOSE_AT = CONFIRM_AT + 900;
const DONE_AT = CHOOSE_AT + 700;
const EXIT_AT = DONE_AT + DONE_TEXT.length * 18 + 1600;
const LOOP = EXIT_AT + 700;

const orderRows = [
  { kind: "driven", label: "Driven Data · 行情", detail: '{"symbols":["JNJ"],"includeExtended":false,"fields":["previo...' },
  { kind: "account", label: "account", detail: '{"action":"summary","accountId":"oci8ow7y535kyrbr2d4fgnkg",...' },
  { kind: "calc", label: "计算依据", detail: '{"calculations":[{"id":"jnj_order_estimate","label":"Estimat...' },
] as const;

type ToolKind = "skill" | "ask" | "account" | "driven" | "term" | "file" | "search" | "calc";

type Phase =
  | "list"
  | "press"
  | "modal"
  | "connected"
  | "home"
  | "send"
  | "thread"
  | "advice"
  | "ask"
  | "order"
  | "confirm"
  | "choose"
  | "done"
  | "exit";

function phaseAt(now: number): Phase {
  if (now >= EXIT_AT) return "exit";
  if (now >= DONE_AT) return "done";
  if (now >= CHOOSE_AT) return "choose";
  if (now >= CONFIRM_AT) return "confirm";
  if (now >= ORDER_AT) return "order";
  if (now >= ORDER_START) return "ask";
  if (now >= ADVICE_AT) return "advice";
  if (now >= THREAD_AT) return "thread";
  if (now >= SEND_AT) return "send";
  if (now >= 7800) return "home";
  if (now >= 5600) return "connected";
  if (now >= 3400) return "modal";
  if (now >= 2000) return "press";
  return "list";
}

const threadPhases: Phase[] = ["thread", "advice", "ask", "order", "confirm", "choose", "done"];

export function ProfessionalDemo() {
  const reduced = usePrefersReducedMotion();
  const snap = useClock(reduced);
  const phase: Phase = reduced ? "done" : snap.phase;
  const typed = reduced ? PROMPT.length : snap.typed;
  const pressed = phase === "press";
  const modal = phase === "modal";
  const chat = phase === "home" || phase === "send" || threadPhases.includes(phase);
  const thread = threadPhases.includes(phase);
  const toolCount = reduced ? toolRows.length : snap.tools;
  const replyStep = reduced ? REPLY_STEPS : snap.replyStep;
  const orderTyped = reduced ? ORDER.length : snap.orderTyped;
  const orderTools = reduced ? orderRows.length : snap.orderTools;
  const order = phase === "order" || phase === "confirm" || phase === "choose" || phase === "done";
  const confirm = phase === "confirm" || phase === "choose" || phase === "done";
  const chosen = phase === "choose" || phase === "done";
  const done = phase === "done";

  return (
    <ScaledCanvas width={FRAME_W} height={FRAME_H}>
      <div
        data-phase={phase}
        className="flex overflow-hidden rounded-[24px] bg-white"
        style={{ width: FRAME_W, height: FRAME_H, boxShadow: cardShadow, ...productFont }}
      >
        <Sidebar />
        <div className="relative h-full min-w-0 flex-1 bg-[#f7f7f8]">
          {chat ? (
            thread ? (
              <DiagnosisThread
                toolCount={toolCount}
                replyStep={replyStep}
                orderTools={orderTools}
                order={order}
                confirm={confirm}
                chosen={chosen}
                done={done}
                doneChars={reduced ? DONE_TEXT.length : snap.doneChars}
                draft={phase === "ask" ? ORDER.slice(0, orderTyped) : ""}
                sending={phase === "ask" && orderTyped === ORDER.length}
              />
            ) : (
              <DiagnosisHome typed={typed} sending={phase === "send"} />
            )
          ) : (
            <>
              <Connectors pressed={pressed} connected={phase === "connected"} />
              {modal ? (
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-white/55 backdrop-blur-[2px]" />
                  <ConnectModal />
                </div>
              ) : null}
            </>
          )}
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
        <SideItem file="sidebar-newchat.svg" turn>
          新对话
        </SideItem>
        <SideItem file="sidebar-cron.svg">定时任务</SideItem>
        <SideItem file="sidebar-skill.svg">技能</SideItem>
        <SideItem file="sidebar-workflow.svg" active>
          连接器
        </SideItem>
        <SideItem file="sidebar-accounts.svg">模拟账户</SideItem>
        <SideItem file="sidebar-files.svg">文件</SideItem>
      </div>
      <div className="my-2.5 h-px bg-[#eceef2]" />
      <p className="px-1.5 py-1 text-[12px] text-[#797c86]">空间</p>
      <SideItem file="sidebar-options.svg">期权</SideItem>
      <div className="mt-3 flex h-8 items-center px-1.5">
        <p className="min-w-0 flex-1 text-[12px] text-[#797c86]">对话</p>
        <Glyph file="sidebar-ellipsis.svg" width={16} height={16} />
      </div>
      <p className="truncate px-1.5 text-[13px] leading-8 text-[#101423]">工具调用测试</p>
      <p className="truncate px-1.5 text-[13px] leading-8 text-[#101423]">基金</p>
      <p className="truncate px-1.5 text-[13px] leading-8 text-[#101423]">Skill Creation Assistance</p>
      <p className="truncate px-1.5 text-[13px] leading-8 text-[#101423]">财报期权机会探索</p>
    </aside>
  );
}

function SideItem({
  file,
  turn,
  active,
  children,
}: {
  file: string;
  turn?: boolean;
  active?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex h-8 items-center gap-2 rounded-md px-1.5", active && "bg-[#f2f3f5]")}>
      <span className={cn("inline-flex", turn && "-rotate-90")}>
        <Glyph file={file} width={16} height={16} />
      </span>
      <span className="truncate text-[13px] leading-none font-medium text-[#101423]">{children}</span>
    </div>
  );
}

function Connectors({ pressed, connected }: { pressed: boolean; connected: boolean }) {
  return (
    <div className="flex h-full flex-col px-5 pt-4">
      <div className="flex items-center gap-2">
        <p className="rounded-lg bg-[#f2f3f5] px-3 py-1.5 text-[15px] font-medium text-[#101423]">发现</p>
        <p className="px-3 py-1.5 text-[15px] text-[#797c86]">我的连接器</p>
        <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-[#e7f3ff] px-3 py-1.5 text-[13px] text-[#2694ff]">
          <Plus />
          添加连接器
        </span>
      </div>
      <h3 className="mt-5 text-[16px] font-medium text-[#101423]">证券账户</h3>
      <div className="mt-3 grid min-h-0 flex-1 grid-cols-2 content-start gap-3 overflow-hidden pb-4">
        {brokers.map((broker) => (
          <article key={broker.id} className="rounded-2xl border border-[#eceef2] bg-white px-4 py-3.5">
            <div className="flex items-start justify-between gap-3">
              <BrokerMark id={broker.id} />
              {broker.id === "ibkr" && connected ? (
                <span className="inline-flex items-center gap-2.5">
                  <span className="relative h-[22px] w-[40px] rounded-full bg-[#101423]">
                    <span className="absolute top-[3px] right-[3px] size-4 rounded-full bg-white shadow-sm" />
                  </span>
                  <span className="text-[18px] leading-none tracking-[0.18em] text-[#c5c7d0]">···</span>
                </span>
              ) : (
                <button
                  type="button"
                  className={cn(
                    "inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[13px] font-medium transition-colors duration-300",
                    broker.id === "ibkr" && pressed
                      ? "bg-[#101423] text-white"
                      : "bg-[#f3f4f6] text-[#101423]"
                  )}
                >
                  <Plus light={broker.id === "ibkr" && pressed} />
                  连接
                </button>
              )}
            </div>
            <p className="mt-3 text-[15px] font-semibold text-[#101423]">{broker.name}</p>
            <p className="mt-1 line-clamp-2 text-[12px] leading-5 text-[#8b8e99]">{broker.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function ConnectModal() {
  return (
    <div className="absolute top-1/2 left-1/2 w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white px-5 pt-4 pb-8 shadow-[0_18px_50px_rgba(16,20,35,0.16)]">
      <div className="flex items-center justify-between">
        <p className="text-[15px] font-medium text-[#101423]">连接盈透证券</p>
        <span className="text-[18px] leading-none text-[#797c86]">×</span>
      </div>
      <div className="mt-8 flex justify-center">
        <BrokerMark id="ibkr" />
      </div>
      <p className="mt-5 flex items-center justify-center gap-1.5 text-[13px] text-[#8b8e99]">
        https://api.ibkr.com/v1/api/mcp-public
        <CopyIcon />
      </p>
      <p className="mt-4 flex items-center justify-center gap-1.5 text-[13px] text-[#8b8e99]">
        <Spinner />
        连接中...
      </p>
    </div>
  );
}

const brokerLogos = {
  longbridge: "logo-longbridge.png",
  ibkr: "logo-ibkr.png",
  webull: "logo-webull.png",
  moomoo: "logo-moomoo.png",
  tiger: "logo-tiger.png",
  futu: "logo-futu.png",
  rockflow: "logo-rockflow.png",
} as const;

function BrokerMark({ id }: { id: (typeof brokers)[number]["id"] }) {
  return (
    <img
      alt=""
      src={ui(brokerLogos[id])}
      width={36}
      height={36}
      className="size-9 shrink-0 object-contain"
    />
  );
}

function Plus({ light }: { light?: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
      <path d="M6 2.2v7.6M2.2 6h7.6" stroke={light ? "#fff" : "currentColor"} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" aria-hidden>
      <rect x="4.2" y="3.2" width="6.2" height="7.2" rx="1.2" stroke="#b0b3bd" fill="none" />
      <path d="M3.2 8.8V2.8c0-.7.5-1.2 1.2-1.2h4.4" stroke="#b0b3bd" fill="none" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" className="animate-spin" aria-hidden>
      <circle cx="7" cy="7" r="5" stroke="#d5d7de" strokeWidth="1.4" fill="none" />
      <path d="M7 2a5 5 0 0 1 5 5" stroke="#8b8e99" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function Glyph({ file, width, height }: { file: string; width: number; height: number }) {
  return <img alt="" src={ui(file)} width={width} height={height} className="block shrink-0 max-w-none" />;
}

function DiagnosisHome({ typed, sending }: { typed: number; sending: boolean }) {
  return (
    <div className="flex h-full flex-col overflow-hidden px-8 pt-6">
      <p className="text-center text-[18px] font-medium text-[#101423]">Hi, 你的投资团队已就位</p>
      <div className="mx-auto mt-4 w-full max-w-[620px]">
        <ChatComposer sending={sending} placeholder="">
          <span className="text-[#101423]">
            <MonitorChip />
            {typed > 0 ? PROMPT.slice(0, typed) : null}
          </span>
        </ChatComposer>
        <div className="mt-4 flex items-start justify-between">
          <div>
            <p className="text-[13px] font-medium text-[#101423]">掌握期权先机</p>
            <p className="mt-1 flex items-center gap-1 text-[12px] text-[#797c86]">
              发现期权机会、对比策略，做出更有依据的决策。 详情
              <span className="inline-flex -rotate-90">
                <Glyph file="chevron-detail.svg" width={10} height={10} />
              </span>
            </p>
          </div>
          <span className="text-[16px] leading-none text-[#b0b3bd]">×</span>
        </div>
        <div className="mt-3 overflow-hidden rounded-xl border border-[#f1f1f1] bg-white">
          <div className="flex items-center gap-2 border-b border-[#f1f1f1] px-3">
            <span className="py-2 text-[13px] font-medium text-[#101423]">期权机会</span>
            <span className="px-2.5 py-2 text-[13px] text-[#797c86]">收益增强</span>
            <span className="px-2.5 py-2 text-[13px] text-[#797c86]">下行保护</span>
          </div>
          <HomeRow icon="icon-0dte.svg" title="扫描 0DTE 期权" body="发现潜在的当日期权机会。" />
          <div className="mx-3 h-px bg-[#f4f5f7]" />
          <HomeRow icon="icon-activity.svg" title="市场大单期权异动信号" body="发现异常成交量和可能重要的交易。" />
          <div className="mx-3 h-px bg-[#f4f5f7]" />
          <HomeRow icon="icon-file.svg" title="财报期权分析" body="探索即将发布财报的公司周边的期权机会。" />
        </div>
      </div>
    </div>
  );
}

function HomeRow({ icon, title, body }: { icon: string; title: string; body: string }) {
  return (
    <div className="flex items-start gap-2 px-3 py-2.5">
      <Glyph file={icon} width={16} height={16} />
      <div>
        <p className="text-[13px] font-medium text-[#101423]">{title}</p>
        <p className="text-[12px] text-[#797c86]">{body}</p>
      </div>
    </div>
  );
}

function DiagnosisThread({
  toolCount,
  replyStep,
  orderTools,
  order,
  confirm,
  chosen,
  done,
  doneChars,
  draft,
  sending,
}: {
  toolCount: number;
  replyStep: number;
  orderTools: number;
  order: boolean;
  confirm: boolean;
  chosen: boolean;
  done: boolean;
  doneChars: number;
  draft: string;
  sending: boolean;
}) {
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
  }, [toolCount, replyStep, orderTools, order, confirm, chosen, done, doneChars]);

  return (
    <div className="flex h-full flex-col bg-[#f7f7f8]">
      <div ref={scroller} className="min-h-0 flex-1 overflow-clip">
        <div className="px-6 pt-5">
        <UserBubble>
          <MonitorChip />
          {PROMPT}
        </UserBubble>
        <div data-anchor="tools" className="mt-5">
          {toolRows.map((row, index) => (
            <AgentRow
              key={`${row.label}-${index}`}
              on={index < toolCount}
              icon={<ToolGlyph kind={row.kind} />}
              label={row.label}
              detail={row.detail}
            />
          ))}
        </div>
        <ReplyBody step={replyStep} />
        {order ? (
          <div data-anchor="order" className="mt-4">
            <UserBubble>{ORDER}</UserBubble>
            <div className="mt-5">
              {orderRows.map((row, index) => (
                <AgentRow
                  key={`order-${index}`}
                  on={index < orderTools}
                  icon={<ToolGlyph kind={row.kind} />}
                  label={row.label}
                  detail={row.detail}
                />
              ))}
            </div>
          </div>
        ) : null}
        {doneChars > 0 ? (
          <p data-anchor="done" className="mt-2 text-[14px] leading-7 text-[#3c404c]">
            {done ? DONE_TEXT : DONE_TEXT.slice(0, doneChars)}
          </p>
        ) : null}
        </div>
      </div>
      <div className="relative px-5 pb-4">
        <ChatComposer placeholder="聊聊投资吧..." sending={sending}>
          {draft ? <span className="text-[#101423]">{draft}</span> : null}
        </ChatComposer>
        {confirm && !done ? <ConfirmCard chosen={chosen} /> : null}
      </div>
    </div>
  );
}

function ReplyBody({ step }: { step: number }) {
  return (
    <div data-anchor="advice" className="text-[14px] leading-7 text-[#3c404c]">
      <StreamBlock show={step >= 1}>
        <p className="mt-2">
          从这份快照看，<b className="font-semibold text-[#101423]">AAPL 是最大的单一持仓</b>
          ；账户也持有多只大型成长股，同时有 JNJ、PEP 和 SCHD。前者提示了单股集中度需要重点核查，但这不等于我已经验证了它们之间的历史相关性或风险贡献。
        </p>
      </StreamBlock>
      <StreamBlock show={step >= 2}>
        <div>
          <p className="mt-4 font-semibold text-[#101423]">初步调整思路</p>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>
              <b className="font-semibold text-[#101423]">先避免继续加码最大的单一持仓</b>
              ；可考虑用后续资金逐步降低单股集中，而不是依据当前这次未完成的统计仓促交易。
            </li>
            <li>
              <b className="font-semibold text-[#101423]">如果目标仍是稳定股息收入</b>
              ，可把新增资金优先用于分散化的股息资产，并继续检查股息可持续性；在完成相关性分析前，谨慎继续叠加相似的成长股风险。
            </li>
          </ul>
        </div>
      </StreamBlock>
      <StreamBlock show={step >= 3}>
        <div>
          <p className="mt-4 font-semibold text-[#101423]">临时买入思路</p>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>
              <b className="font-semibold text-[#101423]">新增资金暂时优先考虑分散化的股息核心</b>
              ，而不是继续加码最大的单股仓位或叠加更多成长股。这更贴近你建立收入流的目标，但不是经过风险模型优化的配比建议。
            </li>
            <li>
              <b className="font-semibold text-[#101423]">在你希望买个股的情况下</b>
              ，先不要仅凭这次不完整诊断决定加仓哪只；可先比较股息覆盖能力、现金流和估值，再决定是否加 JNJ 或 PEP。
            </li>
            <li>
              <b className="font-semibold text-[#101423]">不建议现在给出具体买入金额、股数或目标权重。</b>
              等相关性、历史回撤、波动率和风险贡献能被可靠计算后，再做定量调整会更稳妥。
            </li>
          </ul>
          <p className="mt-4 text-[13px] text-[#4c5160]">历史风险指标只是回顾，不是未来回撤或收益的预测；以上也不是交易指令。</p>
        </div>
      </StreamBlock>
      <StreamBlock show={step >= 4}>
        <div>
          <p className="mt-4">
            <b className="font-semibold text-[#101423]">具体名单：首选分批增持 JNJ；PEP 暂时持有、不建议继续加仓。</b>
            这是基于股息现金流的初步判断，不是上一轮组合相关性或风险贡献分析——那些指标未能可靠计算。
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <b className="font-semibold text-[#101423]">优先考虑 JNJ：</b>
              FY2025 股息支出约占自由现金流的62.9%，覆盖空间比 PEP 更充足；不过其 FY2025 自由现金流同比下降 0.7%，所以我会分批买，不会一次加很多。JNJ 最新报价为 US$256.48，时间为 2026年10月8日美东时间16:10。你账户里已有20股。
            </li>
            <li>
              <b className="font-semibold text-[#101423]">PEP 暂不加仓：</b>
              FY2025 自由现金流同比增长 6.7%，但股息支出已占自由现金流的99.6%，现金流缓冲偏薄。你已有31股；我的倾向是先持有、观察后续现金流和股息覆盖，而不是为了提高收入继续加码。最新报价为 US$128.34，时间为2026年10月8日美东时间16:00。
            </li>
          </ul>
          <p className="mt-3">
            <b className="font-semibold text-[#101423]">执行上：</b>
            若你的投资期限按长期收入配置、约 3–5 年，可把新增资金分几次投入 JNJ；这些报价只是参考，不是目标价。若 JNJ 后续自由现金流持续转弱、股息覆盖明显恶化，就暂停加仓并重新评估。由于缺少可靠的组合风险贡献结果，我不建议据此给出精确股数或仓位比例。
          </p>
        </div>
      </StreamBlock>
    </div>
  );
}

function ConfirmCard({ chosen }: { chosen: boolean }) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-4">
      <div className="rounded-2xl border border-[#eceef2] bg-white px-4 pt-3.5 pb-3 shadow-[0_16px_40px_rgba(16,20,35,0.12)]">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[13.5px] leading-6 text-[#101423]">
            请确认下单方式。当前账户购买力为 $64,891.43；JNJ 最新可用参考价是 $256.48（2026-10-08 16:10 美东），20股估算金额为 $5,129.60，实际成交价可能不同。是否提交以下模拟订单？
          </p>
          <span className="text-[16px] leading-none text-[#b0b3bd]">×</span>
        </div>
        <div className="mt-2">
          <Choice letter="A" selected={chosen} label="确认：市价买入20股JNJ（GTC）" />
          <Choice letter="B" label="改为限价单（请填写限价）" />
          <Choice letter="C" label="暂不下单" />
        </div>
        <div className="mt-2 flex items-center justify-between text-[12px] text-[#797c86]">
          <span className="inline-flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 13 13" aria-hidden>
              <path d="M2 9.2 8.8 2.4a1 1 0 0 1 1.4 0l.4.4a1 1 0 0 1 0 1.4L3.8 11H2V9.2Z" fill="none" stroke="currentColor" strokeWidth="1.1" />
            </svg>
            确认市价单，或提供限价单价格
          </span>
          <span className="rounded-full border border-[#eceef2] px-3 py-1">跳过</span>
        </div>
      </div>
    </div>
  );
}

function Choice({ letter, label, selected }: { letter: string; label: string; selected?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2.5 border-t border-[#f4f5f7] px-1 py-2.5", selected && "-mx-4 bg-[#f3f7ff] px-5")}>
      <span
        className={cn(
          "grid size-5 shrink-0 place-items-center rounded-full text-[11px] font-medium",
          selected ? "border border-[#101423] bg-[#101423] text-white" : "border border-[#e1e3e8] text-[#797c86]"
        )}
      >
        {letter}
      </span>
      <span className={cn("text-[13px] text-[#101423]", selected && "font-medium")}>{label}</span>
    </div>
  );
}

function MonitorChip() {
  return (
    <span className="mr-1.5 inline-flex items-center gap-1 rounded-md bg-[#e7f8ef] px-1.5 py-0.5 align-middle text-[12px] font-medium text-[#12a15a]">
      <Glyph file="zap-green.svg" width={12} height={12} />
      Portfolio Monitor
    </span>
  );
}

function ToolGlyph({ kind }: { kind: ToolKind }) {
  const className = "size-3.5 shrink-0 text-[#b0b3bd]";
  if (kind === "driven") return <Glyph file="driven-data.svg" width={14} height={15} />;
  if (kind === "skill") return <Zap className={className} strokeWidth={1.75} />;
  if (kind === "ask") return <UserRound className={className} strokeWidth={1.75} />;
  if (kind === "account") return <Clock className={className} strokeWidth={1.75} />;
  if (kind === "term") return <Terminal className={className} strokeWidth={1.75} />;
  if (kind === "search") return <Search className={className} strokeWidth={1.75} />;
  if (kind === "calc") return <Calculator className={className} strokeWidth={1.75} />;
  return <FileText className={className} strokeWidth={1.75} />;
}

function ScaledCanvas({
  width,
  height,
  children,
}: {
  width: number;
  height: number;
  children: ReactNode;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const update = () => setScale(element.clientWidth / width);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, [width]);

  return (
    <div ref={host} className="relative w-full" style={{ height: height * scale }}>
      <div
        className="absolute top-0 left-0"
        style={{ width, height, transform: `scale(${scale})`, transformOrigin: "top left" }}
      >
        {children}
      </div>
    </div>
  );
}

function useClock(reduced: boolean) {
  const [snap, setSnap] = useState({ phase: "list" as Phase, typed: 0, tools: 0, replyStep: 0, orderTyped: 0, orderTools: 0, doneChars: 0 });

  useEffect(() => {
    if (reduced) return;
    let start = performance.now();
    let frame = 0;
    let prev = "";
    const tick = (time: number) => {
      const now = ((time - start) * demoSpeed) % LOOP;
      const phase = phaseAt(now);
      const typed = now < TYPE_START ? 0 : Math.min(PROMPT.length, Math.floor((Math.min(now, TYPE_END) - TYPE_START) / CHAR_MS));
      const tools = now < TOOLS_AT ? 0 : Math.min(toolRows.length, Math.floor((now - TOOLS_AT) / TOOL_STEP) + 1);
      const replyStep = now < ADVICE_AT ? 0 : Math.min(REPLY_STEPS, Math.floor((now - ADVICE_AT) / REPLY_BEAT) + 1);
      const orderTyped = now < ORDER_START ? 0 : Math.min(ORDER.length, Math.floor((Math.min(now, ORDER_END) - ORDER_START) / ORDER_CHAR));
      const orderTools = now < ORDER_TOOLS_AT ? 0 : Math.min(orderRows.length, Math.floor((now - ORDER_TOOLS_AT) / TOOL_STEP) + 1);
      const doneChars = now < DONE_AT ? 0 : DONE_TEXT.length;
      const key = `${phase}:${typed}:${tools}:${replyStep}:${orderTyped}:${orderTools}:${doneChars}`;
      if (key !== prev) {
        prev = key;
        setSnap({ phase, typed, tools, replyStep, orderTyped, orderTools, doneChars });
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced]);

  return snap;
}
