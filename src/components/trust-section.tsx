import { readFileSync } from "node:fs";
import { join } from "node:path";
import { SoftPanel } from "@/components/display";
import { ChevronRight } from "lucide-react";
import { ModelLogo } from "@/components/model-logo";
import { FaqSection } from "@/components/faq-section";
import { TestimonialsBento } from "@/components/testimonials-bento";
import { dataSources, drivenBench, press, privacy, trust } from "@/lib/content";
import { publicAsset } from "@/lib/public-asset";

const privacyArt = readFileSync(join(process.cwd(), "public/Frame 2085664015.svg"), "utf8");

export function TrustSection() {
  return (
    <section id="trust" className="px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1360px] px-2 pt-8 pb-24 sm:px-4 sm:pt-12 sm:pb-32 lg:px-8">
        <div className="space-y-16 sm:space-y-24">
          <DataSourcesBlock />
          <DrivenBenchBlock />
          <PrivacyBlock />
          {false ? <PressBlock /> : null}
          <TestimonialsBento />
          <FaqSection />
        </div>
      </div>
    </section>
  );
}

function DataSourcesBlock() {
  return (
    <div id="data">
      <p className="mb-4 inline-flex items-center gap-0.5 text-[13px] text-foreground">
        {trust.label}
        <ChevronRight className="size-3.5 opacity-50" />
      </p>
      <h3 className="text-[28px] leading-[1.2] font-medium tracking-[-0.02em] sm:text-[36px]">
        {dataSources.title}
      </h3>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dataSources.sources.map((source) => (
          <SoftPanel key={source.title} className="flex flex-col p-7 sm:p-8">
            <h4 className="text-xl leading-snug font-medium tracking-[-0.015em]">
              {source.title}
            </h4>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              {source.logos.map((logo) => (
                <SourceLogo key={logo} id={logo} />
              ))}
            </div>
          </SoftPanel>
        ))}
      </div>
    </div>
  );
}

function SourceLogo({ id }: { id: string }) {
  if (id === "nasdaq") {
    return (
      <img
        alt="Nasdaq"
        src={publicAsset("data-logos/nasdaq.svg")}
        width={78}
        height={22}
        className="block h-[22px] w-auto object-contain"
      />
    );
  }
  if (id === "hkex") {
    return (
      <img
        alt="香港交易所 HKEX"
        src={publicAsset("data-logos/hkex.png")}
        width={54}
        height={26}
        className="block h-[26px] w-auto object-contain"
      />
    );
  }
  if (id === "opra") {
    return <span className="text-[17px] leading-none font-semibold tracking-[0.12em] text-[#101423]">OPRA</span>;
  }
  if (id === "fmp") {
    return (
      <span className="inline-flex items-end gap-1.5 leading-none text-[#101423]">
        <svg width="16" height="18" viewBox="0 0 16 18" aria-hidden>
          <rect x="0" y="10" width="3.2" height="8" rx="0.6" fill="#2F6BFF" />
          <rect x="5.4" y="5" width="3.2" height="13" rx="0.6" fill="#2F6BFF" />
          <rect x="10.8" y="0" width="3.2" height="18" rx="0.6" fill="#2F6BFF" />
        </svg>
        <span className="text-[17px] font-semibold tracking-[0.04em]">FMP</span>
      </span>
    );
  }
  if (id === "driven") {
    return (
      <img
        alt="Driven"
        src={publicAsset("product-ui/sidebar-logo.svg")}
        width={66}
        height={16}
        className="block h-4 w-auto object-contain"
      />
    );
  }
  return null;
}

function DrivenBenchBlock() {
  return (
    <div id="drivenbench" className="scroll-mt-24">
      <div className="max-w-2xl">
        <h3 className="text-[28px] leading-[1.2] font-medium tracking-[-0.02em] sm:text-[36px]">
          {drivenBench.title}
        </h3>
        <p className="mt-4 max-w-[580px] text-base leading-relaxed text-[#4C4C4C] sm:text-lg">
          {drivenBench.body}
        </p>
        <a
          href={trust.cta.href}
          className="mt-6 inline-flex h-10 items-center gap-1.5 rounded-full bg-foreground/5 px-5 text-[13px] text-foreground transition-colors hover:bg-foreground/10 md:h-11 md:text-[15px]"
        >
          {trust.cta.label}
          <span aria-hidden>→</span>
        </a>
      </div>

      <SoftPanel className="mt-8 overflow-x-auto">
        <table className="min-w-[760px] w-full text-left text-sm">
          <caption className="sr-only">
            DrivenBench 各模型的能力得分、能力通过数、基准测试总成本上限，以及延迟中位数与 p90
          </caption>
          <thead className="text-[11px] tracking-[0.08em] text-[#4C4C4C] uppercase">
            <tr>
              <th className="w-14 px-4 py-4 text-center font-medium">排名</th>
              <th className="px-4 py-4 font-medium">模型</th>
              <th className="px-4 py-4 text-right font-medium">
                <span className="md:hidden">得分</span>
                <span className="hidden md:inline">能力得分</span>
              </th>
              <th className="hidden px-4 py-4 text-right font-medium md:table-cell">
                能力通过数
              </th>
              <th className="hidden px-4 py-4 text-right font-medium md:table-cell">
                成本上限
              </th>
              <th className="hidden px-4 py-4 text-right font-medium md:table-cell">
                延迟中位数 / p90
              </th>
            </tr>
          </thead>
          <tbody>
            {drivenBench.rows.map((row) => (
              <tr key={row.model} className="border-t border-black/4">
                <td className="px-4 py-3.5 text-center font-mono text-[13px] font-semibold tabular-nums text-[#4C4C4C]">
                  {row.rank}
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <ModelLogo vendor={row.vendor} model={row.model} />
                    <span className="min-w-0">
                      <span className="block font-medium">{row.model}</span>
                      <span className="block text-xs text-[#4C4C4C]">{row.vendor}</span>
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-right font-mono text-[13px] font-medium tabular-nums">
                  {row.score}
                </td>
                <td className="hidden px-4 py-3.5 text-right font-mono text-[13px] tabular-nums md:table-cell">
                  {row.passes}
                </td>
                <td className="hidden px-4 py-3.5 text-right font-mono text-[13px] tabular-nums md:table-cell">
                  {row.cost}
                </td>
                <td className="hidden px-4 py-3.5 text-right font-mono text-[13px] tabular-nums md:table-cell">
                  {row.latency}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SoftPanel>
      <p className="mt-4 max-w-3xl text-xs leading-relaxed text-[#4C4C4C]/80">
        {drivenBench.note}
      </p>
    </div>
  );
}

function PrivacyBlock() {
  return (
    <div>
      <div className="relative mt-8 ml-[calc(50%-50dvw)] w-[100dvw]">
        <div className="bg-[#181818]">
          <div className="mx-auto w-full max-w-[1392px] px-6 pt-10 sm:max-w-[1408px] sm:px-10 sm:pt-12 lg:max-w-[1440px] lg:px-[72px]">
            <h3 className="text-[28px] leading-[1.2] font-medium tracking-[-0.02em] text-white sm:text-[36px]">
              {privacy.title}
            </h3>
            <div className="mt-12 grid gap-8 sm:mt-16 md:grid-cols-3 md:gap-10">
              {privacy.points.map((point) => (
                <div key={point.title}>
                  <h4 className="text-[26px] leading-snug font-medium tracking-[-0.02em] text-white sm:text-[28px]">
                    {point.title}
                  </h4>
                  <p className="mt-4 text-[15px] leading-relaxed text-white/72">{point.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div
            aria-hidden
            className="mt-2 w-full [&_svg]:block [&_svg]:h-auto [&_svg]:w-full"
            dangerouslySetInnerHTML={{ __html: privacyArt }}
          />
        </div>
      </div>
    </div>
  );
}

function PressBlock() {
  return (
    <div>
      <h3 className="text-[28px] leading-[1.2] font-medium tracking-[-0.02em] sm:text-[36px]">
        {press.title}
      </h3>
      <SoftPanel className="mt-8 divide-y divide-black/4">
        {press.items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col gap-3 px-6 py-6 transition-colors hover:bg-black/[0.02] sm:flex-row sm:items-center sm:gap-8 sm:px-8"
          >
            <span className="flex w-44 shrink-0 flex-col items-start gap-2">
              <img
                alt={item.outlet}
                src={publicAsset(item.logo)}
                className="block h-6 w-auto max-w-full object-contain object-left"
              />
              <span className="text-xs text-foreground/35">{item.date}</span>
            </span>
            <span className="text-[17px] font-medium tracking-[-0.015em]">{item.title}</span>
          </a>
        ))}
      </SoftPanel>
    </div>
  );
}
