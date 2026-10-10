import { Hero } from "@/components/hero";
import { OutletWall } from "@/components/outlet-wall";
import { SiteOrModule } from "@/components/site-or-module";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TrustSection } from "@/components/trust-section";
import { ValueSections } from "@/components/value-sections";

export default function Home() {
  return (
    <SiteOrModule>
      <div className="flex min-h-full flex-1 flex-col">
        <SiteHeader />
        <main>
          <Hero />
          <OutletWall />
          <ValueSections />
          <TrustSection />
        </main>
        <SiteFooter />
      </div>
    </SiteOrModule>
  );
}
