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
    <section id="product" className="border-t border-foreground/6">
      <div className="mx-auto max-w-6xl px-5 pt-20 pb-4 sm:px-8 sm:pt-28">
        <p className="text-[13px] tracking-[0.18em] text-muted-foreground uppercase">
          {valueIntro.eyebrow}
        </p>
        <h2 className="mt-4 max-w-xl text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          {valueIntro.title}
        </h2>
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {values.map((value, index) => {
          const Demo = demos[value.id];
          const reverse = index % 2 === 1;

          return (
            <article
              key={value.id}
              id={value.id}
              className="grid items-center gap-10 border-b border-foreground/6 py-16 last:border-b-0 sm:py-24 lg:grid-cols-12 lg:gap-14"
            >
              <div className={cn("lg:col-span-5", reverse && "lg:order-2")}>
                <h3 className="text-2xl font-bold tracking-tight text-balance sm:text-[2rem] sm:leading-tight">
                  {value.title}
                </h3>
                <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground">
                  {value.body}
                </p>
              </div>
              <div className={cn("lg:col-span-7", reverse && "lg:order-1")}>
                <Demo />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
