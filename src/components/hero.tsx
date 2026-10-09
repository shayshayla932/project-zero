import { DialHands } from "@/components/dial-hands";
import { hero, navActions, site } from "@/lib/content";
import { publicAsset } from "@/lib/public-asset";

export function Hero() {
  return (
    <section className="relative isolate min-h-svh overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          maskImage: "linear-gradient(to bottom, #000 0%, #000 68%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 68%, transparent 100%)",
        }}
      >
        <div className="hero-wash absolute inset-0" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={publicAsset("/hero-bg.webp")}
          alt=""
          width={3344}
          height={1882}
          className="absolute inset-0 size-full object-cover object-center opacity-50 mix-blend-overlay"
        />
        <div className="hero-grain absolute inset-0" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[-6%] bottom-[-6%] z-[1] h-[34vh]"
        style={{
          background:
            "linear-gradient(to bottom, rgb(255 255 255 / 0%) 0%, rgb(255 255 255 / 0.45) 42%, #fff 78%)",
          filter: "blur(28px)",
        }}
      />

      <div className="pointer-events-none absolute right-[1%] bottom-[8%] z-2 hidden h-[min(48vh,460px)] w-[min(42vw,460px)] md:block">
        <DialHands />
      </div>

      <div className="relative z-10 mx-auto flex min-h-svh w-full flex-col items-center justify-center px-6 pt-28 pb-20 text-center sm:px-12 lg:px-20">
        <h1 className="font-serif text-[clamp(2.75rem,6.2vw,5rem)] leading-[1.24] font-normal tracking-[-0.02em]">
          {hero.line1}
          <br />
          {hero.line2}
        </h1>
        <p className="mt-8 max-w-[36rem] text-lg leading-relaxed text-[#4C4C4C] sm:text-xl">
          {hero.support}
        </p>
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <a
            href={navActions.primary.href}
            className="inline-flex h-11 items-center rounded-full bg-foreground px-6 text-[15px] font-medium text-background transition-opacity hover:opacity-90 md:h-12 md:px-7 md:text-[17px]"
          >
            {hero.primaryCta}
          </a>
          <a
            href={site.benchUrl}
            className="inline-flex h-11 items-center rounded-full bg-white/55 px-6 text-[15px] text-foreground backdrop-blur-sm transition-colors hover:bg-white/80 md:h-12 md:px-7 md:text-[17px]"
          >
            {hero.secondaryCta}
          </a>
        </div>
      </div>
    </section>
  );
}
