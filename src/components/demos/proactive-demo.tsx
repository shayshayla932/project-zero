"use client";

import { Clock } from "lucide-react";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";

import { ChatComposer, UserBubble } from "@/components/demos/chat-chrome";
import { publicAsset } from "@/lib/public-asset";
import { demoSpeed, usePrefersReducedMotion } from "@/lib/use-demo-playback";
import { cn } from "@/lib/utils";

const FRAME_W = 960;
const FRAME_H = 640;
const ease = "cubic-bezier(0.22,1,0.36,1)";
const cardShadow = "0 24px 60px rgba(22, 28, 45, 0.07), 0 2px 8px rgba(22, 28, 45, 0.04)";
const productFont: CSSProperties = {
  fontFamily: 'var(--font-geist), "PingFang SC", "Noto Sans SC", sans-serif',
};

const PROMPT =
  "帮我创建一个定时任务监测盘前持仓股异动提醒。美股开盘前 15 分钟执行一次。当持仓股票涨跌超过 5% 时，分析异动原因、给出交易建议。每笔最多 $500, 涨幅超过 5%且有正面公告时买入，跌幅超过 5%不主动卖。";

const CHAR_MS = 36;
const TYPE_START = 700;
const TYPE_END = TYPE_START + PROMPT.length * CHAR_MS;
const SEND_AT = TYPE_END + 520;
const CHAT_AT = SEND_AT + 360;
const REPLY_AT = CHAT_AT + 720;
const CARD_AT = REPLY_AT + 980;
const PRESS_AT = CARD_AT + 1200;
const PANEL_AT = PRESS_AT + 420;
const PHONE_AT = PANEL_AT + 2600;
const TAP_AT = PHONE_AT + 1800;
const PICK_AT = TAP_AT + 1600;
const REACT_AT = PICK_AT + 900;
const EXIT_AT = REACT_AT + 4200;
const LOOP = EXIT_AT + 700;

const chats = [
  "工具调用测试",
  "基金",
  "Skill Creation Assistance",
  "财报期权机会探索",
  "/status",
  "Portfolio Comparison",
];

type Phase = "type" | "send" | "chat" | "reply" | "card" | "press" | "panel" | "phone" | "tap" | "pick" | "reacted" | "exit";

function ui(file: string) {
  return publicAsset(`/product-ui/${file}`);
}

function phaseAt(now: number): Phase {
  if (now >= EXIT_AT) return "exit";
  if (now >= REACT_AT) return "reacted";
  if (now >= PICK_AT) return "pick";
  if (now >= TAP_AT) return "tap";
  if (now >= PHONE_AT) return "phone";
  if (now >= PANEL_AT) return "panel";
  if (now >= PRESS_AT) return "press";
  if (now >= CARD_AT) return "card";
  if (now >= REPLY_AT) return "reply";
  if (now >= CHAT_AT) return "chat";
  if (now >= SEND_AT) return "send";
  return "type";
}

function typedAt(now: number) {
  if (now < TYPE_START) return 0;
  return Math.min(PROMPT.length, Math.floor((now - TYPE_START) / CHAR_MS));
}

export function ProactiveDemo() {
  const reduced = usePrefersReducedMotion();
  const snap = usePlayback(reduced);
  const phase = reduced ? "reacted" : snap.phase;
  const phone = phase === "phone" || phase === "tap" || phase === "pick" || phase === "reacted" || phase === "exit";
  const typed = reduced ? PROMPT.length : snap.typed;
  const showChat = phase !== "type" && phase !== "send" && phase !== "exit";
  const panelOpen = phase === "panel" || reduced;
  const showReply = phase === "reply" || phase === "card" || phase === "press" || phase === "panel";
  const showCard = phase === "card" || phase === "press" || phase === "panel";

  return (
    <ScaledCanvas width={FRAME_W} height={FRAME_H}>
      <div
        data-phase={phase}
        className="relative overflow-hidden rounded-[24px] bg-white"
        style={{
          width: FRAME_W,
          height: FRAME_H,
          boxShadow: phone ? "none" : cardShadow,
          background: phone ? "transparent" : undefined,
          ...productFont,
        }}
      >
        <div
          className="absolute inset-0 flex"
          style={{ opacity: phone ? 0 : 1, transition: `opacity 500ms ${ease}`, pointerEvents: phone ? "none" : "auto" }}
        >
        <div
          className="h-full shrink-0 overflow-clip"
          style={{ width: panelOpen ? 0 : 200, transition: `width 560ms ${ease}` }}
        >
          <div
            className="h-full w-[200px]"
            style={{
              transform: panelOpen ? "translateX(-200px)" : "translateX(0)",
              transition: `transform 560ms ${ease}`,
            }}
          >
            <Sidebar />
          </div>
        </div>
        <div className="flex h-full min-w-0 flex-1 bg-[#f7f7f8]">
          <div className="relative min-w-0 flex-1">
            <div
              className={cn(
                "absolute inset-0 transition-opacity duration-500",
                showChat ? "pointer-events-none opacity-0" : "opacity-100"
              )}
              style={{ transitionTimingFunction: ease }}
            >
              <NewChat typed={typed} typing={phase === "type" && typed > 0 && typed < PROMPT.length} sending={phase === "send"} />
            </div>
            <div
              className={cn(
                "absolute inset-0 transition-opacity duration-500",
                showChat ? "opacity-100" : "pointer-events-none opacity-0"
              )}
              style={{ transitionTimingFunction: ease }}
            >
              <Thread showReply={showReply} showCard={showCard} />
            </div>
          </div>
          <div
            className="relative h-full shrink-0 overflow-clip"
            style={{ width: panelOpen ? 500 : 0, transition: `width 560ms ${ease}` }}
          >
            <div className="absolute top-0 left-0 h-full w-[500px] border-l border-[#f1f1f1] bg-white shadow-[-12px_0_32px_rgba(16,20,35,0.04)]">
              <CronPanel />
            </div>
          </div>
        </div>
        </div>
        <div
          className="absolute inset-0 overflow-clip"
          style={{ opacity: phone ? 1 : 0, transition: `opacity 500ms ${ease}`, pointerEvents: phone ? "auto" : "none" }}
        >
          <PhoneStage mode={phase === "tap" ? "tap" : phase === "pick" ? "pick" : phase === "phone" ? "idle" : "reacted"} />
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
        <SideItem file="sidebar-workflow.svg">连接器</SideItem>
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
      <div className="min-h-0 flex-1 overflow-clip">
        {chats.map((chat) => (
          <p key={chat} className="truncate px-1.5 text-[13px] leading-8 text-[#101423]">
            {chat}
          </p>
        ))}
      </div>
    </aside>
  );
}

function SideItem({ file, turn, children }: { file: string; turn?: boolean; children: ReactNode }) {
  return (
    <div className="flex h-8 items-center gap-2 rounded-md px-1.5">
      <span className={cn("inline-flex", turn && "-rotate-90")}>
        <Glyph file={file} width={16} height={16} />
      </span>
      <span className="truncate text-[13px] leading-none font-medium text-[#101423]">{children}</span>
    </div>
  );
}

function NewChat({ typed, typing, sending }: { typed: number; typing: boolean; sending: boolean }) {
  const text = PROMPT.slice(0, typed);
  return (
    <div className="flex h-full flex-col overflow-clip px-8 pt-6">
      <p className="text-center text-[18px] font-medium text-[#101423]">Hi，你的投资团队已就位</p>
      <div className="mx-auto mt-4 w-full max-w-[620px]">
        <Composer
          text={text}
          placeholder="聊聊投资吧..."
          typing={typing}
          model="自动"
          sendHot={typed > 0}
          sending={sending}
        />
      </div>
      <div className="mx-auto mt-4 w-full max-w-[620px]">
        <div className="flex items-start justify-between">
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
            <Tab active>期权机会</Tab>
            <Tab>收益增强</Tab>
            <Tab>下行保护</Tab>
          </div>
          <Opportunity icon="icon-0dte.svg" title="扫描 0DTE 期权" body="发现潜在的当日期权机会。" />
          <div className="mx-3 h-px bg-[#f4f5f7]" />
          <Opportunity icon="icon-activity.svg" title="市场大单期权异动信号" body="发现异常成交量和可能重要的交易。" />
          <div className="mx-3 h-px bg-[#f4f5f7]" />
          <Opportunity icon="icon-file.svg" title="财报期权分析" body="探索即将发布财报的公司周边的期权机会。" />
        </div>
      </div>
    </div>
  );
}

function Thread({ showReply, showCard }: { showReply: boolean; showCard: boolean }) {
  return (
    <div className="flex h-full flex-col bg-[#f7f7f8]">
      <div className="min-h-0 flex-1 overflow-clip px-5 pt-5">
        <div className="flex justify-end">
          <UserBubble>{PROMPT}</UserBubble>
        </div>
        <Reveal show={showReply}>
          <div className="mt-5">
            <div className="flex items-start gap-2 pb-3 text-[14px] leading-6 text-[#aeb0bb]">
              <Clock className="mt-0.5 size-3.5 shrink-0 text-[#b0b3bd]" strokeWidth={1.75} />
              <p className="min-w-0">
                <span>定时任务</span>
                <span> › </span>
                <span className="break-words">已创建定时任务</span>
              </p>
            </div>
            <p className="mt-3 text-[13.5px] leading-7 text-[#101423]">
              已创建盘前持仓异动提醒：每个工作日纽约时间 <b className="font-semibold">09:15</b> 执行（通常为美股开盘前 15 分钟），监测你的{" "}
              <b className="font-semibold">US 模拟账户</b>
              。当持仓股票盘前涨跌幅超过 <b className="font-semibold">±5%</b>
              时，会核实近期消息、分析可能原因并给出审慎的交易建议；不会自动下单。提醒将发送至{" "}
              <b className="font-semibold">Telegram</b>。
            </p>
            <p className="mt-3 text-[13.5px] leading-7 text-[#101423]">
              下次运行时间：
              <span className="underline decoration-dotted underline-offset-4">2026-10-08T13:16:05.513Z</span>。
            </p>
          </div>
        </Reveal>
        <Reveal show={showCard}>
          <div className="mt-4">
            <CronCard status="已创建定时任务" />
          </div>
          <span className="mt-3 inline-flex text-[#c5c8d0]">
            <InfoMark />
          </span>
        </Reveal>
      </div>
      <div className="px-5 pb-4">
        <Composer text="" placeholder="聊聊投资吧..." model="GPT-6 Luna" sendHot={false} />
      </div>
    </div>
  );
}

function CronCard({ status }: { status: string }) {
  return (
    <div className="flex w-fit items-center gap-3 rounded-xl border border-[#eceef2] bg-white px-3 py-2.5">
      <span className="grid size-8 place-items-center rounded-full bg-[#fff1e4] text-[#f08a24]">
        <ClockMark />
      </span>
      <span>
        <span className="block text-[13px] font-medium text-[#101423]">us-premarket-holding-move-alert</span>
        <span className="mt-0.5 block text-[12px] text-[#8b8e99]">{status}</span>
      </span>
    </div>
  );
}

function CronPanel() {
  return (
    <div className="flex h-full flex-col px-4 pt-3.5 pb-4">
      <div className="flex items-center gap-2">
        <p className="min-w-0 flex-1 truncate text-[13px] text-[#101423]">us-premarket-holding-move-alert</p>
        <span className="text-[16px] leading-none text-[#797c86]">×</span>
        <Glyph file="sidebar-panel.svg" width={15} height={15} />
      </div>
      <div className="mt-4 flex items-center gap-2">
        <span className="size-1.5 rounded-full bg-[#22a06b]" />
        <span className="text-[12px] text-[#101423]">运行中</span>
        <span className="text-[12px] text-[#797c86]">下次执行：3 小时后</span>
        <span className="ml-auto inline-flex items-center gap-2">
          <span className="relative h-[20px] w-[36px] rounded-full bg-[#101423]">
            <span className="absolute top-[2px] right-[2px] size-4 rounded-full bg-white" />
          </span>
          <span className="text-[16px] tracking-[0.16em] text-[#c5c7d0]">···</span>
        </span>
      </div>
      <h3 className="mt-4 text-[15px] font-semibold text-[#101423]">us-premarket-holding-move-alert</h3>
      <div className="mt-3 min-h-0 flex-1 overflow-clip rounded-xl bg-[#f6f7f9] px-3 py-2.5 text-[11px] leading-[16px] text-[#4c5160]">
        <p>
          每个美股工作日，在纽约时间09:15执行盘前持仓异动监测，并按以下已授权规则进行自动模拟下单。仅使用 US paper trading
          account（USD Account，accountId: oci8ow7y535kyrbr2d4fgnkg），绝不使用真实账户，不交易非美股资产。
        </p>
        <p className="mt-2">
          1. 先读取当前持仓、账户可用资金及未完成订单，只检查仍持有的美股。用 includeExtended=true
          获取各持仓盘前报价；必须依据最新可用的 prePostHours 盘前观察值及 previousClose
          计算盘前涨跌幅。若观察值不可用、时间戳过旧、不是盘前观察或报价结果有警告，则不以常规时段价格替代；该股只报告数据不可用，不交易。
        </p>
        <p className="mt-2">
          2. 当日仅当个股盘前涨幅严格超过5%，并有可核实的正面公司公告/监管披露/可靠财经新闻作为支撑时，才考虑买入模拟单。若新闻原因未证实、仅为市场传闻、或证据并非明确正面，不下单。盘前跌幅超过5%时不得自动卖出；任何卖单均不允许。
        </p>
        <p className="mt-2">
          3. 每笔买入上限为USD 500，且不得超过账户可用资金。仅提交限价、当日有效（day）模拟买单；限价不得高于该股最新有效盘前价格。股数取不超过预算且为正整数的最大股数；若预算不足以买1股则不下单。每只股票每次运行最多一笔；如该股已有未完成订单则跳过，避免重复挂单。不得提交市价单、不得取消或修改既有订单。
        </p>
      </div>
      <div className="mt-3 flex flex-col gap-2.5 text-[12px]">
        <Meta label="重复" value="工作日 09:15 (America/New_York)" />
        <Meta label="模型" value="自动" caret />
        <Meta label="运行于" value="持续复用" caret />
        <Meta label="通知渠道" value="Telegram-shaylalas_bot" caret />
      </div>
    </div>
  );
}

function Meta({ label, value, caret }: { label: string; value: string; caret?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[#797c86]">{label}</span>
      <span className="inline-flex items-center gap-1 text-[#101423]">
        {value}
        {caret ? <Caret /> : null}
      </span>
    </div>
  );
}

function Composer({
  text,
  placeholder,
  sending,
}: {
  text: string;
  placeholder: string;
  typing?: boolean;
  model?: string;
  sendHot?: boolean;
  sending?: boolean;
}) {
  return (
    <ChatComposer placeholder={placeholder} sending={sending}>
      {text ? <span className="text-[#101423]">{text}</span> : null}
    </ChatComposer>
  );
}

function Tab({ active, children }: { active?: boolean; children: ReactNode }) {
  return (
    <span className={cn("py-2 text-[13px] font-medium", active ? "text-[#101423]" : "px-2 text-[#797c86]")}>
      {children}
    </span>
  );
}

function Opportunity({ icon, title, body }: { icon: string; title: string; body: string }) {
  return (
    <div className="flex items-start gap-2 px-3 py-2">
      <Glyph file={icon} width={18} height={18} />
      <div>
        <p className="flex items-center text-[13px] font-medium text-[#101423]">
          {title}
          <Caret />
        </p>
        <p className="mt-0.5 text-[12px] text-[#797c86]">{body}</p>
      </div>
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

function Caret() {
  return (
    <span className="inline-flex -rotate-90">
      <Glyph file="chevron-down.svg" width={12} height={12} />
    </span>
  );
}

function Glyph({ file, width, height }: { file: string; width: number; height: number }) {
  return <img alt="" src={ui(file)} width={width} height={height} className="block shrink-0 max-w-none" />;
}

function ClockMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
      <circle cx="7" cy="7.4" r="4.6" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7 4.6V7.5L8.8 8.6" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M5.2 1.6h3.6" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function InfoMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
      <circle cx="7" cy="7" r="5.2" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <path d="M7 6.2V9.4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <circle cx="7" cy="4.6" r="0.6" fill="currentColor" />
    </svg>
  );
}

const quotes = [
  ["AAPL", "337.2995", "333.63", "+1.10%"],
  ["AMZN", "258.9126", "256.29", "+1.02%"],
  ["GOOGL", "351.91", "347.68", "+1.22%"],
  ["JNJ", "258.66", "254.78", "+1.52%"],
  ["META", "722.74", "738.88", "-2.18%"],
  ["MSFT", "529.0976", "529.30", "-0.04%"],
  ["NFLX", "70.04", "68.69", "+1.97%"],
  ["NVDA", "235.31", "239.24", "-1.64%"],
  ["PEP", "124.78", "125.71", "-0.74%"],
  ["SCHD", "32.69", "32.85", "-0.49%"],
] as const;

const reactions = ["❤️", "👍", "👎", "🔥", "🥰", "👏"];
const SCREEN_W = 402;
const SCREEN_H = 874;
const PHONE_W = 450;
const PHONE_H = 920;
const phoneScale = 402 / (PHONE_W * (1316 / 1350));
const phoneFont: CSSProperties = {
  fontFamily: '"SF Pro", "SF Pro Text", -apple-system, BlinkMacSystemFont, "PingFang SC", "Noto Sans SC", sans-serif',
};
const phoneFade: CSSProperties = {
  WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 46%, transparent 68%)",
  maskImage: "linear-gradient(to bottom, #000 0%, #000 46%, transparent 68%)",
};

function PhoneStage({ mode }: { mode: "idle" | "tap" | "pick" | "reacted" }) {
  const menu = mode === "tap" || mode === "pick";
  const reacted = mode === "reacted";
  return (
    <div className="relative h-full">
      <ChannelBadge name="Gmail" className="top-[148px] left-[214px] -rotate-[11deg]">
        <GmailMark />
      </ChannelBadge>
      <ChannelBadge name="微信" className="top-[22px] right-[206px] rotate-[9deg]">
        <WeChatMark />
      </ChannelBadge>
      <ChannelBadge name="Telegram" className="top-[242px] right-[188px] -rotate-[8deg]">
        <TelegramMark />
      </ChannelBadge>
      <div
        className="absolute top-3 left-1/2 z-10"
        style={{ transform: "translateX(-50%)", filter: "drop-shadow(0 24px 60px rgba(22, 28, 45, 0.07)) drop-shadow(0 2px 8px rgba(22, 28, 45, 0.04))" }}
      >
        <div style={{ width: PHONE_W, height: PHONE_H, transform: `scale(${phoneScale})`, transformOrigin: "top center", ...phoneFade }}>
          <div
            className="absolute overflow-hidden rounded-[54px] bg-[#92b788]"
            style={{ left: (PHONE_W - SCREEN_W) / 2, top: (PHONE_H - SCREEN_H) / 2, width: SCREEN_W, height: SCREEN_H, ...phoneFont }}
          >
            <img alt="" src={ui("tg-pattern.svg")} className="pointer-events-none absolute inset-0 h-full w-full max-w-none object-cover" />
            <div
              className="absolute inset-x-0 top-[62px] bottom-0 z-0 overflow-clip"
              style={{
                WebkitMaskImage: "linear-gradient(to bottom, transparent 0px, transparent 44px, #000 76px)",
                maskImage: "linear-gradient(to bottom, transparent 0px, transparent 44px, #000 76px)",
              }}
            >
              <div
                className="px-1 pt-[52px]"
                style={{
                  transform: reacted ? "translateY(-120px)" : "translateY(0)",
                  transition: `transform 520ms ${ease}`,
                }}
              >
                <div className="flex items-end gap-1.5 pr-6 pl-2">
                  <TelegramBubble reacted={reacted} />
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-x-0 top-0 z-20">
              <div className="flex items-center justify-center gap-[154px] px-4 pt-[21px] pb-[19px]">
                <div className="flex h-[22px] flex-1 items-center justify-center pt-0.5">
                  <p className="text-[17px] leading-[22px] font-semibold text-white">9:41</p>
                </div>
                <div className="flex h-[22px] flex-1 items-center justify-center gap-[7px] pt-px">
                  <img alt="" src={ui("tg-cellular.svg")} className="block shrink-0" />
                  <img alt="" src={ui("tg-wifi.svg")} className="block shrink-0" />
                  <img alt="" src={ui("tg-battery.svg")} className="block shrink-0" />
                </div>
              </div>
              <div className="mx-auto flex h-11 w-[370px] items-center gap-2 p-0">
                <Glass className="grid size-11 shrink-0 place-items-center rounded-full">
                  <ChevronBack />
                </Glass>
                <Glass className="flex h-11 min-w-0 flex-1 flex-col items-center justify-center rounded-full px-4">
                  <p className="text-[15px] leading-[18px] font-semibold tracking-[-0.23px] text-[#333]">Shaylala</p>
                  <p className="text-[12px] leading-[14px] font-medium text-[#999]">bot</p>
                </Glass>
                <Glass className="grid size-11 shrink-0 place-items-center rounded-full p-[3px]">
                  <span className="grid size-[38px] place-items-center rounded-full bg-[#34c759] text-[16px] font-semibold text-white">S</span>
                </Glass>
              </div>
            </div>
            <div className="absolute inset-x-0 top-0 z-30">
              <div
                className="absolute top-[188px] left-[62%] flex -translate-x-1/2 flex-col items-center"
                style={{
                  opacity: menu ? 1 : 0,
                  transform: `translateX(-50%) ${menu ? "translateY(0)" : "translateY(8px)"}`,
                  transition: `opacity 320ms ${ease}, transform 320ms ${ease}`,
                  pointerEvents: menu ? "auto" : "none",
                }}
              >
                <div className="mb-2 flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 shadow-[0_8px_24px_rgba(16,20,35,0.16)]">
                  {reactions.map((emoji, index) => (
                    <span
                      key={emoji}
                      className="grid size-6 place-items-center rounded-full text-[15px]"
                      style={{
                        background: mode === "pick" && index === 4 ? "#f2f3f5" : "transparent",
                        transform: mode === "pick" && index === 4 ? "scale(1.18)" : "scale(1)",
                        transition: `transform 220ms ${ease}, background 220ms ${ease}`,
                      }}
                    >
                      {emoji}
                    </span>
                  ))}
                  <span className="grid size-5 place-items-center rounded-full bg-[#f2f3f5] text-[11px] text-[#8e8e93]">⌄</span>
                </div>
                <div className="w-[168px] overflow-hidden rounded-2xl bg-white py-1 shadow-[0_12px_32px_rgba(16,20,35,0.18)]">
                  <MenuRow label="Reply" icon="reply" />
                  <MenuRow label="Copy" icon="copy" />
                  <MenuRow label="Forward" icon="forward" />
                  <MenuRow label="Pin" icon="pin" />
                  <MenuRow label="Report" icon="report" />
                  <MenuRow label="Delete" icon="delete" />
                </div>
              </div>
            </div>
          </div>
          <img alt="" src={ui("iphone-17-pro.png")} className="pointer-events-none absolute inset-0 h-full w-full max-w-none" />
        </div>
      </div>
    </div>
  );
}

function ChannelBadge({ name, className, children }: { name: string; className: string; children: ReactNode }) {
  return (
    <div className={cn("pointer-events-none absolute z-0 size-[92px]", className)} title={name}>
      {children}
    </div>
  );
}

function GmailMark() {
  return (
    <svg viewBox="0 0 48 48" className="size-full drop-shadow-[0_16px_28px_rgba(22,28,45,0.18)]" aria-hidden>
      <path fill="#34A853" d="M45 16.2 40 19l-5 4.7V40h7c1.7 0 3-1.3 3-3V16.2Z" />
      <path fill="#4285F4" d="M3 16.2 6.6 17.9 13 23.7V40H6c-1.7 0-3-1.3-3-3V16.2Z" />
      <path fill="#FBBC04" d="M45 12.3V16.2l-10 7.5V11.2l3.1-2.3c.8-.6 1.7-.9 2.6-.9 2.4 0 4.3 1.9 4.3 4.3Z" />
      <path fill="#EA4335" d="M3 12.3V16.2l10 7.5V11.2L9.9 8.9C9.1 8.3 8.2 8 7.3 8 4.9 8 3 9.9 3 12.3Z" />
      <path fill="#C5221F" d="m13 23.7 11 8.2 11-8.2V11.2L24 19.5 13 11.2v12.5Z" />
    </svg>
  );
}

function WeChatMark() {
  return (
    <svg viewBox="0 0 48 48" className="size-full drop-shadow-[0_16px_28px_rgba(22,28,45,0.18)]" aria-hidden>
      <rect width="48" height="48" rx="12" fill="#07C160" />
      <g transform="translate(8.2 8.6) scale(1.32)">
        <path
          fill="#fff"
          d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.032zm-2.54 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"
        />
      </g>
    </svg>
  );
}

function TelegramMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-full drop-shadow-[0_16px_28px_rgba(22,28,45,0.18)]" aria-hidden>
      <circle cx="12" cy="12" r="12" fill="#2AABEE" />
      <path
        fill="#fff"
        d="M16.906 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"
      />
    </svg>
  );
}

function Glass({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("relative", className)}>
      <div className="pointer-events-none absolute inset-0 rounded-full shadow-[0_8px_40px_rgba(0,0,0,0.12)]">
        <div className="absolute inset-0 rounded-full bg-white/65" />
        <div className="absolute inset-0 rounded-full bg-[#ddd] mix-blend-color-burn" />
        <div className="absolute inset-0 rounded-full bg-[#f7f7f7] mix-blend-darken" />
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-full backdrop-blur-xl" />
      <div className="relative">{children}</div>
    </div>
  );
}

function ChevronBack() {
  return (
    <svg width="10" height="17" viewBox="0 0 10 17" aria-hidden>
      <path d="M8.2 1.4 1.6 8.5l6.6 7.1" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TelegramBubble({ reacted }: { reacted: boolean }) {
  return (
    <div className="relative isolate w-[286px] p-px">
      <div className="absolute inset-0 rounded-[18px] bg-white">
        <div className="absolute bottom-[0.07px] left-0 h-8 w-2">
          <div className="absolute inset-y-0 right-0 -left-[70.28%]">
            <img alt="" src={ui("tg-tail.svg")} className="block h-full w-full max-w-none" />
          </div>
        </div>
      </div>
      <div className={cn("relative z-[1] flex w-full flex-col items-start gap-1 overflow-hidden rounded-[17px] px-2 py-1", reacted ? "pb-1" : "pb-4")}>
        <div className="w-[268px] max-w-[268px] text-[17px] leading-[22px] tracking-[-0.43px] text-black">
          <p>截至 2026-10-08 09:16 ET，10 只持仓均未达到盘前涨跌幅 ±5% 阈值；没有提交模拟买单，也没有卖单。</p>
          <p className="mt-1">
            按<b className="font-semibold">（盘前价 - 前收盘价）÷ 前收盘价</b> 计算：
          </p>
          <div className="mt-1 overflow-hidden rounded-lg bg-[#f4f4f5]">
            <table className="w-full border-collapse text-left font-mono text-[9px] leading-[14px]">
              <thead>
                <tr className="text-[#6b6e76]">
                  <th className="px-1 py-0.5 font-medium">持仓</th>
                  <th className="px-1 py-0.5 font-medium">盘前价</th>
                  <th className="px-1 py-0.5 font-medium">前收盘价</th>
                  <th className="px-1 py-0.5 font-medium">涨跌幅</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell) => (
                      <td key={cell} className="px-1">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-center gap-1 border-t border-black/5 py-1 text-[9px] tracking-wide text-[#8e8e93]">
              <CopyMark />
              COPY CODE
            </div>
          </div>
          <p className="mt-1">盘前观察时间均为 2026-10-08 09:14–09:16 ET；各持仓均取得可用的 pre/post 观察值，未见报价警告。因没有股票超过 ±5%，本次不触发新闻核实或下单条件。</p>
          <p className="mt-1">
            账户可用资金（Buying Power）为 <b className="font-semibold">USD 64,891.43</b>；未完成订单：<b className="font-semibold">无</b>。
          </p>
        </div>
        <div
          className="flex w-full min-w-[240px] flex-wrap gap-x-[3px] gap-y-1 self-stretch overflow-clip pt-2"
          style={{
            maxHeight: reacted ? 48 : 0,
            opacity: reacted ? 1 : 0,
            paddingBottom: reacted ? 12 : 0,
            marginTop: reacted ? 0 : -4,
            transition: `max-height 320ms ${ease}, opacity 320ms ${ease}`,
          }}
        >
          <span className="relative inline-flex h-[31px] items-center gap-[3px] rounded-full px-[9.5px] py-[3.5px]">
            <span className="absolute inset-0 rounded-full bg-[#008bff] opacity-10" />
            <span className="relative text-[24px] leading-6">🥰</span>
            <span className="relative text-[11px] leading-[13px] font-medium tracking-[0.06px] text-[#008bff]">1</span>
          </span>
        </div>
        <div className="absolute right-3 bottom-1 flex h-3 items-center text-[11px] leading-3 text-black opacity-50">21:17</div>
      </div>
    </div>
  );
}

function MenuRow({ label, icon }: { label: string; icon: "reply" | "copy" | "forward" | "pin" | "report" | "delete" }) {
  return (
    <div className="flex items-center gap-2.5 px-3 py-1.5 text-[12px] text-[#101423]">
      <MenuIcon name={icon} />
      <span>{label}</span>
    </div>
  );
}

function MenuIcon({ name }: { name: "reply" | "copy" | "forward" | "pin" | "report" | "delete" }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden className="text-[#3c404c]">
      {name === "reply" ? <path d="M8.5 3.2 5 6.2l3.5 3" {...common} /> : null}
      {name === "copy" ? <rect x="4.2" y="3.2" width="6" height="7.2" rx="1.1" {...common} /> : null}
      {name === "forward" ? <path d="M5.2 3.4 9 6.5 5.2 9.6" {...common} /> : null}
      {name === "pin" ? <path d="M5.2 2.8h3.6l-.6 3.2 1.6 1.2H4.2l1.6-1.2-.6-3.2ZM7 7.2V11" {...common} /> : null}
      {name === "report" ? (
        <>
          <circle cx="7" cy="7" r="4.2" {...common} />
          <path d="M7 4.6v3" {...common} />
        </>
      ) : null}
      {name === "delete" ? <path d="M3.6 4.2h6.8M5.4 4.2V3.2h3.2v1M4.6 4.2l.5 6.2h3.8l.5-6.2" {...common} /> : null}
    </svg>
  );
}

function CopyMark() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
      <rect x="3.2" y="2.4" width="4.6" height="5.4" rx="0.8" fill="none" stroke="#8e8e93" strokeWidth="0.9" />
      <path d="M2.4 6.6V2.2c0-.5.4-.8.8-.8h3.2" fill="none" stroke="#8e8e93" strokeWidth="0.9" />
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
      <div
        className="absolute top-0 left-0"
        style={{ width, height, transform: `scale(${scale})`, transformOrigin: "top left" }}
      >
        {children}
      </div>
    </div>
  );
}

function usePlayback(reduced: boolean) {
  const [snap, setSnap] = useState<{ phase: Phase; typed: number }>({ phase: "type", typed: 0 });

  useEffect(() => {
    if (reduced) return;
    let start = performance.now();
    let frame = 0;
    let prev = "";
    const tick = (time: number) => {
      const now = ((time - start) * demoSpeed) % LOOP;
      const phase = phaseAt(now);
      const typed = phase === "type" || phase === "send" ? typedAt(now) : PROMPT.length;
      const key = `${phase}:${typed}`;
      if (key !== prev) {
        prev = key;
        setSnap({ phase, typed });
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced]);

  return snap;
}
