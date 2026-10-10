"use client";

import { useLayoutEffect, useState, type ReactNode } from "react";

import { isModuleId, ValueModuleStage, type ModuleId } from "@/components/value-sections";
import { LocaleProvider, type Locale } from "@/lib/locale";

export function SiteOrModule({ children }: { children: ReactNode }) {
  const [moduleId, setModuleId] = useState<ModuleId | null>(null);
  const [locale, setLocale] = useState<Locale>("zh");

  useLayoutEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const value = params.get("module");
    if (isModuleId(value)) {
      setModuleId(value);
      setLocale(params.get("lang") === "en" ? "en" : "zh");
    } else document.documentElement.classList.remove("module-embed");
  }, []);

  if (moduleId) {
    return (
      <LocaleProvider locale={locale}>
        <ModuleReveal id={moduleId} locale={locale} />
      </LocaleProvider>
    );
  }
  return children;
}

function ModuleReveal({ id, locale }: { id: ModuleId; locale: Locale }) {
  useLayoutEffect(() => {
    document.documentElement.classList.remove("module-embed");
    document.documentElement.lang = locale === "en" ? "en" : "zh-CN";
  }, [locale]);

  return <ValueModuleStage id={id} />;
}
