import Image from "next/image";

import { DisplayTitle } from "@/components/display";
import { hero, navActions, site } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative min-h-[88svh] overflow-hidden">
      <Image
        src="/hero-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-background"
      />
      <div className="relative z-10 mx-auto flex min-h-[88svh] max-w-[1360px] flex-col items-center justify-center px-6 py-28 text-center sm:px-10 sm:py-32 lg:px-16">
        <DisplayTitle as="h1" className="max-w-[16em] md:text-[64px]">
          {hero.slogan}
        </DisplayTitle>
        <p className="mt-7 max-w-[580px] text-lg leading-relaxed text-[#4C4C4C] sm:text-xl">
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
            className="inline-flex h-11 items-center rounded-full bg-foreground/5 px-6 text-[15px] text-foreground transition-colors hover:bg-foreground/10 md:h-12 md:px-7 md:text-[17px]"
          >
            {hero.secondaryCta}
          </a>
        </div>
      </div>
    </section>
  );
}
