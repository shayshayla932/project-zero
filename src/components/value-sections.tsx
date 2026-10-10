"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

import { SectionLead, SoftPanel } from "@/components/display";
import { PersonalizedDemo } from "@/components/demos/personalized-demo";
import { ProactiveDemo } from "@/components/demos/proactive-demo";
import { ProfessionalDemo } from "@/components/demos/professional-demo";
import { RealtimeDemo } from "@/components/demos/realtime-demo";
import { valueIntro, values } from "@/lib/content";
import { useT } from "@/lib/locale";
import { cn } from "@/lib/utils";

const englishModules = {
  realtime: {
    eyebrow: "Real-time",
    title: "Built for options, and fluent across markets.",
    body: "Live options data surfaces ideas and compares strategies. Equities, ETFs, FX, crypto, and commodities are here too, so the whole book stays in one place.",
  },
  professional: {
    eyebrow: "Professional",
    title: "Connect a brokerage. From the analysis to the order.",
    body: "Link the broker that holds your positions, then run specialist skills from research through execution.",
  },
  proactive: {
    eyebrow: "Proactive",
    title: "It watches and acts around the clock, so you don't have to.",
    body: "It monitors the market, catches the signal, and runs your strategy. Several tasks can run at once, and every step stays visible.",
  },
  personalized: {
    eyebrow: "Personalized",
    title: "It remembers your style and risk limits, and stays inside them.",
    body: "A long memory of how you invest. The more you use it, the closer it stays to your rules.",
  },
} as const;

const demos = {
  realtime: RealtimeDemo,
  professional: ProfessionalDemo,
  proactive: ProactiveDemo,
  personalized: PersonalizedDemo,
} as const;

export type ModuleId = keyof typeof demos;

const moduleIds = new Set<string>(Object.keys(demos));

export function isModuleId(value: string | null): value is ModuleId {
  return value != null && moduleIds.has(value);
}

const washes = {
  realtime: ["rgba(255, 244, 214, 0.62)", "rgba(176, 210, 245, 0.34)"],
  professional: ["rgba(176, 224, 214, 0.58)", "rgba(168, 204, 242, 0.32)"],
  proactive: ["rgba(255, 236, 196, 0.58)", "rgba(186, 216, 245, 0.34)"],
  personalized: ["rgba(176, 214, 236, 0.52)", "rgba(196, 228, 204, 0.3)"],
} as const;

const EMBED_WIDTH = 1360;

export function ValueModuleStage({ id }: { id: ModuleId }) {
  return (
    <EmbedFit>
      <ValueArticle id={id} embed />
    </EmbedFit>
  );
}

function EmbedFit({ children }: { children: ReactNode }) {
  const frame = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const site = document.getElementById("site");
    root.classList.add("module-page");
    root.style.background = "transparent";
    root.style.overflow = "hidden";
    body.style.background = "transparent";
    body.style.overflow = "hidden";
    if (site) {
      site.style.background = "transparent";
      site.style.overflow = "hidden";
      site.style.height = "100%";
    }

    const clearChrome = () => {
      root.classList.remove("module-page");
      root.style.background = "";
      root.style.overflow = "";
      body.style.background = "";
      body.style.overflow = "";
      if (site) {
        site.style.background = "";
        site.style.overflow = "";
        site.style.height = "";
      }
    };

    const frameEl = frame.current;
    const cardEl = card.current;
    if (!frameEl || !cardEl) return clearChrome;

    const fit = () => {
      const cardHeight = cardEl.offsetHeight;
      if (frameEl.clientWidth < 1 || frameEl.clientHeight < 1 || cardHeight < 1) return;
      const next = Math.min(frameEl.clientWidth / EMBED_WIDTH, frameEl.clientHeight / cardHeight);
      setScale(Number.isFinite(next) && next > 0 ? next : 1);
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(frameEl);
    observer.observe(cardEl);
    return () => {
      observer.disconnect();
      clearChrome();
    };
  }, []);

  return (
    <div ref={frame} className="fixed inset-0 overflow-hidden bg-transparent">
      <div
        ref={card}
        className="absolute top-1/2 left-1/2 w-[1360px]"
        style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}

export function ValueArticle({ id, embed = false }: { id: ModuleId; embed?: boolean }) {
  const index = values.findIndex((value) => value.id === id);
  const value = values[index];
  const Demo = demos[id];
  const reverse = index % 2 === 1;
  const t = useT();
  const copy = englishModules[id];

  return (
    <article id={value.id}>
      <SoftPanel
        className={cn(
          "relative overflow-hidden",
          embed ? "px-14 py-16" : "px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16",
        )}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-clip">
          <div
            className="absolute inset-0"
            style={{
              background: panelWash(value.id, reverse),
              filter: "blur(36px)",
              transform: "scale(1.12)",
            }}
          />
        </div>
        <div className={cn("relative grid items-center", embed ? "grid-cols-12 gap-14" : "gap-10 lg:grid-cols-12 lg:gap-14")}>
          <div className={cn(embed ? "col-span-5" : "lg:col-span-5", reverse && (embed ? "order-2" : "lg:order-2"))}>
            <p className="mb-4 inline-flex items-center rounded-full bg-[#E6F4FC] px-3.5 py-1.5 text-[13px] leading-none font-medium tracking-[-0.01em] text-[#1A6F9E]">
              {t(value.eyebrow, copy.eyebrow)}
            </p>
            <h3
              className={cn(
                "leading-[1.2] font-medium tracking-[-0.02em] text-balance",
                embed ? "text-[40px]" : "text-[28px] sm:text-[36px] md:text-[40px]",
              )}
            >
              {t(value.title, copy.title)}
            </h3>
            <p className={cn("mt-5 max-w-md leading-relaxed text-[#4C4C4C]", embed ? "text-lg" : "text-base sm:text-lg")}>
              {t(value.body, copy.body)}
            </p>
          </div>
          <div className={cn(embed ? "col-span-7" : "lg:col-span-7", reverse && (embed ? "order-1" : "lg:order-1"))}>
            <Demo />
          </div>
        </div>
      </SoftPanel>
    </article>
  );
}

function panelWash(id: keyof typeof washes, onLeft: boolean) {
  const [warm, cool] = washes[id];
  const a = onLeft ? "20% 16%" : "82% 16%";
  const b = onLeft ? "28% 72%" : "74% 72%";
  return `radial-gradient(58% 72% at ${a}, ${warm}, rgba(247, 247, 248, 0) 70%), radial-gradient(52% 68% at ${b}, ${cool}, rgba(247, 247, 248, 0) 72%)`;
}

export function ValueSections() {
  return (
    <section id="product" className="px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1360px] px-2 pt-20 pb-12 sm:px-4 sm:pt-28 sm:pb-16 lg:px-8">
        <SectionLead
          label={valueIntro.label}
          title={valueIntro.title}
          support={valueIntro.support}
          cta={valueIntro.cta}
        />
      </div>

      <div className="mx-auto flex max-w-[1360px] flex-col gap-5 px-0 pb-16 sm:gap-6 sm:pb-24">
        {values.map((value) => (
          <ValueArticle key={value.id} id={value.id} />
        ))}
      </div>
    </section>
  );
}
