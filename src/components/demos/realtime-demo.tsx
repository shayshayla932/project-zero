"use client";

import { Calculator, FileText, FolderSearch, Search, Terminal, Zap } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

import { values } from "@/lib/content";
import { publicAsset } from "@/lib/public-asset";
import { demoSpeed, followScroll, usePrefersReducedMotion } from "@/lib/use-demo-playback";
import { cn } from "@/lib/utils";

const stages = values[0].stages;

const productFont: CSSProperties = {
  fontFamily: 'var(--font-geist), "PingFang SC", "Noto Sans SC", sans-serif',
};

const cardShadow = "0 24px 60px rgba(22, 28, 45, 0.07), 0 2px 8px rgba(22, 28, 45, 0.04)";

const FRAME_W = 960;
const FRAME_H = 640;
const BEATS = [2600, 2300, 4600, 4400, 5600];
const ease = "cubic-bezier(0.22,1,0.36,1)";

const positions = [
  ["NVDA 190P", "−3", "$2.05 / $1.64–1.70", "OTM 18.2%", "+54.0", "+$16.50", "51.8%"],
  ["QCOM 140P", "−2", "$1.35 / $1.06–1.12", "OTM 12.9%", "+28.0", "+$7.00", "32.6%"],
  ["AAPL 260C", "+2", "$4.80 / $5.10–5.26", "OTM 2.5%", "+86.0", "−$16.40", "29.4%"],
];

const tracks = [
  { date: "2026/09/10", text: "我的备兑看涨期权快到行权价了，应该平仓还是展期？" },
  { date: "2026/09/03", text: "帮我筛选适合卖出现金担保看跌期权的股票和行权价。" },
  { date: "2026/08/31", text: "我的英伟达看跌期权空头仓位已经亏损 66%，应该继续持有、平仓，还是下移行权价并展期？" },
  { date: "2026/08/20", text: "强生（JNJ）的股息安全吗？" },
  { date: "2026/08/11", text: "CSP期权策略" },
];

const strategies = [
  {
    label: "下行保护",
    items: [
      { file: "chart-protective-put.svg", title: "保护性看跌期权", width: 45.7202, height: 33.8704 },
      { file: "chart-bear-put.svg", title: "熊市看跌差价", width: 45.6661, height: 33.8632 },
      { file: "chart-collar.svg", title: "保护性领口", width: 45.6654, height: 33.8632 },
    ],
  },
  {
    label: "收益增强",
    items: [
      { file: "chart-cash-secured.svg", title: "现金担保看跌期权", width: 45.666, height: 33.8748 },
      { file: "chart-covered-call.svg", title: "备兑看涨期权", width: 45.6661, height: 33.8748 },
      { file: "chart-covered-strangle.svg", title: "备兑宽跨式", width: 45.6654, height: 33.8748 },
    ],
  },
];

function ui(file: string) {
  return publicAsset(`/product-ui/${file}`);
}

export function RealtimeDemo() {
  const reduced = usePrefersReducedMotion();
  const stage = useTimeline(reduced);
  const current = reduced ? stages.length - 1 : stage;
  const [optionsOn, setOptionsOn] = useState(reduced);

  useEffect(() => {
    if (current !== 4) {
      setOptionsOn(false);
      return;
    }
    if (reduced) {
      setOptionsOn(true);
      return;
    }
    const id = window.setTimeout(() => setOptionsOn(true), 780);
    return () => window.clearTimeout(id);
  }, [current, reduced]);

  const zoom = current === 1;
  const home = current < 2;
  const options = current === 4 && optionsOn;
  const chat = !home && !options;
  const board = useRef<HTMLDivElement>(null);
  const [focus, setFocus] = useState({ x: FRAME_W * 0.62, y: FRAME_H * 0.7, scale: 1.2 });

  useEffect(() => {
    let frame = 0;
    let tries = 0;
    const measure = () => {
      const root = board.current;
      const row = root?.querySelector<HTMLElement>("[data-zoom-row]");
      if (!root || !row) return;
      const place = layoutBox(row, root);
      if (place.w < 40 && tries < 10) {
        tries += 1;
        frame = window.requestAnimationFrame(measure);
        return;
      }
      const scale = Math.min(
        1.34,
        (FRAME_W - 56) / Math.max(place.w, 1),
        (FRAME_H - 72) / Math.max(place.h, 1)
      );
      setFocus({ x: place.x, y: place.y, scale: Math.max(1.08, scale) });
    };
    frame = window.requestAnimationFrame(measure);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <ScaledCanvas width={FRAME_W} height={FRAME_H}>
      <div
        className="overflow-hidden rounded-[24px] bg-[#f7f7f8]"
        style={{ width: FRAME_W, height: FRAME_H, boxShadow: cardShadow }}
      >
        <div
          ref={board}
          className="relative flex h-full w-full bg-[#f7f7f8]"
          style={{
            transformOrigin: `${focus.x}px ${focus.y}px`,
            transform: zoom
              ? `translate(${FRAME_W / 2 - focus.x}px, ${FRAME_H / 2 - focus.y}px) scale(${focus.scale})`
              : "none",
            transition: `transform 700ms ${ease}`,
          }}
        >
        <div className="h-full w-[200px] shrink-0 overflow-hidden border-r border-[#f1f1f1] bg-white">
          <Sidebar showExplore={current >= 2} optionsHot={current === 4} />
        </div>
        <div className="relative h-full min-w-0 flex-1 bg-[#f7f7f8]">
          <Panel show={home}>
            <OptionHero zoomed={zoom} />
          </Panel>
          <Panel show={chat}>
            <ChatPanel active={current >= 2} showResult={current >= 3} />
          </Panel>
          <Panel show={options}>
            <OptionsSpace active={options} instant={reduced} />
          </Panel>
        </div>
        </div>
      </div>
    </ScaledCanvas>
  );
}

function Panel({ show, children }: { show: boolean; children: ReactNode }) {
  return (
    <div
      className={cn("absolute inset-0", show ? "opacity-100" : "pointer-events-none opacity-0")}
      style={{ transition: `opacity 650ms ${ease}` }}
    >
      {children}
    </div>
  );
}

function useTimeline(reduced: boolean) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (reduced) return;
    let index = 0;
    let timer = 0;
    const tick = () => {
      index = (index + 1) % BEATS.length;
      setStage(index);
      timer = window.setTimeout(tick, BEATS[index] / demoSpeed);
    };
    timer = window.setTimeout(tick, BEATS[0] / demoSpeed);
    return () => window.clearTimeout(timer);
  }, [reduced]);

  return stage;
}

function Sidebar({ showExplore, optionsHot }: { showExplore: boolean; optionsHot: boolean }) {
  return (
    <aside className="flex h-full w-[200px] flex-col bg-white px-2.5 pt-3.5" style={productFont}>
      <div className="flex items-center justify-between px-1.5">
        <Glyph file="sidebar-logo.svg" width={78} height={18.87} />
        <Glyph file="sidebar-panel.svg" width={16} height={16} />
      </div>
      <div className="my-3 h-px bg-[#eceef2]" />
      <div className="flex flex-col gap-0.5">
        <SideItem file="sidebar-newchat.svg" turn>
          新对话
        </SideItem>
        <SideItem file="sidebar-cron.svg">定时更新</SideItem>
        <SideItem file="sidebar-skill.svg">技能</SideItem>
        <SideItem file="sidebar-workflow.svg">连接器</SideItem>
        <SideItem file="sidebar-accounts.svg">账户</SideItem>
        <SideItem file="sidebar-files.svg">文件</SideItem>
      </div>
      <div className="my-2.5 h-px bg-[#eceef2]" />
      <p className="px-1.5 py-1 text-[12px] text-[#797c86]">空间</p>
      <SideItem file="sidebar-options.svg" active={optionsHot}>
        期权
      </SideItem>
      <div className="mt-3 flex h-8 items-center px-1.5">
        <p className="min-w-0 flex-1 text-[12px] text-[#797c86]">对话</p>
        <Glyph file="sidebar-ellipsis.svg" width={16} height={16} />
      </div>
      <div
        className="grid"
        style={{
          gridTemplateRows: showExplore ? "1fr" : "0fr",
          opacity: showExplore ? 1 : 0,
          transition: `grid-template-rows 500ms ${ease}, opacity 500ms ${ease}`,
        }}
      >
        <div className="overflow-hidden">
          <p className="truncate px-1.5 text-[13px] leading-8 text-[#101423]">财报期权机会探索</p>
        </div>
      </div>
      <p className="truncate px-1.5 text-[13px] leading-8 text-[#101423]">VYM vs SCHD</p>
      <p className="truncate px-1.5 text-[13px] leading-8 text-[#101423]">US Equities Demo Accoun...</p>
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
    <div
      className={cn(
        "flex h-8 items-center gap-2 rounded-md px-1.5 transition-colors duration-500",
        active && "bg-[#f2f3f5]"
      )}
    >
      <span className={cn("inline-flex", turn && "-rotate-90")}>
        <Glyph file={file} width={16} height={16} />
      </span>
      <span className="truncate text-[13px] leading-none font-medium text-[#101423]">{children}</span>
    </div>
  );
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

function OptionHero({ zoomed }: { zoomed: boolean }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 overflow-clip bg-[#f7f7f8] px-8" style={productFont}>
        <p className="text-[17.5px] font-medium text-black">Hi, 你的投资团队已就位</p>
        <Composer />
        <div className="flex w-full flex-col gap-1.5">
          <div className="flex items-center">
            <p className="text-[12.2px] leading-[18px] font-medium text-[#101423]">Driven 期权</p>
            <Caret />
          </div>
          <div className="flex items-center gap-1 text-[10.5px] text-[#797c86]">
            <p>发现期权机会、对比策略，做出更有依据的决策。 详情</p>
            <span className="inline-flex -rotate-90">
              <Glyph file="chevron-detail.svg" width={9.31738} height={9.31738} />
            </span>
          </div>
        </div>
        <div className="w-full rounded-[10.5px] border-[0.5px] border-[#f1f1f1] bg-white pt-2 pb-3.5">
          <div className="flex items-center gap-[7px] border-b-[0.5px] border-[#f1f1f1] px-3">
            <Tab active>期权机会</Tab>
            <Tab>收益增强</Tab>
            <Tab>下行保护</Tab>
          </div>
          <Opportunity
            icon="icon-0dte.svg"
            title="扫描 0DET 期权"
            body="发现潜在的当日期权机会。"
          />
          <Hairline />
          <Opportunity
            icon="icon-activity.svg"
            title="市场大单期权异动信号"
            body="发现异常成交量和可能重要的交易。"
          />
          <Hairline />
          <div data-zoom-row>
            <Opportunity
              icon="icon-file.svg"
              title="财报期权分析"
              body="探索即将发布财报的公司周边的期权机会。"
              pressed={zoomed}
            />
          </div>
        </div>
    </div>
  );
}

function Composer() {
  return (
    <div className="flex w-full flex-col gap-[18.6px] rounded-[18.6px] border-[0.4px] border-[#f1f1f1] bg-white px-[9px] pt-3 pb-[9px] shadow-[0_4.7px_7.8px_rgba(0,0,0,0.01)]">
      <p className="px-0.5 text-[12.4px] text-[#aeb0bb]">聊聊投资吧 ...</p>
      <div className="flex items-center gap-[7.8px]">
        <div className="flex min-w-0 flex-1 items-center gap-[7.8px]">
          <RoundButton>
            <Glyph file="plus.svg" width={18.6348} height={18.6348} />
          </RoundButton>
          <RoundButton>
            <Glyph file="skills.svg" width={18.6348} height={18.6348} />
          </RoundButton>
          <div className="flex h-[24.8px] items-center rounded-[18.6px] bg-[#f7f7f7] px-1">
            <img
              alt=""
              src={ui("avatar.png")}
              width={17.2}
              height={17.2}
              className="size-[17.2px] rounded-[11.5px] object-cover"
            />
            <span className="grid h-[17.2px] w-[17.2px] place-items-center rounded-[11.5px] bg-[#f1f1f1] text-[9.3px] leading-none font-semibold text-[#797c86]">
              +5
            </span>
          </div>
          <div className="flex h-[24.8px] items-center gap-[3px] rounded-full bg-[#f7f7f7] px-1.5">
            <span className="text-[10.9px] text-[#101423]">Claude Fable 5.1</span>
            <Glyph file="chevron-down.svg" width={9.31738} height={9.31738} />
          </div>
        </div>
        <span className="grid size-[24.8px] shrink-0 place-items-center rounded-full bg-[#101423]">
          <Glyph file="send.svg" width={18.6348} height={18.6348} />
        </span>
      </div>
    </div>
  );
}

function RoundButton({ children }: { children: ReactNode }) {
  return (
    <span className="grid size-[24.8px] place-items-center rounded-full bg-[#f7f7f7]">{children}</span>
  );
}

function Tab({ active, children }: { active?: boolean; children: ReactNode }) {
  return (
    <span
      className={cn(
        "py-[5px] text-[12.2px] leading-[18px] font-medium",
        active ? "text-[#101423]" : "px-2.5 text-[#797c86]"
      )}
    >
      {children}
    </span>
  );
}

function Opportunity({
  icon,
  title,
  body,
  pressed,
}: {
  icon: string;
  title: string;
  body: string;
  pressed?: boolean;
}) {
  return (
    <div className={cn("mx-1 flex items-start gap-2 rounded-[8px] px-2 py-2.5", pressed && "bg-[#edf6ff]")}>
      <Glyph file={icon} width={20.9539} height={20.9539} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center">
          <p className="text-[12.2px] leading-[18px] font-medium text-[#101423]">{title}</p>
          <Caret />
        </div>
        <p className="mt-[7px] text-[10.5px] text-[#797c86]">{body}</p>
      </div>
    </div>
  );
}

function Hairline() {
  return (
    <img
      alt=""
      src={ui("divider.svg")}
      width={752.609}
      height={0.5}
      className="block max-w-none"
    />
  );
}

function ChatPanel({ active, showResult }: { active: boolean; showResult: boolean }) {
  const revealed = useReveal(toolRows.length, 340, active);
  const [pointer, setPointer] = useState(false);
  const [hover, setHover] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showResult) {
      setPointer(false);
      setHover(false);
      return;
    }
    const move = window.setTimeout(() => setPointer(true), 360);
    const card = window.setTimeout(() => setHover(true), 980);
    return () => {
      window.clearTimeout(move);
      window.clearTimeout(card);
    };
  }, [showResult]);

  useEffect(() => {
    const node = scroller.current;
    if (!node || !active) return;
    const align = () => {
      if (showResult) {
        const table = node.querySelector<HTMLElement>("[data-earnings]");
        if (table) {
          followScroll(node, Math.max(0, table.offsetTop - 16));
          return;
        }
      }
      followScroll(node);
    };
    align();
    const inner = node.firstElementChild;
    if (!inner) return;
    const observer = new ResizeObserver(align);
    observer.observe(inner);
    return () => observer.disconnect();
  }, [revealed, showResult, active]);

  return (
    <div className="h-full bg-[#f7f7f8]" style={productFont}>
      <div ref={scroller} className="h-full overflow-clip">
        <div className="relative px-6 py-5">
        <div className="ml-auto w-fit max-w-full rounded-xl bg-[#eef0f3] px-3.5 py-2.5">
          <span className="inline-flex items-center gap-1 rounded-md bg-[#e7f8ef] px-1.5 py-0.5 align-middle text-[14px] text-[#00b17f]">
            <Glyph file="zap-green.svg" width={12} height={12.3} />
            earnings-option-opportu…
          </span>
          <span className="ml-2 align-middle text-[14px] text-[#101423]">探索即将发布财报前后的期权机会。</span>
        </div>
        <div className="mt-5">
          {toolRows.map((row, index) => {
            const on = index < revealed;
            return (
              <div
                key={row.label + row.detail}
                className="grid"
                style={{
                  gridTemplateRows: on ? "1fr" : "0fr",
                  opacity: on ? 1 : 0,
                  transform: on ? "translateY(0)" : "translateY(8px)",
                  transition: `grid-template-rows 520ms ${ease}, opacity 520ms ${ease}, transform 520ms ${ease}`,
                }}
              >
                <div className="overflow-hidden">
                  <div className="flex items-start gap-2 pb-3 text-[14px] leading-6 text-[#aeb0bb]">
                    <ToolGlyph name={row.icon} />
                    <p className="min-w-0">
                      <span>{row.label}</span>
                      <span> › </span>
                      <span className="break-words">{row.detail}</span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {showResult ? <EarningsTable pointer={pointer} hover={hover} /> : null}
        </div>
      </div>
    </div>
  );
}

function EarningsTable({ pointer, hover }: { pointer: boolean; hover: boolean }) {
  return (
    <div data-earnings className="relative mt-6">
      <p className="text-[16px] font-medium text-[#101423]">美股财报期权初筛</p>
      <p className="mt-3 text-[14px] leading-7 text-[#3c404c]">
        扫描窗口为 2026-10-08 至 2026-10-21：日历返回194条记录，按公司名称去重后为189家公司，其中194条未标记为已发布或已完成。优先名单5家，均找到覆盖财报及首次常规交易时段反应的到期日5家；深入检查期权链3家，流动性门槛通过3家，最终列出有限风险结构2个。
      </p>
      <p className="mt-3 text-[14px] leading-7 text-[#3c404c]">
        现货与期权数据是最近可见的 10 月 7 日美股交易时段报价，不是 10 月 8 日盘中的实时成交；期权时间戳以 UTC 列示。
      </p>
      <p className="mt-5 text-[16px] font-medium text-[#101423]">优先名单与到期日</p>
      <div className="relative mt-3 overflow-visible rounded-xl border border-[#f1f1f1] bg-white">
        <table className="w-full text-left text-[13px]">
          <thead className="bg-[#f7f7f7] text-[#797c86]">
            <tr>
              <th className="px-4 py-2.5 font-normal">公司</th>
              <th className="px-4 py-2.5 font-normal">日历所列财报时间</th>
              <th className="px-4 py-2.5 font-normal">覆盖财报反应的最短已验证到期日</th>
            </tr>
          </thead>
          <tbody className="text-[#101423]">
            {picks.map((row) => (
              <tr key={row.symbol}>
                <td className="px-4 py-3">{row.symbol}</td>
                <td className="px-4 py-3 text-[#2694ff] underline decoration-dotted decoration-[#2694ff] underline-offset-4">
                  {row.when}
                </td>
                <td className="px-4 py-3 text-[#797c86] underline decoration-dotted underline-offset-4">{row.expiry}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <span
          className={cn(
            "pointer-events-none absolute z-20 text-[#101423] transition-all duration-500 ease-out",
            hover && "opacity-0"
          )}
          style={{ left: pointer ? 168 : 430, top: pointer ? 92 : 28 }}
        >
          <Cursor />
        </span>
        {hover ? <CitationCard /> : null}
      </div>
    </div>
  );
}

function Cursor() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M3 2.2 14.2 9.1 8.4 10.2 6.2 15.6 3 2.2Z" fill="#101423" stroke="white" strokeWidth="1.2" />
    </svg>
  );
}

function CitationCard() {
  return (
    <aside className="absolute top-[58px] left-[76px] z-10 w-max rounded-2xl bg-white px-3.5 py-3 shadow-[0_10px_28px_rgba(16,20,35,0.14)]">
      <div className="flex items-center gap-1.5 text-[14px] font-medium text-[#101423]">
        <Glyph file="cite-terminal.svg" width={14} height={14} />
        终端
      </div>
      <div className="mt-2.5 rounded-[10px] bg-[#f3f4f6] px-2.5 py-2 text-[12.5px] leading-5 text-[#8d919c]">
        <p className="whitespace-nowrap">
          DAL 达美航空 <span className="font-semibold text-[#101423]">2026-10-09</span> 三季报 2026 pre_hour pre_ma
        </p>
        <p className="whitespace-nowrap">
          rket JNJ 强生 <span className="font-semibold text-[#101423]">2026-10-13</span> 三季报 2026 pre_hour pre_ma
        </p>
        <p className="whitespace-nowrap">
          rket JPM 摩根大通 <span className="font-semibold text-[#101423]">2026-10-13</span> 三季报 2026 pre_hour pr…
        </p>
      </div>
      <p className="mt-2.5 text-[13px] text-[#101423]">该数值由模型计算得出。</p>
      <div className="my-2.5 h-px bg-[#eceef2]" />
      <div className="flex items-center gap-2 text-[13px] text-[#101423]">
        <span className="rounded-full bg-[#e7f3ff] px-2 py-0.5 text-[12px] text-[#2694ff]">来源</span>
        <span className="min-w-0 flex-1 pr-6">数据来自计算</span>
        <Glyph file="cite-chevron.svg" width={13.512} height={13.512} />
      </div>
    </aside>
  );
}

const picks = [
  { symbol: "DAL", when: "2026-10-09，盘前", expiry: "2026-10-09" },
  { symbol: "JNJ", when: "2026-10-13，盘前", expiry: "2026-10-16" },
  { symbol: "JPM", when: "2026-10-13，盘前", expiry: "2026-10-16" },
  { symbol: "NFLX", when: "2026-10-20，盘后", expiry: "2026-10-23" },
  { symbol: "TSLA", when: "2026-10-21，盘后", expiry: "2026-10-23" },
];

const toolRows: { icon: ToolName; label: string; detail: string }[] = [
  { icon: "zap", label: "加载技能", detail: '{"name":"earnings-option-opportunities"}' },
  { icon: "search", label: "搜索工具", detail: "earnings calendar expiration dates option chain detailed option quotes" },
  { icon: "data", label: "Driven Data · calendar.earnings-calendar", detail: '{"market":"US","from":"2026-10-08","to":"2026-10-21"}' },
  { icon: "file", label: "读取文件", detail: "/.driven/sessions/chat/main/fj750b7nxldwscf4e52eum2f/toolsResult/tool-call-1791449360019-tg7s7t.json" },
  { icon: "files", label: "搜索文件", detail: "2 次" },
  { icon: "file", label: "读取文件", detail: "/.driven/sessions/chat/main/fj750b7nxldwscf4e52eum2f/toolsResult/grep-1791449381313-kze168.txt" },
  { icon: "zap", label: "加载技能", detail: '{"name":"data-lab"}' },
  { icon: "terminal", label: "终端", detail: "2 次" },
  { icon: "data", label: "Driven Data", detail: "11 次" },
  { icon: "calc", label: "计算依据", detail: '{"calculations":[{"id":"tsla_min","label":"TSLA lower strike...' },
];

type ToolName = "zap" | "search" | "data" | "file" | "files" | "terminal" | "calc";

function ToolGlyph({ name }: { name: ToolName }) {
  const className = "mt-0.5 size-3.5 shrink-0 text-[#b0b3bd]";
  if (name === "zap") return <Zap className={className} strokeWidth={1.75} />;
  if (name === "search") return <Search className={className} strokeWidth={1.75} />;
  if (name === "file") return <FileText className={className} strokeWidth={1.75} />;
  if (name === "files") return <FolderSearch className={className} strokeWidth={1.75} />;
  if (name === "terminal") return <Terminal className={className} strokeWidth={1.75} />;
  if (name === "calc") return <Calculator className={className} strokeWidth={1.75} />;
  return (
    <span className="mt-1 inline-flex shrink-0">
      <Glyph file="driven-data.svg" width={14} height={15} />
    </span>
  );
}

function OptionsSpace({ active, instant }: { active: boolean; instant: boolean }) {
  const view = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [born, setBorn] = useState(instant);
  const optionsScale = 1.42;

  useEffect(() => {
    if (!active) {
      setOffset(0);
      setBorn(instant);
      return;
    }
    const apply = () => {
      const viewNode = view.current;
      const trackNode = track.current;
      const sheetNode = sheet.current;
      if (!viewNode || !trackNode || !sheetNode) return;
      const max = Math.max(0, sheetNode.offsetHeight - viewNode.clientHeight / optionsScale);
      setOffset(Math.min(max, Math.max(0, trackNode.offsetTop - 10)));
    };
    if (instant) {
      const frame = window.requestAnimationFrame(apply);
      return () => window.cancelAnimationFrame(frame);
    }
    const scrollTimer = window.setTimeout(apply, 420);
    const bornTimer = window.setTimeout(() => setBorn(true), 1200);
    return () => {
      window.clearTimeout(scrollTimer);
      window.clearTimeout(bornTimer);
    };
  }, [active, instant]);

  return (
    <div className="h-full overflow-hidden bg-[#f7f7f8]" style={productFont}>
      <div ref={view} className="h-full overflow-clip">
        <div
          style={{
            width: `${100 / optionsScale}%`,
            transform: `scale(${optionsScale})`,
            transformOrigin: "top left",
          }}
        >
        <div
          ref={sheet}
          className="relative flex flex-col gap-2 px-4 py-3"
          style={{ transform: `translateY(-${offset}px)`, transition: `transform 800ms ${ease}` }}
        >
          <h3 className="text-[14px] font-semibold text-black">期权</h3>
          <div className="flex flex-col gap-[8.8px]">
            <div className="flex items-center gap-2">
              <p className="min-w-0 flex-1 text-[9.9px] font-medium text-[#101423]">持仓</p>
              <p className="text-[7.7px] text-[#797c86]">当前 MCP</p>
              <span className="inline-flex items-center gap-1">
                <span className="relative size-[8.8px] overflow-hidden rounded-full border-[0.55px] border-[#fafafa]">
                  <img
                    alt=""
                    src={ui("broker.png")}
                    className="absolute top-[-14.58%] left-[-23.96%] h-[135.42%] w-[147.92%] max-w-none"
                  />
                </span>
                <span className="text-[6.6px] text-[#101423]">盈透证券</span>
              </span>
              <span className="inline-flex items-center gap-0.5 text-[7.7px] text-[#797c86]">
                13:23:36 更新
                <Glyph file="refresh.svg" width={8.80277} height={8.80277} />
              </span>
            </div>
            <div className="overflow-hidden rounded-[6.6px] border-[0.275px] border-[#f1f1f1] text-[7.7px] leading-[11.5px]">
              <div
                className="grid h-[20.4px] items-center gap-[8.8px] bg-[#f1f1f1] px-[4.4px] text-[#797c86]"
                style={{ gridTemplateColumns: positionColumns }}
              >
                <span>期权合约</span>
                <span className="text-right">数量</span>
                <span className="text-right">均价 / 当前买卖报价</span>
                <span className="text-right">相对 Strike</span>
                <span className="text-right">Delta</span>
                <span className="text-right">Theta</span>
                <span className="text-right">IV</span>
              </div>
              {positions.map((row) => (
                <div
                  key={row[0]}
                  className="grid h-[20.4px] items-center gap-[8.8px] bg-white px-[4.4px] text-[#101423]"
                  style={{ gridTemplateColumns: positionColumns }}
                >
                  {row.map((cell, index) => (
                    <span key={cell} className={index === 0 ? "truncate" : "text-right"}>
                      {cell}
                    </span>
                  ))}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-[4.4px]">
              <InfoCard
                icon="icon-legs.svg"
                iconWidth={9.89569}
                iconHeight={9.89569}
                title="逐腿分析"
                body="评估每条期权腿的风险、希腊值、收益结构，以及它对整体策略的贡献。"
              />
              <InfoCard
                icon="icon-grid.svg"
                iconWidth={9.89569}
                iconHeight={9.89569}
                title="组合分析"
                body="了解你的投资组合在全部持仓上的综合敞口、表现与风险。"
              />
              <InfoCard
                icon="icon-scan.svg"
                iconWidth={9.89024}
                iconHeight={9.90115}
                title="交易复盘"
                body="复盘交易决策与结果，提炼洞察，提升今后的交易表现。"
              />
            </div>
          </div>

          <div className="flex flex-col gap-[8.8px]">
            <p className="text-[9.9px] font-medium text-[#101423]">策略</p>
            {strategies.map((group) => (
              <div key={group.label} className="flex flex-col gap-[8.8px]">
                <p className="text-[7.7px] text-[#797c86]">{group.label}</p>
                <div className="grid grid-cols-3 gap-[4.4px]">
                  {group.items.map((item) => (
                    <div
                      key={item.title}
                      className="flex items-center gap-[8.8px] rounded-[6.6px] border-[0.275px] border-[#f1f1f1] bg-white p-[6.6px]"
                    >
                      <Glyph file={item.file} width={item.width} height={item.height} />
                      <span className="inline-flex min-w-0 items-center">
                        <span className="text-[7.7px] leading-[11.6px] font-medium text-[#101423]">
                          {item.title}
                        </span>
                        <Glyph file="chevron-strategy.svg" width={6.77981} height={6.60572} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div ref={track} className="flex flex-col gap-[8.8px]">
            <div className="flex items-center">
              <p className="min-w-0 flex-1 text-[9.9px] font-medium text-[#101423]">期权追踪</p>
              <span className="inline-flex items-center gap-0.5 rounded-full bg-[#edf6ff] px-[4.4px] py-px text-[6.6px] text-[#2694ff]">
                <Glyph file="icon-weekly.svg" width={8.81248} height={8.81248} />
                每周总结
              </span>
            </div>
            <div className="overflow-hidden rounded-[6.6px] border-[0.275px] border-[#f1f1f1] bg-white py-[6.6px]">
              <TrackRow
                date="2026/10/08"
                text="财报期权机会探索"
                className={cn(
                  "origin-top transition-all duration-500",
                  born ? "h-[20.4px] opacity-100" : "pointer-events-none h-0 overflow-hidden py-0 opacity-0"
                )}
                highlight={born}
              />
              {tracks.map((item) => (
                <TrackRow key={item.date + item.text} date={item.date} text={item.text} />
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

const positionColumns = "minmax(0,1fr) 24.2px 81.4px 44px 44px 44px 44px";

function InfoCard({
  icon,
  iconWidth,
  iconHeight,
  title,
  body,
}: {
  icon: string;
  iconWidth: number;
  iconHeight: number;
  title: string;
  body: string;
}) {
  return (
    <div className="flex flex-col gap-[4.4px] rounded-[6.6px] border-[0.275px] border-[#f1f1f1] bg-white px-[6.6px] py-[8.8px]">
      <Glyph file={icon} width={iconWidth} height={iconHeight} />
      <div className="flex items-center">
        <p className="text-[7.7px] leading-[11.5px] font-medium text-[#101423]">{title}</p>
        <Glyph file="chevron-strategy.svg" width={6.77981} height={6.60572} />
      </div>
      <p className="text-[6.6px] leading-normal text-[#797c86]">{body}</p>
    </div>
  );
}

function TrackRow({
  date,
  text,
  className,
  highlight,
}: {
  date: string;
  text: string;
  className?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex h-[20.4px] items-center gap-[8.8px] px-[6.6px] text-[7.7px] text-[#101423]",
        className
      )}
    >
      {highlight ? <span className="absolute inset-y-0 right-[4px] left-[4px] rounded-[4px] bg-[#edf6ff]" /> : null}
      <span className="relative inline-flex w-[55px] shrink-0 items-center gap-[3.3px]">
        <Glyph file="bullet.svg" width={3.30468} height={3.30468} />
        <span className="font-medium">{date}</span>
      </span>
      <p className="relative min-w-0 flex-1 truncate">{text}</p>
    </div>
  );
}

function Caret() {
  return (
    <span className="inline-flex -rotate-90">
      <Glyph file="chevron-down.svg" width={9.31738} height={9.31738} />
    </span>
  );
}

function Glyph({
  file,
  width,
  height,
}: {
  file: string;
  width: number;
  height: number;
}) {
  return (
    <img
      alt=""
      src={ui(file)}
      width={width}
      height={height}
      className="block shrink-0 max-w-none"
    />
  );
}

function useReveal(count: number, stepMs: number, active: boolean) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!active) {
      setShown(0);
      return;
    }
    let current = 0;
    const id = window.setInterval(() => {
      current += 1;
      setShown(current);
      if (current >= count) window.clearInterval(id);
    }, stepMs);
    return () => window.clearInterval(id);
  }, [active, count, stepMs]);

  return shown;
}

function layoutBox(node: HTMLElement, root: HTMLElement) {
  let x = node.offsetWidth / 2;
  let y = node.offsetHeight / 2;
  let current: HTMLElement | null = node;
  while (current && current !== root) {
    x += current.offsetLeft;
    y += current.offsetTop;
    const next: Element | null = current.offsetParent;
    current = next instanceof HTMLElement ? next : null;
  }
  return { x, y, w: node.offsetWidth, h: node.offsetHeight };
}
