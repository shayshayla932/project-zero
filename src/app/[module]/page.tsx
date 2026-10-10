import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ValueModuleStage, type ModuleId } from "@/components/value-sections";
import { LocaleProvider } from "@/lib/locale";

const modules = ["realtime", "professional", "proactive", "personalized"] as const;

const titles: Record<(typeof modules)[number], string> = {
  realtime: "Real-time",
  professional: "Professional",
  proactive: "Proactive",
  personalized: "Personalized",
};

export function generateStaticParams() {
  return modules.map((module) => ({ module }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ module: string }>;
}): Promise<Metadata> {
  const { module } = await params;
  if (!isStandaloneModule(module)) return { title: "Driven" };
  return { title: titles[module] };
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const { module } = await params;
  if (!isStandaloneModule(module)) notFound();

  return (
    <LocaleProvider locale="en">
      <ValueModuleStage id={module} />
    </LocaleProvider>
  );
}

function isStandaloneModule(value: string): value is ModuleId {
  return (modules as readonly string[]).includes(value);
}
