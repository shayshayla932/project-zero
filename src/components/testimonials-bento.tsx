import { testimonials } from "@/lib/content";
import { cn } from "@/lib/utils";

export function TestimonialsBento() {
  return (
    <div>
      <h3 className="font-serif text-[28px] leading-[1.2] font-normal tracking-[-0.015em] sm:text-[36px] lg:text-[42px]">
        {testimonials.title}
      </h3>
      <p className="mt-3 text-base text-[#4C4C4C] sm:text-lg">{testimonials.subtitle}</p>
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-12">
        {testimonials.items.map((item) => (
          <a
            key={item.handle}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group flex flex-col rounded-[20px] bg-[#F7F7F8] p-5 transition-colors hover:bg-[#f2f2f3] sm:p-6",
              item.span
            )}
          >
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.avatar}
                alt=""
                width={48}
                height={48}
                className="size-12 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-semibold">{item.name}</p>
                <p className="truncate text-xs text-[#4C4C4C]">{item.handle}</p>
              </div>
              {item.platform === "x" ? <XMark /> : <DiscordMark />}
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-foreground/85">
              <QuoteText text={item.quote} />
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}

function QuoteText({ text }: { text: string }) {
  const parts = text.split(/(@Driven)/g);
  return (
    <>
      {parts.map((part, index) =>
        part === "@Driven" ? (
          <span key={index} className="text-[#2694ff]">
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
}

function XMark() {
  return (
    <svg
      width="18"
      height="16"
      viewBox="0 0 21 18"
      fill="none"
      aria-hidden
      className="shrink-0 text-foreground/80 transition-colors group-hover:text-foreground"
    >
      <path
        d="M16.579 0h3.228L12.74 7.624 21 18h-6.818l-5.084-6.651L3.515 18H.285l7.527-8.102L0 0h6.988l4.593 6.072L16.579 0zm-1.132 16.172h1.789L5.634 1.828H3.715l11.732 14.344z"
        fill="currentColor"
      />
    </svg>
  );
}

function DiscordMark() {
  return (
    <svg
      width="20"
      height="16"
      viewBox="0 0 24 18"
      fill="none"
      aria-hidden
      className="shrink-0 text-foreground/80 transition-colors group-hover:text-foreground"
    >
      <path
        d="M20.317 1.492a19.825 19.825 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.301 18.301 0 0 0-5.487 0 12.645 12.645 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 1.492a.07.07 0 0 0-.032.027C.533 6.093-.32 10.565.099 14.98a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 12.278c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.956 2.42-2.157 2.42zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.947 2.42-2.157 2.42z"
        fill="currentColor"
      />
    </svg>
  );
}
