import { outletLine, outletLogos } from "@/lib/content";
import { publicAsset } from "@/lib/public-asset";

export function OutletWall() {
  return (
    <section aria-label="报道机构" className="px-4 py-10 sm:px-6 sm:py-14 lg:px-10">
      <p className="mx-auto mb-8 max-w-[920px] text-center text-lg leading-relaxed font-medium tracking-[-0.02em] sm:mb-10 sm:text-[22px]">
        {outletLine}
      </p>
      <div className="mx-auto flex max-w-[1200px] flex-wrap justify-center gap-4">
        {outletLogos.map((item) => (
          <div
            key={item.name}
            className="flex h-[112px] w-[calc(50%-8px)] max-w-[280px] items-center justify-center rounded-[18px] bg-[#F2F2F4] px-4 sm:h-[120px] sm:w-[280px]"
          >
            <img
              alt={item.name}
              src={publicAsset(item.logo)}
              className="block h-12 w-auto max-w-[92%] object-contain object-center"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
