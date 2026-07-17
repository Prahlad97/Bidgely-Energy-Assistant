import type { KpiRowSection, KpiAccent } from '../../types';

// Surface tokens, mapped to the existing DS:
//   green  → Web/Green/400  (#7FECCB) — vivid savings mint (KPI hero tile)
//   blue   → Web/Blue/300   (#B5E4FF) — sky for lifetime / NPV tile
//   purple → Web/Violet/300 (#A9A9F5) — kept for educational/info contexts
//   yellow → Web/Appliance/Solar/100 (#FFEEAB) — warm callouts
const accentStyles: Record<KpiAccent, string> = {
  green: 'bg-[#7FECCB]',
  purple: 'bg-[#A9A9F5]',
  blue: 'bg-[#B5E4FF]',
  yellow: 'bg-[#FFEEAB]',
};

interface Props {
  section: KpiRowSection;
}

export function KpiRow({ section }: Props) {
  return (
    <div className="flex gap-4 w-full">
      {section.kpis.map((kpi) => (
        <div
          key={kpi.label}
          className={`flex flex-col gap-3 flex-1 min-w-0 p-6 rounded-[14px] ${accentStyles[kpi.accent]} ${
            kpi.shadow ? 'shadow-[0px_6px_14px_0px_rgba(17,24,39,0.06)]' : ''
          }`}
        >
          {/* Label — Webapp/Label/XS/Bold (12/16 SemiBold), no tracking, Foreground/700.
              The trailing circle is a subtle Figma decorative accent (50%-opacity
              white ellipse) present on most KPI tiles — hideEllipse opts a report out. */}
          <div className="flex items-center justify-between w-full">
            <span className="text-[12px] leading-[16px] font-semibold text-[#000000] uppercase">
              {kpi.label}
            </span>
            {!section.hideEllipse && <span className="w-7 h-7 rounded-full bg-white/50 shrink-0" aria-hidden="true" />}
          </div>
          <div className="flex flex-col gap-3">
            {/* Value — Webapp/Display/XLL (36/44 Bold) Foreground/700 */}
            <span className="text-[36px] leading-[44px] font-bold text-[#000000]">
              {kpi.value}
            </span>
            {/* Subtext — Webapp/Label/XS/Regular (12/16) Foreground/500 */}
            <span className="text-[12px] leading-[16px] font-normal text-[#262E40]">
              {kpi.subtext}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
