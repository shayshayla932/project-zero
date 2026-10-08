import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { drivenBench, press, privacy, site, testimonials, trust } from "@/lib/content";
import { cn } from "@/lib/utils";

export function TrustSection() {
  return (
    <section id="trust" className="border-t border-foreground/6 bg-[oklch(0.975_0.006_95)]">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <p className="text-[13px] tracking-[0.18em] text-muted-foreground uppercase">
          {trust.eyebrow}
        </p>
        <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {trust.title}
        </h2>

        <div className="mt-16 space-y-20">
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
          <h3 className="text-2xl font-semibold tracking-tight">{drivenBench.title}</h3>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            {drivenBench.body}
          </p>
        </div>
        <a
          href={site.benchUrl}
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-10 px-4")}
        >
          打开完整榜单
        </a>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-foreground/8 bg-background">
        <table className="min-w-[640px] w-full text-left text-sm">
          <thead className="border-b border-foreground/8 text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">排名</th>
              <th className="px-4 py-3 font-medium">模型</th>
              <th className="px-4 py-3 font-medium">能力分</th>
              <th className="px-4 py-3 font-medium">成本上限</th>
              <th className="px-4 py-3 font-medium">延迟 中位 / p90</th>
            </tr>
          </thead>
          <tbody>
            {drivenBench.rows.map((row) => (
              <tr key={row.model} className="border-b border-foreground/6 last:border-0">
                <td className="px-4 py-3 text-muted-foreground">{row.rank}</td>
                <td className="px-4 py-3">
                  <div className="font-medium">{row.model}</div>
                  <div className="text-xs text-muted-foreground">{row.vendor}</div>
                </td>
                <td className="px-4 py-3">{row.score}</td>
                <td className="px-4 py-3">{row.cost}</td>
                <td className="px-4 py-3">{row.latency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 max-w-3xl text-xs leading-relaxed text-muted-foreground">
        {drivenBench.note}
      </p>
    </div>
  );
}

function PrivacyBlock() {
  return (
    <div>
      <h3 className="text-2xl font-semibold tracking-tight">{privacy.title}</h3>
      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
        {privacy.body}
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {privacy.points.map((point) => (
          <Card key={point.title} className="bg-background shadow-none">
            <CardHeader>
              <CardTitle className="text-[16px]">{point.title}</CardTitle>
              <CardDescription className="text-[13px] leading-relaxed">
                {point.body}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}

function TestimonialsBlock() {
  return (
    <div>
      <h3 className="text-2xl font-semibold tracking-tight">{testimonials.title}</h3>
      <p className="mt-3 text-sm text-muted-foreground">{testimonials.subtitle}</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {testimonials.items.map((item) => (
          <Card key={item.handle} className="bg-background shadow-none">
            <CardHeader>
              <CardTitle className="text-[15px]">{item.name}</CardTitle>
              <CardDescription>{item.handle}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-[14px] leading-relaxed text-foreground/80">{item.quote}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function PressBlock() {
  return (
    <div>
      <h3 className="text-2xl font-semibold tracking-tight">{press.title}</h3>
      <div className="mt-8 divide-y divide-foreground/8 border-y border-foreground/8">
        {press.items.map((item) => (
          <a
            key={item.title}
            href={item.href}
            className="flex flex-col gap-2 py-5 transition-colors hover:bg-background/70 sm:flex-row sm:items-baseline sm:gap-8"
          >
            <span className="w-36 shrink-0 text-sm text-muted-foreground">
              {item.outlet}
              <span className="mt-0.5 block text-xs">{item.date}</span>
            </span>
            <span className="text-[15px] font-medium tracking-tight">{item.title}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
