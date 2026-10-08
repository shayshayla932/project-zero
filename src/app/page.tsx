import { Hero } from "@/components/hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TrustSection } from "@/components/trust-section";
import { ValueSections } from "@/components/value-sections";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <div id="nav-frost-sentinel" className="h-px w-full" aria-hidden />
      <SiteHeader />
      <main>
        <Hero />
        <ValueSections />
        <TrustSection />
      </main>
      <SiteFooter />
    </div>
  );
}
