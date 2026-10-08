import { BrandMark } from "@/components/brand-mark";
import { footer, nav, site } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-foreground/8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-14 sm:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
          <div className="max-w-sm space-y-4">
            <BrandMark />
            <p className="text-sm leading-relaxed text-muted-foreground">
              {footer.blurb}
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
            <a
              href={site.docsUrl}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              文档
            </a>
            <a
              href={site.productUrl}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              打开 Driven
            </a>
          </div>
        </div>
        <p className="max-w-3xl text-xs leading-relaxed text-muted-foreground/80">
          {footer.disclaimer}
        </p>
      </div>
    </footer>
  );
}
