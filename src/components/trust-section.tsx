import { DisplayTitle, SoftPanel } from "@/components/display";
import { ModelLogo } from "@/components/model-logo";
import { drivenBench, press, privacy, site, testimonials, trust } from "@/lib/content";

export function TrustSection() {
  return (
    <section id="trust" className="px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1360px] px-2 pt-8 pb-24 sm:px-4 sm:pt-12 sm:pb-32 lg:px-8">
        <DisplayTitle className="max-w-[12em]">{trust.title}</DisplayTitle>

        <div className="mt-14 space-y-16 sm:mt-20 sm:space-y-24">
          <DrivenBenchBlock />
          <PrivacyBlock />
          <TestimonialsBlock />
          <PressBlock />
        </div>
      </div>
    </section>
  );
}

function DrivenBenchBlock() {
  return (
    <div id="drivenbench" className="scroll-mt-24">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <h3 className="text-[28px] leading-[1.2] font-medium tracking-[-0.02em] sm:text-[36px]">
            {drivenBench.title}
          </h3>
          <p className="mt-4 max-w-[580px] text-base leading-relaxed text-[#4C4C4C] sm:text-lg">
            {drivenBench.body}
          </p>
        </div>
        <a
          href={site.benchUrl}
          className="inline-flex h-11 items-center rounded-full bg-foreground/5 px-5 text-[15px] text-foreground transition-colors hover:bg-foreground/10"
        >
          打开完整榜单
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
      <h3 className="text-[28px] leading-[1.2] font-medium tracking-[-0.02em] sm:text-[36px]">
        {privacy.title}
      </h3>
      <p className="mt-4 max-w-[580px] text-base leading-relaxed text-[#4C4C4C] sm:text-lg">
        {privacy.body}
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {privacy.points.map((point) => (
          <SoftPanel key={point.title} className="flex flex-col justify-between p-7 sm:p-8">
            <h4 className="text-xl leading-snug font-medium tracking-[-0.015em]">
              {point.title}
            </h4>
            <p className="mt-5 text-[15px] leading-relaxed text-[#4C4C4C]">{point.body}</p>
          </SoftPanel>
        ))}
      </div>
    </div>
  );
}

function TestimonialsBlock() {
  return (
    <div>
      <h3 className="text-[28px] leading-[1.2] font-medium tracking-[-0.02em] sm:text-[36px]">
        {testimonials.title}
      </h3>
      <p className="mt-3 text-base text-[#4C4C4C] sm:text-lg">{testimonials.subtitle}</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {testimonials.items.map((item) => (
          <SoftPanel key={item.handle} className="flex flex-col justify-between p-7 sm:p-8">
            <p className="text-lg leading-snug font-medium tracking-[-0.015em] text-balance sm:text-xl">
              “{item.quote}”
            </p>
            <p className="mt-8 text-sm text-[#4C4C4C]">
              {item.name}
              <span className="text-foreground/35"> · {item.handle}</span>
            </p>
          </SoftPanel>
        ))}
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
            key={item.title}
            href={item.href}
            className="flex flex-col gap-2 px-6 py-6 transition-colors hover:bg-black/[0.02] sm:flex-row sm:items-baseline sm:gap-8 sm:px-8"
          >
            <span className="w-36 shrink-0 text-sm text-[#4C4C4C]">
              {item.outlet}
              <span className="mt-0.5 block text-xs text-foreground/35">{item.date}</span>
            </span>
            <span className="text-[17px] font-medium tracking-[-0.015em]">{item.title}</span>
          </a>
        ))}
      </SoftPanel>
    </div>
  );
}
