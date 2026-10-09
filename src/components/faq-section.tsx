"use client";

import { useState, type ReactNode } from "react";
import { faq } from "@/lib/content";

type FaqLine = {
  label?: string;
  before?: string;
  text: string;
  link?: { href: string; label: string };
};

type FaqItem = (typeof faq.items)[number];

export function FaqSection() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div>
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-20">
        <h3 className="shrink-0 font-serif text-[28px] leading-tight font-medium tracking-[-0.015em] md:text-[36px] lg:w-[360px] lg:text-[40px]">
          {faq.title}
        </h3>
        <div className="min-w-0 flex-1">
          <FaqRow
            question={faq.compare.question}
            open={open === faq.compare.question}
            onToggle={() =>
              setOpen((current) => (current === faq.compare.question ? null : faq.compare.question))
            }
          >
            <CompareTable />
          </FaqRow>
          {faq.items.map((item) => (
            <FaqRow
              key={item.question}
              question={item.question}
              open={open === item.question}
              onToggle={() => setOpen((current) => (current === item.question ? null : item.question))}
            >
              <Answer item={item} />
            </FaqRow>
          ))}
        </div>
      </div>
    </div>
  );
}

function FaqRow({
  question,
  open,
  onToggle,
  children,
}: {
  question: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-base leading-7 md:text-[18px]">{question}</span>
        <PlusIcon open={open} />
      </button>
      {open ? <div className="pb-5 text-base leading-7 text-[#4C4C4C]">{children}</div> : null}
      <div className="h-px w-full bg-black/10" />
    </div>
  );
}

function PlusIcon({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden
      className="flex size-6 shrink-0 items-center justify-center transition-transform duration-200"
      style={{ transform: open ? "rotate(45deg)" : undefined }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function CompareTable() {
  const { generalHeader, drivenHeader, rows } = faq.compare;
  return (
    <div className="overflow-x-auto">
      <table className="min-w-[40rem] text-sm sm:min-w-full">
        <thead>
          <tr className="border-b border-black/10">
            <th className="py-2 pr-4" />
            <th className="py-2 pr-4 text-left font-medium text-foreground">{generalHeader}</th>
            <th className="py-2 text-left font-medium text-foreground">{drivenHeader}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-black/5 last:border-0">
              <td className="py-2 pr-4 font-medium whitespace-nowrap text-foreground">{row.label}</td>
              <td className="py-2 pr-4">{row.general}</td>
              <td className="py-2">{row.driven}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Answer({ item }: { item: FaqItem }) {
  return (
    <div className="space-y-3">
      {"intro" in item && item.intro ? <p>{item.intro}</p> : null}
      {"lead" in item && item.lead ? <p>{item.lead}</p> : null}
      {"lines" in item && item.lines ? <LineList lines={item.lines} /> : null}
      {"outro" in item && item.outro ? <p>{item.outro}</p> : null}
      {"paragraphs" in item && item.paragraphs
        ? item.paragraphs.map((paragraph) => (
            <p key={paragraph}>
              {"emphasis" in item && item.emphasis && paragraph.includes(item.emphasis) ? (
                <>
                  {paragraph.slice(0, paragraph.indexOf(item.emphasis))}
                  <strong className="font-medium text-foreground">{item.emphasis}</strong>
                </>
              ) : (
                paragraph
              )}
            </p>
          ))
        : null}
    </div>
  );
}

function LineList({ lines }: { lines: readonly FaqLine[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5">
      {lines.map((line) => (
        <li key={`${line.label ?? ""}${line.text}`}>
          {line.label ? <span className="font-medium text-foreground">{line.label}</span> : null}
          {line.label ? " " : null}
          {line.before}
          {line.link ? (
            <a
              href={line.link.href}
              target={line.link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={line.link.href.startsWith("mailto:") ? undefined : "noreferrer"}
              className="text-foreground underline underline-offset-2 hover:opacity-80"
            >
              {line.link.label}
            </a>
          ) : null}
          {line.text}
        </li>
      ))}
    </ul>
  );
}
