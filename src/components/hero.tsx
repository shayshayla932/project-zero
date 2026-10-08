import { buttonVariants } from "@/components/ui/button";
import { hero, site } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,oklch(0.96_0.02_95),transparent_58%)]"
      />
      <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-5xl flex-col items-center justify-center px-5 py-24 text-center sm:px-8 sm:py-32">
        <p className="mb-8 text-[13px] tracking-[0.22em] text-muted-foreground uppercase">
          {site.name}
        </p>
        <h1 className="max-w-4xl text-[2.05rem] leading-[1.18] font-bold tracking-tight text-balance sm:text-5xl sm:leading-[1.12] md:text-[3.4rem]">
          {hero.slogan}
        </h1>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {hero.support}
        </p>
        <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row">
          <a
            href={site.productUrl}
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-12 rounded-full px-7 text-[15px]"
            )}
          >
            {hero.primaryCta}
          </a>
          <a
            href={site.benchUrl}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 rounded-full px-7 text-[15px]"
            )}
          >
            {hero.secondaryCta}
          </a>
        </div>
      </div>
    </section>
  );
}
