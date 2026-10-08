"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { nav, navActions } from "@/lib/content";
import { cn } from "@/lib/utils";

function readScrollY() {
  return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const apply = (next: boolean) => setScrolled(next);
    const fromOffset = () => apply(readScrollY() > 8);

    fromOffset();
    window.addEventListener("scroll", fromOffset, { passive: true });
    document.addEventListener("scroll", fromOffset, { passive: true, capture: true });

    const sentinel = document.getElementById("nav-frost-sentinel");
    const observer =
      sentinel &&
      new IntersectionObserver(
        ([entry]) => apply(!entry.isIntersecting || readScrollY() > 8),
        { threshold: 1 }
      );
    if (sentinel && observer) observer.observe(sentinel);

    return () => {
      window.removeEventListener("scroll", fromOffset);
      document.removeEventListener("scroll", fromOffset, true);
      observer?.disconnect();
    };
  }, []);

  return (
    <header
      className={cn("site-header", scrolled && "is-scrolled")}
      data-scrolled={scrolled ? "true" : "false"}
    >
      <div
        className={cn(
          "site-header-bar",
          scrolled && "bg-white/70 backdrop-blur-xl backdrop-saturate-150"
        )}
      >
        <div className="relative flex h-16 items-center justify-between px-5 sm:px-8">
          <a
            href="#top"
            className="relative z-10 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <BrandMark />
          </a>

          <nav className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-5 md:flex lg:gap-8">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                {...("external" in item
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
                className="whitespace-nowrap text-[15px] text-foreground/80 transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="relative z-10 hidden items-center gap-5 md:flex">
            <a
              href={navActions.secondary.href}
              className="text-[15px] text-foreground/80 transition-colors hover:text-foreground"
            >
              {navActions.secondary.label}
            </a>
            <a
              href={navActions.primary.href}
              className="inline-flex h-9 items-center rounded-full bg-foreground px-4 text-[14px] font-medium text-background transition-opacity hover:opacity-90"
            >
              {navActions.primary.label}
            </a>
          </div>

          <Sheet>
            <SheetTrigger
              className="relative z-10 md:hidden"
              render={<Button variant="ghost" size="icon" />}
            >
              <Menu />
              <span className="sr-only">打开菜单</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>
                  <BrandMark />
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 px-4">
                {nav.map((item) => (
                  <SheetClose
                    key={item.href}
                    render={
                      <a
                        href={item.href}
                        className="rounded-lg px-2 py-2.5 text-sm text-foreground hover:bg-muted"
                        {...("external" in item
                          ? { target: "_blank", rel: "noreferrer" }
                          : {})}
                      />
                    }
                  >
                    {item.label}
                  </SheetClose>
                ))}
                <SheetClose
                  render={
                    <a
                      href={navActions.secondary.href}
                      className="rounded-lg px-2 py-2.5 text-sm text-foreground hover:bg-muted"
                    />
                  }
                >
                  {navActions.secondary.label}
                </SheetClose>
              </div>
              <div className="px-4">
                <a
                  href={navActions.primary.href}
                  className="inline-flex h-10 w-full items-center justify-center rounded-full bg-foreground text-sm font-medium text-background"
                >
                  {navActions.primary.label}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
