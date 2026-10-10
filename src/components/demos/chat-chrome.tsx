"use client";

import type { ReactNode } from "react";

import { useT } from "@/lib/locale";
import { publicAsset } from "@/lib/public-asset";

const ease = "cubic-bezier(0.22,1,0.36,1)";

function ui(file: string) {
  return publicAsset(`/product-ui/${file}`);
}

function Glyph({ file, width, height }: { file: string; width: number; height: number }) {
  return <img alt="" src={ui(file)} width={width} height={height} className="block max-w-none" />;
}

function RoundButton({ children }: { children: ReactNode }) {
  return <span className="grid size-[24.8px] place-items-center rounded-full bg-[#f7f7f7]">{children}</span>;
}

export function ChatComposer({
  children,
  placeholder,
  sending = false,
}: {
  children?: ReactNode;
  placeholder?: string;
  sending?: boolean;
}) {
  const t = useT();
  const label =
    placeholder == null || placeholder === "聊聊投资吧 ..." || placeholder === "聊聊投资吧..."
      ? t("聊聊投资吧 ...", "Let's talk investing...")
      : placeholder;
  return (
    <div className="flex w-full flex-col gap-[18.6px] rounded-[18.6px] border-[0.4px] border-[#f1f1f1] bg-white px-[9px] pt-3 pb-[9px] shadow-[0_4.7px_7.8px_rgba(0,0,0,0.01)]">
      <div className="min-h-[18px] px-0.5 text-[12.4px] leading-[18px]">
        {children ?? <span className="text-[#aeb0bb]">{label}</span>}
      </div>
      <div className="flex items-center gap-[7.8px]">
        <div className="flex min-w-0 flex-1 items-center gap-[7.8px]">
          <RoundButton>
            <Glyph file="plus.svg" width={18.6348} height={18.6348} />
          </RoundButton>
          <RoundButton>
            <Glyph file="skills.svg" width={18.6348} height={18.6348} />
          </RoundButton>
          <div className="flex h-[24.8px] items-center rounded-[18.6px] bg-[#f7f7f7] px-1">
            <img alt="" src={ui("avatar.png")} width={17.2} height={17.2} className="size-[17.2px] rounded-[11.5px] object-cover" />
            <span className="grid h-[17.2px] w-[17.2px] place-items-center rounded-[11.5px] bg-[#f1f1f1] text-[9.3px] leading-none font-semibold text-[#797c86]">
              +5
            </span>
          </div>
          <div className="flex h-[24.8px] items-center gap-[3px] rounded-full bg-[#f7f7f7] px-1.5">
            <span className="text-[10.9px] text-[#101423]">Claude Fable 5.1</span>
            <Glyph file="chevron-down.svg" width={9.31738} height={9.31738} />
          </div>
        </div>
        <span aria-busy={sending} className="grid size-[24.8px] shrink-0 place-items-center rounded-full bg-[#101423]">
          <Glyph file="send.svg" width={18.6348} height={18.6348} />
        </span>
      </div>
    </div>
  );
}

export function UserBubble({ children }: { children: ReactNode }) {
  return (
    <div className="w-full text-right">
      <div className="ml-auto inline-block max-w-[88%] rounded-xl bg-[#eef0f3] px-3.5 py-2.5 text-left text-[13px] leading-6 text-[#101423]">
        {children}
      </div>
    </div>
  );
}

export function AgentRow({
  on,
  icon,
  label,
  detail,
}: {
  on: boolean;
  icon: ReactNode;
  label: string;
  detail?: string;
}) {
  return (
    <div
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
          <span className="mt-0.5 shrink-0">{icon}</span>
          <p className="min-w-0">
            <span>{label}</span>
            {detail ? (
              <>
                <span> › </span>
                <span className="break-words">{detail}</span>
              </>
            ) : null}
          </p>
        </div>
      </div>
    </div>
  );
}

export function StreamBlock({ show, children }: { show: boolean; children: ReactNode }) {
  return (
    <div
      className="grid"
      style={{
        gridTemplateRows: show ? "1fr" : "0fr",
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(8px)",
        transition: `grid-template-rows 520ms ${ease}, opacity 520ms ${ease}, transform 520ms ${ease}`,
      }}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}
