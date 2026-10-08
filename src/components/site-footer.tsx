import { BrandMark } from "@/components/brand-mark";
import { footer } from "@/lib/content";

export function SiteFooter() {
  return (
    <div className="relative z-10 w-full shrink-0">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6 lg:px-8">
        <div className="pointer-events-none relative z-[1] w-full bg-background pt-16 md:pt-20 lg:pt-24">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Driven"
            src="/driven-footer-wordmark.svg"
            width={1387}
            height={358}
            className="block h-auto w-full object-contain object-bottom"
          />
        </div>
      </div>
      <div className="relative z-10 mt-[calc(-100%*60/1387)]">
        <footer className="mx-4 rounded-t-2xl bg-[#edf6ff]">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-8 pt-10 pb-8">
            <a href="#top" className="inline-flex shrink-0 self-start text-foreground">
              <BrandMark />
            </a>
            <div className="grid grid-cols-1 items-start gap-8 min-[901px]:grid-cols-[minmax(300px,348px)_max-content_max-content_max-content] min-[901px]:justify-between min-[901px]:gap-x-[clamp(24px,3vw,48px)]">
              <div className="flex w-full max-w-[348px] shrink-0 flex-col">
                <p className="text-base leading-7 font-semibold text-foreground">
                  {footer.tagline}
                </p>
                <div className="mt-4 flex items-center gap-9">
                  {footer.social.map((item) => (
                    <a
                      key={item.icon}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className="inline-flex min-h-6 min-w-6 items-center justify-center text-foreground/55 transition-colors hover:text-foreground"
                    >
                      <SocialIcon name={item.icon} />
                    </a>
                  ))}
                </div>
                <p className="mt-8 text-xs text-foreground/55">{footer.copyright}</p>
              </div>
              {footer.columns.map((column) => (
                <div key={column.title} className="flex min-h-0 flex-col gap-3">
                  <p className="text-sm font-medium text-foreground">{column.title}</p>
                  <nav className="flex flex-col gap-3" aria-label={column.title}>
                    {column.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        {...("external" in link
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="whitespace-nowrap text-sm text-foreground/55 no-underline transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    ))}
                  </nav>
                </div>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function SocialIcon({ name }: { name: (typeof footer.social)[number]["icon"] }) {
  if (name === "x") {
    return (
      <svg width="21" height="18" viewBox="0 0 21 18" fill="none" aria-hidden>
        <path
          d="M16.579 0h3.228L12.74 7.624 21 18h-6.818l-5.084-6.651L3.515 18H.285l7.527-8.102L0 0h6.988l4.593 6.072L16.579 0zm-1.132 16.172h1.789L5.634 1.828H3.715l11.732 14.344z"
          fill="currentColor"
        />
      </svg>
    );
  }
  if (name === "discord") {
    return (
      <svg width="24" height="18" viewBox="0 0 24 18" fill="none" aria-hidden>
        <path
          d="M20.317 1.492a19.825 19.825 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.301 18.301 0 0 0-5.487 0 12.645 12.645 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 1.492a.07.07 0 0 0-.032.027C.533 6.093-.32 10.565.099 14.98a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 12.278c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.956 2.42-2.157 2.42zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.947 2.42-2.157 2.42z"
          fill="currentColor"
        />
      </svg>
    );
  }
  if (name === "youtube") {
    return (
      <svg width="24" height="18" viewBox="0 3 24 18" fill="none" aria-hidden>
        <path
          d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.121 2.136c1.872.505 9.377.505 9.377.505s7.505 0 9.376-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z"
          fill="currentColor"
        />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
        fill="currentColor"
      />
    </svg>
  );
}
