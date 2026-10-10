"use client";

import { createContext, useContext, type ReactNode } from "react";

export type Locale = "zh" | "en";

const LocaleContext = createContext<Locale>("zh");

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}

export function useT() {
  const locale = useLocale();
  return (zh: string, en: string) => (locale === "en" ? en : zh);
}
