"use client";

import { Menu } from "lucide-react";

import { BrandMark } from "@/components/brand-mark";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { hero, nav, site } from "@/lib/content";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-foreground/6 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <BrandMark />
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href={site.productUrl}
            className={cn(buttonVariants({ size: "lg" }), "h-9 rounded-full px-4")}
          >
            {hero.primaryCta}
          </a>
        </div>

        <Sheet>
          <SheetTrigger
            className="md:hidden"
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
                    />
                  }
                >
                  {item.label}
                </SheetClose>
              ))}
            </div>
            <div className="px-4">
              <a
                href={site.productUrl}
                className={cn(buttonVariants({ size: "lg" }), "h-10 w-full")}
              >
                {hero.primaryCta}
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
