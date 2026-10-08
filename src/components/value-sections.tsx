import { SectionLead, SoftPanel } from "@/components/display";
import { PersonalizedDemo } from "@/components/demos/personalized-demo";
import { ProactiveDemo } from "@/components/demos/proactive-demo";
import { ProfessionalDemo } from "@/components/demos/professional-demo";
import { RealtimeDemo } from "@/components/demos/realtime-demo";
import { valueIntro, values } from "@/lib/content";
import { cn } from "@/lib/utils";

const demos = {
  realtime: RealtimeDemo,
  professional: ProfessionalDemo,
  proactive: ProactiveDemo,
  personalized: PersonalizedDemo,
} as const;

export function ValueSections() {
  return (
    <section id="product" className="px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1360px] px-2 pt-20 pb-12 sm:px-4 sm:pt-28 sm:pb-16 lg:px-8">
        <SectionLead
          label={valueIntro.label}
          title={valueIntro.title}
          support={valueIntro.support}
          cta={valueIntro.cta}
        />
      </div>

      <div className="mx-auto flex max-w-[1360px] flex-col gap-5 px-0 pb-16 sm:gap-6 sm:pb-24">
        {values.map((value, index) => {
          const Demo = demos[value.id];
          const reverse = index % 2 === 1;

          return (
            <article key={value.id} id={value.id}>
              <SoftPanel className="px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
                <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
                  <div className={cn("lg:col-span-5", reverse && "lg:order-2")}>
                    <h3 className="text-[28px] leading-[1.2] font-medium tracking-[-0.02em] text-balance sm:text-[36px] md:text-[40px]">
                      {value.title}
                    </h3>
                    <p className="mt-5 max-w-md text-base leading-relaxed text-[#4C4C4C] sm:text-lg">
                      {value.body}
                    </p>
                  </div>
                  <div className={cn("lg:col-span-7", reverse && "lg:order-1")}>
                    <div className="rounded-[20px] bg-white p-2 sm:p-3">
                      <Demo />
                    </div>
                  </div>
                </div>
              </SoftPanel>
            </article>
          );
        })}
      </div>
    </section>
  );
}
